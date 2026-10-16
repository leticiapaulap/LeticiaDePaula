const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leticia-paula-portfolio.usoiabensafins.chatgpt.site";
const parsedUrl = new URL(configuredUrl);

if (!["https:", "http:"].includes(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password || parsedUrl.pathname !== "/" || parsedUrl.search || parsedUrl.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL deve ser a origem pública, sem credenciais, caminho, query ou fragmento.");
}

export const siteUrl = parsedUrl.origin;
