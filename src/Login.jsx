//import React from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';

import styles from "./Login.module.css";

export default function Login(props) {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);

    const username = values?.username;
    const password = values?.password;

    axios.post('/api/user/login', {
      username: username,
      password: password
    }).then
      (res => {
        //console.log(res.data)
        if (res.data.length === 0) {
          message.error("Wrong username or password")
        } else {
          //console.log(res.data);
          const { token } = res.data;
          console.log(token);
          localStorage.setItem("token", token)
          navigate("/");
        }
      })
  }

  return (
    <div style={{ background: 'rgb(35, 39, 65)', height: "100%", overflow: 'hidden' }}>
      <div className={styles["form"]}>
        <div className={styles["title"]}>Radix Monitor System</div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
