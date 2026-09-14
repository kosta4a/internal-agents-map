"""Per-entry coverage and publication boundary rules of the Astro artifact checker."""

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load_script(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / "scripts" / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


checker = load_script("check_site")

STYLESHEET = "_astro/site.abcd1234.css"

CATALOG = {
    "schema_version": 4,
    "approaches": [
        {
            "id": "first-agent",
            "company": "First",
            "agent_name": "First agent",
            "claim_ids": ["first-agent--summary"],
            "source_ids": ["first-agent-source-1"],
        },
        {
            "id": "second-agent",
            "company": "Second",
            "agent_name": "Second agent",
            "claim_ids": ["second-agent--summary"],
            "source_ids": ["second-agent-source-1"],
        },
    ],
    "claims": [
        {
            "id": "first-agent--summary",
            "approach_id": "first-agent",
            "text": "The first agent opens pull requests from tickets.",
        },
        {
            "id": "second-agent--summary",
            "approach_id": "second-agent",
            "text": "The second agent answers questions about internal documents.",
        },
    ],
    "sources": [
        {"id": "first-agent-source-1", "approach_id": "first-agent"},
        {"id": "second-agent-source-1", "approach_id": "second-agent"},
    ],
}


def document(title, body):
    """One page with the landmarks the checker requires."""
    return (
        '<!doctype html><html lang="en"><head><title>'
        + title
        + '</title><link rel="stylesheet" href="/'
        + STYLESHEET
        + '"></head><body><nav><a href="/">Catalog</a></nav>'
        + '<main id="main"><header><h1>'
        + title
        + "</h1></header>"
        + body
        + "</main><footer>Internal Agents Map</footer></body></html>"
    )


def card(approach, claim):
    return (
        '<article class="entry" id="'
        + approach["id"]
        + '" data-approach-id="'
        + approach["id"]
        + '"><h3><a href="/agents/'
        + approach["id"]
        + '">'
        + approach["agent_name"]
        + "</a></h3><p>"
        + claim["text"]
        + "</p></article>"
    )


def entry(approach, claim, source):
    return (
        '<article class="entry-page" data-approach-id="'
        + approach["id"]
        + '"><article class="claim" id="claim-'
        + claim["id"]
        + '" data-claim-id="'
        + claim["id"]
        + '"><p>'
        + claim["text"]
        + '</p></article><ol class="sources"><li id="source-'
        + source["id"]
        + '" data-source-id="'
        + source["id"]
        + '"><a href="https://example.invalid/report">Report</a></li></ol></article>'
    )


def build_artifact(root):
    """Write a small but complete artifact that the checker must accept."""
    claims = {claim["id"]: claim for claim in CATALOG["claims"]}
    sources = {source["id"]: source for source in CATALOG["sources"]}
    files = {
        "favicon.ico": "icon",
        "og.png": "image",
        STYLESHEET: '@font-face { src: url("/fonts/Geist.woff2"); }',
        "fonts/Geist.woff2": "font",
        "fonts/OFL.txt": "licence",
        "agents.json": json.dumps(CATALOG),
        "agents/index.json": "[]",
        "data-guide.md": "# Data guide",
        "llms.txt": "# Internal Agents Map",
        "robots.txt": "User-agent: *",
        "sitemap.xml": "<urlset></urlset>",
    }
    cards = "".join(
        card(approach, claims[approach["claim_ids"][0]]) for approach in CATALOG["approaches"]
    )
    files["index.html"] = document("Catalog", '<div class="entries">' + cards + "</div>")
    for approach in CATALOG["approaches"]:
        claim = claims[approach["claim_ids"][0]]
        source = sources[approach["source_ids"][0]]
        files[f"agents/{approach['id']}.html"] = document(
            approach["agent_name"], entry(approach, claim, source)
        )
        files[f"agents/{approach['id']}.json"] = "{}"
        files[f"agents/{approach['id']}.md"] = "# " + approach["agent_name"]
    for name in checker.PAGE_FILES:
        files.setdefault(name, document(Path(name).stem, "<p>A page.</p>"))
        if name != "404.html":
            files[name.replace(".html", ".md")] = "# Page"
    for name, text in files.items():
        path = root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")


class AstroArtifactTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / "dist"
        self.root.mkdir()
        build_artifact(self.root)
        self.catalog = Path(self.temp.name) / "agents.json"
        self.catalog.write_text(json.dumps(CATALOG), encoding="utf-8")

    def validate(self):
        return checker.validate(self.root, self.catalog)

    def rewrite(self, name, old, new):
        path = self.root / name
        path.write_text(path.read_text(encoding="utf-8").replace(old, new, 1), encoding="utf-8")

    def test_complete_artifact_passes(self):
        self.assertEqual(self.validate(), [])

    def test_missing_entry_page_fails(self):
        (self.root / "agents/second-agent.html").unlink()
        errors = self.validate()
        self.assertTrue(any("agents/second-agent.html" in error for error in errors), errors)
        self.assertTrue(any("missing" in error for error in errors), errors)

    def test_missing_claim_text_fails(self):
        self.rewrite(
            "agents/first-agent.html",
            "The first agent opens pull requests from tickets.",
            "Something else.",
        )
        errors = self.validate()
        self.assertTrue(
            any("Missing claim text: first-agent--summary" in error for error in errors), errors
        )

    def test_unexpected_file_fails(self):
        (self.root / "research-notes.txt").write_text("private research", encoding="utf-8")
        errors = self.validate()
        self.assertTrue(any("extra" in error for error in errors), errors)
        self.assertTrue(any("research-notes.txt" in error for error in errors), errors)

    def test_unreferenced_bundled_asset_fails(self):
        (self.root / "_astro/orphan.abcd1234.js").write_text("console.log(1)", encoding="utf-8")
        errors = self.validate()
        self.assertTrue(any("orphan.abcd1234.js" in error for error in errors), errors)

    def test_entry_page_must_carry_its_own_sources(self):
        self.rewrite("agents/first-agent.html", "data-source-id=", "data-removed-source-id=")
        errors = self.validate()
        self.assertTrue(
            any("source coverage in agents/first-agent.html" in error for error in errors), errors
        )

    def test_directory_must_link_to_every_entry(self):
        self.rewrite("index.html", 'href="/agents/second-agent"', 'href="/agents/first-agent"')
        errors = self.validate()
        self.assertTrue(
            any("does not link to /agents/second-agent" in error for error in errors), errors
        )

    def test_claim_marker_on_the_wrong_page_fails(self):
        self.rewrite(
            "agents/first-agent.html",
            'data-claim-id="first-agent--summary"',
            'data-claim-id="second-agent--summary"',
        )
        errors = self.validate()
        self.assertTrue(any("claim coverage" in error for error in errors), errors)

    def test_repeated_landmark_ids_across_pages_are_allowed(self):
        self.assertEqual(self.validate(), [])
        self.rewrite(
            "agents/first-agent.html", '<main id="main">', '<main id="main"><i id="x"></i>'
        )
        self.rewrite(
            "agents/second-agent.html", '<main id="main">', '<main id="main"><i id="x"></i>'
        )
        self.assertEqual(self.validate(), [])

    def test_duplicate_id_inside_one_page_fails(self):
        self.rewrite("agents/first-agent.html", '<main id="main">', '<main id="main"><i id="main">')
        errors = self.validate()
        self.assertTrue(any("Duplicate IDs" in error for error in errors), errors)

    def test_unsafe_scheme_and_missing_target_fail(self):
        self.rewrite("index.html", 'href="/agents/first-agent"', 'href="javascript:alert(1)"')
        self.assertTrue(
            any("Unsafe URL scheme" in error for error in self.validate()), self.validate()
        )
        self.rewrite("index.html", 'href="javascript:alert(1)"', 'href="/agents/missing-agent"')
        self.assertTrue(any("Missing local target" in error for error in self.validate()))

    def test_symlink_is_refused(self):
        target = self.root / "agents/first-agent.md"
        target.unlink()
        target.symlink_to(self.root / "agents/second-agent.md")
        self.assertTrue(any("Symlink" in error for error in self.validate()))

    def test_private_contact_data_is_refused(self):
        self.rewrite("index.html", "</footer>", "<p>" + "fixture" + "@" + "example.invalid</p>")
        self.assertTrue(any("Private contact data" in error for error in self.validate()))


if __name__ == "__main__":
    unittest.main()
