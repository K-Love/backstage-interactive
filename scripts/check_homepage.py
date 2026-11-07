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

    for expected in ("KeyProse", "WildThesis", "Where ideas become", "id=\"contact\""):
        if expected not in html:
            audit.errors.append(f"Expected homepage content missing: {expected}")

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
