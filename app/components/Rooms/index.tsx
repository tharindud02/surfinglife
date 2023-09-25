"use client";
import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

const Rooms = () => {
  return (
    <div className="relative pt-16" id="rooms-section">
      <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 mt-20 md:pt-24">
        <div className="text-center">
          <Fade
            direction={"up"}
            delay={400}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <h2 className="text-pink text-lg font-normal mb-3 tracking-widest uppercase ls-51">
              Our Rooms
            </h2>
          </Fade>
          <Fade
            direction={"up"}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <h3 className="text-3xl lg:text-5xl font-semibold text-black">
              Comfortable Rooms for Every Traveler
            </h3>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 my-16 sm:space-x-6 space-y-6 md:space-y-0 px-6">
          <div className="col-span-4 flex justify-center overflow-hidden rounded-3xl">
            <div className="image-container">
              <Image
                src="/images/Rooms/budget1.jpg"
                alt="Budget Bliss"
                width={1000}
                height={805}
                className="inner-img"
              />
              <div className="image-overlay"></div>
              <div className="image-text text-white text-center">
                <p className="text-2xl lg:text-4xl font-bold ">Budget Bliss</p>
                <p className="text-sm lg:text-normal font-thin py-4">
                  Embrace the surf lifestyle with our Surf & Sleep Package,
                  designed for budget-conscious travelers.
                </p>
                <button className="border w-full md:w-auto mt-5 md:mt-0 border-white justify-center rounded-full text-lg font-medium items-center py-3 px-5 text-white hover:text-white hover:bg-pink">
                  <Link href="/aboutus">Explore Rooms</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex justify-center overflow-hidden rounded-3xl">
            <div className="image-container">
              <Image
                src="/images/Rooms/couple1.jpg"
                alt="Double Delight"
                width={1000}
                height={805}
                className="inner-img"
              />
              <div className="image-overlay"></div>
              <div className="image-text text-white text-center">
                <p className="text-2xl lg:text-4xl font-bold ">
                  Double Delight
                </p>
                <p className="text-sm lg:text-normal font-thin py-4">
                  Rekindle romance by the sea with our Couples Getaway Package.
                </p>
                <button className="border w-full md:w-auto mt-5 md:mt-0 border-white justify-center rounded-full text-lg font-medium items-center py-3 px-5 text-white hover:text-white hover:bg-pink">
                  <Link href="/aboutus">Explore Rooms</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex justify-center overflow-hidden rounded-3xl">
            <div className="image-container">
              <Image
                src="/images/Rooms/triple1.jpg"
                alt="Triple Treat"
                width={1000}
                height={805}
                className="inner-img"
              />
              <div className="image-overlay"></div>
              <div className="image-text text-white text-center">
                <p className="text-2xl lg:text-4xl font-bold ">Triple Treat</p>
                <p className="text-sm lg:text-normal font-thin py-4">
                  Create lasting memories with your loved ones with our Family
                  Fun Package.
                </p>
                <button className="border w-full md:w-auto mt-5 md:mt-0 border-white justify-center rounded-full text-lg font-medium items-center py-3 px-5 text-white hover:text-white hover:bg-pink">
                  <Link href="/aboutus">Explore Rooms</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
