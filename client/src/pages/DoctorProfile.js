import "../cssfiles/DoctorProfile.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../components/UserContext";
const DoctorProfile = () => {
  const location = useLocation();
  const doctor = location.state.doctor;

  const { user } = useUser();

  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        console.log(doctor.doctorRegisterNo);
        const response = await axios.get(
          `/api/user/ratings/${doctor.doctorRegisterNo}`
        );
        setRatings(response.data.ratings);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `/api/user/comments/${doctor.doctorRegisterNo}`
        );
        setComments(response.data.comments);
        console.log(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchRatings();
    fetchComments();
  }, [doctor.doctorRegisterNo]);

  const handleBookAppointment = () => {
    // Assuming you have the user's email stored in state or context
    const userEmail = user.email; // Replace this with the actual user's email
    console.log("User Email", userEmail);
    console.log(doctor.doctorRegisterNo);
    // Navigate to the book appointment page with doctorId and userEmail
    navigate(`/bookappointment`, {
      state: { doctorId: doctor.doctorRegisterNo, userEmail },
    });
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

      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <h1>{doctor.name}'s Profile</h1>
        <img
          src={window.location.origin + `/${doctor.file}`}
          style={{ width: "400px" }}
        />
        <div>
          <p>
            <b>Email:</b> {doctor.email}
          </p>
          <p>
            <b>Doctor Register No: </b>
            {doctor.doctorRegisterNo}
          </p>
          <p>
            <b>State Council Name:</b> {doctor.stateCouncilName}
          </p>
          <p>
            <b>Specialization:</b> {doctor.specialization}
          </p>
        </div>

        {/* Add more details as needed */}

        {/* Display Ratings */}
        <h2>Ratings</h2>
        {ratings && (
          <ul>
            <li>
              <b>Rating:</b> {ratings.rating} <b>Rating Count:</b>{" "}
              {ratings.ratingCount}
            </li>
          </ul>
        )}

        {/* Display Comments */}
        <h2>Reviews</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
            {comment.email} - {comment.comment}
            </li>
          ))}
        </ul>

        {/* Book Appointment Button */}
        <button onClick={handleBookAppointment}>Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorProfile;
