"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// استيراد تنسيقات CSS الخاصة بـ Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Slider() {
  const slides = [
    { id: 1, src: "/assets/Eye-Clinic.jpg", alt: "eyes" },
    {
      id: 2,
      src: "/assets/eye1.jpeg",
      alt: "eyes",
    },
    {
      id: 3,
      src: "/assets/eye2.jpeg",
      alt: "eyes",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000, // الوقت بالمللي ثانية (3 ثوانٍ)
          disableOnInteraction: false, // الاستمرار في الحركة حتى بعد تفاعل المستخدم
        }}
        pagination={{
          clickable: true, // إمكانية الضغط على النقاط
        }}
        navigation={true} // أسهم التنقل (يمين/يسار)
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-xl overflow-hidden h-64"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              className={`w-full h-full flex items-center justify-center text-white text-2xl font-bold`}
              src={slide.src}
              alt={slide.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
