import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/Footer";
import WhatsappIcon from "./components/WhatsappIcon/whatsappIcon";
import { Analytics } from "@vercel/analytics/react"

// export const metadata = {
//   title: "Surfing Life Guest House & Restaurant",
//   description:
//     "Looking for the perfect place to stay in Weligama, Sri Lanka? Surfing Life is a guest house and restaurant located close to Coconut Beach, with easy access to some of the best surfing spots in the world. We offer comfortable accommodations, a delicious restaurant, and a friendly staff that is always happy to help. Book your stay today and experience the best that Weligama has to offer!",
// };
export const metadata = {
  title: "Stay at Surfing Life Guest House & Restaurant - Weligama, Sri Lanka",
  description: "Discover the ideal getaway at Surfing Life Guest House & Restaurant in Weligama, Sri Lanka. Nestled near the pristine Coconut Beach, our guest house is your gateway to premier surfing spots. Enjoy our cozy accommodations, savor gourmet meals at our on-site restaurant, and experience unparalleled service. Book your unforgettable stay at Surfing Life and immerse yourself in the surfing capital of Sri Lanka."
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <body>
        <Navbar />
        {children}
        <WhatsappIcon />
        <Footer />
      </body>
    </html>
  );
}
