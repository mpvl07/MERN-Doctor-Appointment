import React, { useState } from "react";
import axios from "axios";
import "../pharmacies.css";
import { Link } from "react-router-dom";

const PharmacyFinder = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const apiKey = "YOUR_API_KEY";
      let position = {};
      if (navigator.geolocation) {
        position = await getCurrentPosition();
      } else {
        position = await getGeocode(location);
      }
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.lat},${position.lng}&radius=5000&type=pharmacy&key=${apiKey}`;
      const response = await axios.get(url);
      const sortedPharmacies = response.data.results
        .map((pharmacy) => ({
          name: pharmacy.name,
          distance: calculateDistance(
            position.lat,
            position.lng,
            pharmacy.geometry.location.lat,
            pharmacy.geometry.location.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);
      setPharmacies(sortedPharmacies);
      setLoading(false);
    } catch (error) {
      setError("Error fetching pharmacies. Please try again.");
      setLoading(false);
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const getGeocode = async (address) => {
    const apiKey = "YOUR_API_KEY";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    const response = await axios.get(url);
    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
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
            <a href="#">About</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/pharmacies">Pharmacy</a>
          </li>
        </ul>
        <div class="book-appointment">
          <Link to="/finddoctor" className="main-book">
            Book An Appointment
          </Link>
        </div>
      </nav>
      <div className="pharmacy-finder">
        <h1>Find Nearest Pharmacies</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={handleLocationChange}
            style={{ width: "0%" }}
          />
          <button
            onClick={handleSearch}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              color: "#121481",
              padding: "8px 16px",
              cursor: "pointer",
            }}>
            Search
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          {pharmacies.map((pharmacy, index) => (
            <li key={index}>
              <strong>{pharmacy.name}</strong> - {pharmacy.distance.toFixed(2)}{" "}
              km
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PharmacyFinder;
