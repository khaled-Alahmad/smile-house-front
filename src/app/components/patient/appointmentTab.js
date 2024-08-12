import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { FetchCategories, doctors, apiUrl } from "@/app/data/dataApi";
import Loader from "../loader";
import "./style.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function AppointmentTab() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [doctorsData, setDoctorsData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDep, setSelectedDep] = useState(null);

  const [doctorTimes, setDoctorTimes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    category: "",
    comments: "",
    gender: "male",
    birth_date: "",
    address: "",
    doctor_id: "",
    visit_date: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedDoctors = await doctors();
        setDoctorsData(fetchedDoctors);
        const fetchedCategories = await FetchCategories();
        setCategoryData(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchDataAsync();
  }, []);
  const getCurrentWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start + ((start.getDay() + 6) % 7) * 86400000;
    return Math.ceil(diff / 604800000);
  };

  const handleDoctorChange = async (event) => {
    const selectedId = event.target.value;
    const selectedDoctor = doctorsData.find(
      (doctor) => doctor.id === parseInt(selectedId)
    );
    setSelectedDoctor(selectedDoctor);
    setFormData({ ...formData, doctor_id: selectedDoctor.id });

    // استرجاع بيانات أوقات العمل والحجوزات للطبيب المحدد
    try {
      const response = await axios.get(
        `${apiUrl}doctors/${selectedId}/week/${getCurrentWeek()}`
      );
      console.log("Doctor times:", response.data.data.times); // تحقق من أن البيانات تأتي بشكل صحيح
      console.log("Appointments:", response.data.data.appointments);
      setDoctorTimes(response.data.data.times);
      setAppointments(response.data.data.appointments);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };
  const handleDepChange = async (event) => {
    const selectedId = event.target.value;
    const selectedDep = categoryData.find(
      (doctor) => doctor.id === parseInt(selectedId)
    );
    setSelectedDep(selectedDep);
    // console.log(selectedDep);
    
    setFormData({ ...formData, category_id: selectedDep.id });

    // استرجاع بيانات أوقات العمل والحجوزات للطبيب المحدد
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
    console.log(formData);

    // if (!formData.phone || !formData.start_time || !formData.end_time) {
    //   alert("يرجى ملء جميع الحقول الإلزامية.");
    //   return;
    // }
    axios
      .post(`${apiUrl}bookAppointment`, formData)
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
        toast.success("تم الحجز بنجاح!"); // عرض رسالة النجاح
        router.push("/"); // إعادة التوجيه إلى الصفحة الرئيسية
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors;
          for (let key in errors) {
            alert(`${key}: ${errors[key].join(", ")}`);
          }
        }
      });
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const isWithinWorkingHours = (start, end) => {
    const workingHours = doctorTimes.find((time) => {
      const dayIndex = new Date(start).getDay(); // الحصول على رقم اليوم (0-6)
      return time.day === convertIndexToDay(dayIndex);
    });

    if (!workingHours) return false;

    const startTime = start.split("T")[1];
    const endTime = end.split("T")[1];

    return (
      startTime >= workingHours.start_time && endTime <= workingHours.end_time
    );
  };

  const handleDateChange = (info) => {
    const selectedStart = info.startStr;
    const selectedEnd = info.endStr;

    if (!isWithinWorkingHours(selectedStart, selectedEnd)) {
      alert("لا يمكنك الحجز في هذا الوقت لأنه خارج أوقات العمل.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      visit_date: selectedStart.split("T")[0],
      start_time: formatTime(new Date(selectedStart)),
      end_time: formatTime(new Date(selectedEnd)),
    }));
  };

  const handleEventClick = (info) => {
    const eventStartDate = new Date(info.event.start);
    const eventEndDate = new Date(info.event.end);
    setFormData((prevFormData) => ({
      ...prevFormData,
      visit_date: eventStartDate.toISOString().split("T")[0],
      start_time: formatTime(eventStartDate),
      end_time: formatTime(eventEndDate),
    }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const phone = "+963964677938";
    const message = `الاسم الأول: ${formData.first_name}\nاسم العائلة: ${
      formData.last_name
    }\nرقم هاتفك: ${formData.phone}\nالتخصص: ${selectedDep.name}\nالطبيب: ${
      selectedDoctor ? selectedDoctor.name : ""
    }\nالتعليقات: ${formData.comments}\nتاريخ الزيارة: ${
      formData.visit_date
    }\nمن: ${formData.start_time} إلى: ${formData.end_time}`;
    const encodedMessage = encodeURIComponent(message);
    const toPhoneNumber = phone.trim().replace("+", "");

    const whatsappURL = `https://api.whatsapp.com/send?phone=${toPhoneNumber}&text=${encodedMessage}`;

    console.log("Redirecting to:", whatsappURL);

    // Redirect to WhatsApp
    window.location.href = whatsappURL;
    toast.success("تم إرسال رسالة الواتساب بنجاح!"); // عرض رسالة النجاح
    router.push("/");
  };

  if (!doctorsData || !categoryData) {
    return <Loader />;
  }

  const dayNames = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const convertDayToIndex = (day) => {
    return dayNames.indexOf(day);
  };

  const convertIndexToDay = (index) => {
    return dayNames[index];
  };

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
                        <div className="col-lg-6">
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
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
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
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              رقم الهاتف<span className="text-danger">*</span>
                            </label>
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              placeholder="+90xxxxxxxxx"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">التخصص</label>
                            <select
                              className="form-select form-control"
                              name="category"
                              value={selectedDep ? selectedDep.id : ""}
                              onChange={handleDepChange}
                              required
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
                              required
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
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">التعليقات</label>
                            <textarea
                              name="comments"
                              rows="4"
                              className="form-control"
                              placeholder="تعليقاتك :"
                              value={formData.comments}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              {" "}
                              المواعيد المتاحة
                            </label>
                            <FullCalendar
                              plugins={[timeGridPlugin, interactionPlugin]}
                              initialView="timeGridWeek"
                              selectable={true}
                              selectMirror={true}
                              dayMaxEvents={true}
                              allDaySlot={false}
                              locale="ar"
                              contentHeight="auto"
                              slotMinTime="08:00:00"
                              slotMaxTime="16:00:00"
                              direction="rtl"
                              select={handleDateChange}
                              eventClick={handleEventClick}
                              headerToolbar={{
                                start: "prev,next today",
                                center: "title",
                                end: "timeGridWeek,timeGridDay",
                              }}
                              events={[
                                ...doctorTimes.flatMap((time) => {
                                  return [
                                    {
                                      title: "أوقات العمل",
                                      startTime: time.start_time,
                                      endTime: time.end_time,
                                      daysOfWeek: [convertDayToIndex(time.day)],
                                      color: "green",
                                      display: "background",
                                      extendedProps: { type: "work" }, // تأكد من إضافة `extendedProps` هنا
                                    },
                                  ];
                                }),
                                ...appointments.map((appointment) => ({
                                  title: "حجز",
                                  start: `${appointment.visit_date}T${appointment.start_time}`,
                                  end: `${appointment.visit_date}T${appointment.end_time}`,
                                  color: "gray",
                                  extendedProps: { type: "appointment" }, // تأكد من إضافة `extendedProps` هنا
                                })),
                              ]}
                              eventClassNames={(event) => {
                                console.log(event); // سجل الحدث لمعرفة هيكله
                                if (
                                  event.extendedProps &&
                                  event.extendedProps.type
                                ) {
                                  return event.extendedProps.type === "work"
                                    ? "work-hours"
                                    : "appointments";
                                }
                                return "";
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              تاريخ الحجز<span className="text-danger">*</span>
                            </label>
                            <input
                              name="visit_date"
                              type="date"
                              className="form-control"
                              placeholder="yyyy/mm/dd"
                              value={formData.visit_date}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              وقت بداية الحجز
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="start_time"
                              type="time"
                              className="form-control"
                              placeholder="HH:mm:ss"
                              value={formData.start_time}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              وقت نهاية الحجز
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="end_time"
                              type="time"
                              className="form-control"
                              placeholder="HH:mm:ss"
                              value={formData.end_time}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary">
                        إرسال عبر واتساب
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="tab-pane fade show active" dir="rtl">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
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
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
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
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              رقم الهاتف<span className="text-danger">*</span>
                            </label>
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              placeholder="+90xxxxxxxxx"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">التخصص</label>
                            <select
                              className="form-select form-control"
                              name="category"
                              value={selectedDep ? selectedDep.id : ""}
                              onChange={handleDepChange}
                              required
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
                              required
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
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">التعليقات</label>
                            <textarea
                              name="comments"
                              rows="4"
                              className="form-control"
                              placeholder="تعليقاتك :"
                              value={formData.comments}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              {" "}
                              المواعيد المتاحة
                            </label>
                            <FullCalendar
                              plugins={[timeGridPlugin, interactionPlugin]}
                              initialView="timeGridWeek"
                              selectable={true}
                              selectMirror={true}
                              dayMaxEvents={true}
                              allDaySlot={false}
                              locale="ar"
                              contentHeight="auto"
                              slotMinTime="08:00:00"
                              slotMaxTime="16:00:00"
                              direction="rtl"
                              select={handleDateChange}
                              eventClick={handleEventClick}
                              headerToolbar={{
                                start: "prev,next today",
                                center: "title",
                                end: "timeGridWeek,timeGridDay",
                              }}
                              events={[
                                ...doctorTimes.flatMap((time) => {
                                  return [
                                    {
                                      title: "أوقات العمل",
                                      startTime: time.start_time,
                                      endTime: time.end_time,
                                      daysOfWeek: [convertDayToIndex(time.day)],
                                      color: "green",
                                      display: "background",
                                      extendedProps: { type: "work" }, // تأكد من إضافة `extendedProps` هنا
                                    },
                                  ];
                                }),
                                ...appointments.map((appointment) => ({
                                  title: "حجز",
                                  start: `${appointment.visit_date}T${appointment.start_time}`,
                                  end: `${appointment.visit_date}T${appointment.end_time}`,
                                  color: "gray",
                                  extendedProps: { type: "appointment" }, // تأكد من إضافة `extendedProps` هنا
                                })),
                              ]}
                              eventClassNames={(event) => {
                                console.log(event); // سجل الحدث لمعرفة هيكله
                                if (
                                  event.extendedProps &&
                                  event.extendedProps.type
                                ) {
                                  return event.extendedProps.type === "work"
                                    ? "work-hours"
                                    : "appointments";
                                }
                                return "";
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              تاريخ الحجز<span className="text-danger">*</span>
                            </label>
                            <input
                              name="visit_date"
                              type="date"
                              className="form-control"
                              placeholder="yyyy/mm/dd"
                              value={formData.visit_date}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              وقت بداية الحجز
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="start_time"
                              type="time"
                              className="form-control"
                              placeholder="HH:mm:ss"
                              value={formData.start_time}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              وقت نهاية الحجز
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="end_time"
                              type="time"
                              className="form-control"
                              placeholder="HH:mm:ss"
                              value={formData.end_time}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        احجز الآن
                      </button>
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
