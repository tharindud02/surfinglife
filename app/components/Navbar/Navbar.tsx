import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signindialog from "./Signindialog";
import Image from "next/image";
import Whatsapp from "./Whatsapp";
import { Tooltip as ReactTooltip } from "react-tooltip";

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

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl p-3 md:p-6 lg:px-8">
          <div className="relative flex h-12 sm:h-20 items-center">
            <div className="flex flex-1 items-center sm:justify-between">
              {/* LOGO */}

              <div className="flex sm:hidden flex-shrink-0 items-center border-right">
                <Image
                  src="/images/Logo/logo.png"
                  alt="logo"
                  width={50}
                  height={50}
                />
                <Link
                  href="/"
                  className="text-xl font-semibold text-black ml-4 pt-5"
                >
                  Surfing Life
                  <br />
                  <p className="text-sm font-semibold mb-5 text-lightgrey">
                    Guest House & Restaurant
                  </p>
                </Link>
              </div>
              <div className="hidden sm:flex flex-shrink-0 items-center border-right">
                <Image
                  src="/images/Logo/logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
                <Link
                  href="/"
                  className="text-2xl font-semibold text-black ml-4 pt-5"
                >
                  Surfing Life
                  <br />
                  <p className="text-lg font-semibold mb-5 text-grey">
                    Guest House & Restaurant
                  </p>
                </Link>
              </div>

              {/* LINKS */}

              <div className="hidden lg:flex items-center border-right ">
                <div className="flex justify-end space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-black"
                          : "navlinks hover:opacity-100",
                        "px-3 py-4 rounded-md text-lg font-normal opacity-50 hover:text-black space-links"
                      )}
                      aria-current={item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="gap-6 hidden lg:flex">
                <div className="flex items-center gap-2">
                  <Link
                    href="https://wa.me/+94777401667?text=Hi%20Eric!%20I'm%20interested%20in%20booking%20a%20room%20for%20[NUMBER_OF_NIGHTS]%20nights%20for%20[NUMBER_OF_PEOPLE]%20people.%20I'm%20also%20interested%20in%20learning%20more%20about%20your%20rates%20and%20availability."
                    target="_blank"
                  >
                    <button
                      data-tooltip-id="whatsapp"
                      className="w-12 h-12 rounded-full bg-green-500 flex justify-center items-center hover:scale-110 transition-transform duration-150"
                    >
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
                    <button
                      data-tooltip-id="email"
                      className="w-12 h-12 rounded-full bg-blue-500 flex justify-center items-center hover:scale-110 transition-transform duration-150"
                    >
                      <Image
                        src="/images/Navbar/email_1.png"
                        alt="email-image"
                        width={48}
                        height={48}
                      />
                    </button>
                  </Link>

                  <ReactTooltip
                    id="whatsapp"
                    place="bottom"
                    content="Call Us"
                  />
                  <ReactTooltip id="email" place="bottom" content="Email Us" />
                </div>

                {/* <button className='flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-black'>Sign in</button> */}
                {/* <Signindialog /> */}
                {/* <Whatsapp /> */}
              </div>
            </div>

            {/* DRAWER FOR MOBILE VIEW */}

            {/* DRAWER ICON */}

            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            {/* DRAWER LINKS DATA */}

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
