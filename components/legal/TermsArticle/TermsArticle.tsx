import { CONTACT_EMAIL, TERMS_CONTENT } from "@/lib/i18n/termsContent";
import type { Lang } from "@/lib/i18n/translations";
import styles from "./TermsArticle.module.scss";

export default function TermsArticle({ lang }: { lang: Lang }) {
  const copy = TERMS_CONTENT[lang];

  return (
    <main className={`${styles.page} TermsPage`}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{copy.title}</h1>

        {copy.sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <section className={styles.section}>
          <h2>{copy.contactHeading}</h2>
          <p>
            {copy.contactBody}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.link}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <p className={styles.updated}>{copy.lastUpdated}</p>
      </div>
    </main>
  );
}
