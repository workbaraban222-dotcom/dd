import Script from "next/script";
import "./globals.css";
import "./admin-extra.css";
import BodyClassSync from "@/components/BodyClassSync";

export const metadata = {
  title: "DOUBLE DAMAGE",
  description: "DOUBLE DAMAGE digital marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className="dd-boot" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: "html.dd-boot:not(.dd-ready) body{visibility:hidden!important}html{overflow-y:scroll;scrollbar-gutter:stable;overflow-x:hidden}",
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "try{document.documentElement.dataset.theme=localStorage.getItem('doubleDamageThemeV2')==='light'?'light':'dark'}catch(e){}",
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <BodyClassSync />
        {children}
        <Script src="/store.js?v=9" strategy="beforeInteractive" />
        <Script src="/script.js?v=46" strategy="afterInteractive" />
      </body>
    </html>
  );
}
