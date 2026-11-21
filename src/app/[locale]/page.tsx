import { notFound } from 'next/navigation';
import { CellCards, type CellIcon } from '@/components/CellCards';
import { ContactForm } from '@/components/ContactForm';
import { WayCompare } from '@/components/WayCompare';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ModelOrbit } from '@/components/ModelOrbit';
import { PilotGantt } from '@/components/PilotGantt';
import { Hero } from '@/components/Hero';
import { Reveal } from '@/components/Reveal';
import { getDictionary } from '@/i18n';
import { isLocale, site } from '@/site.config';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <>
      <Header t={t} locale={locale} />
      <main id='main'>
        <Hero t={t} locale={locale} video={site.heroVideo} />


        <section id='benefits' className='section'>
          <div className='wrap'>
            <Reveal className='section-intro'>
              <h2 className='h2'>{t.get.title}</h2>
            </Reveal>
            <Reveal>
              <CellCards
                cols={3}
                items={t.get.items.map((it, i) => ({
                  icon: (['docs', 'lang', 'log', 'api', 'limits', 'open'] as CellIcon[])[i] ?? 'docs',
                  title: it.title,
                  text: it.text,
                }))}
              />
            </Reveal>
          </div>
        </section>

        <section id='where' className='section'>
          <div className='wrap'>
            <Reveal className='section-intro'>
              <h2 className='h2'>{t.where.title}</h2>
              <p className='section-lead'>{t.where.lead}</p>
            </Reveal>
            <Reveal>
              <WayCompare t={t.where} />
            </Reveal>
          </div>
        </section>

        <section id='why' className='section'>
          <div className='wrap'>
            <Reveal className='section-intro'>
              <h2 className='h2 h2-wide'>{t.control.title}</h2>
            </Reveal>
            <Reveal>
              <CellCards
                cols={2}
                items={t.control.items.map((it, i) => ({
                  icon: (['pin', 'shield', 'price', 'exit'] as CellIcon[])[i] ?? 'pin',
                  title: it.q,
                  text: it.a,
                }))}
              />
            </Reveal>
          </div>
        </section>

        <section id='models' className='section section-models'>
          <div className='wrap'>
            <Reveal>
              <ModelOrbit t={t.models} />
            </Reveal>
          </div>
        </section>
        <section id='pilot' className='section'>
          <div className='wrap'>
            <Reveal className='section-head'>
              <div>
                <h2 className='h2'>{t.pilot.title}</h2>
                <p className='section-lead'>{t.pilot.lead}</p>
              </div>
              <a href={`/${locale}#contact`} className='btn'>
                {t.pilot.cta}
              </a>
            </Reveal>
            <Reveal>
              <PilotGantt t={t.pilot} />
            </Reveal>
          </div>
        </section>

        <section id='faq' className='section'>
          <div className='wrap split'>
            <Reveal>
              <h2 className='h2'>{t.faq.title}</h2>
            </Reveal>
            <Reveal className='faq' delay={0.1}>
              {t.faq.items.map((it) => (
                <details key={it.q}>
                  <summary>{it.q}</summary>
                  <p>{it.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section id='contact' className='section'>
          <div className='wrap split'>
            <Reveal>
              <h2 className='h2'>{t.contact.title}</h2>
              <p className='section-lead'>{t.contact.lead}</p>
              <p className='contact-mail'>
                {t.contact.orEmail} <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm t={t.contact} locale={locale} modes={t.where.options.map((o) => o.name)} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer t={t} locale={locale} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
