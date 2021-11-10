import React, { Component } from 'react'
import { fetchQuiz } from "../api/solution";

class Solution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetchQuiz(this.props.name)
            .then(({ data }) => {
                this.setState({
                    data: data
                })
            })
    }

    render() {
        const { data } = this.state;
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "70vw",
                margin: "auto",
                justifyContent: "center",
            }}>
                {
                    data.map((q, i) => {
                        return (
                            <div key={i}>
                                <p style={{ textAlign: "center" }}><b>{i + 1} . {q.question}</b></p>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-evenly"
                                }}>
                                    <p>{q.option_one}</p>
                                    <p>{q.option_two}</p>
                                    <p>{q.option_three}</p>
                                    <p>{q.option_four}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default Solution;