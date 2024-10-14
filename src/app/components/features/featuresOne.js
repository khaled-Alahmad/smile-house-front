import React from "react";
import Link from "next/link";

import {
  FiArrowRight,
  RiHeartPulseFill,
  RiDossierFill,
  RiTimeFill,
} from "../../assets/icons/vander";

export default function FeatureOne({ data }) {
  const workHours = data["1"]["work-hours"];

  //console.log("FeatureOne", data);
  return (
    <div className="container" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="features-absolute bg-white shadow rounded overflow-hidden card-group">
            <div className="card border-0 bg-light p-4" data-aos="fade-up">
              {" "}
              {/* إضافة الحركة */}
              <RiHeartPulseFill className="text-primary h2" />
              <h5 className="mt-1">{data[3]["title"] ?? "حالات الطوارئ"}</h5>
              <p className="text-muted mt-2">
                {data[3]["content"] ??
                  "استجابة سريعة وفعالة لتقديم الرعاية الطبية"}
              </p>
            </div>

            <div className="card border-0 p-4" data-aos="fade-up">
              {" "}
              {/* إضافة الحركة */}
              <RiDossierFill className="text-primary h2" />
              <h5 className="mt-1">{data[2]["title"] ?? "جدول الاطباء"}</h5>
              <p className="text-muted mt-2">
                {data[2]["content"] ??
                  "يمكن للمرضى تحديد الأوقات المناسبة لزيارة الطبيب وحجز المواعيد بسهولة"}
              </p>
            </div>

            <div className="card border-0 bg-light p-4" data-aos="fade-up">
              {" "}
              {/* إضافة الحركة */}
              <RiTimeFill className="text-primary h2" />
              <h5 className="mt-1">{data[1]["title"] ?? "ساعات العمل"}</h5>
              <ul className="list-unstyled mt-2">
                {Object.entries(workHours).map(([day, hours], index) => (
                  <li key={index} className="d-flex justify-content-between">
                    <p className="text-muted mb-0">{day}</p>
                    <p className="text-primary mb-0">{hours}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
