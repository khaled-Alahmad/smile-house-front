import React from "react";
import Link from "next/link";

import {
  FiArrowRight,
  RiHeartPulseFill,
  RiDossierFill,
  RiTimeFill,
} from "../../assets/icons/vander";

export default function FeatureOne() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="features-absolute bg-white shadow rounded overflow-hidden card-group">
            <div className="card border-0 bg-light p-4">
              <RiHeartPulseFill className="text-primary h2" />
              <h5 className="mt-1">حالات الطوارئ</h5>
              <p className="text-muted mt-2">
              استجابة سريعة وفعالة  لتقديم الرعاية الطبية
              </p>
              {/* <Link href="/departments" className="text-primary">
                Read More <FiArrowRight className="align-middle" />
              </Link> */}
            </div>

            <div className="card border-0 p-4">
              <RiDossierFill className="text-primary h2" />
              <h5 className="mt-1">جدول الأطباء</h5>
              <p className="text-muted mt-2">
              يمكن للمرضى  تحديد الأوقات المناسبة لزيارة الطبيب وحجز المواعيد بسهولة
              </p>
              {/* <Link href="/departments" className="text-primary">
                اقرأ المزيد <FiArrowRight className="align-middle" />
              </Link> */}
            </div>

            <div className="card border-0 bg-light p-4">
              <RiTimeFill className="text-primary h2" />
              <h5 className="mt-1">ساعات العمل</h5>
              <ul className="list-unstyled mt-2">
                <li className="d-flex justify-content-between">
                  <p className="text-muted mb-0">الاثنين - الجمعة</p>
                  <p className="text-primary mb-0">8.00 - 20.00</p>
                </li>
                <li className="d-flex justify-content-between">
                  <p className="text-muted mb-0">السبت</p>
                  <p className="text-primary mb-0">8.00 - 18.00</p>
                </li>
                <li className="d-flex justify-content-between">
                  <p className="text-muted mb-0">الاحد</p>
                  <p className="text-primary mb-0">8.00 - 14.00</p>
                </li>
              </ul>
              {/* <Link href="/departments" className="text-primary">
                Read More <FiArrowRight className="align-middle" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
