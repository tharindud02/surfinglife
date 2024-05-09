"use client";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

const Cook = () => {
  return (
    <div className="relative" id="cook-section">
      <div className="mx-auto max-w-7xl lg:pt-20 sm:pb-24 px-6">
        <div className="absolute right-0 bottom-[-18%] hidden lg:block">
          <Image
            src={"/images/Cook/burger-1.png"}
            alt="burger-image"
            width={463}
            height={622}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5">
          <div className="col-span-6 flex justify-start">
            <Image
              src="/images/Cook/Salad-1.png"
              alt="nothing"
              width={636}
              height={808}
            />
          </div>

          <div className="col-span-6 flex flex-col justify-center">
            <Fade
              direction={"up"}
              delay={400}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <h2 className="text-pink text-lg font-normal mb-3 ls-51 uppercase text-start">
                Our Restaurant
              </h2>
            </Fade>
            <Fade
              direction={"up"}
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <h3 className="text-3xl lg:text-5xl font-semibold text-black text-start">
                Savor the Flavors
              </h3>
            </Fade>
            <Fade
              direction={"up"}
              delay={1000}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p className="text-grey md:text-lg font-normal mb-10 text-start mt-2">
                {` At Surfing Life Guest House, our restaurant isn't just a dining
                experience; it's a journey of taste and comfort. From an array
                of diverse dishes, including homemade favorites and
                international delights, to expertly crafted cocktails, our
                culinary offerings are designed to delight your senses. Whether
                you're savoring a home-cooked meal, relishing a café treat, or
                toasting with a cocktail, our restaurant is your seaside
                sanctuary for unforgettable dining moments. Join us for a
                culinary adventure like no other, where every bite and sip is
                seasoned with the spirit of the coast.`}
              </p>
              <p className="text-grey md:text-lg font-bold mb-10 text-start mt-1">
                Come hungry, leave happy, and let the taste of Surfing Life
                linger in your memory.
              </p>
              <div className="flex align-middle justify-center md:justify-start">
                <button className="text-xl font-medium rounded-full text-white py-5 px-6 bg-pink lg:px-10 mr-6">
                  Read more
                </button>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cook;
