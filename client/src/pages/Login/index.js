import React from "react";
import { Col, Form, Row, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";




function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else{
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message)
    }
  }
  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="card p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">〽️Ⓐ〽️ⒷⒶ® ⓌⒶⓁⓁⒺⓉ - Ⓛ⭕ⒼⒾⓃ</h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish} className="w-400">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Password" name="password">
                <input type="password" />
              </Form.Item>
            </Col>
          </Row>

          <button className="primary-contained-btn w-100" type="submit">
            Login
          </button>
          <h1 className="text-sm underline mt-2"  
          onClick={() => navigate("/register")}
          >
            Not a member yet? Click here 👉 Register.
            </h1>
        </Form>
      </div>
    </div>
  );
}

export default Login;
