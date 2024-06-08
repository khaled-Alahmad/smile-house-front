"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });
import "tiny-slider/dist/tiny-slider.css";

import { FiCalendar, FiClock } from "../assets/icons/vander";
import Loader from "./loader";
import { fetchBlogs } from "../data/dataApi";

export default function BlogSlider({ excludeId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchBlogsAsync() {
      try {
        const fetchedData = await fetchBlogs();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchBlogsAsync();
  }, []);

  if (!data) {
    return <Loader />;
  }

  // Filter out the item with the specified excludeId
  const filteredData = data.filter((item) => item.id != excludeId);

  let settings = {
    container: ".slider-range-three",
    items: 3,
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
        items: 3,
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
    <div className="row">
      <div className="col-lg-12 mt-4 pt-2">
        <div className="slider-range-three">
          <TinySlider settings={settings}>
            {filteredData
              .sort(() => Math.random() - 0.5)
              .map((item, index) => {
                const dateObj = new Date(item.created_at); // Assuming item has a timestamp field
                const year = dateObj.getUTCFullYear();
                const month = String(dateObj.getUTCMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(dateObj.getUTCDate()).padStart(2, "0");
                const hours = String(dateObj.getUTCHours()).padStart(2, "0");
                const minutes = String(dateObj.getUTCMinutes()).padStart(
                  2,
                  "0"
                );
                const seconds = String(dateObj.getUTCSeconds()).padStart(
                  2,
                  "0"
                );
                const formattedDate = `${year}-${month}-${day}`;
                const formattedTime = `${hours}:${minutes}:${seconds}`;

                return (
                  <div className="tiny-slide" key={index}>
                    <div
                      className="card blog blog-primary border-0 shadow rounded overflow-hidden m-1"
                      dir="rtl"
                      style={{ height: "22rem" }}
                    >
                      <Image
                        src={item.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "12rem" }}
                        className="img-fluid"
                        alt=""
                      />
                      <div className="card-body p-4">
                        <ul className="list-unstyled mb-2">
                          <li className="list-inline-item text-muted small ms-3 d-inline-flex align-items-center">
                            <FiCalendar className="mb-0 text-dark h6 ms-1" />
                            {formattedDate}
                          </li>
                          <li className="list-inline-item text-muted small d-inline-flex align-items-center">
                            <FiClock className="mb-0 text-dark h6 ms-1" />
                            {formattedTime}
                          </li>
                        </ul>
                        <Link
                          href={`/blog-detail/${item.id}`}
                          className="text-dark title h5"
                        >
                          {item.title}
                        </Link>
                        <div className="post-meta d-flex justify-content-between mt-3">
                          <Link
                            href={`/blog-detail/${item.id}`}
                            className="link"
                          >
                            عرض التفاصيل{" "}
                            <i className="mdi mdi-chevron-left align-middle"></i>
                          </Link>
                        </div>
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
