"use client";
import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });
import "tiny-slider/dist/tiny-slider.css";
const settings = {
  container: ".client-review-slider",
  items: 3, // عرض 3 عناصر على الشاشات الكبيرة
  controls: false,
  mouseDrag: true,
  loop: true,
  rewind: true,
  autoplay: true,
  autoplayButtonOutput: false,
  autoplayTimeout: 3000,
  navPosition: "bottom",
  speed: 400,
  gutter: 16, // المسافة بين العناصر
  responsive: {
    0: {
      items: 1, // عرض كارد واحد على الشاشات الصغيرة (الجوال)
    },
    768: {
      items: 2, // عرض 2 كارد على الشاشات المتوسطة (التابلت)
    },
    1024: {
      items: 3, // عرض 3 كاردات على الشاشات الكبيرة
    },
  },
};

export default function Patients({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100; // أقصى عدد من الحروف قبل عرض "قراءة المزيد"

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="client-review-slider" style={{ overflow: "hidden" }}>
      <TinySlider settings={settings}>
        {data.map((item, index) => {
          const comment = item.customer_comment;

          return (
            <div
              className="tiny-slide text-center"
              key={index}
              data-aos="fade-up"
            >
              {" "}
              {/* إضافة الحركة */}
              <Image
                src={item.customer_image}
                width={65}
                height={65}
                style={{ objectFit: "cover" }}
                className="img-fluid avatar avatar-small rounded-circle mx-auto shadow my-3"
                alt=""
              />
              <ul className="list-unstyled mb-0">
                {[...Array(5)].map((_, i) => (
                  <li className="list-inline-item" key={i}>
                    <i className="mdi mdi-star text-warning"></i>
                  </li>
                ))}
              </ul>
              <h6 dir="rtl" className="text-primary">
                {item.customer_name}
              </h6>
              <p className="text-muted fw-normal" dir="rtl">
                {isExpanded || comment.length <= MAX_LENGTH
                  ? comment
                  : `${comment.slice(0, MAX_LENGTH)}...`}
              </p>
              {comment.length > MAX_LENGTH && (
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={toggleExpand}
                >
                  {isExpanded ? "قراءة أقل" : "قراءة المزيد"}
                </span>
              )}
            </div>
          );
        })}
      </TinySlider>
    </div>
  );
}
