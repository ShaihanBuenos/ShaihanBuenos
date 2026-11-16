import { defineConfig } from "astro/config";
import { IDIOMA_PADRAO, IDIOMAS } from "./src/idiomas.ts";

export default defineConfig({
  site: "https://shaihanbuenos.dev",
  output: "static",
  // Os endereços da spec não têm barra no fim: /projects, /pt-br/projetos.
  trailingSlash: "never",
  build: { format: "file" },
  i18n: {
    locales: [...IDIOMAS],
    defaultLocale: IDIOMA_PADRAO,
    routing: { prefixDefaultLocale: false },
  },
});
