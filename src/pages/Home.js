import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import "../styles/Home.css";
import Rooms from "../components/Rooms";
import Calendar from "../components/Calender";
import axios from "axios";
import Slots from "../components/Slots";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment-timezone";
function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(0);
  const [activeRoom, setActiveRoom] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const onDateClick = (day) => () => {
    setActiveDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setSelectedSlots([]);
  };

  const handleClick = (id) => () => {
    setSelected(id);
    const active = rooms.filter((room) => room._id === id);
    setActiveRoom(active[0]);
    setSelectedSlots([]);
    setActiveDate(0);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlots((prevSelectedSlots) => {
      // Toggle selection of the slot
      if (prevSelectedSlots.includes(slot)) {
        return prevSelectedSlots.filter((s) => s !== slot);
      } else {
        return [...prevSelectedSlots, slot];
      }
    });
  };

  const handleSubmit = async () => {
    const formattedDate = moment(activeDate).format("YYYY-MM-DD");
    const data = {
      roomId: selected,
      date: formattedDate,
      slots: selectedSlots,
    };

    try {
      const response = await axios.post(`${backendUrl}/book`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update rooms array with the new booking data
      setRooms((prevRooms) => {
        return prevRooms.map((room) => {
          if (room._id === selected) {
            return { ...room, bookings: response.data.bookings };
          }
          return room;
        });
      });

      // Reset selected slots and active date after booking
      setSelectedSlots([]);
      setActiveDate(null);
      toast.success("Booking has been successfull");
    } catch (error) {
      toast.error("Error booking room:");
    }
  };

  const getRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendUrl}/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data);
      setSelected(response.data[0]._id);
      setActiveRoom(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (selected !== 0) {
      const active = rooms.find((room) => room._id === selected);
      setActiveRoom(active);
    }
  }, [rooms, selected]);

  const isBookButtonDisabled = activeDate === 0 || selectedSlots.length === 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container1">
      <div className="header">
        <h1 className="mb-2">Book Rooms</h1>
        <button type="button" className="btn btn-danger logout-class" onClick={handleLogout}>
          <RiLogoutCircleRLine />
          Logout
        </button>

        <div>
          <SearchBox setSearchQuery={setSearchQuery} />
        </div>
      </div>

      <div className="main-content">
        <div className="room-sector">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div key={room._id}>
                <Rooms
                  key={room._id}
                  name={room.name}
                  features={room.features}
                  capacity={room.capacity}
                  onClick={handleClick(room._id)}
                  active={selected === room._id}
                  activeDate={activeDate}
                  selectedSlots={selectedSlots}
                  rooms={rooms}
                  currentDate={new Date()}
                />
              </div>
            ))
          ) : (
            <div className="alert alert-warning" role="alert">
              No rooms found.
            </div>
          )}
        </div>
        <div className="calender-sector">
          {!activeRoom || !filteredRooms.some((room) => room._id === activeRoom._id) ? (
            <h1>Select A Room</h1>
          ) : (
            <div className="calender-container">
              <div className="calender-header">
                <h1 className="ml-2">{activeRoom?.name}</h1>
                {rooms.map((room) => (
                  <div key={room._id}>
                    {selected === room._id && (
                      <Calendar
                        selectedSlots={selectedSlots}
                        onDateClick={onDateClick}
                        currentDate={currentDate}
                        activeDate={activeDate}
                        rooms={rooms}
                        selected={selected}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="book-sector">
                <ul className="features-list mb-5">
                  {activeRoom?.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button type="button" className="btn btn-dark" disabled={isBookButtonDisabled} onClick={handleSubmit}>
                  Book Now
                </button>
              </div>
            </div>
          )}
          {activeRoom && filteredRooms.some((room) => room._id === activeRoom._id) && (
            <Slots
              selected={selected}
              selectedSlots={selectedSlots}
              handleSlotClick={handleSlotClick}
              bookings={activeRoom?.bookings}
              activeDate={activeDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
