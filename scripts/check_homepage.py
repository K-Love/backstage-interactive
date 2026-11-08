#!/usr/bin/env python3
"""No-dependency sanity check for the public homepage.

Run from any working directory: python3 scripts/check_homepage.py
Checks HTML anchors, local links/assets, and critical Netlify form wiring.
Visual/mobile behavior must still be reviewed in a browser.
"""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
HOME = ROOT / "index.html"


class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.refs = []
        self.local_anchors = []
        self.errors = []
        self.forms = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            if a["id"] in self.ids:
                self.errors.append(f"Duplicate id: {a['id']}")
            self.ids.add(a["id"])
        if tag == "form":
            self.forms.append(a)
        if tag == "img" and not a.get("alt"):
            self.errors.append(f"Image missing alt: {a.get('src', '?')}")
        for key in ("href", "src", "action"):
            value = a.get(key)
            if not value:
                continue
            if value.startswith("#"):
                self.local_anchors.append(value[1:])
            else:
                self.refs.append(value)
        if a.get("srcset"):
            self.refs.extend(
                part.strip().split()[0]
                for part in a["srcset"].split(",") if part.strip()
            )


def file_for(url):
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or not parsed.path.startswith("/"):
        return None
    path = unquote(parsed.path).lstrip("/")
    target = ROOT / path
    if not path or target.is_dir():
        target = target / "index.html"
    return target


def main():
    if not HOME.is_file():
        raise SystemExit("Missing root index.html")

    html = HOME.read_text(encoding="utf-8")
    audit = Audit()
    audit.feed(html)

    for anchor in audit.local_anchors:
        if anchor and anchor not in audit.ids:
            audit.errors.append(f"Broken in-page anchor: #{anchor}")

    # Also inspect local CSS font/background URLs in the embedded stylesheet.
    refs = audit.refs + re.findall(r'url\(["\']?(/[^)"\']+)', html)
    for ref in refs:
        target = file_for(ref)
        if target is not None and not target.is_file():
            audit.errors.append(f"Missing local destination: {ref}")

    if not any(
        form.get("name") == "backstage-home-inquiry"
        and form.get("method", "").upper() == "POST"
        and form.get("data-netlify") == "true"
        for form in audit.forms
    ):
        audit.errors.append("Expected Netlify homepage inquiry form is missing")

    for expected in ("KeyProse", "Wild Thesis", "keyprose-title", "wildthesis-title", "Where ideas become", "id=\"contact\""):
        if expected not in html:
            audit.errors.append(f"Expected homepage content missing: {expected}")

    # Studio presentation decisions: approved copy, clean product-image crop,
    # and image-first ordering below the desktop two-column breakpoint.
    studio_checks = {
        "Approved Studio intro": "Original products, built to be useful, thoughtful, and real.",
        "KeyProse shot wrapper": 'class="studio-shot"',
        "KeyProse crop": "aspect-ratio: 1200 / 666;",
        "Mobile image-first layout": "@media (max-width: 859px)",
        "Mobile image ordering": ".piece .studio-art { order: 0; }",
        "Mobile copy ordering": ".piece > div { order: 1; }",
    }
    for label, marker in studio_checks.items():
        if marker not in html:
            audit.errors.append(f"Missing {label}: {marker}")

    # The former launch placeholder must be absent, and old URLs redirect
    # instead of remaining publicly accessible as a second homepage.
    if (ROOT / "coming-soon.html").exists():
        audit.errors.append("Retired coming-soon.html must not be published")

    netlify_file = ROOT / "netlify.toml"
    if not netlify_file.is_file():
        audit.errors.append("Missing Netlify configuration")
    else:
        config = netlify_file.read_text(encoding="utf-8")
        for legacy in ("/coming-soon.html", "/coming-soon", "/coming-soon/"):
            expected = (
                f'from = "{legacy}"\\n  to = "/"\\n  status = 301\\n  force = true'
            )
            expected = expected.replace("\\n", "\n")
            if expected not in config:
                audit.errors.append(f"Missing permanent redirect: {legacy} → /")

    for expected in (
        '<p class="kicker project-kicker">01 — Real estate</p>',
        '<p class="kicker project-kicker">02 — Botanical research</p>',
        ".piece .project-kicker { margin: 0 0 1.1rem; color: var(--faint); }",
    ):
        if expected not in html:
            audit.errors.append(f"Missing consistent Studio kicker: {expected}")

    if audit.errors:
        print("Homepage check failed:")
        for issue in sorted(set(audit.errors)):
            print("  -", issue)
        return 1

    print(f"Homepage check passed: {len(audit.ids)} ids, {len(refs)} URL references, "
          f"{len(audit.forms)} form(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
