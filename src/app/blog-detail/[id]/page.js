"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../../components/navbar";
import BlogSlider from "../../components/blogSlider";
import ScrollTop from "../../components/scrollTop";
import Footer from "../../components/footer";

import { blogData, commentData, recentPost } from "../../data/data";

import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiYoutube,
  FiGitlab,
} from "../../assets/icons/vander";
import { fetchBlogDetails, fetchData } from "@/app/data/dataApi";
import Loader from "@/app/components/loader";

export default function BlogDetail(props) {
  const [data, setData] = useState(null);

  let id = props.params.id;
  // let data = blogData.find((blog) =>blog.id === parseInt(id));
  useEffect(() => {
    async function fetchBlogDetailsAsync() {
      try {
        const fetchedData = await fetchBlogDetails(id);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchBlogDetailsAsync();
  }, [id]);
  if (!data) {
    return <Loader />;
  }
  return (
    <>
      <section
        className="bg-half-150 d-table w-100 bg-light"
        style={{ backgroundImage: `url('${data?.image}')` }}
      >
        <div className="bg-overlay bg-overlay-dark"></div>

        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title text-white mb-4">{data?.title}</h3>
                <p className="para-desc mx-auto text-muted">
                  {data?.["sub_title"]}
                </p>

                <ul className="list-unstyled mt-4">
                  <li className="list-inline-item user text-white-50 me-2">
                    {data?.["owner"] ?? "غير موجود !"}
                    <i className="mdi mdi-account ms-1"></i>{" "}
                  </li>
                </ul>
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

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-lg-7">
              <div className="text-center">
                <Image
                  src={data?.image}
                  width={500}
                  height={400}
                  // sizes="100vw"
                  // style={{ width: "100%", height: "auto" }}
                  className="img-fluid rounded shadow-dark"
                  alt=""
                />
              </div>
              <p
                className="text-body-secondary text-xl-end  mt-4 border-black border-1"
                style={{ fontSize: "1.2rem" }}
                dir="rtl"
              >
                {data?.content}
              </p>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title" dir="rtl">
                <h4 className="title mb-0">منشور له صلة:</h4>
              </div>
            </div>
          </div>

          <BlogSlider excludeId={id} />
        </div>
      </section>
      {/* <ScrollTop /> */}
    </>
  );
}
