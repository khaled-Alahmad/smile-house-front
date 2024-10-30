"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FiFacebook,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPhoneCall,
} from "../assets/icons/vander";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function Footer() {
  const [data, setData] = useState(null); // state to store fetched data

  useEffect(() => {
    const clientKey = localStorage.getItem("client_key"); // Use localStorage.getItem
    console.log(clientKey);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://smilehouse.serv00.net/api/home?clientKey=${clientKey}`
        );
        setData(response.data.data); // Set the fetched data
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (clientKey) {
      fetchData();
    }
  }, []); // fetch data when clientKey changes

  const current = usePathname();
  const [manu, setManu] = useState("");
  const [isMenu, setIsMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setManu(current);
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [current]);

  if (!data) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <>
      <footer className="" dir="rtl">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-4 mb-0 mb-md-4 pb-0 pb-md-2">
              <Link href="#" className="logo-footer">
                <Image src="/images/logo.png" width={60} height={60} alt="" />
                <h5 className="d-inline me-lg-2">
                  {data.hero["brand-name"] ?? "سمايل هاوس"}
                </h5>
              </Link>
              <p className="mt-4 ms-xl-5">
                {data.footer["terms_conditions"] ??
                  "Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation."}
              </p>
            </div>

            <div className="col-xl-7 col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <h5 className="footer-head">الأقسام</h5>
                  <ul className="list-unstyled footer-list mt-4">
                    <li>
                      <Link href="/" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> الرئيسية
                      </Link>
                    </li>
                    <li>
                      <Link href={`/aboutus`} className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> عنا
                      </Link>
                    </li>
                    <li>
                      <Link href={`/departments-all`} className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> الخدمات
                      </Link>
                    </li>
                    <li>
                      <Link href={`/doctor-team`} className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> الأطباء
                      </Link>
                    </li>
                    <li>
                      <Link href={`/`} className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> المرضى
                      </Link>
                    </li>
                    <li>
                      <Link href={`/`} className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> الأخبار
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <h5 className="footer-head">معلومات التواصل</h5>
                  <ul className="list-unstyled footer-list mt-4">
                    <li className="d-flex align-items-center">
                      <FiMail className="fea icon-sm text-foot align-middle" />
                      <Link
                        href={`mailto:${data.contact["email"]}`}
                        className="text-foot me-2"
                      >
                        {data.contact["email"]}
                      </Link>
                    </li>

                    <li className="d-flex align-items-center">
                      <FiPhone className="fea icon-sm text-foot align-middle" />
                      <Link
                        href={`tel:${data.contact["phone"]}`}
                        className="text-foot me-2"
                      >
                        {data.contact["phone"]}
                      </Link>
                    </li>

                    <li className="d-flex align-items-center">
                      <FiMapPin className="fea icon-sm text-foot align-middle" />
                      <Link href="#" className="video-play-icon text-foot me-2">
                        {data.contact["location"] ?? "غير متوفر"}
                      </Link>
                    </li>
                  </ul>

                  <ul className="list-unstyled social-icon footer-social mb-0 mt-4">
                    <li className="list-inline-item">
                      <Link
                        href={data.contact["facebook"] ?? "#"}
                        className="rounded-pill"
                        target="_blank"
                      >
                        <FiFacebook className="fea icon-sm fea-social" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        href={data.contact["instagram"] ?? "#"}
                        className="rounded-pill"
                        target="_blank"
                      >
                        <FiInstagram className="fea icon-sm fea-social" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        href={`https://wa.me/${
                          data.contact["whatsapp"] ?? "#"
                        }`}
                        target="_blank"
                        className="rounded-pill"
                      >
                        <FiPhoneCall className="fea icon-sm fea-social" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="pt-4 footer-bar">
            <div className="row align-items-center">
              <div className="text-sm-center text-center">
                <p className="mb-0">{data.footer["copyright"]}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
