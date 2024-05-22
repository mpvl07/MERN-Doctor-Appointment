import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const BookAppointment = () => {
  const location = useLocation();
  const { doctorId, userEmail } = location.state;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigate = useNavigate();
  const handleDateChange = async (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    console.log("doctorId", doctorId);
    console.log("userEmail", userEmail);
    try {
      const response = await fetch(
        `/api/user/availableSlots?doctorId=${doctorId}&date=${date}`
      );

      const data = await response.json();
      console.log(data);
      setAvailableSlots(data.availableSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const appointmentData = {
      doctorRegisterNo: doctorId,
      email: userEmail,
      date: selectedDate,
      timeSlot: selectedSlot,
    };
    try {
      console.log("appointment data", appointmentData);
      const response = await axios.post(
        "/api/user/appointments",
        appointmentData
      );
      console.log("Appointment booked:", response.data);
      navigate("/main");
      // Add logic to handle success, e.g., redirect to a confirmation page
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Add logic to handle error, e.g., display an error message
    }
  };
   const handleLogout = () => {
     // Delete the token
     localStorage.removeItem("token");
     // Navigate to home page
     navigate("/");
   };

  return (
    <div>
      <nav class="navbar">
        <div class="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <ul class="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/finddoctor">Find a Doctor</Link>
          </li>
          <li>
            <a href="/applyform">Apply Doctor</a>
          </li>
          <li>
            <a href="/map">Pharmacy</a>
          </li>

          <li>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <form
        onSubmit={handleSubmit}
        className="centered-form"
        style={{ position: "relative", top: "200px" }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <div>
            <b style={{ fontSize: "1.2em" }}>Date of Appointment </b>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ marginTop: "10px" }}
            />
          </div>
        </label>
        {selectedDate && (
          <>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}>
              <div>
                <b style={{ fontSize: "1.2em" }}>Time Slot of Appointment </b>
                <select
                  value={selectedSlot}
                  onChange={handleSlotChange}
                  style={{ width: "250px" }}>
                  <option value="">Select a time slot</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <button
              type="submit"
              style={{
                fontSize: "1.2em",
                borderRadius: "5px", // Add curved edges
                backgroundColor: "#121481", // Set background color
                color: "white", // Set text color
                padding: "8px 16px", // Add padding
                border: "none", // Remove border
                cursor: "pointer", // Add pointer cursor
                position: "absolute",
                left: "750px",
                top: "140px",
              }}>
              Book Appointment
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default BookAppointment;
