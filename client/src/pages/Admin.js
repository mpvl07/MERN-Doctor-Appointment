import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Link from "antd/es/typography/Link";
const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const apiUrl = "http://mohan123.pythonanywhere.com/";

  const checkDoctor = async (item) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const foundDoctor = data.doctors.find(
        (doctor) => doctor["doctorRegisterNo"] === item.doctorRegisterNo
      );
      if (foundDoctor) {
        alert("Doctor verified")
        setApprovedDoctors([...approvedDoctors, item.doctorRegisterNo]);
        console.log("Doctor found:", foundDoctor);
        try {
          const response = await axios.get(
            `/api/user/DAformdata?doctorRegisterNo=${item.doctorRegisterNo}`
          );
          console.log(response.data);
          const dataa = await response.data;

          const responsee = await axios.post("/api/user/doctors", dataa);
          console.log("Doctor details sent to database:", responsee.data);
        } catch (error) {
          console.log("Error storing data", error);
        }
      } else {
        alert("Doctor not Available")
        console.log("Doctor not found.");
      }
    } catch (error) {
      console.error("Error checking doctor:", error);
    }
  };
  const handleDelete = async (doctorId) => {
    try {
      await axios.delete(`/api/user/deleteDoctor/${doctorId}`);
      console.log("Doctor deleted");
      setData(data.filter((doctor) => doctor.doctorId !== doctorId));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
   const handleLogout = () => {
     // Delete the token
     localStorage.removeItem("token");
     // Navigate to home page
     navigate("/");
   };

  const handleCheck = (doctorId) => {
    console.log("Checked for doctor:", doctorId);
  };

  return (
    <div>
      <nav class="navbar">
        <div class="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <ul class="nav-links">
          

          <li>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <h2>Data from Database</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data.map((item) => (
          <li
            key={item._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}>
            <strong>Name:</strong> {item.name}
            <br />
            <strong>Doctor Register No:</strong> {item.doctorRegisterNo}
            <br />
            <strong>State Council Name:</strong> {item.stateCouncilName}
            <br />
            {approvedDoctors.includes(item._id) ? (
              <p style={{ color: "green" }}>Approved</p>
            ) : (
              <button onClick={() => checkDoctor(item)}>Approve</button>
            )}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Admin;
