import React from "react";

const DoctorBox = ({ name, specialization }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}>
      <strong>Name:</strong> {name}
      <br />
      <strong>Specialization:</strong> {specialization}
      <br />
    </div>
  );
};

export default DoctorBox;
