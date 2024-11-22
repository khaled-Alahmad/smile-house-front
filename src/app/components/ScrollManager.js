"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ScrollManager = () => {
  const pathname = usePathname();
  const scrollPositions = useRef({}); // تخزين مواضع التمرير لكل صفحة

  // حفظ موضع التمرير الحالي
  const saveScrollPosition = () => {
    scrollPositions.current[pathname] = window.scrollY;
  };

  // استعادة موضع التمرير للصفحة الحالية
  const restoreScrollPosition = () => {
    const scrollY = scrollPositions.current[pathname] || 0;
    window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    // استعادة موضع التمرير عند تغيير المسار
    restoreScrollPosition();

    // حفظ موضع التمرير قبل التنقل بعيدًا
    return () => saveScrollPosition();
  }, [pathname]);

  return null;
};

export default ScrollManager;
