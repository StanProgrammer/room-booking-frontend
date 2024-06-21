import React from 'react';
import '../styles/Room.css';

const Rooms = ({ rooms, active, name, features, capacity, onClick, currentDate, selectedSlots }) => {
  const calculateEarliestAvailability = (roomName, slots, currentDate) => {
    const filteredRoom = rooms.find((room) => room.name === roomName);
    if (!filteredRoom) {
      return 'Room not found';
    }
    let roomBookings = filteredRoom.bookings || [];
    if (!Array.isArray(roomBookings)) {
      roomBookings = [roomBookings];
    }
    // console.log(roomBookings)
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let day = today;
    let month = currentMonth;
    let year = currentYear;

    const roomSlots = [
      '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM',
      '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM'
    ];

    while (true) {
      const activeBookings = roomBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return (
          bookingDate.getDate() === day &&
          bookingDate.getMonth() === month &&
          bookingDate.getFullYear() === year
        );
      }); 
      
      const bookedSlots = activeBookings.flatMap(booking => booking.slots.flatMap(slot => slot.time));

      const availableSlot = roomSlots.find(
        (slot) => !bookedSlots.includes(slot)
      );

      if (availableSlot) {
        return `${availableSlot} on ${day}/${month + 1}/${year}`;
      }

      // Move to the next day
      day++;
      if (day > new Date(year, month + 1, 0).getDate()) {
        // Move to the next month
        day = 1;
        month++;
        if (month > 11) {
          // Move to the next year
          month = 0;
          year++;
        }
      }

      // If we have looped back to the start date, break
      if (day === today && month === currentMonth && year === currentYear) {
        break;
      }
    }

    return 'No availability found';
  };

  return (
    <div className={`card m-3 room-card ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="card-body">
        <div className="room-header">
          <h5 className="card-title">{name}</h5>
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <p>Capacity: {capacity}</p>
        <p>Earliest availability: {calculateEarliestAvailability(name, selectedSlots, currentDate)}</p>
      </div>
    </div>
  );
};

export default Rooms;
