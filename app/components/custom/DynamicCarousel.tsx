"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const DynamicCarousel = ({ images }: { images: string[] }) => {
  useEffect(() => {}, [images]);

  if (!images || images.length === 0) return null;

  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={1}
      loop={true}
      freeMode={true}
      className="w-full lg:max-w-sm lg:h-[24rem] xl:max-w-md xl:h-[28rem]"
      modules={[Pagination, Navigation]}
      pagination={{
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return `<div class="${className} custom-bullet"></div>`;
        },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="slide">
          <Image
            src={image}
            alt={`Experience ${index + 1}`}
            width={500}
            height={500}
            className="rounded-xl lg:max-w-sm xl:max-w-md aspect-square object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DynamicCarousel;
