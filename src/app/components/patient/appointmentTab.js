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
import arLocale from "@fullcalendar/core/locales/ar"; // إضافة ترجمة العربية

export default function AppointmentTab() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [doctorsData, setDoctorsData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDep, setSelectedDep] = useState(null);

  const [doctorTimes, setDoctorTimes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();
  const [calendarView, setCalendarView] = useState("timeGridWeek");

  useEffect(() => {
    const updateCalendarView = () => {
      if (window.innerWidth <= 768) {
        setCalendarView("timeGridDay");
      } else {
        setCalendarView("timeGridWeek");
      }
    };

    // Set initial view on load
    updateCalendarView();

    // Update view on window resize
    window.addEventListener("resize", updateCalendarView);

    return () => window.removeEventListener("resize", updateCalendarView);
  }, []);

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
    try {
      const response = await axios.get(
        `${apiUrl}doctors/${selectedId}/week/${getCurrentWeek()}`
      );

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
    // //console.log(selectedDep);

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

    axios
      .post(`${apiUrl}bookAppointment`, formData)
      .then((response) => {
        //console.log("Appointment booked successfully:", response.data);
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
    //console.log(selectedDoctor);

    if (!selectedDoctor) {
      alert("يجب تحديد طبيب أولاً"); // إظهار رسالة تحذير
      return;
    }
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
    const phone_company = localStorage.getItem("appointment_phone");
    //console.log(phone_company);

    // const phone = "+963964677938";
    const message = `السلام عليكم ورحمة الله وبركاته،

أود حجز موعد في مركز سمايل هاوس لزيارة طبية. يُرجى إفادتي بالتواريخ المتاحة وأي إجراءات إضافية قد تكون مطلوبة قبل الزيارة.

شكرًا لتعاونكم.`;
    const encodedMessage = encodeURIComponent(message);
    const toPhoneNumber = phone_company;

    const whatsappURL = `https://api.whatsapp.com/send?phone=${toPhoneNumber}&text=${encodedMessage}`;

    // //console.log("Redirecting to:", whatsappURL);

    // Redirect to WhatsApp
    window.open(whatsappURL, "_blank");
    toast.success("شكراً لكم!"); // عرض رسالة النجاح
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
              </ul>

              <div className="tab-content p-4">
                {activeIndex === 2 ? (
                  <div className="tab-pane fade show active" dir="rtl">
                    <form onSubmit={handleWhatsAppSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">الطبيب</label>
                            <select
                              className="form-select form-control"
                              name="doctor"
                              value={selectedDoctor ? selectedDoctor.id : ""}
                              onChange={handleDoctorChange}
                              // required
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

                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              المواعيد المتاحة
                            </label>
                            <FullCalendar
                              plugins={[timeGridPlugin, interactionPlugin]}
                              initialView={calendarView} // Use responsive state
                              selectable={true}
                              selectMirror={true}
                              dayMaxEvents={true}
                              allDaySlot={false}
                              contentHeight="auto"
                              slotMinTime="08:00:00"
                              slotMaxTime="16:00:00"
                              direction="rtl"
                              select={handleDateChange}
                              eventClick={handleEventClick}
                              locale={arLocale} // تعيين اللغة العربية
                              headerToolbar={{
                                start: "prev,next today",
                                center: "title",
                                end:
                                  calendarView === "timeGridDay"
                                    ? "timeGridDay"
                                    : "timeGridWeek,timeGridDay",
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
                                      extendedProps: { type: "work" },
                                    },
                                  ];
                                }),
                                ...appointments.map((appointment) => ({
                                  title: "حجز",
                                  start: `${appointment.visit_date}T${appointment.start_time}`,
                                  end: `${appointment.visit_date}T${appointment.end_time}`,
                                  color: "gray",
                                  extendedProps: { type: "appointment" },
                                })),
                              ]}
                              eventClassNames={(event) => {
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
                      </div>

                      <button type="submit" className="btn btn-primary">
                        إرسال عبر واتساب
                      </button>
                    </form>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
