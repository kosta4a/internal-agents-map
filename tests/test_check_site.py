# ABOUTME: Fixture tests for the publication boundary and evidence rules of check_site.py.
# ABOUTME: Each case breaks one rule in a small complete artifact and expects a named error.
"""Per-entry coverage and publication boundary rules of the site artifact checker."""

import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load_script(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / "scripts" / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


checker = load_script("check_site")

STYLESHEET = "_astro/site.abcd1234.css"
# The guide routes that the fixture publishes beside the two entry pages.
GUIDE_ROUTES = ("/", "/definitions", "/notes", "/notes/a-note")

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
            "metric_scope": "Pilot teams only",
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
    caveat = (
        '<p class="caveat">Scope: ' + claim["metric_scope"] + "</p>"
        if claim.get("metric_scope")
        else ""
    )
    return (
        '<article class="entry-page" data-approach-id="'
        + approach["id"]
        + '"><article class="claim" id="claim-'
        + claim["id"]
        + '" data-claim-id="'
        + claim["id"]
        + '"><p>'
        + claim["text"]
        + "</p>"
        + caveat
        + '</article><ol class="sources"><li id="source-'
        + source["id"]
        + '" data-source-id="'
        + source["id"]
        + '"><a href="https://example.invalid/report">Report</a>'
        + '<a href="/agents/'
        + approach["id"]
        + "#claim-"
        + claim["id"]
        + '">The claim</a>'
        + "</li></ol></article>"
    )


def routing_manifest():
    """Name the artifacts of every route the fixture publishes."""
    routes = {
        path: {
            "html": ("/index.html" if path == "/" else path + ".html"),
            "markdown": ("/index.md" if path == "/" else path + ".md"),
        }
        for path in GUIDE_ROUTES
    }
    for approach in CATALOG["approaches"]:
        path = "/agents/" + approach["id"]
        routes[path] = {"html": path + ".html", "markdown": path + ".md"}
    return {"schema_version": 1, "routes": routes}


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
    files["404.html"] = document("Not found", "<p>No such page.</p>")
    for path in GUIDE_ROUTES[1:]:
        name = path.lstrip("/")
        files.setdefault(name + ".html", document(Path(name).name, "<p>A page.</p>"))
        files[name + ".md"] = "# Page"
    files["index.md"] = "# Catalog"
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
        self.routes = Path(self.temp.name) / "routing-manifest.json"
        self.routes.write_text(json.dumps(routing_manifest()), encoding="utf-8")

    def validate(self):
        return checker.validate(self.root, self.catalog, self.routes)

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

    def test_missing_caveat_fails(self):
        self.rewrite("agents/first-agent.html", "Scope: Pilot teams only", "Scope: everywhere")
        errors = self.validate()
        self.assertTrue(
            any("Missing caveat metric_scope: first-agent--summary" in e for e in errors), errors
        )

    def test_broken_fragment_on_the_same_page_fails(self):
        self.rewrite(
            "agents/first-agent.html",
            "#claim-first-agent--summary",
            "#claim-first-agent--missing",
        )
        self.assertTrue(any("Invalid fragment" in e for e in self.validate()), self.validate())

    def test_broken_fragment_across_pages_fails(self):
        self.rewrite("index.html", 'href="/agents/first-agent"', 'href="/agents/first-agent#gone"')
        self.assertTrue(any("Invalid fragment" in e for e in self.validate()), self.validate())

    def test_escaping_path_fails(self):
        self.rewrite("index.html", 'href="/' + STYLESHEET + '"', 'href="../outside.css"')
        self.assertTrue(any("escapes" in e for e in self.validate()), self.validate())

    def test_link_to_another_host_fails(self):
        self.rewrite("index.html", 'href="/agents/first-agent"', 'href="//example.invalid/x"')
        self.assertTrue(any("must be relative" in e for e in self.validate()), self.validate())

    def test_missing_bundled_asset_fails(self):
        (self.root / STYLESHEET).unlink()
        errors = self.validate()
        self.assertTrue(any("Missing local target: /" + STYLESHEET in e for e in errors), errors)

    def test_css_asset_reference_is_checked(self):
        self.rewrite(STYLESHEET, "/fonts/Geist.woff2", "/fonts/missing.woff2")
        self.assertTrue(any("Missing local target" in e for e in self.validate()), self.validate())

    def test_srcset_candidate_is_checked(self):
        self.rewrite(
            "index.html",
            "<footer>",
            '<img src="/og.png" srcset="/og.png 1x, /missing.png 2x" alt="Preview"><footer>',
        )
        self.assertTrue(
            any("Missing local target: /missing.png" in e for e in self.validate()), self.validate()
        )

    def test_exported_json_must_match_the_catalog(self):
        (self.root / "agents.json").write_text("{}", encoding="utf-8")
        self.assertTrue(any("JSON differs" in e for e in self.validate()), self.validate())

    def test_route_manifest_and_catalog_must_agree(self):
        manifest = json.loads(self.routes.read_text(encoding="utf-8"))
        del manifest["routes"]["/agents/second-agent"]
        manifest["routes"]["/agents/third-agent"] = {
            "html": "/agents/third-agent.html",
            "markdown": "/agents/third-agent.md",
        }
        self.routes.write_text(json.dumps(manifest), encoding="utf-8")
        errors = self.validate()
        self.assertTrue(any("omits /agents/second-agent" in e for e in errors), errors)
        self.assertTrue(any("/agents/third-agent" in e for e in errors), errors)

    def test_unsupported_manifest_version_fails(self):
        manifest = json.loads(self.routes.read_text(encoding="utf-8"))
        manifest["schema_version"] = 2
        self.routes.write_text(json.dumps(manifest), encoding="utf-8")
        self.assertTrue(any("schema version" in e for e in self.validate()), self.validate())


if __name__ == "__main__":
    unittest.main()
