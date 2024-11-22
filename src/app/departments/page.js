// src/app/departments/page.js
import React from "react";
import { cookies } from "next/headers"; // استخدم next/headers هنا
import DepartmentsClient from "../components/DepartmentsClient";

const Departments = async () => {
  //console.log("Fetching data...");

  let services = [];
  let offerData = null;
  let data = [];

  // الحصول على categoryId و clientKey من الكوكيز
  const cookieStore = cookies();
  const categoryId = cookieStore.get("categoryId")?.value;
  const clientKey = cookieStore.get("client_key")?.value;
  try {
    //console.log("clientKey:", clientKey);
    //console.log("categoryId:", categoryId);

    // التحقق من أن القيم تم تعيينها
    if (!categoryId || !clientKey) {
      throw new Error("categoryId or clientKey is not set in cookies.");
    }

    // جلب الخدمات
    const servicesResponse = await fetch(
      `https://smilehouse.serv00.net/api/services?category_id=${categoryId}&clientKey=${clientKey}`
    );

    if (!servicesResponse.ok) {
      throw new Error("Failed to fetch services");
    }

    const servicesData = await servicesResponse.json();
    services = servicesData.data; // تخزين البيانات مباشرة من الاستجابة
    // //console.log("services:", services);

    // جلب البيانات الإضافية
    const fetchedDataResponse = await fetch(
      `https://smilehouse.serv00.net/api/home?clientKey=${clientKey}`
    );

    if (!fetchedDataResponse.ok) {
      throw new Error("Failed to fetch home data");
    }

    const fetchedData = await fetchedDataResponse.json();
    data = fetchedData.data;

    // البحث عن العرض المناسب
    offerData = data?.categories.find(
      (offer) => offer.id === parseInt(categoryId)
    );
    // //console.log("Offer:", offerData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  // تمرير البيانات إلى مكون العميل
  return <DepartmentsClient services={services} offerData={offerData} />;
};

export default Departments;
