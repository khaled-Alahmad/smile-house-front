"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });
import "tiny-slider/dist/tiny-slider.css";
import { fetchMedicalDevices } from "@/app/data/dataApi";

export default function RelatedProductFa({ currentProductId }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function getServices() {
      try {
        const fetchedData = await fetchMedicalDevices();

        // Ensure fetched data is an array
        if (Array.isArray(fetchedData)) {
          setServices(fetchedData);
        } else {
          console.error("Fetched data is not an array:", fetchedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    getServices();
  }, []);

  if (!services || services.length === 0) {
    return (
      <div className="text-center">
        <p>لا توجد منتجات متاحة للعرض.</p>
      </div>
    );
  }

  // Filter out the current product by ID
  const filteredServices = services.filter((item) => {
    // Ensure proper comparison of IDs
    return String(item.id) !== String(currentProductId);
  });

  // Check if any related products remain after filtering
  if (filteredServices.length === 0) {
    return (
      <div className="text-center">
        <p>لا توجد منتجات متاحة ذات صلة.</p>
      </div>
    );
  }

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
      <div className="col-lg-12 mt-4 pt-2 text-center">
        <div className="slider-range-four">
          <TinySlider settings={settings}>
            {filteredServices.map((item, index) => (
              <div className="tiny-slide" key={index}>
                <div className="card shop-list border-0">
                  <div className="shop-image position-relative overflow-hidden">
                    <Link href={`/medical-devices/${item.id}`}>
                      <Image
                        src={item.images?.[0]?.path || "/placeholder.jpg"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                        className="img-fluid image-offer m-1"
                        alt={item.name || "منتج"}
                      />
                    </Link>
                  </div>
                  <div className="card-body text-center">
                    <h6 className="card-title">
                      <Link href={`/medical-devices/${item.id}`}>
                        {item.name || "اسم المنتج"}
                      </Link>
                    </h6>
                    <p className="text-muted">{item.price || "غير متوفر"}</p>
                  </div>
                </div>
              </div>
            ))}
          </TinySlider>
        </div>
      </div>
    </div>
  );
}
