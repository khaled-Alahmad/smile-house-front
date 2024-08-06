import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { FetchCategories, doctors, apiUrl } from "@/app/data/dataApi";
import Loader from "../loader";

export default function AppointmentTab() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [doctorsData, setDoctorsData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [visitingDates, setVisitingDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    category: "",
    doctor: "",
    comments: "",
    gender: "male",
    birth_date: "",
    address: "",
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
      async function fetchAvailableTimes() {
        try {
          const response = await axios.get(`${apiUrl}doctor-times`);
          const data = response.data.data;

          // Extract available dates and times from the response
          const dates = new Set();
          const times = [];

          data.forEach((slot) => {
            const date = new Date(selectedDate);
            const currentDay = date.getDay();

            if (currentDay === slot.day) {
              dates.add(date.toISOString().split("T")[0]); // Add date in YYYY-MM-DD format
              times.push({
                start: slot.start_time,
                end: slot.end_time,
                day: slot.week_day.name,
              });
            }
          });

          setVisitingDates([...dates]);
          setAvailableTimes(times);
        } catch (error) {
          console.error("Error fetching available times:", error);
        }
      }

      axios
        .get(`${apiUrl}visiting-dates?doctor_id=${selectedDoctor.id}`)
        .then((response) => {
          console.log("Visiting dates response:", response.data);

          // Adjust mapping to use the correct field name
          const dates = response.data.data.map((item) => item.visit_date); // Use `visit_date` here

          setVisitingDates(dates);
          console.log("Visiting dates:", dates); // Ensure this logs the expected values
        })
        .catch((error) => {
          console.error("Error fetching visiting dates:", error);
        });

      fetchAvailableTimes();
    }
  }, [selectedDate, selectedDoctor]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const day_number = selectedDate ? selectedDate.getDay() + 1 : null;

    axios
      .post(`${apiUrl}bookAppointment`, {
        ...formData,
        doctor_id: selectedDoctor.id,
        visit_date: selectedDate, // Format date as YYYY-MM-DD
        day_number: day_number,
        start_time: "09:00",
        end_time: "10:00",
      })
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
        alert("Appointment booked successfully!");
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
      });
  };

  const handleDateChange = (info) => {
    setSelectedDate(info.startStr);
  };

  const events = visitingDates.map((date) => ({
    title: "Available",
    start: date,
    end: date,
    extendedProps: {
      times: availableTimes.filter(
        (time) =>
          time.day ===
          new Date(date).toLocaleDateString("en-US", { weekday: "long" })
      ),
    },
  }));

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
                  <a
                    className={`${
                      activeIndex === 2 ? "active" : ""
                    } nav-link rounded-0`}
                    onClick={() => setActiveIndex(2)}
                  >
                    <div className="text-center pt-1 pb-1">
                      <h5 className="fw-medium mb-0">الحجز عبر الواتس أب</h5>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`${
                      activeIndex === 1 ? "active" : ""
                    } nav-link rounded-0`}
                    onClick={() => setActiveIndex(1)}
                  >
                    <div className="text-center pt-1 pb-1">
                      <h5 className="fw-medium mb-0">الحجز عبر الإنترنت</h5>
                    </div>
                  </a>
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
                              الاسم الأول <span className="text-danger">*</span>
                            </label>
                            <input
                              name="first_name"
                              type="text"
                              className="form-control"
                              placeholder="الاسم الأول :"
                              value={formData.first_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              اسم العائلة <span className="text-danger">*</span>
                            </label>
                            <input
                              name="last_name"
                              type="text"
                              className="form-control"
                              placeholder="اسم العائلة :"
                              value={formData.last_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
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
                              <span className="text-danger">*</span>
                            </label>
                            <Calendar
                              plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                              ]}
                              initialView="timeGridWeek"
                              events={events}
                              locale={"ar"}
                              dateClick={handleDateChange}
                            
                            />
                          </div>
                        )}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              تاريخ الميلاد{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="birth_date"
                              type="date"
                              className="form-control"
                              value={formData.birth_date}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              البريد الإلكتروني{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              placeholder="البريد الإلكتروني :"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              رقم الهاتف <span className="text-danger">*</span>
                            </label>
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              placeholder="رقم الهاتف :"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              العنوان <span className="text-danger">*</span>
                            </label>
                            <input
                              name="address"
                              type="text"
                              className="form-control"
                              placeholder="العنوان :"
                              value={formData.address}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">التعليقات</label>
                            <textarea
                              name="comments"
                              className="form-control"
                              rows="3"
                              placeholder="التعليقات"
                              value={formData.comments}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            تأكيد الحجز
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="tab-pane fade show active" dir="rtl">
                    {/* Content for other tab */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
