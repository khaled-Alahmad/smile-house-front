"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiLeftArrowAlt } from "../assets/icons/vander";
import {
  fetchMedicalDevices,
} from "../data/dataApi";
import Image from "next/image";
import Loader from "../components/loader";
import AOS from "aos";
import Cookies from "js-cookie";

export default function MedicalDevices() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    AOS.init({
      duration: 1200, // مدة الحركة
      easing: "ease-out-cubic",
      once: false, // اجعلها false للسماح بتكرار الحركات
    });
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100; // أقصى عدد من الحروف قبل عرض "قراءة المزيد"

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    async function getServices() {
      try {
        const fetchedData = await fetchMedicalDevices();

        // //console.log(response.data.data);
        setServices(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    getServices();
  }, []);
  if (!services) {
    return <Loader />;
  }
  const handleClick = (id) => {
    localStorage.setItem("medicalId", id);
    Cookies.set("medicalId", id, { expires: 7 }); //
  };
  return (
    <>
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url('/images/14.webp')` }}
        dir="rtl"
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4 text-white title-dark">
                  الأجهزة الطبية
                </h3>
                <p className="para-desc mx-auto text-white-50">
                  تقدم الأجهزة الطبية حلولاً مبتكرة للتشخيص والعلاج، مما يساهم
                  في تحسين جودة الرعاية الصحية ودعم الأطباء في تقديم خدمات فعالة
                  وسريعة للمرضى.
                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-light rounded mb-0 py-1 px-2">
                    <li className="breadcrumb-item active" aria-current="page">
                      الأجهزة الطبية
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/">الرئيسية</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-color-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <section className="section" dir="rtl">
        <div className="container">
          <div className="row">
            {services.length > 0 ? (
              services.map((item, index) => {
                const comment = item.description;

                return (
                  <div
                    className="col-xl-3 col-md-4 col-12 mt-5 "
                    key={index}
                    data-aos="fade-up" // تأثير الحركات عند الظهور
                    data-aos-delay={index * 100} // تأخير الحركة بناءً على الفهرس
                  >
                    <div
                      className="card blog blog-primary border-0 shadow rounded overflow-hidden d-flex flex-column"
                      style={{ height: "auto" }}
                    >
                      <Image
                        src={item.images[0].path}
                        width={150}
                        height={100}
                        sizes="100vw"
                        style={{
                          width: "100%",
                          height: "12rem",
                          objectFit: "cover",
                        }}
                        className="img-fluid"
                        alt=""
                      />
                      {/* <img src={item.image} alt=" " /> */}
                      <div className="card-body px-4 py-2 d-flex flex-column">
                        <Link href={`/medical-devices/${item.id}`}>
                          {item.name}
                        </Link>
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
                        )}{" "}
                        <br />
                        <Link
                          href={`/medical-devices/${item.id}`}
                          className="btn btn-primary mt-3"
                        >
                          عرض التفاصيل
                          <BiLeftArrowAlt className="align-middle" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <span className="text-center">لا يوجد</span>
            )}
          </div>
        </div>
      </section>
      {/* <Footer data={dataTotal} /> */}

      {/* <ScrollTop /> */}
    </>
  );
}
