import type { APIContext } from "astro";
import { type Idioma, LANG } from "./idiomas.ts";

const DESCRICAO: Record<Idioma, string> = {
  en: "Writing by Shaihan Buenos",
  "pt-br": "Textos de Shaihan Buenos",
};

const INICIO: Record<Idioma, string> = {
  en: "/",
  "pt-br": "/pt-br",
};

// O feed de um idioma, ainda sem textos: só guarda o endereço. Os itens
// entram com a descoberta (issue #29).
export function feedVazio(idioma: Idioma, { site }: APIContext): Response {
  if (!site) throw new Error("Falta `site` em astro.config.ts.");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Shaihan Buenos</title>
    <link>${new URL(INICIO[idioma], site).href}</link>
    <description>${DESCRICAO[idioma]}</description>
    <language>${LANG[idioma]}</language>
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
