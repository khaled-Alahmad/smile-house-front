'use client'
import React from "react"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function TimeTable(){
    let  events = [
        {
            title: 'Business Lunch',
            start: '2024-05-03T13:00:00',
            constraint: 'businessHours'
        },
        {
            title: 'Meeting',
            start: '2024-02-13T11:00:00',
            constraint: 'availableForMeeting',
            color: '#53c797'
        },
        {
            title: 'Conference',
            start: '2024-03-18',
            end: '2022-04-20'
        },
        {
            title: 'Party',
            start: '2024-04-29T20:00:00'
        },
    ]
    return(
        <div className="col-xl-10 col-lg-8 col-12 mt-4">
            <div id="calendar-container" className="card rounded border-0 shadow p-4">
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin]}
                events={events}
                headerToolbar = {
                    {
                        left: 'prev,next today addEventButton',
                        center: 'title',
                        right :'dayGridMonth,dayGridWeek,dayGridDay'
                    }
                }
                    customButtons={
                    {
                        addEventButton : {
                            text:'Add Event',
                            click : function (){
                                var dateStr = prompt('Enter a date in YYYY-MM-DD format');
                            }
                        }
                    }
                    }
                    
            />
            </div>
        </div>
    )
}