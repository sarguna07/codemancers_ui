import React from 'react'

export default function Result({ result }) {
    let color = result > 70 ? "green" : result < 35 ? "red" : "blue"
    return (
        <div style={{ textAlign: "center", marginTop: "10%" }}>
            <h2> Here is your result..!</h2>
            <h3>
                You Scored <b style={{ color: color }}> {result} %</b>
            </h3>
        </div>
    )
}
