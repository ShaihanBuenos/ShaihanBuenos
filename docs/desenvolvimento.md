# Desenvolvimento do site

Este repo guarda duas coisas: o `README.md`, que é o perfil no GitHub, e o código do site pessoal, um projeto [Astro](https://astro.build) com TypeScript na raiz. O `README.md` não faz parte do site e só troca no dia do lançamento.

## O que precisa

- Node.js 22.23.4 ou mais novo.
- npm, que vem com o Node.

Instale as dependências uma vez:

```sh
npm install
```

## Rodar

```sh
npm run dev
```

O site abre em `http://localhost:4321` e recarrega a cada mudança.

## Conferir

```sh
npm run check   # tipos e erros nos arquivos .astro e .ts
npm test        # constrói o site e roda os testes
```

Os testes ficam em `tests/` e olham o site construído: sobem a pasta `dist/` num servidor local e pedem cada endereço, como um visitante faria. Eles conferem que cada endereço responde no idioma certo, que nenhuma página pode ser indexada e que o `README.md` não mudou.

## Construir

```sh
npm run build     # escreve o site em dist/
npm run preview   # serve a pasta dist/ em http://localhost:4321
```

A saída é só de arquivos estáticos.

## Onde fica cada coisa

| Caminho | O que guarda |
|---|---|
| `astro.config.ts` | A configuração do Astro: endereço do site, idiomas, formato da saída e o arquivo `_headers`. |
| `src/configuracao.ts` | A chave do lançamento (ver abaixo). |
| `src/idiomas.ts` | Os dois idiomas e o `lang` de cada um. |
| `src/feed.ts` | O feed de cada idioma, ainda sem textos. |
| `src/layouts/Pagina.astro` | O documento comum a todas as páginas. |
| `src/pages/` | As páginas em inglês, na raiz. |
| `src/pages/pt-br/` | As páginas em português. |
| `tests/` | Os testes do site construído. |

## Idiomas e endereços

O inglês fica na raiz e o português em `/pt-br`. Cada página fixa existe nos dois idiomas, com o endereço escrito no seu idioma: `/projects` e `/pt-br/projetos`. Os endereços não têm barra no fim.

Uma página nova precisa de um arquivo em `src/pages/` e outro em `src/pages/pt-br/`. O `lang` sai sozinho, pelo lugar do arquivo.

O "não encontrado" tem uma página por idioma: `404.html` na raiz e `pt-br/404.html`. Quem escolhe qual mostrar é a hospedagem. Na Cloudflare, isso pede a opção que procura o `404.html` mais próximo do endereço pedido (`not_found_handling = "404-page"`), que entra com a configuração da prévia, na issue #19. Rodando com `npm run dev`, a página em português já aparece para endereços sob `/pt-br`.

## Não indexar até o lançamento

Até o lançamento, nada do site pode ser indexado. A construção faz duas coisas:

- toda página sai com `<meta name="robots" content="noindex">`;
- a pasta `dist/` ganha um arquivo `_headers`, que a Cloudflare lê para mandar o cabeçalho `X-Robots-Tag: noindex` em todos os arquivos, inclusive nos feeds.

Quem manda nas duas é uma chave só, em `src/configuracao.ts`:

```ts
export const PODE_SER_INDEXADO = false;
```

No dia do lançamento, troque para `true`. Os dois testes de não indexar passam a falhar e saem junto.
