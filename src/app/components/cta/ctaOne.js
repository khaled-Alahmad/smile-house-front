"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ModalVideo from "react-modal-video";
import "../../../../node_modules/react-modal-video/scss/modal-video.scss";

import CountUp from "react-countup";

import { counterData } from "../../data/data";

export default function CtaOne({ data }) {
  console.log(data);
  
  let [isOpen, setOpen] = useState(false);
  return (
    <section className="section pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div
              className="video-solution-cta position-relative"
              style={{ zIndex: "1" }}
              data-aos="fade-up" // إضافة الحركة
            >
              <div className="position-relative">
                <Image
                  src={`${data.hero["main_image"] ?? "/images/bg/01.jpg"}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className="img-fluid rounded-md shadow-lg"
                  alt=""
                />
                <div className="play-icon">
                  <Link
                    href="#!"
                    scroll={false}
                    onClick={() => setOpen(true)}
                    className="play-btn lightbox video-play-icon"
                  >
                    <i className="mdi mdi-play text-primary rounded-circle bg-white title-bg-dark shadow-lg"></i>
                  </Link>
                </div>
                <ModalVideo
                  channel="custom"
                  youtube={{ mute: 1, autoplay: 1 }}
                  isOpen={isOpen}
                  videoId="yba7hPeTSjk"
                  url={`${data.attachment["praimary-video"]}`}
                  onClose={() => setOpen(false)}
                />
              </div>

              <div className="content">
                <div className="row" id="counter">
                  {data.details.map((item, index) => {
                    return (
                      <div
                        className="col-md-4 mt-4 pt-2"
                        key={index}
                        data-aos="zoom-in"
                      >
                        {" "}
                        {/* إضافة الحركة */}
                        <div className="counter-box text-center">
                          <h1 className="mt-3 text-white title-dark">
                            <CountUp
                              className="counter-value"
                              start={0}
                              end={parseFloat(item.amount)}
                              // duration={2.5}
                            />
                            +
                          </h1>
                          <h5 className="counter-head text-white title-dark mb-1">
                            {item.title}
                          </h5>
                          <p className="text-white-50 mb-0">{item.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feature-posts-placeholder bg-primary"></div>
      </div>
    </section>
  );
}
