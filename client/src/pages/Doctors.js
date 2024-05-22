// DoctorPage.js

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DoctorPage = () => {
  const location = useLocation();
  const { doctorId } = location.state;
  const navigate=useNavigate();
  const [appointments, setAppointments] = useState([]);
  console.log(doctorId);
  const fetchAppointments = async () => {
    const response = await axios.get(`/api/user/appointments/${doctorId}`);
    setAppointments(response.data);
    console.log("appo", setAppointments);
  };
  const handleLogout = () => {
    // Delete the token
    localStorage.removeItem("token");
    // Navigate to home page
    navigate("/");
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

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
            <a href="/map">Pharmacy</a>
          </li>

          <li>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <h1 style={{ padding: "30px 30px" }}>Doctor's Page</h1>
      <button
        onClick={fetchAppointments}
        style={{
          fontSize: "1.2em",
          borderRadius: "5px", // Add curved edges
          backgroundColor: "#121481", // Set background color
          color: "white", // Set text color
          margin: "30px 30px",
          padding: "8px 16px", // Add padding
          border: "none", // Remove border
          cursor: "pointer", // Add pointer cursor
        }}>
        Appointments
      </button>
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          position: "relative",
          left: "10%",
          top: "10px",
        }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Appointment Date
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Appointment Time
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {appointment.date.substring(0, 9)}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {appointment.timeSlot}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorPage;
