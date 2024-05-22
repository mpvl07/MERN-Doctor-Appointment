import React from 'react';
import "../index.css";


const UserDashboard = () => {
  return (
    <div className="user-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="header-cardd">
            <div className="wallpaper-cover"></div>
            <div className="user-infoo">
              <div className="user-details">
                <h2 className="user-name-left">User Name</h2>
                <div className="details-section">
                  <div className="left-details">
                    <p className="user-info-text"><strong>Mobile Number:</strong> User's Mobile Number</p>
                    <p className="user-info-text"><strong>Email Address:</strong> user@example.com</p>
                    <p className="user-info-text"><strong>Residence Address:</strong> User's Residence Address</p>
                    <p className="user-info-text"><strong>Occupation:</strong> User's Occupation</p>
                  </div>
                  <div className="right-details">
                    <p className="user-info-text"><strong>Date of Birth:</strong> January 1, 1990</p>
                    <p className="user-info-text"><strong>Blood Group:</strong> A+</p>
                    <p className="user-info-text"><strong>Gender:</strong> Male</p>
                    <p className="user-info-text"><strong>Marital Status:</strong> User's Marital Status</p>
                  </div>
                </div>
              </div>
              <div className="buttons-container">
                <button className="edit-profile-btn">Edit Profile</button>
                <button className="medical-report-btn" onClick={() => window.location.href='medical_report.html'}>Medical Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Upcoming Appointments Card */}
        <div className="col-md-6">
          <div className="appointments-card square-card">
            <div className="details-section">
              <div className="left-details">
                <h3>Upcoming Appointments</h3>
                <div className="table-container">
                  <table className="table">
                    {/* ... (rest of the code remains unchanged) */}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Past Appointments Card */}
        <div className="col-md-6">
          <div className="appointments-card square-card">
            <div className="details-section">
              <div className="left-details">
                <h3>Past Appointments</h3>
                <div className="table-container">
                  <table className="table">
                    {/* ... (rest of the code remains unchanged) */}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
