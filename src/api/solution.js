import makeRequest from ".";

export function fetchQuiz(requestParams) {
    return makeRequest({
        uri: `/api/quizzes/questions?name=${requestParams}`
    });
}

export function SumbitQuiz(requestBody) {
    return makeRequest({
        uri: "/api/quizzes/submit",
        method: "POST",
        body: JSON.stringify(requestBody)
    });
}