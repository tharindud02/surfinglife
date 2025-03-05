import React from "react";
import Link from "next/link";
import Contactusform from "./Contactus";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

const Drawerdata = () => {
  return (
    <>
      <div className="mt-5 px-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-pink"
          >
            {item.name}
          </Link>
        ))}
        <button
          onClick={() => {
            // This will be handled by the parent component
            window.location.href = "#rooms-section";
          }}
          className="w-full mt-4 rounded-full bg-pink text-white py-3 px-6 text-base font-medium hover:bg-pink/90"
        >
          Book Now
        </button>
      </div>
    </>
  );
};

export default Drawerdata;
