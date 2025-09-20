import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center text-gray-400 my-[50px] mx-0">
      <div className="w-[1400px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[16px] text-gray-500 font-bold">Categories</h2>
            <span className="font-light">Graphics & Design</span>
            <span className="font-light">Digital Marketing</span>
            <span className="font-light">Writing & Translation</span>
            <span className="font-light">Video & Animation</span>
            <span className="font-light">Music & Audio</span>
            <span className="font-light">Programming & Tech</span>
            <span className="font-light">Data</span>
            <span className="font-light">Business</span>
            <span className="font-light">Lifestyle</span>
            <span className="font-light">Photography</span>
            <span className="font-light">Sitemap</span>
          </div>
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[16px] text-gray-500 font-bold">About</h2>
            <span className="font-light">Press & News</span>
            <span className="font-light">Partnerships</span>
            <span className="font-light">Privacy Policy</span>
            <span className="font-light">Terms of Service</span>
            <span className="font-light">Intellectual Property</span>
            <span className="font-light">Investor Relations</span>
          </div>
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[16px] text-gray-500 font-bold">Support</h2>
            <span className="font-light">Help & Support</span>
            <span className="font-light">Trust & Safety</span>
            <span className="font-light">Selling on Fiverr</span>
            <span className="font-light">Buying on Fiverr</span>
          </div>
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[16px] text-gray-500 font-bold">Community</h2>
            <span className="font-light">Events</span>
            <span className="font-light">Blog</span>
            <span className="font-light">Forum</span>
            <span className="font-light">Community Standards</span>
            <span className="font-light">Affiliates</span>
            <span className="font-light">Invite a Friend</span>
            <span className="font-light">Become a Seller</span>
          </div>
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[16px] text-gray-500 font-bold">
              More From Fiverr
            </h2>
            <span className="font-light">Fiverr Business</span>
            <span className="font-light">Fiverr Pro</span>
            <span className="font-light">Fiverr Logo Maker</span>
            <span className="font-light">Fiverr Guides</span>
            <span className="font-light">Get Inspired</span>
            <span className="font-light">ClearVoice</span>
            <span className="font-light">AND CO</span>
            <span className="font-light">Learn</span>
          </div>
        </div>
        <hr className="my-[50px] mx-0 h-0 border-[1px] border-gray-300" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[20px]">
            <div className="flex items-center">
              <h2 className="font-bold text-[24px]">fiverr</h2>
              <span className="text-[24px] font-bold text-[#1dbf73]">.</span>
            </div>
            <span className="text-[13px]">
              &copy; fiverr International Ltd. 2023
            </span>
          </div>
          <div className="flex items-center gap-[30px]">
            <div className="flex items-center gap-[20px]">
              <img
                className="w-[20px] h-[20px]"
                src="/img/facebook.png"
                alt="facebook"
              />
              <img
                className="w-[20px] h-[20px]"
                src="/img/twitter.png"
                alt="twitter"
              />
              <img
                className="w-[20px] h-[20px]"
                src="/img/linkedin.png"
                alt="linkedin"
              />
              <img
                className="w-[20px] h-[20px]"
                src="/img/pinterest.png"
                alt="pinterest"
              />
              <img
                className="w-[20px] h-[20px]"
                src="/img/instagram.png"
                alt="instagram"
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <img
                className="w-[20px] h-[20px]"
                src="/img/language.png"
                alt="language"
              />
              <span>English</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <img className="w-[20px] h-[20px]" src="/img/coin.png" alt="currency" />
              <span>USD</span>
            </div>
            <img
              className="w-[20px] h-[20px]"
              src="/img/accessibility.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
