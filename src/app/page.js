"use client";
import Image from "next/image";
import Link from "next/link";

import Navbar from "./components/navbar";
import FeatureOne from "./components/features/featuresOne";
import CtaOne from "./components/cta/ctaOne";
import Patients from "./components/patients";
import Footer from "./components/footer";
import ScrollTop from "./components/scrollTop";
import AboutImage from "./components/aboutImage";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper.scss';
// import 'swiper/modules/pagination/pagination.min.css'

import {
  RiArrowRightLine,
  FiFacebook,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiCalendar,
  FiClock,
  BiLeftArrowAlt,
} from "./assets/icons/vander";
import AOS from "aos";

// import "aos/dist/aos.css";
import { FetchCategories, apiUrl, fetchData } from "./data/dataApi";
import { useEffect, useState } from "react";
import Departments from "./departments/page";
import { useRouter } from "next/navigation";
import Loader from "./components/loader";
import { ToastContainer } from "react-toastify";
// import imageDoctor from "../../public/images/doctors/01.jpg";
import "react-toastify/dist/ReactToastify.css";
import Dotdotdot from "react-dotdotdot";

export default function Home() {
  const [data, setData] = useState(null);
  // const [categories, setCategories] = useState(null);
  const router = useRouter();
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

  // console.log(key);
  useEffect(() => {
    const existKey = localStorage.getItem("client_key");
    if (!existKey) {
      const key = generateUUID();
      localStorage.setItem("client_key", key);
    }
  }, []);
  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        // console.log(fetchedData);
        localStorage.setItem(
          "appointment_phone",
          fetchedData.bookAppointment["whatsapp-number"]
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    // async function fetchCategoriesAsync() {
    //   try {
    //     const fetchedCategories = await FetchCategories();
    //     setCategories(fetchedCategories);
    //   } catch (error) {
    //     console.error("Error fetching categories:", error.message);
    //   }
    // }

    fetchDataAsync();
    // fetchCategoriesAsync();
  }, []);

  if (!data) {
    // Render loading state or return null if you don't want to render anything
    return (
      // <div
      //   className="bg-overlay"
      //   style={{
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     height: "100vh",
      //   }}
      // >
      //   <div class="spinner-grow text-warning" s role="status">
      //     <span class="sr-only"></span>
      //   </div>
      // </div>
      <Loader />
    );
  }
  // console.log(data);
  const handleClick = (id) => {
    localStorage.setItem("categoryId", id);
  };
  return (
    <>
      <ToastContainer />

      <Navbar
        manuClass="navigation-menu nav-left nav-light"
        containerClass="container"
      />

      <section
        id="hero"
        className="bg-half-260 d-table w-100"
        style={{
          backgroundImage: `url('${data.hero["main_image"]}')`,
          padding: "205px 0px",
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
                <h4
                  className="display-4 fw-bold text-white title-dark mt-3 mb-4"
                  data-aos="fade-up" // حركة النص
                >
                  {data.hero
                    ? data.hero["brand-name"]
                    : "Brand Name Not Available"}
                </h4>
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
                data-aos="zoom-in-down"
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
              <div className="row" dir="rtl">
                <Swiper
                  spaceBetween={10} // Space between slides
                  slidesPerView={1} // Shows one slide at a time
                  breakpoints={{
                    // Adjust based on screen width
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                  loop={true} // Loop through the slides
                  navigation // Navigation arrows
                  pagination={{ clickable: true }} // Dots pagination
                >
                  {data.offers.map((item, index) => {
                    const timestamp = item.end_date;
                    const dateObj = new Date(timestamp);
                    const year = dateObj.getUTCFullYear();
                    const month = String(dateObj.getUTCMonth() + 1).padStart(
                      2,
                      "0"
                    );
                    const day = String(dateObj.getUTCDate()).padStart(2, "0");
                    const formattedDate = `${year}-${month}-${day}`;

                    return (
                      <SwiperSlide key={index}>
                        <div
                          className="card blog blog-primary border-0 shadow rounded overflow-hidden"
                          style={{ height: "18rem" }}
                        >
                          <Link href={`/offers-all`} style={{height:"100%"}}>
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
                              // className="img-fluid m-1"
                              className="img-fluid image-offer  m-1"
                              alt=""
                            />
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
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

      <section className="section" dir="rtl">
        <div id="about"></div>
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
                    حول شركتنا
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
                      <Link
                        href="/doctor-team-one"
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
                    style={{ height: "28rem" }}
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
                        className="text-dark title h5"
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

      {/* <section className="py-4 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            {partners.map((item, index) => {
              return (
                <div
                  className="col-lg-2 col-md-2 col-6 text-center py-4"
                  key={index}
                >
                  <Image
                    src={item}
                    width={125}
                    height={25}
                    className="avatar avatar-client"
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section> */}
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

      <Footer data={data} />
      <ScrollTop />
    </>
  );
}
