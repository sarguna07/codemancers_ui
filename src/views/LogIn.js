import React, { Component } from 'react';
import { Form, Input, Button } from "antd";
import bgimg from "../images/login.jpg"
import { logIn } from "../api/login";
import { setCookie } from "../helpers";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    login = async (values) => {
        const { email, password } = values;
        await logIn(email, password)
            .then(
                ({
                    data: { first_name, email, auth_token }
                }) => {
                    first_name && setCookie("first_name", first_name, 60);
                    email && setCookie("email", email, 60);
                    setCookie("token", auth_token);
                    window.location.href = "/quiz";
                }
            )
            .catch(err => {
                if (err[0] === 401) {
                    alert(err[1].message);
                } else {
                    alert(err[0], err[1]);
                }
            });
    };

    render() {
        const { login } = this;
        return (
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                backgroundImage: `url(${bgimg})`,
                height: "100vh",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}>
                <div style={{
                    width: "30vw",
                    margin: "auto",
                    marginTop: "20vh",
                    padding: "30px"
                }}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={login}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email.!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="email"
                                style={{
                                    height: "50px",
                                    fontSize: "16px"
                                }}>
                            </Input>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password.!',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Password"
                                style={{
                                    height: "50px",
                                    fontSize: "16px"
                                }}>
                            </Input>
                        </Form.Item>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                <span style={{ color: "white" }}> Or </span>
                                <a href="/signup"
                                    style={{
                                        color: "white",
                                        background: "#1890ff",
                                        padding: "8px",
                                        borderRadius: "2px"
                                    }}> Register now!</a>

                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LogIn;