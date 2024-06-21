import React from "react";
import '../styles/Slots.css';
import moment from 'moment-timezone'; 

const Slots = ({ activeDate, selected, selectedSlots, handleSlotClick, bookings }) => {
  const slots = [];
  

  for (let i = 10; i < 19; i++) {
    const startTime24 = `${i}:00`;
    const endTime24 = `${i}:00`;

    // Convert 24-hour format to 12-hour format
    const startHour12 = i > 12 ? i - 12 : i;
    const endHour12 = i > 11 ? i - 11 : i + 1;
    const startTime12 = `${startHour12}:00 ${i >= 12 ? "PM" : "AM"}`;
    const endTime12 = `${endHour12}:00 ${i >= 11 ? "PM" : "AM"}`;

    const slot = `${startTime12} - ${endTime12}`;
    slots.push(slot);
  }

  const isSlotBooked = (slot) => {

    if (!bookings || !activeDate) return false;
    const formattedDate = moment(activeDate).format('YYYY-MM-DD');
    const booking = bookings.find((booking) => booking.date === formattedDate);
    if (!booking) return false;
    return booking.slots.some((bookedSlot) => bookedSlot.time.includes(slot));
  };

  return (
    <div className={selected ? "slots" : "hidden"}>
      {slots.map((slot, index) => (
        <button
          key={index}
          type="button"
          className={`btn btn-light rounded-0 ${selectedSlots.includes(slot) ? "active" : ""} ${isSlotBooked(slot) ? "booked" : ""}`}
          onClick={() => handleSlotClick(slot)}
          disabled={isSlotBooked(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default Slots;
