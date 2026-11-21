import { models } from "@/data/models";
import { en } from "@/i18n/en";
import { site } from "@/site.config";

// /llms.txt and /llms-full.txt: the site as plain Markdown for AI assistants and answer engines (llmstxt.org).
// Built from the same copy as the pages, so it never says something the site doesn't.

const t = en;
const url = site.url;
const name = site.name.en;

const list = (items: string[]) => items.map((x) => `- ${x}`).join("\n");

function overview(): string {
  return [
    `# ${name}`,
    "",
    `> ${t.footer.tagline}`,
    "",
    `${t.hero.title} ${t.hero.lead}`,
    "",
    "## Key facts",
    "",
    list([
      `Deployment: ${t.where.options.map((o) => `${o.name} (${o.sub.toLowerCase()})`).join(", or ")}. ${t.where.lead}`,
      `Delivery: ${t.pilot.plans.map((p) => `${p.length} for ${p.name.toLowerCase()}`).join(", ")}, at a fixed price.`,
      `Pilot: ${t.trial.items.map((i) => i.text).join(" ")}`,
      `Pricing: ${t.control.items[2]!.a.replace(/^Yes\.\s*/, "")}`,
      "Data: your documents, questions and answers stay on a server dedicated to you. Your data is never used to train models for anyone else; a fine-tuned model is trained only if you ask, on your own server, and belongs to you.",
      `Models: open-weight models, including ${models.slice(0, 6).map((m) => m.name).join(", ")} and more.`,
      "Languages: English and Arabic website; the assistant works in the languages your staff use.",
    ]),
    "",
    "## Pages",
    "",
    list([
      `[Home (English)](${url}/en): what ${name} is, what teams get, where it runs, models, delivery, pilot, FAQs and contact`,
      `[Home (Arabic)](${url}/ar): the same page in Arabic`,
      `[Privacy](${url}/en/privacy): what the contact form collects`,
      `[Full details for AI assistants](${url}/llms-full.txt): every section of the site as Markdown`,
    ]),
    "",
    "## Contact",
    "",
    list([`Book a demo, request a pilot or ask for a quote: ${url}/en#contact`, `Email: ${site.email}`]),
    "",
  ].join("\n");
}

function full(): string {
  const faq = t.faq.items.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");
  const plans = t.pilot.plans
    .map((p) => `### ${p.name} (${p.length})\n\n${p.steps.map((s) => `- **${s.when}, ${s.title}:** ${s.text}`).join("\n")}`)
    .join("\n\n");
  const table = [
    `| | ${t.where.options.map((o) => o.name).join(" | ")} |`,
    "|---|---|---|",
    ...t.where.rows.map((r) => `| ${r.label} | ${r.cells.map((c) => c.text).join(" | ")} |`),
    `| ${t.where.bestLabel} | ${t.where.best.join(" | ")} |`,
  ].join("\n");
  const modelLines = t.models.items.map((m) => {
    const f = models.find((x) => x.id === m.id);
    const facts = f ? [f.maker, f.size && `${f.size} parameters`, f.license && `${f.license} licence`].filter(Boolean).join(", ") : "";
    return `- **${f?.name ?? m.id}** (${facts}): ${m.use}`;
  });

  return [
    overview(),
    "## What teams get",
    "",
    t.hero.results.tabs.map((x) => `- **${x.tab}: ${x.title}.** ${x.text}`).join("\n"),
    "",
    t.get.items.map((x) => `- **${x.title}.** ${x.text}`).join("\n"),
    "",
    `## ${t.where.title}`,
    "",
    t.where.lead,
    "",
    table,
    "",
    `## ${t.control.title}`,
    "",
    t.control.items.map((x) => `- **${x.q}** ${x.a}`).join("\n"),
    "",
    `## ${t.pilot.title}`,
    "",
    t.pilot.lead,
    "",
    plans,
    "",
    `## ${t.trial.title}`,
    "",
    t.trial.lead,
    "",
    t.trial.items.map((x) => `- **${x.title}.** ${x.text}`).join("\n"),
    "",
    `## ${t.models.title}`,
    "",
    t.models.lead,
    "",
    ...modelLines,
    "",
    "## Frequently asked questions",
    "",
    faq,
    "",
  ].join("\n");
}

export const llmsTxt = overview;
export const llmsFullTxt = full;
