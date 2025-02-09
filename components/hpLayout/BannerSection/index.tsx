import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router"; // Using Next.js' useRouter

import { BannerWrapper, BannerItem } from "@/styles/hpLayout/BannerSection";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_CDN_URL; // Adjusted to Next.js env variable format

const banner1 = "assets/images/HpImages/banner1.jpg";
const banner2 = "assets/images/HpImages/banner2.jpg";
const banners = [
  {
    src: BASE_URL + banner1,
    alt: "Banner 1",
  },
  {
    src: BASE_URL + banner2,
    alt: "Banner 2",
  },
];

// Defining the types for the props
interface BannerSliderProps {
  loginModal: boolean;
}

const BannerSlider: React.FC<BannerSliderProps> = ({ loginModal }) => {
  const sliderRef = useRef<Slider | null>(null); // Correctly typing the slider ref
  const [autoplay, setAutoplay] = useState<boolean>(true); // Typing the state

  const router = useRouter(); // Using useRouter from Next.js

  useEffect(() => {
    if (sliderRef.current) {
      if (loginModal) {
        setAutoplay(false);
        sliderRef.current.slickPause(); // Pausing the slider
      } else {
        setAutoplay(true);
        sliderRef.current.slickPlay(); // Playing the slider
      }
    }
  }, [loginModal]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Navigating to '/categories' using useRouter
  const handleClick = () => {
    router.push("/categories");
  };

  return (
    <BannerWrapper>
      <Slider ref={sliderRef} {...settings}>
        {banners.map((banner, index) => (
          <BannerItem key={index} onClick={handleClick}>
            <Image
              src={banner.src}
              alt={banner.alt}
              width={800} // Replace with the actual width of the image
              height={400} // Replace with the actual height of the image
            />
          </BannerItem>
        ))}
      </Slider>
    </BannerWrapper>
  );
};

export default BannerSlider;
