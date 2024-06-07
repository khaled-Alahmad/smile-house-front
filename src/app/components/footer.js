import React from "react";
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
  BsFillPhoneLandscapeFill,
  FiPhoneCall,
} from "../assets/icons/vander";

export default function Footer({ data }) {
  if (!data) {
    return <div>lodaing...</div>;
  }
  return (
    <>
      <footer className="" dir="rtl">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-4 mb-0 mb-md-4 pb-0 pb-md-2">
              <Link href="#" className="logo-footer">
                {/* <Image
                  src="/images/logo-light.png"
                  width={115}
                  height={22}
                  alt=""
                /> */}
                <Image src="/images/logo.png" width={60} height={60} alt="" />
                <h5 className="d-inline me-lg-2">
                  {data.hero["brand-name"] ?? "سمايل هاوس"}
                </h5>
              </Link>
              <p className="mt-4 ms-xl-5">
                {/* Great doctor if you need your family member to get effective
                immediate assistance, emergency treatment or a simple
                consultation. */}
                {data.footer["terms_conditions"] ??
                  "Great doctor if you need your family member to get effective            immediate assistance, emergency treatment or a simple                consultation."}
              </p>
            </div>

            <div className="col-xl-7 col-lg-8 col-md-12">
              <div className="row">
                {/* <div className="col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <h5 className="footer-head">Company</h5>
                  <ul className="list-unstyled footer-list mt-4">
                    <li>
                      <Link href="/aboutus" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> About us
                      </Link>
                    </li>
                    <li>
                      <Link href="/departments" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/doctor-team-two" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> Team
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-detail" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> Project
                      </Link>
                    </li>
                    <li>
                      <Link href="/blogs" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> Login
                      </Link>
                    </li>
                  </ul>
                </div> */}

                <div className="col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <h5 className="footer-head">الأقسام</h5>
                  <ul className="list-unstyled footer-list mt-4">
                    <li>
                      <Link href="#hero" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> الرئيسية
                      </Link>
                    </li>
                    <li>
                      <Link href="#about" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> عنا
                      </Link>
                    </li>
                    <li>
                      <Link href="#departments" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> الخدمات
                      </Link>
                    </li>
                    <li>
                      <Link href="#doctors" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> الأطباء
                      </Link>
                    </li>
                    <li>
                      <Link href="#patients" className="text-foot">
                        <i className="mdi mdi-chevron-left ms-1"></i> المرضى
                      </Link>
                    </li>
                    <li>
                      <Link href="#blogs" className="text-foot">
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
                          data.contact["whatsapp"].replace("+", "00") ?? "#"
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
