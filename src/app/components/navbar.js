"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Offcanvas from "react-bootstrap/Offcanvas";

import {
  FiSettings,
  FiSearch,
  GrDashboard,
  LiaSignOutAltSolid,
  FiShoppingCart,
  FiDribbble,
  RiBehanceLine,
  FaFacebookF,
  FiInstagram,
  FiTwitter,
  LuMail,
  LuGlobe,
} from "../assets/icons/vander";

export default function Navbar({ navDark, manuClass, containerClass }) {
  let [show, setShow] = useState(false);
  let [showTwo, setShowTwo] = useState(false);
  let [scroll, setScroll] = useState(false);
  let [isMenu, setisMenu] = useState(false);
  let [modal, setModal] = useState(false);

  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  let handleCloseTwo = () => setShowTwo(false);
  let handleShowTwo = () => setShowTwo(true);

  let [manu, setManu] = useState("");
  let current = usePathname();

  useEffect(() => {
    setManu(current);

    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
    window.scrollTo(0, 0);
    const closeModal = () => {
      setModal(false);
    };
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  let toggleMenu = () => {
    setisMenu(!isMenu);
    if (document.getElementById("navigation")) {
      const anchorArray = Array.from(
        document.getElementById("navigation").getElementsByTagName("a")
      );
      anchorArray.forEach((element) => {
        element.addEventListener("click", (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle("open");
            }
          }
        });
      });
    }
  };
  return (
    <header
      id="topnav"
      className={`${scroll ? "nav-sticky" : ""} navigation sticky`}
    >
      <div className={containerClass}>
        <div>
          {navDark === true ? (
            <Link className="logo" href="/">
              <Image
                src="/images/logo.png"
                width={60}
                height={60}
                className="logo-light-mode"
                alt=""
              />
              {/* <Image
                src="/images/logo-light.png"
                width={115}
                height={22}
                className="logo-dark-mode"
                alt=""
              /> */}
              <Image
                src="/images/logo.png"
                width={60}
                height={60}
                className="logo-dark-mode"
                alt=""
              />
            </Link>
          ) : (
            <Link className="logo" href="/">
              <span className="logo-light-mode">
                {/* <Image
                  src="/images/logo-dark.png"
                  className="l-dark"
                  width={115}
                  height={22}
                  alt=""
                /> */}
                {/* <Image
                  src="/images/logo-light.png"
                  className="l-light"
                  width={115}
                  height={22}
                  alt=""
                /> */}
                <Image
                  src="/images/logo.png"
                  className="l-dark"
                  width={60}
                  height={60}
                  alt=""
                />
                <Image
                  src="/images/logo.png"
                  className="l-light"
                  width={60}
                  height={60}
                  alt=""
                />
              </span>
              {/* <Image
                src="/images/logo-light.png"
                width={115}
                height={22}
                className="logo-dark-mode"
                alt=""
              /> */}
              <Image
                src="/images/logo.png"
                width={60}
                height={60}
                className="logo-dark-mode"
                alt=""
              />
            </Link>
          )}
        </div>

        <div className="menu-extras">
          <div className="menu-item">
            <Link
              href="#"
              className={`navbar-toggle ${isMenu ? "open" : ""}`}
              id="isToggle"
              onClick={() => toggleMenu()}
            >
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          </div>
        </div>

        <ul className="dropdowns list-inline mb-0">
          {/* <li className="list-inline-item mb-0">
            <Link href="#" onClick={handleShowTwo}>
              <div className="btn btn-icon btn-pills btn-primary">
                <FiSettings className="fea icon-sm" />
              </div>
            </Link>
          </li> */}
          {/* <Offcanvas show={showTwo} onHide={handleCloseTwo} placement="end">
            <Offcanvas.Header
              closeButton
              className="offcanvas-header p-4 border-bottom"
            >
              <h5 id="offcanvasRightLabel" className="mb-0">
                <Image
                  src="/images/logo-dark.png"
                  width={115}
                  height={22}
                  className="light-version"
                  alt=""
                />
                <Image
                  src="/images/logo-light.png"
                  width={115}
                  height={22}
                  className="dark-version"
                  alt=""
                />
              </h5>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="row">
                <div className="col-12">
                  <div>
                    <div>
                      <Image
                        src="/images/mobile-app.svg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        alt=""
                        className="w-75 h-auto mx-auto d-block"
                      />
                    </div>
                    <h5 className="my-4">Get in touch!</h5>
                    <form>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Name <span className="text-danger">*</span>
                            </label>
                            <input
                              name="name"
                              id="name"
                              type="text"
                              className="form-control border rounded"
                              placeholder="First Name :"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Email <span className="text-danger">*</span>
                            </label>
                            <input
                              name="email"
                              id="email"
                              type="email"
                              className="form-control border rounded"
                              placeholder="Your email :"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <input
                              name="subject"
                              id="subject"
                              className="form-control border rounded"
                              placeholder="Your subject :"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Comments <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="comments"
                              id="comments"
                              rows="4"
                              className="form-control border rounded"
                              placeholder="Your Message :"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <button
                            type="submit"
                            id="submit"
                            name="send"
                            className="btn btn-primary"
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Offcanvas.Body>
            <div className="offcanvas-footer p-4 border-top text-center">
              <ul className="list-unstyled social-icon social mb-0">
                <li className="list-inline-item mb-0">
                  <Link
                    href="https://1.envato.market/doctris-next"
                    target="_blank"
                    className="rounded"
                  >
                    <FiShoppingCart className="align-middle mb-0" />
                  </Link>
                </li>
                <li className="list-inline-item mb-0">
                  <Link
                    href="https://dribbble.com/shreethemes"
                    target="_blank"
                    className="rounded"
                  >
                    <FiDribbble className="align-middle mb-0" />
                  </Link>
                </li>
                <li className="list-inline-item mb-0">
                  <Link
                    href="https://www.behance.net/shreethemes"
                    target="_blank"
                    className="rounded"
                  >
                    <RiBehanceLine className="align-middle mb-0" />
                  </Link>
                </li>
                <li className="list-inline-item mb-0">
                  <Link
                    href="https://www.facebook.com/shreethemes"
                    target="_blank"
                    className="rounded"
                  >
                    <FaFacebookF className="align-middle mb-0" />
                  </Link>
                </li>
                <li className="list-inline-item mb-0">
                  <Link
                    href="https://www.instagram.com/shreethemes/"
                    target="_blank"
                    className="rounded"
                  >
                    <FiInstagram className="align-middle mb-0" />
                  </Link>
                </li>
                <li className="list-inline-item mb-0">
                  <Link
                    href="https://twitter.com/shreethemes"
                    target="_blank"
                    className="rounded"
                  >
                    <FiTwitter className="align-middle mb-0" />
                  </Link>
                </li>
                <li className="list-inline-item mb-0">
                  <Link
                    href="mailto:support@shreethemes.in"
                    className="rounded"
                  >
                    <LuMail className="align-middle mb-0" />
                  </Link>
                </li>
                <li className="list-inline-item mb-0">
                  <Link
                    href="https://shreethemes.in"
                    target="_blank"
                    className="rounded"
                  >
                    <LuGlobe className="align-middle mb-0" />
                  </Link>
                </li>
              </ul>
            </div>
          </Offcanvas> */}

          <li className="list-inline-item mb-0 ms-1">
            <Link
              href="#"
              className="btn btn-icon btn-pills btn-primary"
              onClick={handleShow}
            >
              <FiSearch />
            </Link>
          </li>
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="top"
            style={{ height: "250px" }}
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="pb-3">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="text-center">
                      <h4>Search now.....</h4>
                      <div className="subcribe-form mt-4">
                        <form>
                          <div className="mb-0">
                            <input
                              type="text"
                              id="help"
                              name="name"
                              className="border rounded-pill"
                              required=""
                              placeholder="Search"
                            />
                            <button
                              type="submit"
                              className="btn btn-pills btn-primary"
                            >
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

          <li className="list-inline-item mb-0 ms-1">
            <div className="dropdown dropdown-primary">
              <button
                type="button"
                className="btn btn-pills btn-soft-primary dropdown-toggle p-0"
                onClick={() => setModal(!modal)}
              >
                <Image
                  src="/images/doctors/01.jpg"
                  width={36}
                  height={36}
                  className="avatar avatar-ex-small rounded-circle"
                  alt=""
                />
              </button>
              <div
                className={`${
                  modal === true ? "show" : ""
                } dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3`}
                style={{ minWidth: "200px", right: "0" }}
              >
                <Link
                  className="dropdown-item d-flex align-items-center text-dark"
                  href="/doctor-profile"
                >
                  <Image
                    src="/images/doctors/01.jpg"
                    width={45}
                    height={45}
                    className="avatar avatar-md-sm rounded-circle border shadow"
                    alt=""
                  />
                  <div className="flex-1 ms-2">
                    <span className="d-block mb-1">Calvin Carlo</span>
                    <small className="text-muted">Orthopedic</small>
                  </div>
                </Link>
                <Link
                  className="dropdown-item text-dark mb-2"
                  href="/doctor-dashboard"
                >
                  <span className="mb-0 d-inline-block me-1">
                    <GrDashboard className="align-middle h6 mb-0" />
                  </span>{" "}
                  Dashboard
                </Link>
                <Link
                  className="dropdown-item text-dark"
                  href="/doctor-profile-setting"
                >
                  <span className="mb-0 d-inline-block me-1">
                    <FiSettings className="align-middle h6 mb-0" />
                  </span>{" "}
                  Profile Settings
                </Link>
                <div className="dropdown-divider border-top"></div>
                <Link className="dropdown-item text-dark" href="/login">
                  <span className="mb-0 d-inline-block me-1">
                    <LiaSignOutAltSolid className="align-middle h6 mb-0" />
                  </span>{" "}
                  Logout
                </Link>
              </div>
            </div>
          </li>
        </ul>

        <div
          id="navigation"
          style={{ display: isMenu ? "block" : "none" }}
          dir="rtl"
        >
          <ul className={manuClass}>
            <li className={` has-submenu parent-menu-item`}>
              <Link href="/">الرئيسية</Link>
              {/* <span className="menu-arrow"></span> */}
              {/* <ul className="submenu">
                                <li className={manu === "/" || "" ? "active" : ""}><Link href="/" className="sub-menu-item">Index One</Link></li>
                                <li className={manu === "/index-two" ? "active" : ""}><Link href="/index-two" className="sub-menu-item">Index Two</Link></li>
                                <li className={manu === "/index-three" ? "active" : ""}><Link href="/index-three" className="sub-menu-item">Index Three</Link></li>
                            </ul> */}
            </li>

            <li className={`has-submenu parent-menu-item`}>
              <Link href="#about">عنا</Link>
              {/* <span className="menu-arrow"></span> */}
              {/* <ul className="submenu">
                <li
                  className={`${
                    [
                      "/doctor-dashboard",
                      "/doctor-appointment",
                      "/patient-list",
                      "/doctor-schedule",
                      "/invoices",
                      "/patient-review",
                      "/doctor-messages",
                      "/doctor-profile",
                      "/doctor-profile-setting",
                      "/doctor-chat",
                      "/login",
                      "/signup",
                      "/forgot-password",
                    ].includes(manu)
                      ? "active"
                      : ""
                  } has-submenu parent-menu-item`}
                >
                  <Link href="#" className="menu-item">
                    {" "}
                    Dashboard{" "}
                  </Link>
                  <span className="submenu-arrow"></span>
                  <ul className="submenu">
                    <li
                      className={manu === "/doctor-dashboard" ? "active" : ""}
                    >
                      <Link href="/doctor-dashboard" className="sub-menu-item">
                        Dashboard
                      </Link>
                    </li>
                    <li
                      className={manu === "/doctor-appointment" ? "active" : ""}
                    >
                      <Link
                        href="/doctor-appointment"
                        className="sub-menu-item"
                      >
                        Appointment
                      </Link>
                    </li>
                    <li className={manu === "/patient-list" ? "active" : ""}>
                      <Link href="/patient-list" className="sub-menu-item">
                        Patients
                      </Link>
                    </li>
                    <li className={manu === "/doctor-schedule" ? "active" : ""}>
                      <Link href="/doctor-schedule" className="sub-menu-item">
                        Schedule Timing
                      </Link>
                    </li>
                    <li className={manu === "/invoices" ? "active" : ""}>
                      <Link href="/invoices" className="sub-menu-item">
                        Invoices
                      </Link>
                    </li>
                    <li className={manu === "/patient-review" ? "active" : ""}>
                      <Link href="/patient-review" className="sub-menu-item">
                        Reviews
                      </Link>
                    </li>
                    <li className={manu === "/doctor-messages" ? "active" : ""}>
                      <Link href="/doctor-messages" className="sub-menu-item">
                        Messages
                      </Link>
                    </li>
                    <li className={manu === "/doctor-profile" ? "active" : ""}>
                      <Link href="/doctor-profile" className="sub-menu-item">
                        Profile
                      </Link>
                    </li>
                    <li
                      className={
                        manu === "/doctor-profile-setting" ? "active" : ""
                      }
                    >
                      <Link
                        href="/doctor-profile-setting"
                        className="sub-menu-item"
                      >
                        Profile Settings
                      </Link>
                    </li>
                    <li className={manu === "/doctor-chat" ? "active" : ""}>
                      <Link href="/doctor-chat" className="sub-menu-item">
                        Chat
                      </Link>
                    </li>
                    <li className={manu === "/login" ? "active" : ""}>
                      <Link href="/login" className="sub-menu-item">
                        Login
                      </Link>
                    </li>
                    <li className={manu === "/signup" ? "active" : ""}>
                      <Link href="/signup" className="sub-menu-item">
                        Sign Up
                      </Link>
                    </li>
                    <li className={manu === "/forgot-password" ? "active" : ""}>
                      <Link href="/forgot-password" className="sub-menu-item">
                        Forgot Password
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={manu === "/doctor-team-one" ? "active" : ""}>
                  <Link href="/doctor-team-one" className="sub-menu-item">
                    Doctors One
                  </Link>
                </li>
                <li className={manu === "/doctor-team-two" ? "active" : ""}>
                  <Link href="/doctor-team-two" className="sub-menu-item">
                    Doctors Two
                  </Link>
                </li>
                <li className={manu === "/doctor-team-three" ? "active" : ""}>
                  <Link href="/doctor-team-three" className="sub-menu-item">
                    Doctors Three
                  </Link>
                </li>
              </ul> */}
            </li>

            <li className={` has-submenu parent-menu-item`}>
              <Link href="#departments">الخدمات</Link>
              {/* <span className="menu-arrow"></span>
              <ul className="submenu">
                <li className={manu === "/patient-dashboard" ? "active" : ""}>
                  <Link href="/patient-dashboard" className="sub-menu-item">
                    Dashboard
                  </Link>
                </li>
                <li className={manu === "/patient-profile" ? "active" : ""}>
                  <Link href="/patient-profile" className="sub-menu-item">
                    Profile
                  </Link>
                </li>
                <li className={manu === "/booking-appointment" ? "active" : ""}>
                  <Link href="/booking-appointment" className="sub-menu-item">
                    Book Appointment
                  </Link>
                </li>
                <li className={manu === "/patient-invoice" ? "active" : ""}>
                  <Link href="/patient-invoice" className="sub-menu-item">
                    Invoice
                  </Link>
                </li>
              </ul> */}
            </li>

            {/* <li className={`${["/pharmacy", "/pharmacy-shop","/pharmacy-product-detail", "/pharmacy-shop-cart","/pharmacy-checkout","/pharmacy-account"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                            <Link href="#">Pharmacy</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "/pharmacy" ? "active" : ""}><Link href="/pharmacy" className="sub-menu-item">Pharmacy</Link></li>
                                <li className={manu === "/pharmacy-shop" ? "active" : ""}><Link href="/pharmacy-shop" className="sub-menu-item">Shop</Link></li>
                                <li className={manu === "/pharmacy-product-detail" ? "active" : ""}><Link href="/pharmacy-product-detail" className="sub-menu-item">Medicine Detail</Link></li>
                                <li className={manu === "/pharmacy-shop-cart" ? "active" : ""}><Link href="/pharmacy-shop-cart" className="sub-menu-item">Shop Cart</Link></li>
                                <li className={manu === "/pharmacy-checkout" ? "active" : ""}><Link href="/pharmacy-checkout" className="sub-menu-item">Checkout</Link></li>
                                <li  className={manu === "/pharmacy-account" ? "active" : ""}><Link href="/pharmacy-account" className="sub-menu-item">Account</Link></li>
                            </ul>
                        </li> */}

            <li className={` has-submenu parent-parent-menu-item`}>
              <Link href="#doctors">الأطباء</Link>
              {/* <span className="menu-arrow"></span>
              <ul className="submenu">
                <li className={manu === "/aboutus" ? "active" : ""}>
                  <Link href="/aboutus" className="sub-menu-item">
                    {" "}
                    About Us
                  </Link>
                </li>
                <li className={manu === "/departments" ? "active" : ""}>
                  <Link href="/departments" className="sub-menu-item">
                    Departments
                  </Link>
                </li>
                <li className={manu === "/faqs" ? "active" : ""}>
                  <Link href="/faqs" className="sub-menu-item">
                    FAQs
                  </Link>
                </li>
                <li
                  className={`${
                    ["/blogs", "/blog-detail"].includes(manu) ? "active" : ""
                  } has-submenu parent-menu-item`}
                >
                  <Link href="#" className="menu-item">
                    {" "}
                    Blogs{" "}
                  </Link>
                  <span className="submenu-arrow"></span>
                  <ul className="submenu">
                    <li className={manu === "/blogs" ? "active" : ""}>
                      <Link href="/blogs" className="sub-menu-item">
                        Blogs
                      </Link>
                    </li>
                    <li className={manu === "/blog-detail" ? "active" : ""}>
                      <Link href="/blog-detail" className="sub-menu-item">
                        Blog Details
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={manu === "/terms" ? "active" : ""}>
                  <Link href="/terms" className="sub-menu-item">
                    Terms & Policy
                  </Link>
                </li>
                <li className={manu === "/privacy" ? "active" : ""}>
                  <Link href="/privacy" className="sub-menu-item">
                    Privacy Policy
                  </Link>
                </li>
                <li className={manu === "/error" ? "active" : ""}>
                  <Link href="/error" className="sub-menu-item">
                    404 !
                  </Link>
                </li>
              </ul> */}
            </li>
            <li className={manu === "/contact" ? "active" : ""}>
              <Link href="#patients" className="sub-menu-item">
                المرضى
              </Link>
            </li>
            <li className={manu === "/contact" ? "active" : ""}>
              <Link href="#blogs" className="sub-menu-item">
                الأخبار
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
