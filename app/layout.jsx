import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DOUBLE DAMAGE",
  description: "\u0420\u0430\u0441\u0445\u043e\u0434\u043d\u0438\u043a\u0438 \u0434\u043b\u044f \u0430\u0440\u0431\u0438\u0442\u0440\u0430\u0436\u0430 \u0438 digital-\u043a\u043e\u043c\u0430\u043d\u0434",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{document.documentElement.dataset.theme=localStorage.getItem('doubleDamageThemeV2')==='light'?'light':'dark'}catch(e){}",
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
