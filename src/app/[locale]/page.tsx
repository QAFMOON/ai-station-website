import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { CopyButton } from "@/components/CopyButton";
import { DeploymentPicker } from "@/components/DeploymentPicker";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroVisual } from "@/components/HeroVisual";
import { HowItWorks } from "@/components/HowItWorks";
import { ModelTabs } from "@/components/ModelTabs";
import { StageStepper } from "@/components/StageStepper";
import { getDictionary } from "@/i18n";
import { isLocale, site } from "@/site.config";

function exampleRequest(prompt: string) {
  const body = JSON.stringify({ model: "jais-2", messages: [{ role: "user", content: prompt }] }, null, 2);
  return `curl https://ai.your-company/v1/chat/completions \\
  -H "Authorization: Bearer $HIMA_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${body}'`;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const sample = exampleRequest(t.api.prompt);

  return (
    <>
      <Header t={t} locale={locale} />
      <main id="main">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="kicker">{t.hero.kicker}</p>
              <h1>{t.hero.title}</h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="actions">
                <a href="#contact" className="btn btn-primary">
                  {t.hero.primary}
                </a>
                <a href="#where" className="btn btn-ghost">
                  {t.hero.secondary}
                </a>
              </div>
              <ul className="stats">
                {t.hero.stats.map((s) => (
                  <li key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <HeroVisual t={t.suite} />
          </div>
        </section>

        <section id="why" className="section">
          <div className="wrap">
            <h2 className="h2 h2-wide">{t.why.title}</h2>
            <div className="reasons">
              {t.why.items.map((it, i) => (
                <article key={it.title} className="reason">
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                  {it.source && (
                    <p className="source">
                      {t.why.sourceLabel}:{" "}
                      <a href={it.source.href} target="_blank" rel="noopener noreferrer">
                        {it.source.label}
                      </a>
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="section section-alt">
          <div className="wrap">
            <div className="section-intro">
              <h2 className="h2">{t.how.title}</h2>
              <p className="section-lead">{t.how.lead}</p>
            </div>
            <HowItWorks t={t.how} />
          </div>
        </section>

        <section id="get" className="section">
          <div className="wrap">
            <div className="section-intro">
              <h2 className="h2">{t.suite.title}</h2>
              <p className="section-lead">{t.suite.lead}</p>
            </div>
            <ModelTabs t={t.suite} />
            <h3 className="facts-title">{t.get.title}</h3>
            <ul className="facts">
              {t.get.items.map((it) => (
                <li key={it.title}>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="stages" className="section section-alt">
          <div className="wrap">
            <div className="section-intro">
              <h2 className="h2">{t.stages.title}</h2>
              <p className="section-lead">{t.stages.lead}</p>
            </div>
            <StageStepper t={t.stages} />
          </div>
        </section>

        <section id="where" className="section">
          <div className="wrap">
            <div className="section-intro">
              <h2 className="h2">{t.where.title}</h2>
              <p className="section-lead">{t.where.lead}</p>
            </div>
            <div className="where">
              <DeploymentPicker t={t.picker} />
              <div className="modes">
                {t.where.rows.map((r) => (
                  <article key={r[0]} className="mode">
                    <div className="mode-top">
                      <h3>{r[0]}</h3>
                      <span className="badge">{r[3]}</span>
                    </div>
                    <dl>
                      <div>
                        <dt>{t.where.cols[1]}</dt>
                        <dd>{r[1]}</dd>
                      </div>
                      <div>
                        <dt>{t.where.cols[2]}</dt>
                        <dd>{r[2]}</dd>
                      </div>
                      <div>
                        <dt>{t.where.cols[4]}</dt>
                        <dd>{r[4]}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="api" className="section section-alt">
          <div className="wrap showcase">
            <div className="showcase-copy">
              <h2 className="h2">{t.api.title}</h2>
              <p className="section-lead">{t.api.lead}</p>
              <p className="note">{t.api.note}</p>
            </div>
            <figure className="terminal rise">
              <figcaption className="terminal-bar">
                <span dir="ltr">POST /v1/chat/completions</span>
                <CopyButton text={sample} label={t.api.copy} copied={t.api.copied} />
              </figcaption>
              <pre dir="ltr">
                <code>{sample}</code>
              </pre>
            </figure>
          </div>
        </section>

        <section id="pilot" className="section">
          <div className="wrap">
            <div className="section-head">
              <div>
                <h2 className="h2">{t.pilot.title}</h2>
                <p className="section-lead">{t.pilot.lead}</p>
              </div>
              <a href="#contact" className="btn btn-primary">
                {t.pilot.cta}
              </a>
            </div>
            <ol className="steps">
              {t.pilot.steps.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step-index">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="step-when">{s.when}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="compare" className="section section-alt">
          <div className="wrap">
            <h2 className="h2">{t.compare.title}</h2>
            <div className="cmp-cards">
              {t.compare.rows.map((r) => (
                <article key={r[0]} className="cmp-card">
                  <h3>{r[0]}</h3>
                  {r.slice(1).map((c, i) => (
                    <p key={t.compare.cols[i + 1]} className={i === 2 ? "cmp-us" : undefined}>
                      <span>{t.compare.cols[i + 1]}</span>
                      {c}
                    </p>
                  ))}
                </article>
              ))}
            </div>
            <div className="table-scroll" tabIndex={0} role="region" aria-label={t.compare.title}>
              <table className="table table-compare">
                <thead>
                  <tr>
                    {t.compare.cols.map((c, i) =>
                      i === 0 ? (
                        <td key="blank" />
                      ) : (
                        <th key={c} scope="col">
                          {c}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {t.compare.rows.map((r) => (
                    <tr key={r[0]}>
                      <th scope="row">{r[0]}</th>
                      {r.slice(1).map((c, i) => (
                        <td key={i}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note">{t.compare.note}</p>
          </div>
        </section>

        <section id="security" className="section">
          <div className="wrap">
            <div className="split">
              <div>
                <h2 className="h2">{t.security.title}</h2>
                <h3 className="models-title">{t.security.modelsTitle}</h3>
                <p className="section-lead">{t.security.modelsText}</p>
              </div>
              <ul className="checks">
                {t.security.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <ul className="model-list">
              {t.security.models.map((m) => (
                <li key={m.name} className="model">
                  <strong>{m.name}</strong>
                  <span>{m.from}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="section section-alt">
          <div className="wrap split">
            <h2 className="h2">{t.faq.title}</h2>
            <div className="faq">
              {t.faq.items.map((it) => (
                <details key={it.q}>
                  <summary>{it.q}</summary>
                  <p>{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="wrap split">
            <div>
              <h2 className="h2">{t.contact.title}</h2>
              <p className="section-lead">{t.contact.lead}</p>
              <p className="contact-mail">
                {t.contact.orEmail} <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <ContactForm t={t.contact} locale={locale} modes={t.where.rows.map((r) => r[0])} />
          </div>
        </section>
      </main>

      <Footer t={t} locale={locale} />
    </>
  );
}
