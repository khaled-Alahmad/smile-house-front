"use client";
import React, { useState, useEffect } from "react";
import { FiArrowUp } from "../assets/icons/vander";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  const getScrollTop = () => {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  };

  const toggleVisible = () => {
    const scrolled = getScrollTop();
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      id="back-to-top"
      className="back-to-top fs-5 rounded-pill text-center bg-primary justify-content-center align-items-center"
      style={{
        display: visible ? "block" : "none",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "1000",
      }}
    >
      <FiArrowUp className="fea icon-sm" />
    </button>
  );
}
