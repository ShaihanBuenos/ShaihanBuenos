// Os dois idiomas do site. O valor é o prefixo do endereço: inglês fica na
// raiz e português em /pt-br.
export const IDIOMAS = ["en", "pt-br"] as const;

export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_PADRAO: Idioma = "en";

// O valor do atributo `lang` de cada idioma.
export const LANG: Record<Idioma, string> = {
  en: "en",
  "pt-br": "pt-BR",
};

export function idiomaDe(locale: string | undefined): Idioma {
  const idioma = IDIOMAS.find((i) => i === locale);
  if (!idioma) throw new Error(`Idioma desconhecido: ${locale}`);
  return idioma;
}
