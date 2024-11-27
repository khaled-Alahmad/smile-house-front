"use client";
import Image from "next/image";
import Link from "next/link";

import FeatureOne from "./components/features/featuresOne";
import CtaOne from "./components/cta/ctaOne";
import Patients from "./components/patients";
import ScrollTop from "./components/scrollTop";
import AboutImage from "./components/aboutImage";

import {
  FiCalendar,
  FiClock,
  BiLeftArrowAlt,
  FiTwitter,
  FiHeart,
  RiMapPinLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
} from "./assets/icons/vander";
import AOS from "aos";

import { fetchData } from "./data/dataApi";
import { useEffect, useState } from "react";
import Loader from "./components/loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedProduct from "./components/pharmacy/relatedProduct";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
  const [data, setData] = useState(null);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out-sine",
      once: false, // السماح بتكرار التأثير عند العودة
    });
    return () => {
      AOS.refreshHard();
    };
  }, []);

  const handleClick = (id) => {
    setCookie("categoryId", id);
    localStorage.setItem("categoryId", id);
  };

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  useEffect(() => {
    const existKey = localStorage.getItem("client_key");
    const existKey1 = getCookie("client_key");

    if (!existKey || !existKey1) {
      const key = generateUUID();
      setCookie("client_key", key);
      localStorage.setItem("client_key", key);
    }
  }, []);

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        setDevice(fetchedData.medical_device);
        localStorage.setItem(
          "appointment_phone",
          fetchedData.bookAppointment["whatsapp-number"]
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchDataAsync();
  }, []);

  if (!data) {
    return <Loader />;
  }
  return (
    <>
      <ToastContainer />

      <section
        id="hero"
        className="bg-half-260 d-table w-100"
        style={{
          backgroundImage: `url('${data.hero["main_image"]}')`,
          padding: "205px 0px",
          height: "100vh",
        }}
        dir="rtl"
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-lg-0">
            <div className="col-12">
              <div className="heading-title" dir="rtl">
                <Image
                  src="/images/logo.png"
                  width={54}
                  height={50}
                  alt=""
                  data-aos="fade-in" // حركة الشعار
                />
                <h1
                  className="display-4 fw-bold text-white title-dark mt-3 mb-4"
                  data-aos="fade-up" // حركة النص
                >
                  {data.hero
                    ? data.hero["brand-name"]
                    : "Brand Name Not Available"}
                </h1>
                <p
                  className="para-desc text-white-50 mb-0"
                  data-aos="fade-up"
                  data-aos-delay="300" // تأخير في الحركة
                >
                  {data.hero ? data.hero["title"] : "title Not Available"}
                </p>

                <div className="mt-4 pt-2" data-aos="zoom-in">
                  <Link href="/booking-appointment" className="btn btn-primary">
                    احجز الآن
                  </Link>
                  <p className="text-white-50 mb-0 mt-2">
                    تطبق الشروط والأحكام. يرجى القراءة{" "}
                    <Link href="#" className="text-white-50">
                      الأحكام والشروط{" "}
                      <i className="ri-arrow-right-line align-middle"></i>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {data.offers.length !== 0 && (
        <>
          <section className="section" dir="rtl">
            <div className="container mb-60">
              <div
                className="row justify-content-center"
                // data-aos="zoom-in-down"
              >
                <div className="col-12">
                  <div className="section-title text-center mb-4 pb-2">
                    <span className="badge rounded-pill bg-soft-primary mb-3">
                      عروضنا
                    </span>
                    <h4 className="title mb-4">العروض المخصصة لك</h4>
                    <p className="text-muted mx-auto para-desc mb-0">
                      نحن في سمايل هاوس نقدم لك افضل العروض المناسبة لك.
                    </p>
                  </div>
                </div>
              </div>

              <RelatedProduct offer data={data.offers} />
              {/* </div> */}
              <div className="col-12 mt-4 pt-2 text-center" data-aos="fade-up">
                <Link href="/offers-all" className="btn btn-primary">
                  عرض المزيد
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      <div id="departments"></div>
      <div className="section " dir="rtl">
        <div className="container   mb-60">
          <div className="row justify-content-center" data-aos="zoom-in-down">
            <div className="col-12">
              <div className="section-title mb-4  text-center">
                <span className="badge rounded-pill bg-soft-primary mb-3">
                  الأقسام
                </span>
                <h4 className="title mb-4">خدماتنا الطبية</h4>
                <p className="text-muted mx-auto para-desc mb-0">
                  دكتور متميز إذا كنت بحاجة إلى تقديم مساعدة فعالة وفورية لأحد
                  أفراد أسرتك، سواء في حالات الطوارئ أو للحصول على استشارة
                  بسيطة.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {data.categories.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-6 my-2"
                  data-aos="fade-up" // تأثير الحركات عند الظهور
                  data-aos-delay={index * 100} // تأخير الحركة بناءً على الفهرس
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
                        alt={item.name} // إضافة نص بديل للصورة
                      />
                    </div>
                    <div className="card-body p-3 d-flex flex-column">
                      <Link href="/departments" legacyBehavior>
                        <a
                          onClick={() => handleClick(item.id)}
                          className="title text-dark h5"
                        >
                          {item.name}
                        </a>
                      </Link>
                      <p className="text-muted mt-3 flex-grow-1">
                        {item.description}
                      </p>

                      {/* زر عرض الخدمات مثبت في الأسفل */}
                      <Link
                        href="/departments"
                        className="link mt-auto"
                        legacyBehavior
                      >
                        <a onClick={() => handleClick(item.id)}>
                          عرض الخدمات
                          <BiLeftArrowAlt className="align-middle" />
                        </a>
                      </Link>
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
      </div>
      <div id="medical"></div>
      <div className="section " dir="rtl">
        <div className="container   mb-60">
          <div className="row justify-content-center" data-aos="zoom-in-down">
            <div className="col-12">
              <div className="section-title mb-4  text-center">
                <span className="badge rounded-pill bg-soft-primary mb-3">
                  الأجهزة
                </span>
                <h4 className="title mb-4">الأجهزة الطبية</h4>
                <p className="text-muted mx-auto para-desc mb-0">
                  تقدم الأجهزة الطبية حلولاً مبتكرة للتشخيص والعلاج، مما يساهم
                  في تحسين جودة الرعاية الصحية ودعم الأطباء في تقديم خدمات فعالة
                  وسريعة للمرضى.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {device.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-6 col-md-12 col-12 my-2"
                  data-aos="fade-up" // تأثير الحركات عند الظهور
                  data-aos-delay={index * 100} // تأخير الحركة بناءً على الفهرس
                >
                  <div className="col-lg-12 col-md-12 mt-4 pt-2" key={index}>
                    <div className="card team border-0 rounded shadow overflow-hidden">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div className="team-person position-relative overflow-hidden">
                            <Image
                              src={item.images[0].path}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "100%", height: "auto" }}
                              className="img-fluid"
                              alt=""
                            />
                            {/* <ul className="list-unstyled team-like">
                              <li>
                                <Link
                                  href="#"
                                  className="btn btn-icon btn-pills btn-soft-danger"
                                >
                                  <FiHeart className="icons" />
                                </Link>
                              </li>
                            </ul> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body" dir="rtl">
                            <Link
                              href="#"
                              className=" text-dark h6 d-block mb-0 "
                            >
                              {item.name}
                            </Link>
                            {/* <small className="text-muted speciality">
                              {item.speciality}
                            </small> */}
                            {/* <div className="d-flex justify-content-between align-items-center mt-2">
                              <ul className="list-unstyled mb-0">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning"></i>
                                </li>
                              </ul>
                              <p className="text-muted mb-0">5 Star</p>
                            </div> */}
                            <ul className="list-unstyled mt-4 mb-0" dir="rtl">
                              <li className="d-flex ms-0 mt-2">
                                <small className="text-bold me-2">
                                  بلد المنشأ:
                                </small>
                                <small className="text-muted me-2">
                                  {item.place_origin}
                                </small>
                              </li>
                              <li className="d-flex ms-0 mt-2">
                                <small className="text-bold me-2">
                                  اسم الماركة:
                                </small>
                                <small className="text-muted me-2">
                                  {item.brand_name}
                                </small>
                              </li>
                              <li className="d-flex ms-0 mt-2">
                                <small className="text-bold me-2">السعر:</small>
                                <small className="text-muted me-2">
                                  {item.price}
                                </small>
                              </li>
                            </ul>
                            {/* <ul className="list-unstyled mt-2 mb-0">
                              <li className="list-inline-item">
                                <Link
                                  href="#"
                                  className="btn btn-icon btn-pills btn-soft-primary"
                                >
                                  <FiFacebook className="icons" />
                                </Link>
                              </li>
                              <li className="mt-2 list-inline-item">
                                <Link
                                  href="#"
                                  className="btn btn-icon btn-pills btn-soft-primary"
                                >
                                  <FiLinkedin className="icons" />
                                </Link>
                              </li>
                              <li className="mt-2 list-inline-item">
                                <Link
                                  href="#"
                                  className="btn btn-icon btn-pills btn-soft-primary"
                                >
                                  <FiGithub className="icons" />
                                </Link>
                              </li>
                              <li className="mt-2 list-inline-item">
                                <Link
                                  href="#"
                                  className="btn btn-icon btn-pills btn-soft-primary"
                                >
                                  <FiTwitter className="icons" />
                                </Link>
                              </li>
                            </ul> */}
                            <Link
                              href={`/medical-devices/${item.id}`}
                              className="link btn btn-primary btn-sm mt-4"
                              // legacyBehavior
                            >
                              {/* <a onClick={() => handleClick(item.id)}> */}
                              عرض التفاصيل
                              <BiLeftArrowAlt className="align-middle" />
                              {/* </a> */}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="col-12 mt-4 pt-2 text-center" data-aos="fade-up">
              <Link href="/medical-devices" className="btn btn-primary">
                عرض المزيد
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="about"></div>
      <section className="section" dir="rtl">
        <div className="container mt-50 ">
          <div className="row align-items-center">
            <AboutImage
              colClass="col-lg-5 col-md-6"
              imageSrc={data.attachment["about-image"]}
              VideoSrc={data.attachment["second-video"]}
              // إضافة تأثير الحركات
            />

            <div className="col-lg-7 col-md-6 mt-4 mt-lg-0 pt- pt-lg-0">
              <div className="ms-lg-4">
                <div className="section-title">
                  <h4
                    className="title mb-4"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    حول مؤسستنا
                  </h4>
                  <p
                    className="text-muted para-desc"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay="200"
                  >
                    {data.about
                      ? data.about["introduction"]
                      : "introduction  Not Available"}
                  </p>
                  <p
                    className="text-muted para-desc mb-0"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay="400"
                  >
                    {data.about
                      ? data.about["vision_mission"]
                      : "vision mission  Not Available"}
                  </p>
                </div>

                <div
                  className="mt-4"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="600"
                >
                  <Link href="/aboutus" className="btn btn-primary">
                    اقرأ المزيد <BiLeftArrowAlt className="align-middle" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <DrTimeTable /> */}
      <div id="doctors"></div>
      <section className="section ">
        <div className="container">
          <div className="row justify-content-center" data-aos="zoom-in-down">
            <div className="col-12">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-4">الأطباء</h4>
                <p className="text-muted mx-auto para-desc mb-0">
                  دكتور متميز إذا كنت بحاجة إلى تقديم مساعدة فعالة وفورية لأحد
                  أفراد أسرتك، سواء في حالات الطوارئ أو للحصول على استشارة
                  بسيطة.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {data.doctors.slice(0, 4).map((item, index) => {
              return (
                <div
                  className="col-lg-3 col-md-4 col-6 mt-4 pt-2"
                  key={index}
                  data-aos="fade-up"
                  data-aos-duration="800"
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
                    </div>
                    <div className="card-body content text-end">
                      <span
                        // href="/#"
                        className="title text-dark h5 d-block mb-0"
                      >
                        {item.name}
                      </span>
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

      <CtaOne data={data} />
      <div id="patients"></div>
      <section className="section">
        <div className="container">
          <div className="row justify-content-center" data-aos="zoom-in-down">
            <div className="col-12">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-4">المرضى يقولون</h4>
                <p className="text-muted mx-auto para-desc mb-0">
                  آراء المرضى حول تجربتهم مع خدماتنا الطبية والأطباء.
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8 mt-4 pt-2 text-center">
              <Patients data={data.customersOpinions} />
            </div>
          </div>
        </div>
        <div id="blogs"></div>
        <div className="container mt-100 mt-60">
          <div className="row justify-content-center" data-aos="zoom-in-down">
            <div className="col-12">
              <div className="section-title text-center mb-4 pb-2">
                <span className="badge rounded-pill bg-soft-primary mb-3">
                  اقرأ الأخبار
                </span>
                <h4 className="title mb-4">آخر الأخبار والمدونات</h4>
                <p className="text-muted mx-auto para-desc mb-0">
                  تابع آخر الأخبار والمدونات للحصول على تحديثات ومقالات حول
                  الصحة والعناية الطبية.
                </p>
              </div>
            </div>
          </div>

          <div className="row" dir="rtl">
            {/* {blogData.slice(0, 3).map((item, index) => {*/}
            {data.bolgs.slice(0, 4).map((item, index) => {
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
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <div
                    className="card blog blog-primary border-0 shadow rounded overflow-hidden d-flex flex-column"
                    style={{ height: "24rem" }}
                  >
                    <Image
                      src={item.image}
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
                    <div className="card-body p-4 d-flex flex-column">
                      <ul className="list-unstyled mb-2">
                        <li className="list-inline-item text-muted small d-inline-flex align-items-center ms-2">
                          <FiCalendar className="text-dark h6 ms-1 mb-0" />
                          {itemR.date}
                        </li>
                        <li
                          className="list-inline-item text-muted small d-inline-flex align-items-center"
                          style={{ marginInlineStart: "0px" }}
                        >
                          <FiClock className="text-dark h6 ms-1 mb-0 " />
                          {itemR.time}
                        </li>
                      </ul>
                      <Link
                        href={`/blog-detail/${item.id}`}
                        className="text-dark title h6"
                      >
                        {item.title}
                      </Link>

                      {/* post-meta section */}
                      {/* <div className="post-meta justify-content-between mt-3 d-flex flex-column flex-lg-row mt-auto mb-2">
                        <ul className="list-unstyled mb-0 d-flex flex-row flex-lg-row">
                          <li className="list-inline-item ms-2 mb-0">
                            <Link href="#" className="text-muted like">
                              <i className="mdi mdi-heart-outline ms-1"></i>
                              {item.like}
                            </Link>
                          </li>
                          <li className="list-inline-item ms-2 mb-0">
                            <Link href="#" className="text-muted comments">
                              <i className="mdi mdi-comment-outline ms-1"></i>
                              {item.comment}
                            </Link>
                          </li>
                        </ul>
                      </div> */}

                      {/* زر قراءة المزيد مثبت في الأسفل */}
                      <Link
                        href={`/blog-detail/${item.id}`}
                        className="link mt-auto "
                      >
                        قراءة المزيد{" "}
                        <i className="mdi mdi-chevron-left align-middle"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FeatureOne data={data.info} />
      <div className="whatsapp-btn">
        <a
          href={`https://wa.me/${data.bookAppointment["whatsapp-number"]}`} // استبدل YOUR_PHONE_NUMBER برقم هاتف واتساب الخاص بك بصيغة دولية بدون '+'.
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      {/* <ScrollTop /> */}
    </>
  );
}
