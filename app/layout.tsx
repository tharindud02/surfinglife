import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/Footer";
import WhatsappIcon from "./components/WhatsappIcon/whatsappIcon";

export const metadata = {
  title: "Surfing Life Guest House & Restaurant",
  description:
    "Best Restaurant with Varied Food Options and Comfortable Budget Rooms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <WhatsappIcon />
        <Footer />
      </body>
    </html>
  );
}
