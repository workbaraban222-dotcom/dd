import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DOUBLE DAMAGE",
  description: "Расходники для арбитража и digital-команд",
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
