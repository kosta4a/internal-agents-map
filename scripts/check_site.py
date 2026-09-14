"""Validate the generated site artifact without fetching external citations."""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent

# The pages both artifact layouts publish, by their file name in the root.
PAGE_FILES = {
    "404.html",
    "index.html",
    "definitions.html",
    "methodology.html",
    "notes.html",
    "notes/stop-a-run.html",
    "notes/review-noise.html",
    "notes/split-the-work.html",
    "notes/work-can-continue.html",
    "notes/load-tools.html",
    "notes/steps-without-a-model.html",
    "notes/test-on-your-work.html",
}
STATIC_FILES = {"favicon.ico", "og.png"}
EXPORT_FILES = {
    "agents.json",
    "agents/index.json",
    "data-guide.md",
    "llms.txt",
    "robots.txt",
    "sitemap.xml",
}
# The hand-hashed assets of the Python renderer.
LEGACY_FILES = {
    "assets/site.css",
    "assets/site.js",
    "assets/fonts/Geist.woff2",
    "assets/fonts/OFL.txt",
    "assets/manifest.json",
}
LEGACY_DIRECTORIES = {"assets", "assets/fonts", "notes", "agents"}
# The bundled assets of the Astro build.
ASTRO_FILES = {"fonts/Geist.woff2", "fonts/OFL.txt"}
ASTRO_DIRECTORIES = {"_astro", "fonts", "notes", "agents"}
# Astro names a bundled asset `<name>.<hash>.<extension>`.
ASTRO_ASSET = re.compile(r"_astro/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]{8,}\.(?:css|js)")


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.urls: list[str] = []
        self.tags: set[str] = set()
        self.coverage: dict[str, list[str]] = {key: [] for key in ("approach", "claim", "source")}
        self.text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.tags.add(tag)
        attributes = dict(attrs)
        if attributes.get("id"):
            self.ids.append(attributes["id"])
        for key in ("href", "src"):
            if attributes.get(key):
                self.urls.append(attributes[key])
        for key in self.coverage:
            if attributes.get(f"data-{key}-id"):
                self.coverage[key].append(attributes[f"data-{key}-id"])

    def handle_data(self, data: str) -> None:
        self.text.append(data)


def visible_text(page: SiteParser) -> str:
    return " ".join(" ".join(page.text).split())


def hashed_assets(root: Path, errors: list[str]) -> set[str]:
    """Read the asset manifest of the Python renderer and check every content hash."""
    names: set[str] = set()
    try:
        manifest = json.loads((root / "assets/manifest.json").read_text())
        if set(manifest) != {"site.css", "site.js", "fonts/Geist.woff2"}:
            errors.append("Invalid hashed asset manifest.")
        for original, hashed in manifest.items():
            original_path = Path(original)
            pattern = (
                re.escape(str(original_path.with_suffix("")))
                + r"\.[a-f0-9]{16}"
                + re.escape(original_path.suffix)
            )
            if not re.fullmatch(pattern, hashed):
                errors.append(f"Invalid hashed asset path: {hashed}")
                continue
            names.add("assets/" + hashed)
            content = (root / "assets" / hashed).read_bytes()
            if hashlib.sha256(content).hexdigest()[:16] != Path(hashed).name.split(".")[-2]:
                errors.append(f"Asset content hash mismatch: {hashed}")
    except (OSError, ValueError, TypeError):
        errors.append("Missing or invalid hashed assets.")
    return names


def check_directory_coverage(page: SiteParser, approaches: list[dict], errors: list[str]) -> None:
    """Every implementation has one card in the directory, and that card links to its page."""
    expected = Counter(approach["id"] for approach in approaches)
    if Counter(page.coverage["approach"]) != expected:
        errors.append("Incomplete or duplicate approach coverage in the directory.")
    linked = {url.split("#")[0] for url in page.urls if url.startswith("/agents/")}
    wanted = {f"/agents/{approach['id']}" for approach in approaches}
    for path in sorted(wanted - linked):
        errors.append(f"The directory does not link to {path}.")
    for path in sorted(linked - wanted):
        errors.append(f"The directory links to an entry that the catalog does not hold: {path}.")


def check_entry_coverage(
    page: SiteParser, approach: dict, claims: dict[str, dict], errors: list[str]
) -> None:
    """One entry page carries its own record, its own claims, and its own sources."""
    name = f"agents/{approach['id']}.html"
    if Counter(page.coverage["approach"]) != Counter([approach["id"]]):
        errors.append(f"Incomplete or duplicate approach coverage in {name}.")
    for kind, ids in (("claim", approach["claim_ids"]), ("source", approach["source_ids"])):
        if Counter(page.coverage[kind]) != Counter(ids):
            errors.append(f"Incomplete or duplicate {kind} coverage in {name}.")
    text = visible_text(page)
    for claim_id in approach["claim_ids"]:
        claim = claims.get(claim_id)
        if claim is None:
            errors.append(f"Unknown claim {claim_id} in {name}.")
        elif " ".join(str(claim["text"]).split()) not in text:
            errors.append(f"Missing claim text: {claim_id} in {name}")


def validate(root: Path, catalog_path: Path = ROOT / "data/agents.json") -> list[str]:
    errors: list[str] = []
    if root.is_symlink() or not root.is_dir():
        return ["Site root must be a real directory, not a symlink."]
    catalog_bytes = catalog_path.read_bytes()
    catalog = json.loads(catalog_bytes)
    approaches = list(catalog["approaches"])
    claims = {claim["id"]: claim for claim in catalog["claims"]}
    # The Python renderer hashes its own assets; the Astro build bundles them.
    legacy = (root / "assets/manifest.json").is_file()
    expected = set(PAGE_FILES) | STATIC_FILES | EXPORT_FILES
    expected |= {name.replace(".html", ".md") for name in PAGE_FILES if name != "404.html"}
    expected |= {f"agents/{a['id']}.{ext}" for a in approaches for ext in ("json", "md")}
    if legacy:
        expected |= LEGACY_FILES | hashed_assets(root, errors)
        directories = LEGACY_DIRECTORIES
    else:
        expected |= ASTRO_FILES
        expected |= {f"agents/{a['id']}.html" for a in approaches}
        directories = ASTRO_DIRECTORIES

    root = root.resolve()
    actual = set()
    for path in root.rglob("*"):
        if path.is_symlink():
            errors.append(f"Symlink is forbidden: {path.relative_to(root)}")
        elif path.is_file():
            actual.add(path.relative_to(root).as_posix())
            if path.stat().st_size == 0:
                errors.append(f"Empty output: {path.relative_to(root)}")
        elif path.is_dir() and path.relative_to(root).as_posix() not in directories:
            errors.append(f"Unexpected directory: {path.relative_to(root)}")
    missing = sorted(expected - actual)
    if missing:
        errors.append(f"Output boundary mismatch: missing {missing}")
    if errors:
        return errors

    try:
        pages = {}
        for name in sorted(name for name in expected if name.endswith(".html")):
            page = SiteParser()
            page.feed((root / name).read_text(encoding="utf-8"))
            pages[root / name] = page
            for required in ("html", "head", "title", "body", "nav", "main", "header", "footer"):
                if required not in page.tags:
                    errors.append(f"Missing landmark: {required} in {name}")
            duplicates = sorted(key for key, count in Counter(page.ids).items() if count > 1)
            if duplicates:
                errors.append(f"Duplicate IDs: {duplicates} in {name}")

        # A bundled asset is publishable only where a published document asks for it.
        allowed = set(expected)
        if not legacy:
            referenced = {
                url.lstrip("/").split("#")[0] for page in pages.values() for url in page.urls
            }
            for css_path in (root / "_astro").glob("*.css"):
                css = css_path.read_text(encoding="utf-8")
                referenced |= {
                    match[1].lstrip("/")
                    for match in re.finditer(r"url\(\s*['\"]?([^'\"\s)]+)['\"]?\s*\)", css)
                }
            allowed |= {name for name in referenced if ASTRO_ASSET.fullmatch(name)}
        extra = sorted(actual - allowed)
        if extra:
            errors.append(f"Output boundary mismatch: extra {extra}")

        if (root / "agents.json").read_bytes() != catalog_bytes:
            errors.append("Site JSON differs from the source catalog.")
        if legacy:
            # The Python renderer keeps the whole catalog on the directory page.
            directory = pages[root / "index.html"]
            for kind, collection in (
                ("approach", "approaches"),
                ("claim", "claims"),
                ("source", "sources"),
            ):
                expected_ids = Counter(item["id"] for item in catalog[collection])
                if Counter(directory.coverage[kind]) != expected_ids:
                    errors.append(f"Incomplete or duplicate {kind} coverage.")
            text = visible_text(directory)
            for claim in catalog["claims"]:
                if " ".join(str(claim["text"]).split()) not in text:
                    errors.append(f"Missing claim text: {claim['id']}")
        else:
            check_directory_coverage(pages[root / "index.html"], approaches, errors)
            for approach in approaches:
                page = pages.get(root / f"agents/{approach['id']}.html")
                if page is not None:
                    check_entry_coverage(page, approach, claims, errors)

        def check_url(url: str, document: Path) -> None:
            url = url.strip()
            parts = urlsplit(url)
            if parts.scheme:
                if parts.scheme.lower() not in {"http", "https"}:
                    errors.append(f"Unsafe URL scheme: {url}")
                return
            if parts.netloc:
                errors.append(f"Asset/link must be relative: {url}")
                return
            rooted = url.startswith("/")
            if legacy and (rooted or url.startswith("\\")):
                # The Pages artifact is relocatable, so only the 404 page uses root paths.
                if document.name == "404.html" and rooted:
                    check_url(url[1:], root / "index.html")
                    return
                errors.append(f"Asset/link must be relative: {url}")
                return
            decoded = unquote(parts.path)
            if "\\" in decoded:
                errors.append(f"Invalid path separator: {url}")
                return
            base = root if rooted else document.parent
            target = (base / decoded.lstrip("/")).resolve() if decoded else document
            if not target.is_relative_to(root):
                errors.append(f"Path escapes site: {url}")
                return
            # A clean URL such as /agents/<id> or /notes is served from <id>.html.
            clean = None if target == root else target.with_name(target.name + ".html")
            if not legacy and clean is not None and clean.is_file():
                target = clean
            elif target.is_dir():
                target = target / "index.html"
            if not target.is_file():
                errors.append(f"Missing local target: {url}")
            elif parts.fragment and (
                target not in pages or unquote(parts.fragment) not in pages[target].ids
            ):
                errors.append(f"Invalid fragment: {url}")

        for document, page in pages.items():
            for url in page.urls:
                check_url(url, document)
        for css_path in (root / ("assets" if legacy else "_astro")).glob("*.css"):
            css = css_path.read_text(encoding="utf-8")
            for match in re.finditer(r"url\(\s*['\"]?([^'\"\s)]+)['\"]?\s*\)", css):
                check_url(match[1], css_path)
            if "@import" in css.lower():
                errors.append("CSS imports are outside the self-contained artifact contract.")
        # Reuse the existing policy on every artifact, including new untracked text.
        spec = importlib.util.spec_from_file_location(
            "site_privacy", ROOT / "scripts/check_private_data.py"
        )
        privacy = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(privacy)
        for name in sorted(actual):
            if privacy.find_emails(root / name):
                errors.append(f"Private contact data in artifact: {name}")
    except (OSError, ValueError, KeyError) as error:
        errors.append(f"Invalid artifact: {error}")
    return errors


def main() -> int:
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("--root", type=Path, default=ROOT / "site")
    args = cli.parse_args()
    errors = validate(args.root)
    if errors:
        for error in errors:
            print(error, file=sys.stderr)
        return 1
    print("Validated site artifact: coverage, links, assets, JSON parity, and privacy.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
