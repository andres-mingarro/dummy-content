import { HOME_CONTENT } from "@/lib/i18n/homeContent";
import type { Lang } from "@/lib/i18n/translations";
import styles from "./HomeArticle.module.scss";

/**
 * Cuerpo editorial de la home. Es un server component a propósito: el copy es largo y no tiene
 * interactividad, así que no debe viajar en el bundle de cliente.
 *
 * El FAQ se renderiza visible y, a partir de la misma fuente, se emite el JSON-LD `FAQPage`.
 * Google ignora el structured data de FAQ que no se corresponde con contenido del DOM.
 */
export default function HomeArticle({ lang }: { lang: Lang }) {
  const copy = HOME_CONTENT[lang];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: copy.faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <article className={`${styles.article} HomeArticle`}>
      {copy.sections.map((section) => (
        <section key={section.id} id={section.id} className={styles.section}>
          <h2>{section.heading}</h2>
          {section.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {section.subsections?.map((sub) => (
            <div key={sub.heading} className={styles.subsection}>
              <h3>{sub.heading}</h3>
              {sub.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ))}

          {section.code?.map((sample) => (
            <div key={sample.snippet} className={styles.sample}>
              <p className={styles.caption}>{sample.caption}</p>
              <pre className={styles.code}>
                <code>{sample.snippet}</code>
              </pre>
            </div>
          ))}
        </section>
      ))}

      <section id="faq" className={styles.section}>
        <h2>{copy.faqHeading}</h2>
        <dl className={styles.faq}>
          {copy.faq.map(({ question, answer }) => (
            <div key={question} className={styles.faqItem}>
              <dt>{question}</dt>
              <dd>{answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </article>
  );
}
