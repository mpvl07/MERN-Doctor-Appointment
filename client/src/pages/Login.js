import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { showLoading,hideLoading } from "../redux/alertsSlice";
import "../Login.css";
import { useEffect } from "react";

import { useUser } from "../components/UserContext";
//import { useHistory } from "react-router-dom";
function Login() {
  const { loading } = useSelector((state) => state.alerts);
  console.log(loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useUser();
  const onFinish = async (values) => {

    try {

      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        const isDoctorResponse = await axios.post(
          "/api/user/check-doctor",
          {
            email: values.email,
          }
        );
        const isDoctor = isDoctorResponse.data.isDoctor;
        //toast.success(response.data.message);

        localStorage.setItem("token", response.data.data);
        login(values.email);
        if (isDoctor) {
          const doctorIdResponse = await axios.post("/api/user/get-doctor-id", {
            email: values.email,
          });
          console.log(doctorIdResponse)
          const doctorId = doctorIdResponse.data.doctorId;
          // Navigate to DoctorPage component
          navigate("/doctors", { state: { doctorId: doctorId } });
        } else if (values.email === "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/main", { state: { values: values } });
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <div>

      <div className="authentication">
        <div className="authentication-from">
          <h1 className="card-title">Login here</h1>
          <Form layout="vertical" onFinish={onFinish}>
            {/* <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item> */}
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>
            <Button className="primary-button" htmlType="submit">
              Login
            </Button>
            <Link to="/register" className="anchor m-2">
              Click here to Register
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Login;