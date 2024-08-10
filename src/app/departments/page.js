"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { BiLeftArrowAlt, FiArrowRight } from "../assets/icons/vander";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import axios from "axios";
import { apiUrl, fetchData } from "../data/dataApi";
import Image from "next/image";
import Loader from "../components/loader";

export default function Departments() {
  const [services, setServices] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [clientKey, setClientKey] = useState(null);

  const [dataTotal, setDataTotal] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("categoryId");
    const clientKey = localStorage.getItem("clientKey");
    if (clientKey) {
      setClientKey(clientKey);
    }
    if (id) {
      setCategoryId(id);
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      async function getServices() {
        try {
          const response = await axios.get(
            `${apiUrl}services?category_id=${categoryId}&clientKey=${clientKey}`
          );
          // console.log(response.data.data);
          setServices(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      }

      getServices();
    }
    async function fetchDataTotalAsync() {
      try {
        const fetchedData = await fetchData();
        setDataTotal(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchDataTotalAsync();
  }, [categoryId]);
  if (!services || !dataTotal) {
    // Render loading state or return null if you don't want to render anything
    return <Loader />;
  }
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
                    className="col-xl-3 col-lg-4 col-md-6 col-12 mt-4 pt-2"
                    key={index}
                  >
                    <div className="card features  feature-primary border-5 rounded-3">
                      <div
                        className="card-img icon text-center rounded-md "
                        style={{
                          height: "200px",
                          width: "200px",
                        }}
                      >
                        {/* <Icon className="h3 mb-0" /> */}
                        <Image
                          src={item.image}
                          width={200}
                          height={200}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "fill",
                          }}
                          className="h3 mb-0"
                          alt=""
                        />
                      </div>
                      <div className="card-body p-0 mt-3">
                        <Link href={`/services-details/${item.id}`}>
                          {item.name}
                        </Link>
                        <p className="text-muted mt-3">{item.description}</p>
                        <Link href="#" className="link">
                          <Link
                            href={`/services-details/${item.id}`}
                            className="link"
                          >
                            عرض التفاصبل
                            <BiLeftArrowAlt className="align-middle" />
                          </Link>{" "}
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
