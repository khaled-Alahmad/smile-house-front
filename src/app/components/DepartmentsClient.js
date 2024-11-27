// src/app/departments/DepartmentsClient.js
"use client";

import React from "react";
import Link from "next/link";
import { BiLeftArrowAlt } from "../assets/icons/vander";
import Image from "next/image";

const DepartmentsClient = ({ services, offerData }) => {
  return (
    <>
      <section
        className="bg-half-170 d-table w-100"
        style={{
          backgroundImage: `url(${offerData?.image})`,
          backgroundSize: "cover",
        }}
        dir="rtl"
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4 text-white title-dark">
                  {offerData?.name}
                </h3>
                <p className="para-desc mx-auto text-white-50">
                  {offerData?.description}
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
              services.map((item, index) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 col-12 mt-4 pt-2"
                  key={index}
                  // data-aos="fade-up"
                  // data-aos-delay={index * 100}
                >
                  <div
                    className="card-img icon text-center rounded-md"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="card blog blog-primary border-0 shadow rounded overflow-hidden d-flex flex-column"
                      style={{ height: "28rem" }}
                    >
                      <div
                        className="icon text-center rounded-m"
                        style={{ height: "12rem" }}
                      >
                        <Image
                          src={item.image}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          className="img-fluid m-1"
                          alt={item.name}
                        />
                      </div>
                      <div className="card-body text-end p-3 d-flex flex-column">
                        <Link
                          href={`/services-details/${item.id}`}
                          className="title text-dark h5"
                        >
                          {item.name}
                        </Link>
                        <p className="text-muted flex-grow-1 mt-3">
                          {item.description.split(" ").slice(0, 40).join(" ")}
                          ...
                        </p>

                        <Link
                          href={`/services-details/${item.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          عرض التفاصبل
                          <BiLeftArrowAlt className="align-middle" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-center">لا يوجد</span>
            )}
          </div>
        </div>
      </section>
      {/* <Footer data={data} />
    <ScrollTop /> */}
    </>
  );
};

export default DepartmentsClient;
