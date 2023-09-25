"use client";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";

const Banner = () => {
  return (
    <div id="home-section" className="bg-lightpink">
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
          <div className="col-span-6 flex flex-col justify-center">
            <Fade
              direction={"up"}
              delay={400}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <h1 className="text-4xl lg:text-5xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                Relax, Dine, Stay <br />
                on a Budget
              </h1>
            </Fade>
            <Fade
              direction={"up"}
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p className="text-grey lg:text-lg font-normal mb-10 lg:text-start text-center pr-4">
                Welcome to Surfing Life Guest House, your ultimate destination
                for an unforgettable beach getaway without breaking the bank.
                Our guest house offers a perfect blend of relaxation, great
                food, and cozy accommodations, all designed to make your stay
                memorable.
              </p>
            </Fade>
            <Fade
              direction={"up"}
              delay={1000}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              {/* <div className="md:flex align-middle justify-center lg:justify-start">
                <button className="text-xl w-full md:w-auto font-medium rounded-full text-white py-5 px-6 bg-pink lg:px-14 mr-6">
                  <Link href="#cook-section">Lets cook</Link>
                </button>
                <button className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink">
                  <Link href="#about-section">Explore now</Link>
                </button>
              </div> */}
            </Fade>
          </div>

          <div className="col-span-6 flex justify-center relative">
            <div className="flex bg-white p-2 gap-5 items-center top-24 left-0 rounded-xl absolute">
              <Image
                src={"/images/Banner/love.png"}
                alt="love-image"
                width={48}
                height={48}
              />

              <p className="text-lg font-normal text-darkgrey">
                Create lasting memories
                <br /> with your loved ones.
              </p>
            </div>
            <div className="flex bg-white p-2 gap-5 items-center top-48 left-0 rounded-xl absolute">
              <Image
                src={"/images/Banner/money.png"}
                alt="pizza-image"
                width={48}
                height={48}
              />
              <p className="text-lg font-normal text-darkgrey">
                Unbeatable affordability <br />
                without compromising quality.
              </p>
            </div>
            <div className="flex bg-white p-2 gap-5 items-center top-72 left-0 rounded-xl absolute">
              <Image
                src={"/images/Banner/beach.png"}
                alt="pizza-image"
                width={48}
                height={48}
              />{" "}
              <p className="text-lg font-normal text-darkgrey">
                Direct access to the beach for all <br /> you surf enthusiasts
              </p>
            </div>
            <div className="flex bg-white p-2 gap-5 items-center top-96 left-0 rounded-xl absolute">
              <Image
                src={"/images/Banner/staff1.png"}
                alt="pizza-image"
                width={48}
                height={48}
              />
              <p className="text-lg font-normal text-darkgrey">
                Friendly and attentive staff to make <br /> your stay seamless.
              </p>
            </div>

            <Image
              src="/images/Banner/banner-image-surf.png"
              alt="nothing"
              width={1000}
              height={805}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
