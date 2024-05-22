import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Appointments() {
  const location = useLocation();
  const email = location.state?.email;
  const [pastAppointments, setPastAppointments] = useState(null);
  const [futureAppointments, setFutureAppointments] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/appointment/${email}`);
        const { past, future } = response.data;
        setPastAppointments(past);
        setFutureAppointments(future);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);
  const handleLogout = () => {
    // Delete the token
    localStorage.removeItem("token");
    // Navigate to home page
    navigate("/");
  };
  const handleReview = async (appointment) => {
    const rating = parseInt(prompt("Enter rating (1-5):"));
    const comment = prompt("Enter your comment:");

    if (rating && comment) {
      try {
        await axios.post("/api/user/appointments/review", {
          doctorRegisterNo: appointment.doctorRegisterNo,
          rating,
          email,
          comment,
        });
        alert("Review submitted successfully");

        // Update the appointment to mark it as reviewed
        appointment.reviewed = true;
        setPastAppointments([...pastAppointments]);
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Failed to submit review");
      }
    } else {
      alert("Please enter rating and comment");
    }
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
      <h2>Past Appointments</h2>
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
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Review
            </th>
          </tr>
        </thead>
        <tbody>
          {pastAppointments &&
            pastAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {appointment.date.substring(0, 10)}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {appointment.timeSlot}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <button
                    onClick={() => handleReview(appointment)}
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#FFFFFF",
                      color: "#121481",
                      padding: "8px 16px",
                      cursor: "pointer",
                    }}>
                    Review
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 style={{ margin: "20px" }}>Future Appointments</h2>
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
          {futureAppointments &&
            futureAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {appointment.date.substring(0, 10)}
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
}

export default Appointments;
