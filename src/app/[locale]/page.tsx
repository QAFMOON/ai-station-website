import { notFound } from "next/navigation";
import { Assistants } from "@/components/Assistants";
import { ContactForm } from "@/components/ContactForm";
import { CtaBand, Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModelOrbit } from "@/components/ModelOrbit";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Scenes } from "@/components/Scenes";
import { StatementScene } from "@/components/StatementScene";
import { getDictionary } from "@/i18n";
import { isLocale, site } from "@/site.config";

function exampleRequest(prompt: string) {
  const body = JSON.stringify({ model: "jais-2", messages: [{ role: "user", content: prompt }] }, null, 2);
  return `curl https://ai.your-company/v1/chat/completions \\
  -H "Authorization: Bearer $AI_STATION_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${body}'`;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const sample = exampleRequest(t.api.prompt);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };

  return (
    <>
      <Header t={t} locale={locale} />
      <main id="main">
        <Hero t={t} locale={locale} video={site.heroVideo} />

        {/* Statement section (scroll-lit text + turning star): hidden for now. To bring it back, uncomment.
        <section className="section section-statement">
          <div className="wrap">
            <StatementScene segments={t.statement} />
          </div>
        </section>
        */}

        <section id="how" className="section section-scenes">
          <div className="wrap">
            <h2 className="h2">{t.how.title}</h2>
            <Scenes items={t.how.items} />
          </div>
        </section>

        <section id="where" className="section">
          <div className="wrap">
            <Reveal className="section-intro">
              <h2 className="h2">{t.where.title}</h2>
              <p className="section-lead">{t.where.lead}</p>
            </Reveal>
            <Reveal>
              <div className="dash-frame">
                <div className="table-scroll table-bare" tabIndex={0} role="region" aria-label={t.where.title}>
                  <table className="table table-plain table-dashed">
                    <thead>
                      <tr>
                        <td />
                        {t.where.rows.map((r) => (
                          <th key={r[0]} scope="col">
                            {r[0]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((col) => (
                        <tr key={col}>
                          <th scope="row">{t.where.cols[col]}</th>
                          {t.where.rows.map((r) => (
                            <td key={r[0]}>{r[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="why" className="section">
          <div className="wrap">
            <Reveal className="section-intro">
              <h2 className="h2 h2-wide">{t.control.title}</h2>
            </Reveal>
            <Reveal>
              <ol className="ctrl">
                {t.control.items.map((it, i) => (
                  <li key={it.q}>
                    <span className="idx">Q0{i + 1}</span>
                    <h3>{it.q}</h3>
                    <p>{it.a}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section id="get" className="section">
          <div className="wrap">
            <Reveal>
              <Assistants t={t.suite} sample={sample} copy={t.api.copy} copied={t.api.copied} />
            </Reveal>
          </div>
        </section>

        <section id="models" className="section section-models">
          <div className="wrap">
            <Reveal>
              <ModelOrbit t={t.models} />
            </Reveal>
          </div>
        </section>

        <section id="compare" className="section">
          <div className="wrap">
            <Reveal className="section-intro">
              <h2 className="h2">{t.compare.title}</h2>
            </Reveal>
            <Reveal>
              <div className="table-scroll" tabIndex={0} role="region" aria-label={t.compare.title}>
                <table className="table">
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
            </Reveal>
            <p className="note">{t.compare.note}</p>
          </div>
        </section>

        <section id="pilot" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <div>
                <h2 className="h2">{t.pilot.title}</h2>
                <p className="section-lead">{t.pilot.lead}</p>
              </div>
              <a href={`/${locale}#contact`} className="btn">
                {t.pilot.cta}
              </a>
            </Reveal>
            <Reveal>
              <ol className="steps">
                {t.pilot.steps.map((s) => (
                  <li key={s.title} className="step">
                    <span className="step-when">{s.when}</span>
                    <h3>{s.title}</h3>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="wrap split">
            <Reveal>
              <h2 className="h2">{t.faq.title}</h2>
            </Reveal>
            <Reveal className="faq" delay={0.1}>
              {t.faq.items.map((it) => (
                <details key={it.q}>
                  <summary>{it.q}</summary>
                  <p>{it.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="wrap split">
            <Reveal>
              <h2 className="h2">{t.contact.title}</h2>
              <p className="section-lead">{t.contact.lead}</p>
              <p className="contact-mail">
                {t.contact.orEmail} <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm t={t.contact} locale={locale} modes={t.where.rows.map((r) => r[0])} />
            </Reveal>
          </div>
        </section>

        {/* Security section ("Built for your IT and risk teams"): hidden for now. To bring it back, uncomment.
        <section id="security" className="section">
          <div className="wrap split">
            <Reveal>
              <h2 className="h2">{t.security.title}</h2>
              <ul className="chips chips-lg">
                {t.security.models.map((m) => (
                  <li key={m.name} className="chip">
                    {m.name}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="checks">
                {t.security.items.slice(0, 4).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
        */}

        <CtaBand t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
