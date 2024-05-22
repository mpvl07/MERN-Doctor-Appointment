import React from "react";
//import 'antd/dist/antd.css';
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "antd"; // Make sure to import Button from 'antd'
import { Toaster } from "react-hot-toast";
import Home1 from "./pages/Home1";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FindDoctor from "./pages/FindDoctor";
import ApiFetcher from "./pages/ApiFetcher";
import DoctorProfile from "./pages/DoctorProfile";
import BookAppointment from "./pages/BookAppointment";
import UserDashboard from "./components/userDashboard";
import Pharmacies from "./pages/Pharmacies";
import DoctorInterface from "./pages/DoctorInterface";
import DoctorApplyForm from "./pages/DoctorApplyForm";
//import PrivateRoute from "./components/PrivateRoute"
import PrivateRoute from "./components/PrivateRoute";
import Profileclick from "./components/Profileclick";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Doctors from "./pages/Doctors";
import Map from "./components/Map";
import Appointments from "./pages/Appointments";
import { UserProvider } from "./components/UserContext";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        {/* <div className="spinner-parent">
          <div class="spinner-border" role="status">

          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} /> */}
        <UserProvider>
          <Routes>
            <Route path="/api" element={<ApiFetcher />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

            <Route
              path="/main"
              element={
                <ProtectedRoute>
                  <Home1 />
                </ProtectedRoute>
              }
            />
            <Route path="/doctorprofile" element={<DoctorProfile />} />
            <Route path="/bookappointment" element={<BookAppointment />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="pharmacies" element={<Pharmacies />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="profileclick" element={<Profileclick />} />
            </Route>
            <Route path="/applydoctor" element={<DoctorInterface />} />
            <Route path="/applyform" element={<DoctorApplyForm />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="finddoctor" element={<FindDoctor />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="map" element={<Map />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/appointments" element={<Appointments/>} />
            </Route>

            <Route path="/doctors" element={<Doctors />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
