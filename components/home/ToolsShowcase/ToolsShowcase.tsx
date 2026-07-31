import type { Lang } from "@/lib/i18n/translations";
import ToolCard, { type ToolVariant } from "@/components/home/ToolCard/ToolCard";
import styles from "./ToolsShowcase.module.scss";

const tools: Array<{path:string;variant:ToolVariant;number:string;sample:string;label:Record<Lang,string>;description:Record<Lang,string>}> = [
  {path:"/images",variant:"image",number:"01",sample:"1200 × 630",label:{en:"DUMMY IMAGE",es:"IMAGEN DUMMY"},description:{en:"Build perfectly sized placeholder images from a URL.",es:"Creá imágenes placeholder del tamaño exacto desde una URL."}},
  {path:"/text",variant:"text",number:"02",sample:"128 WORDS",label:{en:"DUMMY TEXT",es:"TEXTO DUMMY"},description:{en:"Shape realistic lorem ipsum by words or characters.",es:"Generá lorem ipsum realista por palabras o caracteres."}},
  {path:"/iframe",variant:"iframe",number:"03",sample:"< / EMBED >",label:{en:"DUMMY IFRAME",es:"IFRAME DUMMY"},description:{en:"Drop complete dummy articles, galleries and cards into any embed.",es:"Insertá artículos, galerías y cards dummy completos en cualquier embed."}},
];

export default function ToolsShowcase({lang,heading,resolveHref}:{lang:Lang;heading:string;resolveHref:(path:string)=>string}) {
  return <section id="tools" className={styles["tools-showcase"]} aria-labelledby="tools-title">
    <header className={styles["tools-showcase__header"]}><p className={styles["tools-showcase__eyebrow"]}>01 — {lang === "es" ? "HERRAMIENTAS" : "TOOLS"}</p><h2 id="tools-title" className={styles["tools-showcase__title"]}>{heading}</h2></header>
    <div className={styles["tools-showcase__list"]}>{tools.map(tool=><ToolCard key={tool.path} href={resolveHref(tool.path)} number={tool.number} sample={tool.sample} label={tool.label[lang]} description={tool.description[lang]} action={lang === "es" ? "Abrir herramienta" : "Launch tool"} variant={tool.variant}/>)}</div>
  </section>;
}
