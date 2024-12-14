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

  // useEffect(() => {
  //   setManu(current);

  //   window.addEventListener("scroll", () => {
  //     setScroll(window.scrollY > 50);
  //   });

  //   const closeModal = () => {
  //     setModal(false);
  //   };
  //   document.addEventListener("mousedown", closeModal);
  //   return () => {
  //     document.removeEventListener("mousedown", closeModal);
  //   };
  // }, [current]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });

    return () => {
      window.removeEventListener("scroll", () => setScroll(false));
    };
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the menu and the toggle button
      const menuElement = document.getElementById("navigation");
      const toggleButton = document.getElementById("isToggle");

      if (
        isMenu &&
        menuElement &&
        !menuElement.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        setisMenu(false); // Close the menu
      }
    };

    // Attach the event listener to detect clicks outside
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Cleanup the event listener when the component is unmounted or updated
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenu]);
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

              <Image
                src="/images/logo.png"
                width={60}
                height={60}
                className="logo-dark-mode"
                alt=""
              />
              <h6 className="d-inline" style={{ color: "var(--bs-blue)" }}>
                سمايل هاوس
              </h6>
            </Link>
          )}
        </div>

        <div className="menu-extras">
          <div className="menu-item">
            <span
              // href="#"
              className={`navbar-toggle ${isMenu ? "open" : ""}`}
              id="isToggle"
              onClick={() => toggleMenu()}
            >
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </span>
          </div>
        </div>

        <div
          id="navigation"
          style={{ display: isMenu ? "block" : "none" }}
          dir="rtl"
        >
          <ul className={manuClass}>
            <li
              className={`has-submenu parent-menu-item ${
                manu === "/" ? "active" : ""
              }`}
            >
              <Link href="/">الرئيسية</Link>
            </li>

          
            <li
              className={`has-submenu parent-menu-item ${
                manu === "/offers-all" ? "active" : ""
              }`}
            >
              <a
                href="#offers"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("offers");
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                العروض
              </a>
            </li>
           

            <li
              className={`has-submenu parent-menu-item ${
                manu === "/departments-all" ? "active" : ""
              }`}
            >
              <a
                href="#departments"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("departments");
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                الخدمات
              </a>
            </li>
            <li
              className={`has-submenu parent-menu-item ${
                manu === "/medical-devices" ? "active" : ""
              }`}
            >
              <a
                href="#medicals"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("medicals");
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                الأجهزة الطبية
              </a>
            </li>
            <li
              className={`has-submenu parent-menu-item ${
                manu === "/aboutus" ? "active" : ""
              }`}
            >
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault(); // تعطيل السلوك الافتراضي للرابط
                  const section = document.getElementById("about");
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    }); // التمرير بسلاسة
                  }
                }}
              >
                من نحن
              </a>
            </li>
            <li
              className={`has-submenu parent-parent-menu-item ${
                manu === "/doctor-team" ? "active" : ""
              }`}
            >
              <a
                href="#doctors"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("doctors");
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                الأطباء
              </a>
            </li>

            <li>
              <a
                href="#patients"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("patients");
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                المرضى
              </a>
            </li>

            <li className={manu === "/contact" ? "active" : ""}>
              <a
                href="#blogs"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("blogs");
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                الأخبار
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
