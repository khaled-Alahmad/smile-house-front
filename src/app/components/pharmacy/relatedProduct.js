"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });
import "tiny-slider/dist/tiny-slider.css";

import Counter from "./counter";

import { FiHeart, FiEye, FiShoppingCart } from "../../assets/icons/vander";
import { productData } from "../../data/data";

export default function RelatedProduct({ data }) {
  let settings = {
    container: ".slider-range-four",
    items: 2,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 24,
    responsive: {
      992: {
        items: 4,
      },

      767: {
        items: 2,
      },

      320: {
        items: 1,
      },
    },
  };
  return (
    <div className="row" dir="ltr">
      <div className="col-lg-12 mt-4 pt-2">
        <div className="slider-range-four">
          <TinySlider settings={settings}>
            {data.map((item, index) => {
              return (
                <div className="tiny-slide" key={index}>
                  <div className="card shop-list border-0">
                    <div className="shop-image position-relative overflow-hidden">
                      <Link href="#">
                        <Image
                          src={item.url}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "250px" }}
                          className="img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </TinySlider>
        </div>
      </div>
    </div>
  );
}
