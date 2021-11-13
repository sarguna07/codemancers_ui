import React, { Component } from 'react'
import { PageNotFound } from '.';
import { fetchQuiz, SumbitQuiz } from "../api/solution";
import Result from "../views/Result"
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

    handleChange = (event, index, value) => {
        let ans = this.state.correct_options;
        ans[index]['id'] = event.target.id
        ans[index]['answer'] = value
        this.setState({ correct_options: ans });
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
            correct_options
        } = this.state;
        SumbitQuiz({ quiz: correct_options })
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
            <div>
                {question_data.length === 0 && <PageNotFound />}
                {question_data.length !== 0 && question_list &&
                    (<form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitAnswer();
                        }}
                    >

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "70vw",
                            margin: "auto",
                            justifyContent: "center",
                        }}>
                            {
                                question_data.map((q, i) => {
                                    return (
                                        <div key={i}>
                                            <p style={{ textAlign: "center" }}><b>{i + 1}.{q.question}</b></p>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-evenly"
                                            }}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <input
                                                        type="checkbox"
                                                        id={q.id}
                                                        onChange={(e) => handleChange(e, i, q.option_one)} />
                                                    <span style={{ paddingLeft: "10px" }}>{q.option_one}</span>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <input type="checkbox"
                                                        id={q.id}
                                                        onChange={(e) => handleChange(e, i, q.option_two)} />
                                                    <span style={{ paddingLeft: "10px" }}>{q.option_two}</span>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <input type="checkbox"
                                                        id={q.id}
                                                        onChange={(e) => handleChange(e, i, q.option_three)} />
                                                    <span style={{ paddingLeft: "10px" }}>{q.option_three}</span>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <input type="checkbox"
                                                        id={q.id}
                                                        onChange={(e) => handleChange(e, i, q.option_four)} />
                                                    <span style={{ paddingLeft: "10px" }}>{q.option_four}</span>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <button
                                style={{
                                    width: "20%",
                                    textAlign: "center",
                                    alignSelf: "center",
                                    marginTop: "30px",
                                    color: "white",
                                    background: "#2860cc",
                                    padding: "8px 0px",
                                    border: "none"
                                }}>
                                submit
                            </button>

                        </div >
                    </form>
                    )}
                {question_data.length !== 0 && !question_list && <Result result={result} />}
            </div>
        )
    }
}
export default Solution;