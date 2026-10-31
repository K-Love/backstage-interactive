# Backstage Interactive

Static site for [backstageinteractive.com](https://backstageinteractive.com/). [Netlify](netlify.toml) publishes the repository root. There is no build step.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Coming Soon. Leave this page as it is until the studio home page is ready. |
| `/google-business-profile-home-services` | GBP Fix-and-Protect landing page for home service pros. |
| `/website-fixes/` | Website improvement services (noindex). |
| `/tools/idea-validator/` | Internal preview tool. |

## Preview locally

From the repository root:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080/google-business-profile-home-services/](http://localhost:8080/google-business-profile-home-services/).

A local server will not store form submissions. Netlify does that after deploy.

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
