import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Loader from "../loader";
import { FetchCategories, doctors, apiUrl } from "@/app/data/dataApi";

export default function AppointmentTab() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [doctorsData, setDoctorsData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    doctor: "",
    comments: "",
  });

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const fetchedData = await doctors();
        setDoctorsData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    async function fetchCategoriesAsync() {
      try {
        const fetchedData = await FetchCategories();
        setCategoryData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchCategoriesAsync();
    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      axios
        .get(`${apiUrl}doctors/${selectedDoctor.id}`)
        .then((response) => {
          console.log(response.data.data.times);
          setAvailableTimes(response.data.data.times);
        })
        .catch((error) => {
          console.error("Error fetching available times:", error);
        });
    }
  }, [selectedDoctor]);
  const handleDoctorChange = (event) => {
    const selectedId = event.target.value;
    const selectedDoctor = doctorsData.find(
      (doctor) => doctor.id === parseInt(selectedId)
    );
    setSelectedDoctor(selectedDoctor);

    setFormData({
      ...formData,
      doctor: selectedDoctor.name,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (number) => {
    // Basic validation for phone number
    return /^\+\d{10,15}$/.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!validatePhoneNumber(formData.phone)) {
    //   console.error("Invalid phone number format");
    //   alert(
    //     "Please enter a valid phone number in international format (e.g., +905394705977)."
    //   );
    //   return;
    // }
    const phone = "+963964677938";
    const message = `اسم المريض: ${formData.name}\nبريدك الاكتروني: ${formData.email}\nرقم هاتفك: ${formData.phone}\nالأقسام: ${formData.category}\nالأطباء: ${formData.doctor}\nملاحظات: ${formData.comments}`;
    const encodedMessage = encodeURIComponent(message);
    const toPhoneNumber = phone.trim().replace("+", "");

    const whatsappURL = `https://api.whatsapp.com/send?phone=${toPhoneNumber}&text=${encodedMessage}`;

    console.log("Redirecting to:", whatsappURL);

    // Redirect to WhatsApp
    window.location.href = whatsappURL;
  };

  if (!doctorsData || !categoryData) {
    return <Loader />;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow rounded overflow-hidden">
              <ul className="nav nav-pills nav-justified flex-column flex-sm-row rounded-0 shadow overflow-hidden bg-light mb-0">
                <li className="nav-item">
                  <Link
                    scroll={false}
                    className={`${
                      activeIndex === 2 ? "active" : ""
                    } nav-link rounded-0`}
                    onClick={() => setActiveIndex(2)}
                    href="#"
                  >
                    <div className="text-center pt-1 pb-1">
                      <h5 className="fw-medium mb-0">الحجز عبر الإنترنت</h5>
                    </div>
                  </Link>
                </li>
              </ul>

              <div className="tab-content p-4">
                {activeIndex === 2 ? (
                  <div className="tab-pane fade show active" dir="rtl">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              اسم المريض <span className="text-danger">*</span>
                            </label>
                            <input
                              name="name"
                              id="name"
                              type="text"
                              className="form-control"
                              placeholder="اسم المريض :"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb3">
                            <label className="form-label">الأقسام</label>
                            <select
                              name="category"
                              className="form-select form-control"
                              value={formData.category}
                              onChange={handleChange}
                            >
                              <option value="0">اختر</option>
                              {categoryData.map((item, index) => (
                                <option key={index} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">الأطباء</label>
                            <select
                              className="form-select form-control"
                              onChange={handleDoctorChange}
                            >
                              <option value="0">اختر</option>
                              {doctorsData.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {selectedDoctor && (
                          <div className="section-title text-end">
                            <label className="form-label">
                              الأوقات المحجوزة للطبيب{" "}
                              <b>{selectedDoctor.name}</b>
                            </label>
                            <br />

                            {availableTimes && availableTimes.length > 0 ? (
                              availableTimes.map((time, index) => (
                                <span
                                  key={index}
                                  className="badge rounded-pill bg-soft-danger mb-3"
                                >
                                  {time.day} من {time.start_time} إلى{" "}
                                  {time.end_time}
                                </span>
                              ))
                            ) : (
                              <span className="badge rounded-pill bg-soft-danger mb-3">
                                لا يوجد
                              </span>
                            )}
                          </div>
                        )}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              بريدك الاكتروني
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="email"
                              id="email2"
                              type="email"
                              className="form-control"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              رقم هاتفك
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="phone"
                              id="phone2"
                              type="tel"
                              className="form-control"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              ملاحظاتك
                              <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="comments"
                              id="comments2"
                              rows="4"
                              className="form-control"
                              placeholder="ملاحظاتك :"
                              value={formData.comments}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 text-end mt-2 mb-0">
                        <button type="submit" className="btn btn-primary">
                          إرسال الرسالة
                        </button>
                      </div>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
