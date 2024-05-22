import React, { useEffect } from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";
import "../index.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const logout = () => {
    localStorage.removeItem("token");
    // Redirect to login page or do any other necessary actions
  };
  const {user}=useSelector((state)=>state.user)
  const getData = async () => {
    
    try {
      const token = localStorage.getItem("token");
      // Assuming the token contains the user's ID
      
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
     localStorage.removeItem("token");
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
            <Link to="/finddoctor">Find a Doctor</Link>
          </li>
          <li>
            <a href="/applyform">Apply Doctor</a>
          </li>
          <li>
            <a href="/map">Pharmacy</a>
          </li>

          
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>

      <div className="home-main">
        <div className="main-content">
          <div className="main-text">
            <h1>
              <b>Book Your Doctor Appointment Online</b>
            </h1>
            <p>
              <i>
                Book your appointment TODAY and start being healthy from
                TOMORROW.
              </i>
            </p>
            <div className="main-btns">
              <button className="main-contact">Contact Us</button>
            </div>
          </div>
          <div className="doctor-image-container">
            <img src="image.png" alt="Doctor" className="doctor-imagee" />
          </div>
        </div>
      </div>
      <div class="how-it-works">
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
      </div>
      {/* <div class="search-container">
        <input type="text" placeholder="Search..." />
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </div> */}

      <footer class="footer">
        <div class="footer-links">
          <a href="/">Home</a>
          <a href="#">Contact Us</a>
        </div>
        <div class="copyright">
          &copy; 2024 Mohan Dommeti. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
