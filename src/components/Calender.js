import React, { useState } from "react";
import "../styles/Calendar.css";
import moment from "moment-timezone";

const Calendar = ({ currentDate, activeDate, onDateClick, rooms, selected }) => {
  const activeRoomBookings = rooms.find((room) => room._id === selected).bookings;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    let calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push("");
        } else if (dayCounter > daysInMonth) {
          week.push("");
        } else {
          const date = new Date(year, month, dayCounter);
          const isAllSlotsBooked = activeRoomBookings.some(
            (booking) => booking.date === moment(date).format("YYYY-MM-DD") && booking.slots.length >= 9
          );
          week.push({
            day: dayCounter,
            isAllSlotsBooked: isAllSlotsBooked,
          });
          dayCounter++;
        }
      }
      calendar.push(week);
    }
    return calendar;
  };

  const calendar = generateCalendar();

  return (
    <div>
      <div className="container mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3>
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th key={day} className="text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const isPastDate =
                    day.day !== "" &&
                    new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day) < new Date() &&
                    !isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day));
                  return (
                    <td
                      key={dayIndex}
                      className={`text-center td-style ${isPastDate ? "past-dates" : ""} ${
                        isToday(new Date(currentDate.getFullYear(), currentDate.getMonth())) ? "active" : ""
                      } ${
                        activeDate &&
                        new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day).getTime() ===
                          activeDate.getTime()
                          ? "active"
                          : ""
                      } ${day.isAllSlotsBooked && !isPastDate ? "all-slots-booked" : ""}`}
                      onClick={day.day !== "" && !isPastDate ? onDateClick(day.day) : null}
                    >
                      {day.day !== "" ? day.day : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
