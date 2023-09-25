"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Fade } from "react-awesome-reveal";

interface cardDataType {
  imgSrc: string;
  heading: string;
  subheading: string;
  link: string;
}

const cardData: cardDataType[] = [
  {
    imgSrc: "/images/Features/featureOne.svg",
    heading: "Menu variations",
    subheading: "Sed ut perspiciatis unde omnis iste natus error",
    link: "Learn more",
  },
  {
    imgSrc: "/images/Features/featureTwo.svg",
    heading: "Cooking warw",
    subheading: "Sed ut perspiciatis unde omnis iste natus error",
    link: "Learn more",
  },
  {
    imgSrc: "/images/Features/featureThree.svg",
    heading: "Best chef",
    subheading: "Sed ut perspiciatis unde omnis iste natus error",
    link: "Learn more",
  },
  {
    imgSrc: "/images/Features/featureFour.svg",
    heading: "Fast food",
    subheading: "Sed ut perspiciatis unde omnis iste natus error",
    link: "Learn more",
  },
];

const Work = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 " id="about-section">
        <div className="pt-40">
          <div className="text-center mb-14">
            <Fade
              direction={"up"}
              delay={400}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <h3 className="text-pink text-lg font-normal mb-3 ls-51 uppercase">
                About Us
              </h3>
            </Fade>
            <Fade
              direction={"up"}
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p className="text-3xl lg:text-5xl font-semibold text-lightgrey">
                Our Surfing Life Journey
              </p>
            </Fade>
          </div>
          <div className="text-center mb-4">
            <Fade
              direction={"up"}
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p className="text-xl lg:text-2xl font-normal text-lightgrey">
                Surfing Life Guest House: Your Beachside Escape
              </p>
            </Fade>
          </div>
          <div className="text-center mb-14">
            <Fade
              direction={"up"}
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p className="text-lg lg:text-lg font-thin text-grey">
                Discover Surfing Life Guest House, a cozy beachfront retreat for
                surf enthusiasts and travelers seeking an authentic coastal
                experience. Established in 2007, we've earned TripAdvisor's Best
                Budget Hotel award in 2015 and 2016. Our homey guest house
                offers ceiling fans, mosquito nets, and a grassy yard with
                hammocks for lazy afternoons. While our mattresses are modest,
                our bright red sheets are spotless. Owner Eric rents surfboards
                and provides storage for those with their own. Join us for a
                budget-friendly, wave-riding adventure!
              </p>
            </Fade>
          </div>
          <div className="text-center mb-4">
            <button className="border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-3 px-5 text-pink hover:text-white hover:bg-pink">
              <Link href="/aboutus">Read More</Link>
            </button>
          </div>
        </div>

        {/* <div className="text-center mb-14">
          <Fade
            direction={"up"}
            delay={400}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <h3 className="text-pink text-lg font-normal mb-3 ls-51 uppercase">
              FEATURES
            </h3>
          </Fade>
          <Fade
            direction={"up"}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <p className="text-3xl lg:text-5xl font-semibold text-lightgrey">
              Get a many of interesting features.
            </p>
          </Fade>
        </div> */}

        {/* {<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-32">
          <Fade
            direction={"up"}
            delay={1000}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            {cardData.map((items, i) => (
              <div className="card-b p-8 relative rounded-3xl" key={i}>
                <div className="work-img-bg rounded-full flex justify-center absolute top-[-50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] left-[0%]">
                  <Image
                    src={items.imgSrc}
                    alt={items.imgSrc}
                    width={510}
                    height={10}
                  />
                </div>
                <h3 className="text-2xl text-black font-semibold text-center mt-16">
                  {items.heading}
                </h3>
                <p className="text-lg font-normal text-black text-center text-opacity-50 mt-2">
                  {items.subheading}
                </p>
                {<div className="flex items-center justify-center">
                  <Link href="/">
                    <p className="text-center text-lg font-medium text-pink mt-2 hover-underline">
                      {items.link}
                      <ChevronRightIcon width={20} height={20} />
                    </p>
                  </Link>
                </div> }
              </div>
            ))}
          </Fade>
        </div>} */}
      </div>
    </div>
  );
};

export default Work;
