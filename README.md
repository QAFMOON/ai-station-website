# AI Station website

Marketing site in Arabic (default) and English. Next.js 15 App Router, no CSS framework, no tracking.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 redirects to /ar
npm run build && npm start
```

Needs Node 18.18 or later.

## Deploy

Any host that runs Next.js works (Vercel, a Node server, or Docker). Set these environment variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your real address, e.g. `https://aistation.ae`. Used for canonical links, hreflang, sitemap and share images. |
| `CONTACT_WEBHOOK_URL` | Where demo requests are sent as JSON (Slack webhook, Zapier, n8n, your CRM). Without it, requests are only written to the server log. |

## Before you publish

1. **Name.** "AI Station" is a working name. Check the trademark and domain, then change it in `src/site.config.ts`. Regenerate images with `python3 ../brand/make-assets.py`.
2. **Contact details.** Replace `hello@example.com` and the LinkedIn URL in `src/site.config.ts`.
3. **Legal entity.** Add the registered company name and licence number to `footer.legal` in `src/i18n/en.ts` and `ar.ts`, and review the privacy page with a lawyer.
4. **Arabic review.** Have a native Gulf Arabic speaker read `src/i18n/ar.ts`.
5. **Claims.** The copy describes the service after the four proofs in the technical guide pass. Remove anything you have not yet demonstrated. Do not add customer logos, testimonials or certifications you do not have.
6. **Sources.** The two cited statistics link to their sources. Re-check the links.

## Where things are

| Path | What |
|---|---|
| `src/site.config.ts` | Name, URL, email, languages |
| `src/i18n/en.ts`, `ar.ts` | All copy. `en.ts` defines the shape; `ar.ts` must match it or the build fails. |
| `src/app/[locale]/page.tsx` | Home page sections |
| `src/app/[locale]/privacy/page.tsx` | Privacy page |
| `src/components/DeploymentPicker.tsx` | The "choose where the AI runs" control in the hero |
| `src/components/ContactForm.tsx`, `src/app/api/contact/route.ts` | Demo request form |
| `src/app/globals.css` | All styles and design tokens |
| `src/middleware.ts` | Sends `/` and any path without a language to `/ar` |
| `public/og-ar.png`, `og-en.png` | Share images |

Right-to-left layout uses the `dir` attribute and CSS logical properties, so one stylesheet serves both languages.
