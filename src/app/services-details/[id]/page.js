"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ScrollTop from "../../components/scrollTop";
import { fetchData, fetchServiceDetails } from "@/app/data/dataApi";
import Loader from "@/app/components/loader";
import RelatedProduct from "@/app/components/pharmacy/relatedProduct";

export default function PharmacyProductDetail(props) {
  const [data, setData] = useState(null);
  const [dataTotal, setDataTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  let id = props.params.id;

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchData();
        setDataTotal(fetchedData);
      } catch (error) {
        console.error("Error fetching total data:", error.message);
      }
    };

    const fetchServiceDetailsAsync = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchServiceDetails(id);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // if (id) {
    fetchDataAsync();
    fetchServiceDetailsAsync();
    // }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <>
        <Navbar
          navDark={true}
          manuClass="navigation-menu nav-left"
          containerClass="container"
        />
        <section className="bg-half-170 d-table w-100 bg-light" dir="rtl">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-12">
                <div className="section-title text-center">
                  <h3 className="sub-title ">لم يتم العثور</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer data={dataTotal} />
        <ScrollTop />
      </>
    );
  }
  console.log(data);
  return (
    <>
      <Navbar
        navDark={true}
        manuClass="navigation-menu nav-light nav-left"
        containerClass="container"
      />
      <section
        className="bg-half-150 d-table w-100 bg-light"
        dir="rtl"
        style={{ backgroundImage: `url('${data?.image}')`, backgroundSize: "" }}
      >
        <div className="bg-overlay bg-overlay-dark"></div>

        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4 text-white title-dark">
                  {data?.name}
                </h3>
                {/* <p className="para-desc mx-auto text-muted">تفاصيل الخدمة</p> */}
                <span class="badge rounded-pill bg-soft-primary mb-3">
                  تفاصيل الخدمة
                </span>
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
      <section className="section" dir="rtl">
        <div className="container">
          <div className="d-flex flex-column align-content-center align-items-center">
            {/* <div className="col-md-5">
              <Image
                src={data?.image}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="img-fluid rounded"
                alt=""
              />
            </div> */}
            {/* <div className="col-md-7 mt-5 mt-sm-0 pt-2 pt-sm-0 row"> */}
            <div className="col-md-12 col-12 mt-5 mt-sm-0 pt-2 pt-sm-0 row">
              <div className="section-title d-flex flex-wrap gap-2 mt-4 col-lg-12">
                <span className="badge rounded-3 bg-soft-primary flex-grow-1 col-sm-12 col-md-6 col-lg-3">
                  <h5 className="mt-4 py-2">السعر</h5>
                  <h5 className="text-muted h5">${data?.price}</h5>
                </span>

                <span className="badge rounded-3 bg-soft-primary flex-grow-1 col-sm-12 col-md-6 col-lg-3">
                  <h5 className="mt-4 py-2">الطبيب</h5>
                  <p className="text-muted h5">
                    {data.doctor?.name ?? "غير معرف"}
                  </p>
                </span>
                <span className="badge rounded-3 bg-soft-primary flex-grow-1 col-sm-12 col-md-6 col-lg-3">
                  <h5 className="mt-4 py-2">القسم</h5>
                  <p className="text-muted h5">
                    {data.category?.name ?? "غير معرف"}
                  </p>
                </span>
                <span className="badge rounded-3 bg-soft-primary flex-grow-1 col-sm-12 col-md-6 col-lg-3">
                  <h5 className="mt-4 py-2">الوصف</h5>
                  <p
                    className="text-muted h5 "
                    style={{ whiteSpace: "pre", textAlign: "start" }}
                  >
                    {data.description}
                  </p>
                </span>
              </div>
            </div>

            {/* </div> */}
          </div>
        </div>
        <div className="container mt-100 mt-60" dir="rtl">
          <div className="row">
            <div className="col-12">
              <h5 className="mb-0">معرض الصور:</h5>
            </div>
          </div>

          <RelatedProduct data={data.images} />
        </div>
      </section>
      <Footer data={dataTotal} />
      <ScrollTop />
    </>
  );
}
