"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowUp } from "../assets/icons/vander";

export default function ScrollTop() {
  let [visible, setVisible] = useState(false);

  // Toggle visibility of the scroll-to-top button based on scroll position
  let toggleVisible = () => {
    let scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Scroll smoothly to the top
  let scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisible);
    }
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        scrollToTop(); // Trigger smooth scroll to top
      }}
      id="back-to-top"
      className="back-to-top fs-5 rounded-pill text-center bg-primary justify-content-center align-items-center"
      style={visible ? { display: "block" } : { display: "none" }}
    >
      <FiArrowUp className="fea icon-sm" />
    </Link>
  );
}
