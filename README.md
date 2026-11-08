# Backstage Interactive

Static site for [backstageinteractive.com](https://backstageinteractive.com/). [Netlify](netlify.toml) publishes the repository root. There is no build step.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Studio homepage: owned products, client work, service offers, about, and inquiry form. |
| `/google-business-profile-home-services/` | GBP Fix-and-Protect landing page for home service pros. |
| `/website-fixes/` | Website improvement services (noindex). |
| `/privacy/` and `/terms/` | Website policies linked from the public footer. |
| `/tools/idea-validator/` | Internal preview tool. |

The former Coming Soon page is retired and its file has been removed. Netlify
permanently redirects `/coming-soon.html`, `/coming-soon`, and
`/coming-soon/` to `/`. The root `index.html` is the only studio homepage.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080/](http://localhost:8080/) for the flagship homepage, or [the GBP offer](http://localhost:8080/google-business-profile-home-services/).

A local server will not store form submissions. Netlify does that after deploy.

## Homepage theme preview (dark / light)

The homepage supports a dark/light toggle in its header. On an initial visit,
JavaScript reads the device's `prefers-color-scheme` preference; after a manual
choice, a `backstage-theme` localStorage value takes precedence. A system
preference change is followed only when no manual choice is stored.

The dark header/footer stay midnight in both modes so the current Backstage
wordmark remains legible. The light palette uses a warm paper background and
dark text; the body, project cards, and inquiry form change together. The two
palettes were checked mathematically for foreground/background text contrast
at or above 4.5:1. These checks are not a substitute for visual, keyboard,
focus, and accessibility-device tests.

**Scope as of this update:** The homepage, Privacy Policy, Terms of Use,
and studio thank-you page honor the same `backstage-theme` preference.
The legal and thank-you pages use the shared `/assets/theme-preference.js`
controller; the homepage retains its existing inline controller and key.
The Website Fixes and GBP pages are separate, intentionally light service
designs, with their own inquiry flows; they do not inherit this theme toggle.
The service-specific thank-you pages and archived/tools pages also remain
independent. Do not imply that every site route is theme-enabled.

The theme preference is localStorage only, not a cookie, analytics event,
or form field. The Privacy Policy discloses the optional preference.

Acceptance: test 320/375/768/1440px, click the toggle, reload to confirm
persistence, remove `backstage-theme` from local storage to restore device
preference behavior, test keyboard activation, inspect forms and cards, then
test the opposite OS theme. On `/privacy/` and `/terms/`, verify
the same preference survives navigation, the sticky header does not obscure
in-page section links, and the pages print legibly. Submit a studio inquiry
on Netlify and confirm the `/thank-you.html` screen follows the chosen
reading mode. Do not merge or publish without a Netlify preview check.

## Studio portfolio — editorial production cards

The homepage's Studio section is an editorial showcase, not a testimonial or a
product benchmark. KeyProse is shown with the existing interface screenshot.
Wild Thesis has a custom botanical illustration **clearly labeled as art
direction rather than a screenshot**. Both productions have concise,
source-grounded descriptions, visible capability labels, and limitations where
appropriate. No user counts, customer outcomes, or efficacy claims are made.

The public site and the source repositories use **Wild Thesis** (two words).
Keep the public project name consistent with the product's canonical branding.
The two owned product links remain external destinations, and must be checked
in a normal browser before the production merge. A GitHub or Netlify preview
status does not prove a separate product domain is responding.

At mobile widths, verify the project images, captions, SVG illustration,
headlines, capability chips, links, and alternating piece order. Test both
dark and light reading modes. Numbered kickers belong exclusively to the
homepage sections (such as `01 — Studio`, `02 — Services`,
and `03 — Agency`), never to the KeyProse or Wild Thesis product cards.
The homepage smoke check verifies this hierarchy and the existing layout rules.

## Agency — client work cards

The primary/footer navigation uses **Agency** to match the numbered
`03 — Agency` section. Its on-page title is **Client work.** This page uses
real site captures for Nina Lara Design and Sharrey Doré. They are shown
as more focused, art-directed crops of the existing 1200×750 WebP assets;
the underlying images and external site links are unchanged.

Chris Willburn has an original botanical-style editorial graphic grounded
in the site's "Inside Out" wording and its mental / emotional / physical
theme. It is explicitly presented as an *illustration*, not a website
screenshot or client testimonial. Do not replace it with an invented
interface, or claim results that aren't documented.

Preview the three cards at 320/375/768/1440px in both themes. Confirm
the site images remain legible, decorative borders do not crowd their
content, captions don't obscure images, the coaching graphic fits without
overflow, and all three external client site links still work.

## Homepage v0.2 — Production Bible alignment

The homepage deliberately makes two paths visible: **Studio / owned work** and
**Agency / client work**. Its creative direction is restrained and cinematic,
rather than a literal theater set. Keep the site's official wordmark and the
headline “Where ideas become real things”; favor real projects and accurate
claims over decorative manifesto copy.

The v0.2 pass improves mobile navigation, clarifies both paths in the hero,
and refines the studio/about language. It does not change any existing form
names, thank-you URLs, legal pages, or the separate GBP/Website Fixes offers.

Before proposing or publishing future homepage changes:

1. Run `python3 scripts/check_homepage.py` from the repository root.
2. Preview at **320, 375, 768, and 1440 CSS pixels**. Verify the header has no
   horizontal overflow, all navigation links are visible, and anchor headings
   aren't obscured by the sticky header.
3. Open Studio, Services, Client work, About, and Contact. Check the project
   links and local assets, including responsive images.
4. On a Netlify deploy preview, verify the inquiry form markup still appears.
   After a production deployment, submit a real test, check the Netlify
   notification, and confirm `/thank-you.html`. A local HTTP server cannot
   verify form submission.
5. Check keyboard navigation and reduced-motion behavior.

**Deployment note:** `netlify.toml` publishes the repository root. Check the
actual Netlify site's connected repository, branch, and deploy status before
concluding that the live domain is serving this commit. Do not equate a merge
with a verified public deployment.


## Launch values

`var LAUNCH` in `google-business-profile-home-services/index.html` is filled in. The video-audit form is the only public contact path. Do not publish a phone number or email address on the page.

| `LAUNCH` key | Current value | What visitors see |
| --- | --- | --- |
| `years` | `10+ years in web development and digital marketing` | That sentence. Do not raise the number. |
| `photo` | `/assets/kevin-love.jpg` | Original headshot, 800px wide. The about slot uses the cropped portrait `/assets/kevin-love-gbp.webp` (JPEG fallback `/assets/kevin-love-gbp.jpg`). Alt text: “Kevin Love, Backstage Interactive”. Website Fixes keeps `/assets/kevin-love.webp` and `/assets/kevin-love-portrait.jpg`. The home page keeps `/assets/kevin-love-home.webp`. |
| `video` | empty | No intro video. `#kevin-video` stays hidden, so there is no empty player. |
| `sampleReport` | `/assets/sample-gbp-report.png` | Screenshot of the fictional checklist. WebP twin: `/assets/sample-gbp-report.webp`. |

The sample is Summit Ridge Plumbing in the made-up town of Cedar Hollow. The report page is `/google-business-profile-home-services/sample-report.html` (`noindex`). The image and the page both say “SAMPLE / FICTIONAL EXAMPLE: not a real business or real results”. It is not a ranking claim, a revenue claim, or a testimonial.

Also edit by hand:

- **Spots left.** The number in `#spots-left` (founding-client section). Update it when someone books. Do not add a countdown. At 0, remove the founding prices and that offer.
- **Case study.** `#results` stays `hidden` until you have a real result: trade, town, what was fixed, a before-and-after rank grid, and calls or direction requests from Google’s insights, with the client’s permission. Do not invent stats or testimonials.
- **Intro video.** Leave `video` empty until a real file exists. Putting a URL in `LAUNCH.video` shows the player; an empty value keeps it hidden.

## Audit form (Netlify Forms)

The form name is `gbp-video-audit`. No API keys live in the repo.

Fields: `name`, `business`, `profile`, `reach` (`Email` or `Text`), `email` (the lead’s address, required in the browser only when Email is chosen), and `phone` (the lead’s own mobile number, required in the browser only when Text is chosen). Spam protection is a honeypot field, `bot-field` (`netlify-honeypot`), plus Netlify reCAPTCHA 2 (`data-netlify-recaptcha`). Do not add Kevin’s phone number or email address to the page.

After a successful submit, Netlify sends the visitor to `/google-business-profile-home-services/thank-you.html`.

1. Deploy the site to Netlify. Forms are detected from the HTML at publish time.
2. In the Netlify site, open **Forms** and confirm `gbp-video-audit` is listed after that deploy.
3. In **Site configuration → Forms → Form detection and spam**, turn on **reCAPTCHA 2**. The form already includes `data-netlify-recaptcha`. The checkbox is injected by Netlify and scales down on narrow screens. Until that toggle is on, the checkbox spot stays empty and submissions are not challenged.
4. Open the form, then **Form notifications**, and add an email notification. Keep that address in Netlify, not in git.
5. Submit one test from the live URL and confirm the reCAPTCHA checkbox, the notification, and the thank-you page.
6. Optional: turn on Netlify’s other form spam filtering in the dashboard. If you later add a webhook, keep any secret URL out of the repository.

If the site ever leaves Netlify, point the form `action` at your own endpoint, remove `data-netlify`, `netlify-honeypot`, and `data-netlify-recaptcha`, and keep the same field names.
