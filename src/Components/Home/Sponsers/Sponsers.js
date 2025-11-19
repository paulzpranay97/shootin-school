import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "./sponsors.css";

import Logo1 from "../../../Assets/Images/home/gallery1.webp";
import Logo2 from "../../../Assets/Images/home/gallery2.webp";
import Logo3 from "../../../Assets/Images/home/gallery3.webp";
import Logo4 from "../../../Assets/Images/home/gallery4.webp";
import Logo5 from "../../../Assets/Images/home/gallery5.webp";
import Logo6 from "../../../Assets/Images/home/gallery6.webp";

const Sponsors = () => {
  const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6];

  return (
    <div className="sponsor-section">
      <div className="container">
        <h2 className="sponsor-title">Our Sponsors</h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            0: { slidesPerView: 2 },
            500: { slidesPerView: 3 },
            800: { slidesPerView: 4 },
            1100: { slidesPerView: 5 }
          }}
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="sponsor-item">
                <img src={logo} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Sponsors;
