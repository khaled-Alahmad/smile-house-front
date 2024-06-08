import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function AppointmentCalendar({ times }) {
  const [disabledTimes, setDisabledTimes] = useState([]);

  useEffect(() => {
    if (times && times.length > 0) {
      const filteredTimes = times
        .filter((time) => !time.available)
        .map((time) => ({
          start: new Date(time.start_time),
          end: new Date(time.end_time),
        }));
      setDisabledTimes(filteredTimes);
    }
  }, [times]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        timeslots={1}
        min={new Date("2024-01-01T08:00:00")}
        max={new Date("2024-01-01T18:00:00")}
        onSelectSlot={(slotInfo) => {
          // Handle slot selection
        }}
        onSelectEvent={(event) => {
          // Handle event selection
        }}
        dayPropGetter={(date) => {
          const dayOfWeek = moment(date).format("dddd");
          // Customize day properties based on your requirements
          return {
            className: "custom-class", // Add custom class
            style: {
              backgroundColor: "red", // Change background color
              fontWeight: "bold", // Add bold font weight
            },
          };
        }}
        eventPropGetter={(event) => ({
          className: "custom-event-class", // Add custom class
          style: {
            backgroundColor: "green", // Change background color
            color: "white", // Change text color
          },
        })}
        step={15}
        views={["week"]}
        defaultView="week"
        components={{
          timeSlotWrapper: (props) => {
            const { children, value } = props;
            const isDisabled = disabledTimes.some((time) => {
              const startTime = moment(time.start).format("HH:mm");
              const endTime = moment(time.end).format("HH:mm");
              const slotTime = moment(value).format("HH:mm");
              return slotTime >= startTime && slotTime < endTime;
            });

            return (
              <div>
                {children}
                {isDisabled && (
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "red",
                      opacity: 0.5,
                    }}
                  >
                    {/* You can customize the disabled slot appearance here */}
                  </div>
                )}
              </div>
            );
          },
        }}
      />
    </div>
  );
}

export default AppointmentCalendar;
