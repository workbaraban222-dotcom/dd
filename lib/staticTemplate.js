import { readFileSync } from "node:fs";
import path from "node:path";

const pageMap = {
  index: "/",
  shop: "/shop",
  product: "/product",
  article: "/article",
  events: "/events",
  guides: "/guides",
  partners: "/partners",
  replace: "/replace",
  admin: "/admin",
};

export function readStaticTemplate(name) {
  const file = path.join(process.cwd(), "templates", `${name}.php`);
  const raw = readFileSync(file, "utf8");
  const bodyMatch = raw.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  const attrs = bodyMatch?.[1] || "";
  let html = bodyMatch?.[2] || raw;
  const classMatch = attrs.match(/class=["']([^"']+)["']/i);

  html = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi, "");

  for (const [page, route] of Object.entries(pageMap)) {
    html = html
      .replaceAll(`${page}.php#`, `${route === "/" ? "" : route}#`)
      .replaceAll(`${page}.html#`, `${route === "/" ? "" : route}#`)
      .replaceAll(`${page}.php?`, `${route}?`)
      .replaceAll(`${page}.html?`, `${route}?`)
      .replaceAll(`${page}.php`, route)
      .replaceAll(`${page}.html`, route);
  }

  html = html.replaceAll('href="#contact"', 'href="/#contact"');

  return {
    className: classMatch?.[1] || "",
    html,
  };
}
