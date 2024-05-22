import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../cssfiles/FindDoctor.css"
const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/doctors");
        setDoctors(response.data.doctors);
        setFilteredDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleLogout = () => {
    // Delete the token
    localStorage.removeItem("token");
    // Navigate to home page
    navigate("/");
  };
  const handleDoctorClick = async (doctorId) => {
    try {
      const response = await axios.get(`/api/user/doctors/${doctorId}`);
      const doctor = response.data.doctor;
      navigate(`/doctorProfile`, { state: { doctor } });
    } catch (error) {
      console.error("Error fetching doctor details:", error);
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search doctor with specializations"
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="button" className="search-button" onClick={handleSearch}>
          <i className="fas fa-search"></i> Search
        </button>
      </div>
      <div className="doctor-container">
        {filteredDoctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          filteredDoctors.map((doctor, index) => (
            <div
              key={doctor._id}
              className="doctor-box"
              onClick={() => handleDoctorClick(doctor._id)}
              style={{ gridColumn: (index % 4) + 1 }}>
              <img
                src={window.location.origin + `/${doctor.file}`}
                alt={doctor.name}
              />
              <p className="doctor-name">Name: {doctor.name}</p>
              <p className="doctor-specialization">
                Specialization: {doctor.specialization}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FindDoctor;
