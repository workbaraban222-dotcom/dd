import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DOUBLE DAMAGE",
  description: "Digital marketplace for traffic teams",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
