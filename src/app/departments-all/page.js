"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { BiLeftArrowAlt, FiArrowRight } from "../assets/icons/vander";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import axios from "axios";
import {
  FetchCategories,
  apiUrl,
  fetchCategories,
  fetchData,
} from "../data/dataApi";
import Image from "next/image";
import Loader from "../components/loader";
import AOS from "aos";

export default function DepartmentsAll() {
  const [services, setServices] = useState([]);
  const [dataTotal, setDataTotal] = useState(null);
  useEffect(() => {
    AOS.init({
      duration: 1200, // مدة الحركة
      easing: "ease-out-cubic",
      once: false, // اجعلها false للسماح بتكرار الحركات
    });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleScroll);

    // تنظيف حدث التمرير عند إلغاء التثبيت
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    async function getServices() {
      try {
        const fetchedData = await fetchCategories();

        // console.log(response.data.data);
        setServices(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    async function fetchDataTotalAsync() {
      try {
        const fetchedData = await fetchData();
        setDataTotal(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    getServices();
    fetchDataTotalAsync();
  }, []);
  if (!services || !dataTotal) {
    // Render loading state or return null if you don't want to render anything
    return <Loader />;
  }
  const handleClick = (id) => {
    localStorage.setItem("categoryId", id);
  };
  return (
    <>
      <Navbar
        manuClass="navigation-menu nav-light nav-left"
        containerClass="container"
      />
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url('/images/bg/department.jpg')` }}
        dir="rtl"
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4 text-white title-dark">
                  الأقسام
                </h3>
                <p className="para-desc mx-auto text-white-50">
                  دكتور متميز إذا كنت بحاجة إلى تقديم مساعدة فعالة وفورية لأحد
                  أفراد أسرتك، سواء في حالات الطوارئ أو للحصول على استشارة
                  بسيطة.
                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-light rounded mb-0 py-1 px-2">
                    <li className="breadcrumb-item active" aria-current="page">
                      الأقسام
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
                return (
                  <div
                    className="col-xl-3 col-md-4 col-6 mt-5"
                    key={index}
                    data-aos="fade-up" // تأثير الحركات عند الظهور
                    data-aos-delay={index * 100} // تأخير الحركة بناءً على الفهرس
                  >
                    <div className="card blog blog-primary border-0 ">
                      <div
                        className="icon text-center  rounded-m"
                        // style={{ height: "190px", width: "180px" }}
                      >
                        {/* <Icon className="h3 mb-0" /> */}

                        <Image
                          src={item.image}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "12rem",
                            objectFit: "cover",
                          }}
                          className="img-fluid m-1"
                          alt=""
                        />
                        {/* <img src={item.image} alt=" " /> */}
                      </div>
                      <div className="card-body p-0 mt-3">
                        <Link href="/departments" legacyBehavior>
                          <a
                            onClick={() => handleClick(item.id)}
                            className="title text-dark h5"
                          >
                            {item.name}
                          </a>
                        </Link>
                        <p className="text-muted mt-3">{item.description}</p>
                        <Link
                          href="/departments"
                          className="link"
                          legacyBehavior
                        >
                          <a onClick={() => handleClick(item.id)} className="">
                            {/* {item.name} */}
                            عرض الخدمات
                            <BiLeftArrowAlt className="align-middle" />
                          </a>
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
      <Footer data={dataTotal} />

      <ScrollTop />
    </>
  );
}
