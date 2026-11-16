import type { APIRoute } from "astro";
import { feedVazio } from "../../feed.ts";

export const GET: APIRoute = (contexto) => feedVazio("pt-br", contexto);
