import React from "react";
import Link from "next/link";
import Contactusform from "./Contactus";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "#home-section", current: false },
  { name: "About us", href: "#about-section", current: false },
  { name: "Rooms", href: "#rooms-section", current: false },
  { name: "Restaurant", href: "#cook-section", current: false },
  { name: "Gallery", href: "#gallery-section", current: false },
  { name: "Events", href: "#events-section", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Data = () => {
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-purple"
                    : "text-black hover:bg-gray-700 hover:text-purple",
                  "block  py-2 rounded-md text-base font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4"></div>
            <div className="flex items-center gap-2">
              <Link
                href="https://wa.me/+94777401667?text=Hi%20Eric!%20I'm%20interested%20in%20booking%20a%20room%20for%20[NUMBER_OF_NIGHTS]%20nights%20for%20[NUMBER_OF_PEOPLE]%20people.%20I'm%20also%20interested%20in%20learning%20more%20about%20your%20rates%20and%20availability."
                target="_blank"
              >
                <button className="w-8 h-8 rounded-full bg-green-500 flex justify-center items-center hover:scale-110 transition-transform duration-150">
                  <img
                    src="/images/Navbar/whatsapp.png"
                    alt="whatsapp-image"
                    width={48}
                    height={48}
                  />
                </button>
              </Link>

              <Link
                href="mailto:surfinglifeguest@gmail.com?subject=Booking%20Inquiry&body=Dear%20Eric,%20I%20am%20writing%20to%20inquire%20about%20booking%20your%20Surfinglife%20Guest%20House%20for%20[date(s)%20and%20number%20of%20guests)].%20I%20am%20very%20interested%20in%20staying%20with%20you,%20and%20I%20would%20be%20grateful%20if%20you%20could%20provide%20me%20with%20more%20information%20on%20your%20availability,%20pricing,%20and%20booking%20process.%20Thank%20you."
                target="_blank"
              >
                <button className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center hover:scale-110 transition-transform duration-150">
                  <img
                    src="/images/Navbar/email_1.png"
                    alt="email-image"
                    width={48}
                    height={48}
                  />
                </button>
              </Link>
            </div>

            {/* <Contactusform /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
