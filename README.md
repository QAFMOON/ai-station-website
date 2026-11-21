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
| `NEXT_PUBLIC_SITE_URL` | Your real address, e.g. `https://www.aistationx.com`. Used for canonical links, hreflang, sitemap and share images. |
| `CONTACT_WEBHOOK_URL` | Where demo requests are sent as JSON (Slack webhook, Zapier, n8n, your CRM). Without it, requests are only written to the server log. |
| `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_ID` | Adds each demo, pilot or quote request as a row in an Airtable table. The token needs the `data.records:write` scope. The table needs the text columns Name, Email, Company, Inquiry type, Message, Language and Received at (names can be changed at the top of `src/app/api/contact/route.ts`). Set these server-side only, never with a `NEXT_PUBLIC_` prefix. |

## Before you publish

1. **Name.** "AI Station" is a working name. Check the trademark and domain, then change it in `src/site.config.ts`. Regenerate the share images and app icons with `npm run og`.
2. **Contact details.** Replace `hello@example.com` and the LinkedIn URL in `src/site.config.ts`.
3. **Legal entity.** Add the registered company name and licence number to `footer.legal` in `src/i18n/en.ts` and `ar.ts`, and review the privacy page with a lawyer.
4. **Arabic review.** Have a native Arabic speaker read `src/i18n/ar.ts`.
5. **Claims.** The copy describes the service after the four proofs in the technical guide pass. Remove anything you have not yet demonstrated. Do not add customer logos, testimonials or certifications you do not have.
6. **Sources.** The one statistic on the site (57%, in the FAQ) names its source: TELUS Digital, January 2025. The full research is in `docs/copy-research.md`.

## Search engines and AI assistants

What the site already does:

- **Every word is in the HTML**, including inactive tabs and the delivery plan not on screen, so crawlers that don't run JavaScript (most AI crawlers) read everything.
- **`/llms.txt` and `/llms-full.txt`**: the site as Markdown for AI assistants, built from the same copy files, so they never drift from the pages.
- **Structured data**: Organization, WebSite, WebPage, Service and FAQPage, built from the copy. No prices, ratings or reviews, because there are none to show.
- **`robots.txt`** lets everyone in, and names the AI search and training crawlers explicitly so the choice is easy to change per crawler (`src/app/robots.ts`).
- **Sitemap with language alternates**, canonical links, hreflang (English is `x-default`), a permanent `/` → `/en` redirect, and a real 404 page in both languages.
- **Share images and app icons** come from `npm run og`. Run it after changing the hero title or lead. It needs Chrome, Brave or Chromium installed.

At launch (only you can do these):

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy. Every canonical link, sitemap entry and `llms.txt` link uses it.
2. Add the site to [Google Search Console](https://search.google.com/search-console) and submit `/sitemap.xml`.
3. Add it to [Bing Webmaster Tools](https://www.bing.com/webmasters) and submit the sitemap. ChatGPT search and Copilot draw on Bing's index.
4. Check the home page in Google's [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema.org validator](https://validator.schema.org/).
5. Share the URL once in LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) to refresh its cached preview.
6. Make sure the LinkedIn page in `src/site.config.ts` exists. It is listed as an official profile in the structured data.

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
