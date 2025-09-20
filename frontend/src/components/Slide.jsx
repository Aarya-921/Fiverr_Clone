import React from "react";
import Slider from "react-slick";


const Slide = ({children, settings}) => {
  
  return (
    <div className="flex justify-center py-[100px] px-0">
      <div className="w-[1400px] relative overflow-visible">
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
