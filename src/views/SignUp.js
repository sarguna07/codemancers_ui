import React, { Component } from 'react';
import { Form, Input, Button } from "antd";
import bgimg from "../images/login.jpg"
import { signUp } from "../api/login";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    signup = async (values) => {
        await signUp(values)
            .then(data => {
                window.location.href = "/login";
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
        const { signup } = this;
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
                        onFinish={signup}
                    >
                        <Form.Item
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username.!',
                                },
                            ]}
                        >
                            <Input placeholder="Username"
                                style={{
                                    height: "50px",
                                    fontSize: "16px"
                                }}>
                            </Input>
                        </Form.Item>
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
                                    Register now!
                                </Button>
                                <span style={{ color: "white" }}> Or </span>
                                <a href="/login"
                                    style={{
                                        color: "white",
                                        background: "#1890ff",
                                        padding: "8px",
                                        borderRadius: "2px"
                                    }}> Log in</a>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default SignUp;