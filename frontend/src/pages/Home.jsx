import React from "react";
import Featured from "../components/Featured";
import TrustedBy from "../components/TrustedBy";
import Slide from "../components/Slide";
import CateCard from "../components/CateCard";
import { cards, projects } from "../data";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ProjectCard from "../components/ProjectCard";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-300 text-red-800 rounded-full shadow p-2"
    onClick={onClick}
  >
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-300 text-red-800 rounded-full shadow p-2"
    onClick={onClick}
  >
    <FaArrowLeft />
  </div>
);

const Home = () => {
  var settingsCard = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  var settingsProject = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide settings={settingsCard}>
        {cards.map((card) => (
          <CateCard key={card.id} item={card} />
        ))}
      </Slide>
      {/* First Feature Section */}
      <div className=" bg-[#f0fcf7] flex justify-center py-[100px] px-0">
        <div className=" w-[1400px] flex items-center  gap-[200px]">
          <div className="flex flex-2 flex-col gap-[15px] ">
            <h1 className="text-3xl font-medium mb-[10px]">
              A whole world of freelance talent at your fingertips
            </h1>
            <div className="flex items-center gap-[10px] font-medium text-[18px] text-gray-500">
              <img
                className="w-[24px] h-[24px]"
                src="/img/check.png"
                alt="check"
              />
              The best for every budget
            </div>
            <p className="text-[18px] font-light text-gray-500 leading-[28px] tracking-[1px]">
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="flex items-center gap-[10px] font-medium text-[18px] text-gray-500">
              <img
                className="w-[24px] h-[24px]"
                src="/img/check.png"
                alt="check"
              />
              Quality work done quickly
            </div>
            <p className="text-[18px] font-light text-gray-500 leading-[28px] tracking-[1px]">
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="flex items-center gap-[10px] font-medium text-[18px] text-gray-500">
              <img
                className="w-[24px] h-[24px]"
                src="/img/check.png"
                alt="check"
              />
              Protected payments, every time
            </div>
            <p className="text-[18px] font-light text-gray-500 leading-[28px] tracking-[1px]">
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="flex items-center gap-[10px] font-medium text-[18px] text-gray-500">
              <img
                className="w-[24px] h-[24px]"
                src="/img/check.png"
                alt="check"
              />
              24/7 support and communication
            </div>
            <p className="text-[18px] font-light text-gray-500 leading-[28px] tracking-[1px]">
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="flex-3">
            <video
              className="w-[720px]"
              controls
              autoPlay
              loop
              muted
              src="/img/video.mp4"
            ></video>
          </div>
        </div>
      </div>

      {/* Category Item */}
      <div className="flex justify-center py-[100px] px-4 bg-white">
        <div className="w-full max-w-[1400px] flex flex-col gap-[50px]">
          <h1 className="text-3xl font-medium text-gray-800">
            Explore the marketplace
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt="Graphics & Design"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Graphics & Design
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>

            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                alt="Digital Marketing"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Digital Marketing
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                alt="Writing & Translation"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Writing & Translation
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt="Video & Animation"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Video & Animation
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                alt="Music & Audio"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Music & Audio
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                alt="Programming & Tech"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Programming & Tech
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                alt="Business"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Business
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                alt="Lifestyle"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Lifestyle
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                alt="Data"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Data
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>
            <div className="group flex flex-col items-center text-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                alt="Photography"
                className="w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-700 group-hover:text-[#1dbf73] transition-colors">
                Photography
              </span>
              <div className="h-[2px] w-0 bg-[#1dbf73] mt-2 transition-all duration-300 group-hover:w-[50%]"></div>
            </div>

            {/* baaki categories ke liye isi structure ko repeat karna hai */}
          </div>
        </div>
      </div>

      {/* Second Feature Section */}
      <div className=" bg-[#C55E7c] flex justify-center py-[100px] px-0 ">
        <div className=" w-[1400px] flex items-center gap-[200px]">
          <div className="flex flex-col gap-[15px] flex-2">
            <h1 className="text-[48px] font-[280] text-white font-mplus">
              Stuck at vibe coding?
            </h1>
            <p className="text-[18px] font-mplus font-normal text-white leading-[28px] tracking-[1px]">
              Get matched with the right expert to turn your prototype into a
              real, working product.
            </p>
            <button className="w-[160px] p-3 font-mplus bg-white border-none text-black cursor-pointer rounded-[10px] font-bold">
              Find an expert
            </button>
          </div>
          <div className="rounded-[20px] overflow-hidden">
            <video
              className="w-[720px]"
              autoPlay
              loop
              muted
              src="/img/video2.mp4"
            ></video>
          </div>
        </div>
      </div>

      <Slide settings={settingsProject}>
        {projects.map((project) => (
          <ProjectCard key={project.id} projectItem={project} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
