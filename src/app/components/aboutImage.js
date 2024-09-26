"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";

export default function AboutImage({ colClass, imageSrc, VideoSrc }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={colClass}
      data-aos="fade-left" // تأثير تكبير الصورة
      data-aos-duration="800"
    >
      <div className="position-relative">
        <Image
          src={imageSrc ?? "/images/about/about-1.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="img-fluid"
          alt=""
        />
        <div className="play-icon">
          <Link href="#" scroll={false} onClick={() => setOpen(true)}>
            <i className="mdi mdi-play text-primary rounded-circle shadow play-btn lightbox video-play-icon"></i>
          </Link>
        </div>
        <ModalVideo
          channel="custom"
          isOpen={isOpen}
          url={VideoSrc} // Pass the direct video link
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
