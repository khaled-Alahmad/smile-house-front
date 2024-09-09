"use client";
import Image from "next/image";
import Link from "next/link";

import Navbar from "./components/navbar";
import FeatureOne from "./components/features/featuresOne";
import DrTimeTable from "./components/drTimeTable";
import CtaOne from "./components/cta/ctaOne";
import Patients from "./components/patients";
import Footer from "./components/footer";
import ScrollTop from "./components/scrollTop";
import AboutImage from "./components/aboutImage";

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
        style={{ backgroundImage: `url('${data.hero["main_image"]}')` }}
        dir="rtl"
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 mt-lg-0">
            <div className="col-12">
              <div className="heading-title" dir="rtl">
                <Image src="/images/logo.png" width={54} height={50} alt="" />
                <h4 className="display-4 fw-bold text-white title-dark mt-3 mb-4">
                  {/* قابل <br /> أفضل طبيب */}
                  {data.hero
                    ? data.hero["brand-name"]
                    : "Brand Name Not Available"}
                </h4>
                <p className="para-desc text-white-50 mb-0">
                  {/* طبيب رائع إذا كنت بحاجة إلى حصول أحد أفراد أسرتك على مساعدة
                  فورية فعالة أو علاج طارئ أو استشارة بسيطة. */}
                  {data.hero ? data.hero["title"] : "title  Not Available"}
                </p>

                <div className="mt-4 pt-2">
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
      {data.offers.length != 0 && (
        <>
          <section className="section" dir="rtl">
            <div className="container   mb-60">
              <div className="row justify-content-center">
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
                {/* {blogData.slice(0, 3).map((item, index) => {*/}
                {data.offers.slice(0, 6).map((item, index) => {
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
                    <div className="col-lg-3 col-md-4 col-12 " key={index}>
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
                          <Dotdotdot clamp={5}>
                            <p className="text-dark  d-block">
                              {item.description}
                            </p>
                          </Dotdotdot>

                          <ul className="list-unstyled ">
                            <li className="list-inline-item text-muted  d-inline-flex align-items-center">
                              <p href="#" className="text-muted ms-2">
                                ينتهي :
                              </p>
                            </li>
                            <li className="list-inline-item text-muted small ms-3 d-inline-flex align-items-center">
                              <FiCalendar className="text-dark  ms-1 mb-0" />
                              {itemR.date}
                            </li>
                            <li className="list-inline-item text-muted small d-inline-flex align-items-center">
                              <FiClock className="text-dark  ms-1 mb-0 " />
                              {itemR.time}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
      <div id="departments"></div>
      <div className="section " dir="rtl">
        <div className="container   mb-60">
          <div className="row justify-content-center">
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
                <div className="col-xl-3 col-md-4 col-6 mt-5" key={index}>
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
                      <Link href="/departments" className="link" legacyBehavior>
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
            })}
            <div className="col-12 mt-4 pt-2 text-center">
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
            />

            <div className="col-lg-7 col-md-6 mt-4 mt-lg-0 pt- pt-lg-0">
              <div className="ms-lg-4">
                <div className="section-title">
                  <h4 className="title mb-4">حول شركتنا</h4>
                  <p className="text-muted para-desc">
                    {data.about
                      ? data.about["introduction"]
                      : "introduction  Not Available"}
                  </p>
                  <p className="text-muted para-desc mb-0">
                    {data.about
                      ? data.about["vision_mission"]
                      : "vision mission  Not Available"}
                  </p>
                </div>

                <div className="mt-4">
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
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
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
                <div className="col-lg-3 col-md-4 col-6  mt-4 pt-2" key={index}>
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
          <div className="row justify-content-center">
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
          <div className="row justify-content-center">
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
                <div className="col-lg-3 col-md-4 col-6 mt-4 pt-2" key={index}>
                  <div
                    className="card blog blog-primary border-0 shadow rounded overflow-hidden"
                    style={{ height: "22rem" }}
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
                      className="img-fluid"
                      alt=""
                    />
                    <div className="card-body p-4">
                      <ul className="list-unstyled mb-2 ">
                        <li className="list-inline-item text-muted small ms-3 d-inline-flex align-items-center">
                          <FiCalendar className="text-dark h6 ms-1 mb-0" />
                          {itemR.date}
                        </li>
                        <li className="list-inline-item text-muted small d-inline-flex align-items-center">
                          <FiClock className="text-dark h6 ms-1 mb-0 " />
                          {itemR.time}
                        </li>
                      </ul>
                      <Link
                        href={`/blog-detail/${item.id}`}
                        // href={"#"}
                        className="text-dark title h5"
                      >
                        {item.title}
                      </Link>
                      <div className="post-meta d-flex justify-content-between mt-3">
                        <ul className="list-unstyled mb-0">
                          <li className="list-inline-item ms-2 mb-0">
                            <Link href="#" className="text-muted like">
                              <i className="mdi mdi-heart-outline ms-1"></i>
                              {item.like}
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link href="#" className="text-muted comments">
                              <i className="mdi mdi-comment-outline ms-1"></i>
                              {item.comment}
                            </Link>
                          </li>
                        </ul>
                        <Link href={`/blog-detail/${item.id}`} className="link">
                          قراءة المزيد{" "}
                          <i className="mdi mdi-chevron-left align-middle"></i>
                        </Link>
                      </div>
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

      <Footer data={data} />
      <ScrollTop />
    </>
  );
}
