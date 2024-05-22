import React, { useEffect } from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";
import "../index.css";
import { Link } from "react-router-dom";
function DoctorInterface() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
            <Link to="/applyform">Apply Doctor</Link>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/pharmacies">Pharmacy</a>
          </li>
          <li>
            <Link to="/doctorprofile">profile</Link>
          </li>
        </ul>
      </nav>

      <div className="home-main">
        <div className="main-content">
          <div className="main-text">
            <h1>
              <b>Check your Appointments</b>
            </h1>
            <p>
              <i></i>
            </p>
            <div className="main-btns">
              <button className="main-book">Appointments</button>
              <button className="main-contact">Contact Us</button>
            </div>
          </div>
          <div className="doctor-image-container" >
            <img src="image.png" alt="Doctor" className="doctor-imagee" />
          </div>
        </div>
      </div>

      {/* <div class="how-it-works">
        <h1>How It Works</h1>
        <div class="topics">
          <div class="topic">
            <i class="fas fa-user-md fa-3x"></i>
            <h2>Find a Doctor</h2>
            <p>Search for doctors based on location, specialty, or name.</p>
          </div>
          <div class="topic">
            <i class="far fa-calendar-alt fa-3x"></i>
            <h2>Book an Appointment</h2>
            <p>
              Book appointments with your chosen doctor conveniently online.
            </p>
          </div>
          <div class="topic">
            <i class="fas fa-hospital-user fa-3x"></i>
            <h2>Get Your Service</h2>
            <p>Receive the healthcare service you need with ease.</p>
          </div>
        </div>
      </div> */}

      {/* <div class="search-container">
        <input type="text" placeholder="Search..." />
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </div> */}

      {/* <footer class="footer">
        <div class="footer-links">
          <a href="#">Home</a>
          <a href="#">Contact Us</a>
          <a href="#">Find a Doctor</a>
        </div>
        <div class="copyright">
          &copy; 2023 YourWebsiteName. All Rights Reserved.
        </div>
      </footer> */}
    </div>
  );
}

export default DoctorInterface;
