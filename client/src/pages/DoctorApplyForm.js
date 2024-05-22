// // import React from "react";
// // import "../Login.css";
// // import { Link } from "react-router-dom";

// // function DoctorApplyForm() {
// //   return (
// //     <div>
// //       <nav className="navbar">
// //         <div className="logo">
// //           <img src="logo.png" alt="Logo" />
// //         </div>
// //         <ul className="nav-links">
// //           <li>
// //             <Link to="/">Home</Link>
// //           </li>
// //           <li>
// //             <Link to="/applyform">Apply Doctor</Link>
// //           </li>
// //           <li>
// //             <a href="#">About</a>
// //           </li>
// //           <li>
// //             <a href="/login">Login</a>
// //           </li>
// //           <li>
// //             <a href="/pharmacies">Pharmacy</a>
// //           </li>
// //           <li>
// //             <a href="/userprofile">Profile</a>
// //           </li>
// //         </ul>
// //       </nav>
// //       <div id="heading">
// //         <h1>Apply for Doctor</h1>
// //       </div>
// //       <div className="login-container">
// //         <h2>Fill The Form</h2>

// //         <h2>Doctor Application Form</h2>
// //         <form action="/applyform" method="POST" enctype="multipart/form-data">
// //           <label htmlFor="name">Name:</label>
// //           <br />
// //           <input type="text" id="name" name="name" required />
// //           <br />
// //           <br />

// //           <label htmlFor="doctorRegisterNo">Doctor Register No:</label>
// //           <br />
// //           <input
// //             type="text"
// //             id="doctorRegisterNo"
// //             name="doctorRegisterNo"
// //             required
// //           />
// //           <br />
// //           <br />

// //           <label htmlFor="stateCouncilName">State Council Name:</label>
// //           <br />
// //           <input
// //             type="text"
// //             id="stateCouncilName"
// //             name="stateCouncilName"
// //             required
// //           />
// //           <br />
// //           <br />

// //           <label htmlFor="specialization">Specialization:</label>
// //           <br />
// //           <input
// //             type="text"
// //             id="specialization"
// //             name="specialization"
// //             required
// //           />
// //           <br />
// //           <br />

// //           <label htmlFor="certificate">Upload Certificate (PDF):</label>
// //           <br />
// //           <input
// //             type="file"
// //             id="certificate"
// //             name="pdf"
// //             accept="application/pdf"
// //             required
// //           />
// //           <br />
// //           <br />

// //           <button type="submit">Submit</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default DoctorApplyForm;
// // import React from "react";
// // import { Form, Input, Button, TimePicker } from "antd";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";

// // const DoctorApplyForm = () => {
// //   const navigate = useNavigate();
// //   const onFinish = async (values) => {
// //     try {
// //       const response = await axios.post("/api/user/applyform", values);

// //       if (response.data.success) {
// //         toast.success(response.data.message);
// //         toast("Redirecting to login page");
// //         navigate("/main");
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } catch (error) {
// //       if (error.response) {
// //         // The request was made and the server responded with a status code
// //         // that falls out of the range of 2xx
// //         console.log(error);
// //         toast.error(error.response.data.message || "Something went wrong");
// //       } else if (error.request) {
// //         // The request was made but no response was received
// //         toast.error("No response received from server");
// //       } else {
// //         console.log(error);
// //         // Something happened in setting up the request that triggered an Error
// //         toast.error("Error setting up the request");
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <div id="heading">
// //         <h1>Apply for Doctor</h1>
// //       </div>
// //       <div className="login-container">
// //         <h2>Fill The Form</h2>
// //         <Form
// //           name="applyForm"
// //           onFinish={onFinish}
// //           initialValues={{ remember: true }}>
// //           <Form.Item
// //             label="Name"
// //             name="name"
// //             rules={[{ required: true, message: "Please input your name!" }]}>
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="Doctor RegisterNo"
// //             name="doctorRegisterNo"
// //             rules={[
// //               {
// //                 required: true,
// //                 message: "Please input your Doctor RegisterNo!",
// //               },
// //             ]}>
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="State Council Name"
// //             name="stateCouncilName"
// //             rules={[
// //               {
// //                 required: true,
// //                 message: "Please input your State Council Name!",
// //               },
// //             ]}>
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="Specialization"
// //             name="specialization"
// //             rules={[
// //               { required: true, message: "Please input your Specialization!" },
// //             ]}>
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="Timings"
// //             name="timings"
// //             rules={[
// //               { required: true, message: "Please input your Specialization!" },
// //             ]}>
// //             <TimePicker.RangePicker />
// //           </Form.Item>
// //           <Form.Item>
// //             <Button type="primary" htmlType="submit">
// //               Submit
// //             </Button>
// //           </Form.Item>
// //         </Form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DoctorApplyForm;

// // import  React from 'react'
// // import Layout

// import React, { useState } from "react";
// import { Form, Input, Button, TimePicker, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";

// const DoctorApplyForm = () => {
//   const [fileList, setFileList] = useState([]);
//   //const [file,setFile]=useState()
//   const onFinish = async (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("email",values.email);
//       formData.append("doctorRegisterNo", values.doctorRegisterNo);
//       formData.append("stateCouncilName", values.stateCouncilName);
//       formData.append("specialization", values.specialization);
//       formData.append("timings", values.timings);
//       formData.append("file", fileList);
//       // Append the image file to the form data
//       console.log(fileList);
//       // if (fileList.length > 0) {
//       //   formData.append("image", fileList[0]);
//       // }

//       const response = await axios.post("/api/user/applyform", formData);

//       if (response.data.success) {
//         message.success("Hi");
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//       message.error("Failed to submit form. Please try again.");
//     }
//   };

//   const handleFileChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   return (
//     <div>
//       <div id="heading">
//         <h1>Apply for Doctor</h1>
//       </div>
//       <div className="login-container">
//         <h2>Fill The Form</h2>
//         <Form
//           name="applyForm"
//           onFinish={onFinish}
//           encType="multipart/form-data" // Make sure this is present
//           initialValues={{ remember: true }}>
//           {/* Your form fields */}
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: "Please input your name!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="email"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your email!",
//               },
//             ]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Doctor RegisterNo"
//             name="doctorRegisterNo"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your Doctor RegisterNo!",
//               },
//             ]}>
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="State Council Name"
//             name="stateCouncilName"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your State Council Name!",
//               },
//             ]}>
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Specialization"
//             name="specialization"
//             rules={[
//               { required: true, message: "Please input your Specialization!" },
//             ]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Timings"
//             name="timings"
//             rules={[
//               { required: true, message: "Please input your Specialization!" },
//             ]}>
//             <TimePicker.RangePicker />
//           </Form.Item>
//           {/* <Form.Item label="Profile Image"
//           name="image">
//             <Upload
//               fileList={fileList}
//               onChange={handleFileChange}
//               beforeUpload={() => false} // Prevent default upload behavior
//             >
//               <Button icon={<UploadOutlined />}>Upload</Button>
//             </Upload>
//           </Form.Item> */}
//           <Form.Item label="Profile Image" name="file">
//             <Upload
//               fileList={fileList}
//               onChange={handleFileChange}
//               beforeUpload={() => false} // Prevent default upload behavior
//             >
//               <Button icon={<UploadOutlined />}>Upload</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default DoctorApplyForm;

// frontend/components/DoctorForm.js

// import React, { useState } from "react";
// import { Form, Input, Button, TimePicker, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";

// const DoctorApplyForm = () => {
//   const [fileList, setFileList] = useState([]);

//   const onFinish = async (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("email", values.email);
//       formData.append("doctorRegisterNo", values.doctorRegisterNo);
//       formData.append("stateCouncilName", values.stateCouncilName);
//       formData.append("specialization", values.specialization);
//       formData.append("timings", values.timings);
//       if (fileList.length > 0) {
//         formData.append("file", fileList[0].originFileObj);
//       }
//       console.log(formData)
//       const response = await axios.post("/api/user/applyform", formData);

//       if (response.data.success) {
//         message.success("Application submitted successfully");
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//       message.error("Failed to submit form. Please try again.");
//     }
//   };

//   const handleFileChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   return (
//     <div>
//       <div id="heading">
//         <h1>Apply for Doctor</h1>
//       </div>
//       <div className="login-container">
//         <h2>Fill The Form</h2>
//         <Form
//           name="applyForm"
//           onFinish={onFinish}
//           initialValues={{ remember: true }}>
//           {/* Your form fields */}
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: "Please input your name!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="email"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your email!",
//               },
//             ]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Doctor RegisterNo"
//             name="doctorRegisterNo"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your Doctor RegisterNo!",
//               },
//             ]}>
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="State Council Name"
//             name="stateCouncilName"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your State Council Name!",
//               },
//             ]}>
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Specialization"
//             name="specialization"
//             rules={[
//               { required: true, message: "Please input your Specialization!" },
//             ]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Timings"
//             name="timings"
//             rules={[
//               { required: true, message: "Please input your Specialization!" },
//             ]}>
//             <TimePicker.RangePicker />
//           </Form.Item>

//           <Form.Item label="Profile Image" name="file">
//             <Upload
//               fileList={fileList}
//               onChange={handleFileChange}
//               beforeUpload={() => false} // Prevent default upload behavior
//             >
//               <Button icon={<UploadOutlined />}>Upload</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default DoctorApplyForm;
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DoctorApplyForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [stateCouncilName, setStateCouncilName] = useState("");
  const [experiences, setExperiences] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [email, setEmail] = useState("");
  const [doctorRegisterNo, setDoctorRegisterNo] = useState("");
  const [specialization, setSpecialization] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("location", location);
    formData.append("stateCouncilName", stateCouncilName);
    formData.append("specialization", specialization);
    formData.append("experiences", experiences);
    formData.append("qualifications", qualifications);
    formData.append("email", email);
    formData.append("doctorRegisterNo", doctorRegisterNo);

    try {
      await axios.post("/api/user/applyform", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/main");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };
  const handleLogout = () => {
    // Delete the token
    localStorage.removeItem("token");
    // Navigate to home page
    navigate("/");
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="file"
    //     onChange={(e) => setFile(e.target.files[0])}
    //     style={{
    //       borderRadius: "5px",
    //       backgroundColor: "#121481",
    //       color: "white",
    //     }}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Name"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Location of Hospital"
    //     value={location}
    //     onChange={(e) => setLocation(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="State Council Name"
    //     value={stateCouncilName}
    //     onChange={(e) => setStateCouncilName(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Specialization"
    //     value={specialization}
    //     onChange={(e) => setSpecialization(e.target.value)}
    //   />
    //   <textarea
    //     placeholder="Experiences"
    //     value={experiences}
    //     onChange={(e) => setExperiences(e.target.value)}></textarea>
    //   <textarea
    //     placeholder="Qualifications"
    //     value={qualifications}
    //     onChange={(e) => setQualifications(e.target.value)}></textarea>
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Doctor Register No"
    //     value={doctorRegisterNo}
    //     onChange={(e) => setDoctorRegisterNo(e.target.value)}
    //   />
    //   <button type="submit">Submit</button>
    // </form>/
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
      <div
        style={{
          backgroundColor: "",
          padding: "20px",
          borderRadius: "10px",
        }}>
        <form
          layout="vertical"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            
          <input
            type="file"
            placeholder="Image"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            placeholder="Location of Hospital"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            placeholder="State Council Name"
            value={stateCouncilName}
            onChange={(e) => setStateCouncilName(e.target.value)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}
          />
          <textarea
            placeholder="Experiences"
            value={experiences}
            onChange={(e) => setExperiences(e.target.value)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}></textarea>
          <textarea
            placeholder="Qualifications"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}></textarea>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            placeholder="Doctor Register No"
            value={doctorRegisterNo}
            onChange={(e) => setDoctorRegisterNo(e.target.value)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              padding: "8px",
              marginBottom: "10px",
              width: "65%",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              color: "#121481",
              padding: "8px 16px",
              cursor: "pointer",
            }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorApplyForm;
