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

    # Agency is the navigation/section name; the content is client work.
    # Preserve genuine site screenshots and label the coaching illustration.
    agency_start = html.find('<section class="section" id="work"')
    about_start_for_work = html.find('<section class="section" id="about"')
    if agency_start < 0 or about_start_for_work <= agency_start:
        audit.errors.append("Agency section missing or out of order")
    else:
        agency = html[agency_start:about_start_for_work]
        if '<h2 id="work-title">Client work.</h2>' not in agency:
            audit.errors.append("Agency heading must be Client work.")
        for expected in (
            'client-art--nina', 'client-art--sharrey', 'client-art--chris',
            'src="/assets/work/ninalara.webp"',
            'client-art__jewelry',
            'sd-home1.jpg', 'sd-home2.jpg', 'sd-home3.jpg',
            '<figcaption>JEWELRY DESIGN</figcaption>',
            '<figcaption>HANDMADE JEWELRY</figcaption>',
            '<figcaption>WELLNESS COACH</figcaption>',
            'aria-label="Editorial artwork for the Chris Willburn coaching website',
        ):
            if expected not in agency:
                audit.errors.append(f"Missing Agency visual: {expected}")
        # Most recently built client project first. Keep each entire card
        # together when reordering so its art, caption, copy and link stay paired.
        expected_order = ('<h3>Chris Willburn</h3>',
                          '<h3>Nina Lara Design</h3>',
                          '<h3>Sharrey Doré</h3>')
        positions = [agency.find(title) for title in expected_order]
        if any(position < 0 for position in positions) or positions != sorted(positions):
            audit.errors.append("Agency cards must be Chris, Nina, then Sharrey")

        # Short captions should stay a single line across card breakpoints.
        for caption in ('WELLNESS COACH', 'JEWELRY DESIGN', 'HANDMADE JEWELRY'):
            if agency.count(f'<figcaption>{caption}</figcaption>') != 1:
                audit.errors.append(f"Missing or duplicate Agency caption: {caption}")

        if '<div class="typecard">' in agency:
            audit.errors.append("Agency still uses a placeholder typecard")

        # All three image rules share the Chris Willburn 0.9rem inset and
        # 1px weight, with a light-appropriate ink on the jewelry cards.
        # Nina's image slides down inside a white clipped window, so it
        # cannot overlap the hairline border or the off-white outside band.
        screenshot_css = html[html.find("    /* Client work uses genuine site captures"):html.find("    .client-art figcaption")]
        for expected in (
            "--art-inset: 0.9rem;",
            "--art-rule: rgba(30, 34, 59, 0.24);",
            "inset: var(--art-inset);",
            "border: 1px solid var(--art-rule);",
            ".client-art__screenshot-window",
            "overflow: hidden;",
            "transform: translateY(0.65rem);",
            ".client-art__jewelry",
            "grid-template-columns: 1fr 1fr 1fr;",
            "object-fit: contain;",
        ):
            if expected not in screenshot_css:
                audit.errors.append(f"Missing shared image border: {expected}")
        if screenshot_css.count("inset: var(--art-inset);") < 3:
            audit.errors.append("Nina, Sharrey and shared border must use one inset")
        if 'class="client-art__screenshot-window"' not in agency:
            audit.errors.append("Nina screenshot must be inside its clipped window")
        if "transform: scale(" in screenshot_css:
            audit.errors.append("Client screenshots must not use CSS zoom")

        if agency.count('sd-home1.jpg') != 1 or agency.count('sd-home2.jpg') != 1:
            audit.errors.append("Sharrey's earrings and necklace must be present in full")

    if html.count('href="#work">Agency</a>') != 2:
        audit.errors.append("Both primary and footer navigation must say Agency")
    if 'href="#work">Client work</a>' in html:
        audit.errors.append("Old Client work navigation label remains")

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

    # Section numbers belong to the homepage sections, not individual Studio projects.
    for expected in ('01 — Studio', '02 — Services', '03 — Agency'):
        if f'<p class="kicker">{expected}</p>' not in html:
            audit.errors.append(f"Missing numbered section kicker: {expected}")

    # About's section number must lead the whole section, above the portrait
    # on mobile and above the two-column portrait/bio grid on desktop.
    about_start = html.find('<section class="section" id="about"')
    contact_start = html.find('<section class="section" id="contact"')
    if about_start < 0 or contact_start < about_start:
        audit.errors.append("About section missing or out of order")
    else:
        about = html[about_start:contact_start]
        heading = '<p class="kicker">04 — About</p>'
        photo = '<figure class="portrait">'
        grid = '<div class="about-grid">'
        if about.count(heading) != 1 or not (
            0 <= about.find(heading) < about.find(grid) < about.find(photo)
        ):
            audit.errors.append("About kicker must appear once above portrait grid")

    if 'project-kicker' in html:
        audit.errors.append("Studio projects must not have numbered project kickers")

    for expected in ('<h3 id="keyprose-title">KeyProse</h3>',
                     '<h3 id="wildthesis-title">Wild Thesis</h3>'):
        if expected not in html:
            audit.errors.append(f"Missing project title: {expected}")

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
