"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/navbar";
import AboutImage from "../components/aboutImage";
import ScrollTop from "../components/scrollTop";
import Footer from "../components/footer";
import AOS from "aos";

import {
  FiArrowRight,
  FiFacebook,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiArrowLeft,
  FiCalendar,
  FiClock,
} from "../assets/icons/vander";

import { medicalServices, doctorData } from "../data/data";
import { FetchCategories, fetchData } from "../data/dataApi";
import Loader from "../components/loader";
import Dotdotdot from "react-dotdotdot";

export default function AboutUs() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
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
    async function fetchDataAsync() {
      try {
        const fetchedData = await fetchData();
        //console.log("Fetched data:", fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    async function fetchCategoriesAsync() {
      try {
        const fetchedCategories = await FetchCategories();
        //console.log("Fetched categories:", fetchedCategories);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    }
    fetchDataAsync();
    fetchCategoriesAsync();
  }, []);

  if (!data || !categories) {
    return <Loader />;
  }

  //console.log("about :", data);
  return (
    <>
      {/* <Navbar
        manuClass="navigation-menu nav-light nav-left"
        containerClass="container"
      /> */}
      <section
        className="bg-half-170 d-table w-100"
        style={{
          backgroundImage: `url('/images/16.webp')`,
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
              const timestamp = item.created_at;

              // Create a Date object
              const dateObj = new Date(timestamp);

              // Extract date parts
              const year = dateObj.getUTCFullYear();
              const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
              const day = String(dateObj.getUTCDate()).padStart(2, "0");

              // Extract time parts
              const hours = String(dateObj.getUTCHours()).padStart(2, "0");
              const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
              const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

              // Format the date and time
              const formattedDate = `${year}-${month}-${day}`;
              const formattedTime = `${hours}:${minutes}:${seconds}`;

              // Assign the formatted date and time to item
              const itemR = {
                date: formattedDate,
                time: formattedTime,
              };
              return (
                <div
                  className="col-lg-3 col-md-4 col-6 mt-4 pt-2"
                  key={index}
                  data-aos="fade-up" // تأثير الحركات عند الظهور
                  data-aos-delay={index * 100} // تأخير الحركة بناءً على الفهرس
                >
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
                      className="card-body p-4"
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
                      <Dotdotdot clamp={10}>
                        <p className="text-dark description d-block mt-3">
                          {item.description}
                        </p>
                      </Dotdotdot>

                      <ul className="list-unstyled mt-4  ">
                        <li className="list-inline-item text-muted small d-inline-flex align-items-center">
                          <p href="#" className="text-muted ms-2">
                            ينتهي :
                          </p>
                        </li>
                        <li className="list-inline-item text-muted small ms-3 d-inline-flex align-items-center">
                          <FiCalendar className="text-dark h6 ms-1 mb-0" />
                          {itemR.date}
                        </li>
                        <li className="list-inline-item text-muted small d-inline-flex align-items-center">
                          <FiClock className="text-dark h6 ms-1 mb-0 " />
                          {itemR.time}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="col-12 mt-4 pt-2 text-center" data-aos="fade-up">
              <Link href="/departments-all" className="btn btn-primary">
                عرض المزيد
              </Link>
            </div>
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

          <div className="row align-items-end">
            {data.doctors.slice(0, 4).map((item, index) => {
              return (
                <div
                  className="col-lg-3 col-md-4 col-6  mt-4 pt-2"
                  key={index}
                  data-aos="fade-up" // تأثير الحركات عند الظهور
                  data-aos-delay={index * 100} // تأخير الحركة بناءً على الفهرس
                >
                  <div
                    className="card blog border-0 rounded shadow overflow-hidden"
                    style={{
                      height: "100%",
                    }}
                  >
                    <div className="team-img position-relative">
                      <Image
                        src={item.image}
                        width={0}
                        height={0}
                        sizes="100vh"
                        style={{
                          width: "100%",
                          height: "15rem",
                          objectFit: "cover",
                        }}
                        className="img-fluid"
                        alt=""
                      />
                      {/* <ul className="list-unstyled team-social mb-0">
                      <li>
                        <Link
                          href="#"
                          className="btn btn-icon btn-pills btn-soft-primary"
                        >
                          <FiFacebook className="icons" />
                        </Link>
                      </li>
                      <li className="mt-2 ms-0">
                        <Link
                          href="#"
                          className="btn btn-icon btn-pills btn-soft-primary"
                        >
                          <FiLinkedin className="icons" />
                        </Link>
                      </li>
                      <li className="mt-2 ms-0">
                        <Link
                          href="#"
                          className="btn btn-icon btn-pills btn-soft-primary"
                        >
                          <FiGithub className="icons" />
                        </Link>
                      </li>
                      <li className="mt-2 ms-0">
                        <Link
                          href="#"
                          className="btn btn-icon btn-pills btn-soft-primary"
                        >
                          <FiTwitter className="icons" />
                        </Link>
                      </li>
                    </ul> */}
                    </div>
                    <div className="card-body content text-end  ">
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

            <div className="col-12 mt-4 pt-2 text-center">
              <Link href="/doctor-team" className="btn btn-primary">
                عرض المزيد
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer data={data} /> */}
      {/* <ScrollTop /> */}
    </>
  );
}
