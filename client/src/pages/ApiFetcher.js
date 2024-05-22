import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(null);
  const apiUrl = "http://mohan123.pythonanywhere.com/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
      console.error("Error details:", error.response || error.message);
    }
  };

  return (
    <div className="App">
      <h1>User Data</h1>
      {userData ? (
        <div>
          <p>Registration Number: {userData.reg_no}</p>
          <p>Name: {userData.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
