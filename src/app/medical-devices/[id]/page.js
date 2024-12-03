"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/app/components/loader";
import ProductSlider from "@/app/components/pharmacy/productSlider"; // يمكن تعديل هذا إلى ألبوم
import { fetchMedicalDevice } from "@/app/data/dataApi";
import RelatedProduct from "@/app/components/pharmacy/relatedProduct";
import RelatedProductFa from "@/app/components/pharmacy/relatedProductFa";

export default function PharmacyProductDetail({ params }) {
  const [data, setData] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    const phone_company = localStorage.getItem("appointment_phone");
    setPhone(phone_company);

    async function fetchData() {
      const fetchedData = await fetchMedicalDevice(params.id);
      setData(fetchedData);
    }
    fetchData();
  }, [params.id]);

  if (!data) return <Loader />;

  return (
    <>
      {/* عنوان الصفحة */}
      <section
        className="bg-half-260 d-table w-100 "
        style={{ backgroundImage: `url('/images/12.webp')` }}
        dir="rtl"
      >
        <div className="bg-overlay bg-overlay-dark"></div>

        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title text-primary shadow-white mb-4">
                  {data.name}
                </h3>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-light rounded mb-0 bg-transparent">
                    <li className="breadcrumb-item">
                      <Link href="/">الرئيسية</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/pharmacy">الأجهزة الطبية</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {data.name}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* عرض البيانات */}
      <section className="section" dir="rtl">
        <div className="container">
          <div className="row">
            {/* قسم الصور */}
            <div className="col-md-5">
              {/* <h5 className="mb-4">الألبوم:</h5>
              <div className="product-images">
                {data.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.path}
                    alt={`Image ${index + 1}`}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                ))}
              </div> */}
              <ProductSlider images={data.images} />
            </div>

            {/* قسم التفاصيل */}
            <div className="col-md-7">
              <h4 className="title mb-3">{data.name}</h4>
              <h5 className="text-muted mb-4">{data.price}</h5>
              <div className="mb-4">
                <h6>تفاصيل المنتج:</h6>
                <ul className="list-unstyled d-flex flex-column gap-2">
                  <li>
                    <strong>بلد المنشأ:</strong> {data.place_origin}
                  </li>
                  <li>
                    <strong>رقم الموديل:</strong> {data.model_number}
                  </li>
                  <li>
                    <strong>العلامة التجارية:</strong> {data.brand_name}
                  </li>
                  <li>
                    <strong>شهادة:</strong> {data.certification}
                  </li>
                  <li>
                    <strong>التعبئة:</strong> {data.packaging_details}
                  </li>
                  <li>
                    <strong>وقت التسليم:</strong> {data.delivery_time}
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(
                    `مرحبًا، أود شراء المنتج التالي:\n\nاسم المنتج: ${data.name}\nالسعر: ${data.price}\n`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary me-2"
                >
                  اشتري الآن
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <h5 className="mb-3">وصف المنتج:</h5>
              <p className=" mx-auto text-black">
                {data.description.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
          {/* المواصفات */}
          <div className="row mt-5">
            <div className="col-12">
              <h5 className="mb-3">مواصفات المنتج:</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {/* <th scope="col"></th>
                    <th scope="col"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.specifications.map((spec) => (
                    <tr key={spec.id}>
                      <td>
                        <strong>{spec.key}</strong>
                      </td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* الميزات */}
          <div className="row mt-5">
            <div className="col-12">
              <h5 className="mb-3">الخصائص المشتركة :</h5>
              <ul className="list-unstyled">
                {data.features.map((feature) => (
                  <li key={feature.id}>
                    <strong>{feature.key}:</strong> {feature.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* التعليمات */}
          <div className="row mt-5">
            <div className="col-12">
              <h5 className="mb-3">التعليمات:</h5>
              <ul className="list-unstyled">
                {data.instructions.map((instruction) => (
                  <li key={instruction.id}>
                    <strong>{instruction.key}:</strong> {instruction.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* قسم المنتجات ذات الصلة */}
          <div className="row mt-5">
            <div className="col-12">
              <h5 className="mb-3">منتجات ذات صلة:</h5>
              <div className="related-products">
                <RelatedProductFa currentProductId={params.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
