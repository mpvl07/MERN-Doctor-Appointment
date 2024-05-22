import React, { useEffect, useState } from "react";
import L from "leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Link from "antd/es/typography/Link";
const Map = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [map, setMap] = useState(null);
  const [nearestPharmacies, setNearestPharmacies] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    if (!map) {
      const initialMap = L.map("map").setView([51.505, -0.09], 13); // Initial view
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(initialMap);
      setMap(initialMap);
    }
  }, [map]);

  const handleSearch = async () => {
    if (!searchLocation || !map) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}&limit=1`
      );
      if (response.data.length === 0) {
        console.error("Location not found");
        return;
      }

      const { lat, lon } = response.data[0];
      map.setView([lat, lon], 13); // Update view to searched location

      // Fetch nearest pharmacies
      const radius = 100000; // 20km in meters
      const query = `[out:json];(node["amenity"="pharmacy"](around:${radius},${lat},${lon});way["amenity"="pharmacy"](around:${radius},${lat},${lon});relation["amenity"="pharmacy"](around:${radius},${lat},${lon}););out;`;

      const pharmaciesResponse = await axios.get(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          query
        )}`
      );
      const pharmacies = pharmaciesResponse.data.elements;

      // Sort pharmacies by distance
      pharmacies.sort((a, b) => {
        const aDistance = Math.sqrt((a.lat - lat) ** 2 + (a.lon - lon) ** 2);
        const bDistance = Math.sqrt((b.lat - lat) ** 2 + (b.lon - lon) ** 2);
        return aDistance - bDistance;
      });

      // Get top 5 nearest pharmacies
      const top5Pharmacies = pharmacies.slice(0, 5);

      setNearestPharmacies(top5Pharmacies);

      // Remove previous markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add markers for top 5 pharmacies
      top5Pharmacies.forEach((pharmacy) => {
        const { lat, lon } = pharmacy;
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(pharmacy.tags?.name || "Unnamed Pharmacy");
      });
    } catch (error) {
      console.error("Error searching for pharmacies:", error);
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
      <input
        type="text"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        placeholder="Enter location"
        style={{ width: "80%", margin: "20px" }}
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
      <div
        id="map"
        style={{ height: "400px", margin: "10px 20px", border: "5px" }}></div>
      <div style={{ textAlign: "center" }}>
        <h2>Top 5 Nearest Pharmacies:</h2>
        <ul>
          {nearestPharmacies.map((pharmacy, index) => (
            <li key={index} style={{ fontSize: "20px" }}>
              {pharmacy.tags?.name || "Unnamed Pharmacy"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
