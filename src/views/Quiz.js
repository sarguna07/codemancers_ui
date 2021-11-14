import React, { Component } from "react";
import { Button, Card, Modal, Input, Form, Radio, Space } from 'antd';
import { createQuiz } from "../api/quiz";
import { LogOut } from "../api/login"
import { kickUser } from "../helpers"
const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class Quiz extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            modelVisible: false,
            shareable_url: false,
            group_name: '',
            final_quiz: [],
            quiz: {
                question: "",
                option_one: null,
                option_two: null,
                option_three: null,
                option_four: null,
                answer: null
            }
        }
    }

    handleOk = () => {
        let { final_quiz, quiz } = this.state;
        final_quiz.push(quiz)
        this.setState({ modelVisible: false, final_quiz, quiz: {} })
    }

    handleSubmit = () => {
        let { final_quiz, group_name } = this.state;

        createQuiz({ name: group_name, quiz: final_quiz }).then(({ data }) => {
            this.setState({
                modelVisible: false,
                final_quiz: [],
                quiz: {},
                shareable_url: true,
                url: `https://ui-codemancers.web.app/quiz/solution?name=${group_name}`
            })
        }).catch(error => {
            if (error[1]['message'] == 'Access Denied') {
                LogOut();
                kickUser();
            }
            alert(error[1]['data'] ? error[1]['data'] : error[1]['message'])
        })
    }

    handleCancel = () => {
        let { quiz } = this.state;
        quiz["question"] = "";
        quiz["option_one"] = null;
        quiz["option_two"] = null;
        quiz["option_three"] = null;
        quiz["option_four"] = null;
        this.setState({ quiz })
    }

    onChange = (e) => {
        const { quiz } = this.state;
        quiz[e.target.id] = e.target.value
        this.setState({ quiz })
        if (e.target.name === 'group_name') {
            this.setState({ group_name: e.target.value })
        }
    }

    Logout = () => {
        LogOut()
    }

    render() {
        const { modelVisible, quiz, final_quiz, group_name, shareable_url, url } = this.state;
        const { handleOk, handleCancel, onChange, handleSubmit, Logout } = this;
        return (
            <React.Fragment>
                <header className="header" >
                    <div style={{ width: "85%", paddingLeft: "7%" }}>
                        <h2 style={{ color: "white", textAlign: "center" }}>WELCOME TO QUIZ CREATION</h2>
                    </div>
                    <div style={{
                        display: "flex",
                        width: "15%",
                        alignSelf: "center",
                        justifyContent: "flex-end"
                    }}>
                        <a style={{
                            background: "white",
                            padding: "5px 10px",
                            marginRight: "20px",
                            color: "#1f3fa5",
                            borderRadius: "2px"
                        }}

                            onClick={Logout}>

                            Logout
                        </a>
                    </div>
                </header>
                <div className="my-root">
                    <div className="root-container">
                        <Form.Item
                            label="Quiz Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                name="group_name"
                                onChange={onChange}
                                value={group_name}
                                id="group_name"
                            />
                        </Form.Item>

                        <Button type="primary" size={"large"} onClick={() => this.setState({ modelVisible: !modelVisible })}>
                            Add +
                        </Button>
                        {final_quiz && final_quiz.map(qtn => (
                            <Card title={qtn.question} style={{ marginTop: "10px" }} bordered={true} style={{ width: 530, margin: "10px" }}>
                                <Radio.Group value={qtn.answer}>
                                    <Space direction="vertical">
                                        <Radio value={qtn.option_one}>{qtn.option_one}</Radio>
                                        <Radio value={qtn.option_two}>{qtn.option_two}</Radio>
                                        <Radio value={qtn.option_three}>{qtn.option_three}</Radio>
                                        <Radio value={qtn.option_four}>{qtn.option_four}</Radio>
                                    </Space>
                                </Radio.Group>
                            </Card>
                        ))}

                        {final_quiz.length > 0 && <Button type="primary"
                            onClick={handleSubmit}
                        >
                            Create QUIZ
                        </Button>}
                    </div>
                </div>
                <Modal footer={null} title="Create Quiz" visible={modelVisible} >
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>

                        <Form.Item
                            name="question"
                            label="Question"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea
                                onChange={onChange}
                                id="question"
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }} allowClear
                                value={quiz.question} />
                        </Form.Item>

                        <Form.Item
                            label="Option 1"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}

                        >
                            <Input
                                name="option_one"
                                onChange={onChange}
                                value={quiz.option_one}
                                id="option_one"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Option 2"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                name="option_two"
                                id="option_two"
                                onChange={onChange}
                                value={quiz.option_two} />
                        </Form.Item>

                        <Form.Item
                            label="Option 3"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}

                        >
                            <Input
                                name="option_three"
                                id="option_three"
                                value={quiz.option_three}
                                onChange={onChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Option 4 "
                            rules={[
                                {
                                    required: true,
                                },
                            ]}

                        >
                            <Input
                                name="option_four"
                                id="option_four"
                                value={quiz.option_four}
                                onChange={onChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Answer"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}

                        >
                            <Input
                                name="answer"
                                id="answer"
                                value={quiz.answer}
                                onChange={onChange}
                            />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit"
                                onClick={handleOk}
                            >
                                Submit
                            </Button>

                            <Button htmlType="button"
                                onClick={handleCancel}
                            >
                                Reset
                            </Button>
                        </Form.Item>


                    </Form>
                </Modal>
                <div style={{ width: "75%" }}>
                    {shareable_url && <Form.Item
                        label="Shareable Url"
                    >
                        <Input
                            value={url}
                            readOnly={true}
                        />
                    </Form.Item>}
                </div>
            </React.Fragment >
        )
    }
} export default Quiz;