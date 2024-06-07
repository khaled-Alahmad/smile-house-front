"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import {
  FiFacebook,
  FiLinkedin,
  FiGithub,
  FiTwitter,
} from "../assets/icons/vander";
// import imageDoctor from "../../../public/images/doctors/02.jpg";

import { doctorData } from "../data/data";
import { doctors, fetchData } from "../data/dataApi";
import Loader from "../components/loader";

export default function DoctorTeamOne() {
  const [data, setData] = useState(null);
  const [dataTotal, setDataTotal] = useState(null);

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const fetchedData = await doctors();
        setData(fetchedData);
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
    fetchDataTotalAsync();
    fetchDataAsync();
  }, []);

  if (!data || !dataTotal) {
    // Render loading state or return null if you don't want to render anything
    return <Loader />;
  }
  return (
    <>
      <Navbar
        navDark={true}
        manuClass="navigation-menu nav-left"
        containerClass="container"
      />
      <section className="bg-half-150 bg-light d-table w-100">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4">فريق الأطباء</h3>
                <p className="para-desc mx-auto text-muted">
                  يتم اختيار أعضاء الفريق الطبي بعناية لضمان توفير أفضل مستوى من
                  الرعاية الصحية للمرضى. يعمل الأطباء في الفريق بتنسيق وتعاون
                  وثيق لتشخيص الحالات الطبية، ووضع خطط العلاج المناسبة، وتقديم
                  الرعاية اللازمة للمرضى بشكل فعال ومتكامل. تعتبر فرق الأطباء
                  جزءًا أساسيًا من نظام الرعاية الصحية وتسهم في تحسين صحة
                  المجتمع بشكل عام من خلال تقديم الخدمات الطبية عالية الجودة
                  والمعالجة الشاملة للمرضى.
                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-transparent mb-0">
                    <li className="breadcrumb-item">
                      <Link href="/">الرئيسية</Link>
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                      الأطباء
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            {data.map((item, index) => {
              return (
                <div
                  className="col-xl-3 col-lg-3 col-md-6 mt-4 pt-2"
                  key={index}
                >
                  <div className="card team border-0 rounded shadow overflow-hidden">
                    <div className="team-img position-relative">
                      <Image
                        src={item.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "300px" }}
                        className="img-fluid"
                        alt=""
                      />
                      <ul className="list-unstyled team-social mb-0">
                        <li>
                          <Link
                            href="#"
                            className="btn btn-icon btn-pills btn-soft-primary"
                          >
                            <FiFacebook className="icons" />
                          </Link>
                        </li>
                        <li className="mt-2">
                          <Link
                            href="#"
                            className="btn btn-icon btn-pills btn-soft-primary"
                          >
                            <FiLinkedin className="icons" />
                          </Link>
                        </li>
                        <li className="mt-2">
                          <Link
                            href="#"
                            className="btn btn-icon btn-pills btn-soft-primary"
                          >
                            <FiGithub className="icons" />
                          </Link>
                        </li>
                        <li className="mt-2">
                          <Link
                            href="#"
                            className="btn btn-icon btn-pills btn-soft-primary"
                          >
                            <FiTwitter className="icons" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body content text-center">
                      <Link
                        href="#"
                        className="title text-dark h5 d-block mb-0"
                      >
                        {item.name}
                      </Link>
                      <small className="text-muted speciality">
                        {item.specialty}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer data={dataTotal} />
      <ScrollTop />
    </>
  );
}
