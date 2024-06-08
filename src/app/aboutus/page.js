"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/navbar";
import AboutImage from "../components/aboutImage";
import ScrollTop from "../components/scrollTop";
import Footer from "../components/footer";

import {
  FiArrowRight,
  FiFacebook,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiArrowLeft,
} from "../assets/icons/vander";

import { medicalServices, doctorData } from "../data/data";
import { FetchCategories, fetchData } from "../data/dataApi";
import Loader from "../components/loader";

export default function AboutUs() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const fetchedData = await fetchData();
        console.log("Fetched data:", fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    async function fetchCategoriesAsync() {
      try {
        const fetchedCategories = await FetchCategories();
        console.log("Fetched categories:", fetchedCategories);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    }
    fetchDataAsync();
    fetchCategoriesAsync();
  }, []);

  if (!data || !categories) {
    return (
      <>
        {" "}
        <Loader />
      </>
    );
  }

  console.log("about :", data);
  return (
    <>
      <Navbar
        manuClass="navigation-menu nav-light nav-left"
        containerClass="container"
      />
      <section
        className="bg-half-170 d-table w-100"
        style={{
          backgroundImage: `url('/images/bg/about.jpg')`,
          backgroundPosition: "center",
        }}
        dir="rtl"
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4 text-white title-dark">
                  معلومات عنا
                </h3>
                <p className="para-desc mx-auto text-white-50">
                  طبيب رائع إذا كنت بحاجة إلى حصول أحد أفراد أسرتك على مساعدة
                  فورية فعالة أو علاج طارئ أو استشارة بسيطة.
                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-light rounded mb-0 py-1 px-2">
                    <li className="breadcrumb-item active" aria-current="page">
                      معلومات عنا
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
          <div className="row align-items-center">
            <AboutImage
              colClass="col-lg-5 col-md-6"
              imageSrc={data.attachment["about-image"]}
              VideoSrc={data.attachment["second-video"]}
            />

            <div className="col-lg-7 col-md-6 mt-4 mt-lg-0 pt- pt-lg-0">
              <div className="ms-lg-4">
                <div className="section-title me-lg-5">
                  <span className="badge rounded-pill bg-soft-primary">
                    عن{" "}
                    {data.hero
                      ? data.hero["brand-name"]
                      : "Brand Name Not Available"}
                  </span>
                  <h4 className="title mt-3 mb-4">
                    خدمات ممتازة وصحة أفضل
                    <br />
                    بواسطة خبراءنا
                  </h4>
                  <p className="para-desc text-muted">
                    {/* طبيب رائع إذا كنت بحاجة إلى توفير المساعدة الفورية والفعّالة
                    لأحد أفراد عائلتك، سواء كان ذلك في حالات الطوارئ أو العلاج
                    الفوري أو الاستشارة البسيطة. */}
                    {data.about
                      ? data.about["introduction"]
                      : "Item Not Available"}
                  </p>
                  <p className="para-desc text-muted">
                    {/* تتميز خدمات سمايل هاوس بالاعتماد على أحدث التقنيات الطبية
                    والمعدات الطبية الحديثة، مما يسهم في تحسين جودة الخدمات
                    المقدمة وتحقيق أفضل النتائج العلاجية للمرضى. كما يوفر المركز
                    بيئة طبية آمنة ومريحة للمرضى، مع التركيز على توفير تجربة
                    علاجية إيجابية ومريحة لكل فرد يطلب الرعاية الطبية في سمايل
                    هاوس. */}
                    {data.about
                      ? data.about["vision_mission"]
                      : "Item Not Available"}
                  </p>
                  {/* <div className="mt-4">
                    <Link href="#" className="btn btn-soft-primary">
                      المزيد من التفاصيل
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title mb-4 pb-2 text-center">
                <span className="badge rounded-pill bg-soft-primary mb-3">
                  الأقسام
                </span>
                <h4 className="title mb-4">خدماتنا الطبية</h4>
                <p className="text-muted mx-auto para-desc mb-0">
                  خدماتنا الطبية توفر مجموعة واسعة من العلاجات والرعاية الصحية
                  المتخصصة، مقدمة من قبل فريق من الأطباء المتخصصين ذوي الخبرة.
                  نسعى جاهدين لضمان تقديم رعاية صحية عالية الجودة وشاملة لتلبية
                  احتياجاتك الصحية بشكل كامل.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {categories.slice(0, 8).map((item, index) => {
              return (
                <div className="col-xl-3 col-md-4 col-12 mt-4 pt-2" key={index}>
                  <div className="card features feature-primary border-0">
                    <div className="icon text-center rounded-md">
                      <Image
                        src={item.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "100%" }}
                        className="h3 mb-0 rounded" 
                        alt=""
                      />
                    </div>
                    <div className="card-body p-0 mt-3">
                      <Link href="#" className="title text-dark h5">
                        {item.title}
                      </Link>
                      <p className="text-muted mt-3">{item.description}</p>
                      {/* <Link href="#" className="link">
                        اقرأ المزيد{" "}
                        <FiArrowLeft className="mb-0 align-middle" />
                      </Link> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-4">الأطباء</h4>
                <p className="text-muted mx-auto para-desc mb-0">
                  الأطباء الذين نقدمهم في فريقنا هم أخصائيون متميزون يتمتعون
                  بخبرة واسعة في مجالاتهم المختصة. يتم اختيارهم بعناية لضمان
                  تقديم أفضل مستوى من الرعاية الصحية لمرضانا. يتمتعون بالتفاني
                  والتفهم والتعاطف في التعامل مع المرضى، مما يجعل الخبرة الطبية
                  لديهم لا تضاهى. تلتزم فرقنا الطبية بتقديم أفضل الخدمات الطبية
                  لضمان تحقيق أفضل النتائج لصحة المرضى.
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            {data.doctors.slice(0, 4).map((item, index) => {
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
                        sizes="100vh"
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
                        {item.speciality}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="col-12 mt-4 pt-2 text-center">
              <Link href="/doctor-team" className="btn btn-primary">
                عرض المزيد
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer data={data} />
      <ScrollTop />
    </>
  );
}
