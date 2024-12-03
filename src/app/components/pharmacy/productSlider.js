"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ImageP from "@/app/assets/placeholder.svg";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });
import "tiny-slider/dist/tiny-slider.css";

export default function ProductSlider({ images = [] }) {
  console.log(images);

  // إعدادات TinySlider
  let settings2 = {
    container: ".client-review-slider",
    items: 1,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 16,
  };

  // تحقق من وجود الصور
  if (!images || images.length === 0) {
    return (
      <div className="text-center">
        <p>لا توجد صور متاحة للعرض.</p>
      </div>
    );
  }

  return (
    <div className="client-review-slider">
      <TinySlider settings={settings2}>
        {images.map((item, index) => (
          <div className="tiny-slide" key={index}>
            <Image
              src={item.path}
              width={800} // تحديد عرض الصورة
              height={600} // تحديد ارتفاع الصورة
              quality={75} // تقليل جودة الصورة لتحسين الأداء
              placeholder="blur" // توفير صورة ضبابية أثناء التحميل
              blurDataURL={ImageP.src} // يمكنك وضع رابط لصورة placeholder صغيرة
              className="img-fluid rounded"
              alt={`Image ${index + 1}`}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </TinySlider>
    </div>
  );
}
