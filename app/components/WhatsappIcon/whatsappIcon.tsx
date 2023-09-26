import Link from "next/link";
import React from "react";

export default function WhatsappIcon() {
  return (
    <div>
      <div className="block lg:hidden fixed bottom-2 right-0 z-50">
        <Link
          href="https://wa.me/+94777401667?text=Hi%20Eric!%20I'm%20interested%20in%20booking%20a%20room%20for%20[NUMBER_OF_NIGHTS]%20nights%20for%20[NUMBER_OF_PEOPLE]%20people.%20I'm%20also%20interested%20in%20learning%20more%20about%20your%20rates%20and%20availability."
          target="_blank"
        >
          <button className="w-24 h-24 rounded-full bg-green-500 flex justify-center items-center hover:scale-110 transition-transform duration-150">
            <img
              src="/images/Navbar/whatsapp.png"
              alt="whatsapp-image"
              width={64}
              height={64}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
