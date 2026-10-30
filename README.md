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

## Placeholders to fill in

Search `google-business-profile-home-services/index.html` for `PLACEHOLDER` and for `var LAUNCH`. Empty strings leave the orange placeholder chips on the page. Put files you own in `/assets` and point at them with a root-relative path.

The video-audit form is the only public contact path. Do not publish a phone number or email address on the page.

| `LAUNCH` key | Example | What visitors see |
| --- | --- | --- |
| `years` | `12` | “12 years in web and SEO”. Digits only. |
| `photo` | `/assets/kevin-love.jpg` | Headshot. Replaces `[PHOTO: Kevin headshot]`. |
| `video` | `/assets/kevin-intro.mp4` | Plays on the page. An `https://` link becomes “Watch the 60-second intro”. |
| `sampleReport` | `/assets/sample-gbp-report.png` | Screenshot labeled “Sample report”. Use a demo profile or Backstage Interactive’s own Google profile. |

Also edit by hand:

- **Spots left.** The number in `#spots-left` (founding-client section). Update it when someone books. Do not add a countdown. At 0, remove the founding prices and that offer.
- **Case study.** `#results` stays `hidden` until you have a real result: trade, town, what was fixed, a before-and-after rank grid, and calls or direction requests from Google’s insights, with the client’s permission. Do not invent stats or testimonials.

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
