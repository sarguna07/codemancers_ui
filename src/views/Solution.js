import React, { Component } from 'react'
import { PageNotFound } from '.';
import { fetchQuiz, SumbitQuiz } from "../api/solution";
import Result from "../views/Result"
import { Button, Card, Radio, Space } from 'antd';
class Solution extends Component {
    constructor(props) {
        super(props);
        this.answers = {
            id: "",
            answer: "",
        };
        this.state = {
            question_list: true,
            question_data: [],
            correct_options: [{ ...this.answers }],
        };
    }

    handleChange = (event, index) => {
        let { question_data } = this.state;
        question_data[index]['answer'] = event.target.value
        this.setState({ question_data });
    };

    componentDidMount() {
        fetchQuiz(this.props.name)
            .then(({ data }) => {
                this.setState({
                    question_data: data,
                    question_list: true
                })
            })
    }

    submitAnswer = () => {
        const {
            question_data
        } = this.state;
        SumbitQuiz({ quiz: question_data })
            .then((data) => {
                this.setState({
                    result: data.data,
                    question_list: false
                })
            })
            .catch((error) => {
                alert(error)
            });

    }

    render() {
        const { question_data, result, question_list } = this.state;
        const { handleChange, submitAnswer } = this;

        return (
            <React.Fragment>
                <header className="header" style={{ backgroundColor: "#0000A5" }}>
                    <h2 style={{ color: "white" }}>WELCOME TO QUIZ COMPETITION</h2>
                </header>
                <div className="my-root">
                    <div className="root-container">
                        <div>

                            {question_data.length === 0 && <PageNotFound />}

                            {question_list && question_data?.map((question, i) => {
                                return (
                                    <Card title={question.question} style={{ marginTop: "10px" }} bordered={true} style={{ width: 530, margin: "10px" }}>
                                        <Radio.Group value={question.answer} onChange={(e) => handleChange(e, i)} >
                                            <Space direction="vertical">
                                                <Radio value={question.option_one}>{question.option_one}</Radio>
                                                <Radio value={question.option_two}>{question.option_two}</Radio>
                                                <Radio value={question.option_three}>{question.option_three}</Radio>
                                                <Radio value={question.option_four}>{question.option_four}</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Card>
                                )
                            }
                            )}
                            {question_data.length > 0 && question_list && <Button type="primary" htmlType="submit"
                                onClick={submitAnswer}
                            >
                                Submit
                            </Button>}
                            {question_data.length !== 0 && !question_list && <Result result={result} />}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Solution;