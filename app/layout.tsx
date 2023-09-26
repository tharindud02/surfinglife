import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/Footer";
import WhatsappIcon from "./components/WhatsappIcon/whatsappIcon";

export const metadata = {
  title: "Surfing Life Guest House & Restaurant",
  description:
    "Looking for the perfect place to stay in Weligama, Sri Lanka? Surfing Life is a guest house and restaurant located close to Coconut Beach, with easy access to some of the best surfing spots in the world. We offer comfortable accommodations, a delicious restaurant, and a friendly staff that is always happy to help. Book your stay today and experience the best that Weligama has to offer!",
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
