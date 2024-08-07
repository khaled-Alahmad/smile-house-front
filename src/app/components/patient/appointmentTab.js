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
  const [selectedTime, setSelectedTime] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    // email: "",
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
          const datesA = new Set();
          const times = [];

          data.forEach((slot) => {
            const date = new Date(selectedDate); // تأكد من أنها كائن Date
            const currentDay = date.getDay();

            if (currentDay === slot.day) {
              datesA.add(date.toISOString().split("T")[0]); // Add date in YYYY-MM-DD format
              times.push({
                start: slot.start_time,
                end: slot.end_time,
                day: slot.week_day.name,
              });
            }
          });

          setVisitingDates([...datesA]);
          setAvailableTimes(times);
          console.log("time response:", availableTimes);
        } catch (error) {
          console.error("Error fetching available times:", error);
        }
      }

      axios
        .get(`${apiUrl}visiting-dates?doctor_id=${selectedDoctor.id}`)
        .then((response) => {
          console.log("Visiting dates response:", response.data);

          // Adjust mapping to use the correct field name
          const dates = response.data.data.data.map(
            (item) => new Date(item.visit_date)
          ); // تحويل إلى كائن Date هنا

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

    // تنسيق الوقت إلى H:i
    const formattedStartTime = "09:00"; // تأكد من أنها بصيغة H:i
    const formattedEndTime = "10:00"; // تأكد من أنها بصيغة H:i

    // تأكد من تنسيق selectedDate كـ YYYY-MM-DD
    const formattedDate =
      selectedDate instanceof Date
        ? selectedDate.toISOString().split("T")[0]
        : null;

    // تحديد day_number بناءً على selectedDate
    const day_number =
      selectedDate instanceof Date ? selectedDate.getDay() + 1 : null;

    // بيانات الطلب
    const requestData = {
      ...formData, // دمج بيانات النموذج
      doctor_id: selectedDoctor.id,
      visit_date: formattedDate,
      day_number: day_number,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    };

    console.log(requestData);

    axios
      .post(`${apiUrl}bookAppointment`, requestData)
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
        alert("Appointment booked successfully!");
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
      });
  };
  const handleDateChange = (info) => {
    const selectedDate = new Date(info.startStr);
    const dayName = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Check if the selected date is available
    const isAvailable = availableTimes.some((time) => time.day === dayName);

    if (isAvailable) {
      setSelectedDate(selectedDate);
    } else {
      alert("This date is not available for booking.");
    }
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `حجز موعد:\nالاسم: ${formData.first_name} ${formData.last_name}\nالطبيب: ${formData.doctor}\nالتاريخ: ${selectedDate}\nالوقت: ${selectedTime}\nالتعليقات: ${formData.comments}\nالهاتف: ${formData.phone}\nالبريد الإلكتروني: ${formData.email}`;
    const whatsappUrl = `https://wa.me/00905394705977?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const events = visitingDates.map((date) => {
    const times = availableTimes.filter(
      (time) =>
        time.day ===
        new Date(date).toLocaleDateString("en-US", { weekday: "long" })
    );

    // Check if there are any available times
    const isAvailable = times.length > 0;

    return {
      title: isAvailable ? "Available" : "Not Available",
      start: date,
      end: date,
      backgroundColor: isAvailable ? "green" : "red", // Indicate availability with color
      extendedProps: {
        times,
      },
    };
  });

  const handleEventClick = (info) => {
    const eventDate = new Date(info.event.start);
    const eventDay = eventDate.toLocaleDateString("en-US", { weekday: "long" });

    // Check if the clicked date has available times
    const availableTimesForDay = availableTimes.filter(
      (time) => time.day === eventDay
    );

    if (availableTimesForDay.length > 0) {
      setSelectedDate(eventDate);
    } else {
      alert("This date is not available for booking.");
    }
  };

  if (!doctorsData || !categoryData) {
    return <Loader />;
  }

  return (
    <section className="section">
      <section className="container">
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
                    <form onSubmit={handleWhatsAppSubmit}>
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
                            <label className="form-label">التخصص</label>
                            <select
                              className="form-select form-control"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                            >
                              {categoryData.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">الطبيب</label>
                            <select
                              className="form-select form-control"
                              name="doctor"
                              value={selectedDoctor ? selectedDoctor.id : ""}
                              onChange={handleDoctorChange}
                            >
                              <option value="">اختر الطبيب</option>
                              {doctorsData.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {selectedDoctor && (
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">
                                اختر تاريخ ووقت
                              </label>
                              <Calendar
                                plugins={[timeGridPlugin, interactionPlugin]}
                                initialView="timeGridWeek"
                                events={events}
                                selectable={true}
                                select={handleDateChange}
                                eventClick={handleEventClick}
                                headerToolbar={{
                                  left: "prev,next today",
                                  center: "title",
                                  right: "timeGridWeek",
                                }}
                              />
                              {selectedDate && (
                                <select
                                  className="form-select form-control mt-3"
                                  name="time"
                                  value={selectedTime}
                                  onChange={handleTimeChange}
                                >
                                  <option value="">اختر وقت</option>
                                  {availableTimes.map((time, index) => (
                                    <option
                                      key={index}
                                      value={`${time.start} - ${time.end}`}
                                    >
                                      {time.start} - {time.end}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">رقم الهاتف</label>
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
                        {/* <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              البريد الإلكتروني
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
                        </div> */}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">العنوان</label>
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
                            <label className="form-label">
                              تاريخ الميلاد{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="birth_date"
                              type="date"
                              className="form-control"
                              placeholder="تاريخ الميلاد :"
                              value={formData.birth_date}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              الجنس <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select form-control"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                            >
                              <option value="male">ذكر</option>
                              <option value="female">أنثى</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              التعليقات <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="comments"
                              rows="4"
                              className="form-control"
                              placeholder="التعليقات :"
                              value={formData.comments}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center mb-3">
                        <div className="col-lg-8 text-center">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            احجز موعد
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
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
                            <label className="form-label">التخصص</label>
                            <select
                              className="form-select form-control"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                            >
                              {categoryData.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">الطبيب</label>
                            <select
                              className="form-select form-control"
                              name="doctor"
                              value={selectedDoctor ? selectedDoctor.id : ""}
                              onChange={handleDoctorChange}
                            >
                              <option value="">اختر الطبيب</option>
                              {doctorsData.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {selectedDoctor && (
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">
                                اختر تاريخ ووقت
                              </label>
                              <Calendar
                                plugins={[timeGridPlugin, interactionPlugin]}
                                initialView="timeGridWeek"
                                events={events}
                                selectable={true}
                                select={handleDateChange}
                                eventClick={handleEventClick}
                                headerToolbar={{
                                  left: "prev,next today",
                                  center: "title",
                                  right: "timeGridWeek",
                                }}
                              />
                              {selectedDate && (
                                <select
                                  className="form-select form-control mt-3"
                                  name="time"
                                  value={selectedTime}
                                  onChange={handleTimeChange}
                                >
                                  <option value="">اختر وقت</option>
                                  {availableTimes.map((time, index) => (
                                    <option
                                      key={index}
                                      value={`${time.start} - ${time.end}`}
                                    >
                                      {time.start} - {time.end}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">رقم الهاتف</label>
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
                          {/* <div className="mb-3">
                            <label className="form-label">
                              البريد الإلكتروني
                            </label>
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              placeholder="البريد الإلكتروني :"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div> */}
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label">العنوان</label>
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
                              <label className="form-label">
                                تاريخ الميلاد{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                name="birth_date"
                                type="date"
                                className="form-control"
                                placeholder="تاريخ الميلاد :"
                                value={formData.birth_date}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label">
                                الجنس <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-select form-control"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                              >
                                <option value="male">ذكر</option>
                                <option value="female">أنثى</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label">
                                التعليقات <span className="text-danger">*</span>
                              </label>
                              <textarea
                                name="comments"
                                rows="4"
                                className="form-control"
                                placeholder="التعليقات :"
                                value={formData.comments}
                                onChange={handleChange}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center mb-3">
                        <div className="col-lg-8 text-center">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            احجز موعد
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
