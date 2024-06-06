"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });
import "tiny-slider/dist/tiny-slider.css";

import { patientsData } from "../data/data";

const settings = {
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
export default function Patients({ data }) {
  return (
    <div className="client-review-slider">
      <TinySlider settings={settings}>
        {data.map((item, index) => (
          <div className="tiny-slide text-center" key={index}>
            <p className="text-muted fw-normal fst-italic">
              {item.customer_comment}
            </p>
            <Image
              src={item.customer_image}
              width={65}
              height={65}
              className="img-fluid avatar avatar-small rounded-circle mx-auto shadow my-3"
              alt=""
            />
            <ul className="list-unstyled mb-0">
              <li className="list-inline-item">
                <i className="mdi mdi-star text-warning"></i>
              </li>
              <li className="list-inline-item">
                <i className="mdi mdi-star text-warning"></i>
              </li>
              <li className="list-inline-item">
                <i className="mdi mdi-star text-warning"></i>
              </li>
              <li className="list-inline-item">
                <i className="mdi mdi-star text-warning"></i>
              </li>
              <li className="list-inline-item">
                <i className="mdi mdi-star text-warning"></i>
              </li>
            </ul>
            <h6 dir="rtl" className="text-primary">
              {/* <small className="text-muted">{item.title}</small> */}
              {item.customer_name}
            </h6>
          </div>
        ))}
      </TinySlider>
    </div>
  );
}
