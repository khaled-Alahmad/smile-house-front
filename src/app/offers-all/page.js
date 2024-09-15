"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { BiLeftArrowAlt, FiArrowRight, FiCalendar } from "../assets/icons/vander";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import axios from "axios";
import {
  FetchCategories,
  apiUrl,
  fetchCategories,
  fetchData,
  fetchOffersAll,
} from "../data/dataApi";
import Image from "next/image";
import Loader from "../components/loader";
import Dotdotdot from "react-dotdotdot";

export default function DepartmentsAll() {
  const [services, setServices] = useState([]);
  const [dataTotal, setDataTotal] = useState(null);

  useEffect(() => {
    async function getServices() {
      try {
        const fetchedData = await fetchOffersAll();

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
                  عروضنا
                </h3>
                <p className="para-desc mx-auto text-white-50">
                  نحن في سمايل هاوس نقدم لك افضل العروض المناسبة لك.

                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-light rounded mb-0 py-1 px-2">
                    <li className="breadcrumb-item active" aria-current="page">
                      العروض
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
                const timestamp = item.end_date;

                // Create a Date object
                const dateObj = new Date(timestamp);

                // Extract date parts
                const year = dateObj.getUTCFullYear();
                const month = String(dateObj.getUTCMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(dateObj.getUTCDate()).padStart(2, "0");

                // Extract time parts
                const hours = String(dateObj.getUTCHours()).padStart(2, "0");
                const minutes = String(dateObj.getUTCMinutes()).padStart(
                  2,
                  "0"
                );
                const seconds = String(dateObj.getUTCSeconds()).padStart(
                  2,
                  "0"
                );

                // Format the date and time
                const formattedDate = `${year}-${month}-${day}`;
                const formattedTime = `${hours}:${minutes}:${seconds}`;

                // Assign the formatted date and time to item
                const itemR = {
                  date: formattedDate,
                  time: formattedTime,
                };
                return (
                  <div className="col-lg-3 col-md-4 col-6 my-2" key={index}>
                    <div
                      className="card blog blog-primary border-0 shadow rounded overflow-hidden"
                      style={{
                        height: "100%",
                      }}
                    >
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
                      <div
                        className="card-body p-2"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Link
                          href={`#`}
                          // href={"#"}
                          className="text-dark title h5"
                        >
                          {item.title}
                        </Link>
                        <Dotdotdot clamp={5}>
                          <p className="text-dark  d-block">
                            {item.description}
                          </p>
                        </Dotdotdot>

                        <ul className="list-unstyled  lg:d-inline-flex lg:align-items-center">
                          <li className=" text-muted  d-inline-flex align-items-center">
                            <span href="#" className="text-muted ">
                              ينتهي :
                            </span>
                          </li>
                          <li className="list-inline-item text-muted small d-inline-flex align-items-center">
                            <FiCalendar className="text-dark  ms-1 mb-0" />
                            {itemR.time} {itemR.date}
                          </li>
                          {/* <li className="list-inline-item text-muted small d-inline-flex align-items-center">
                              <FiClock className="text-dark  ms-1 mb-0 " />
                            </li> */}
                        </ul>
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
