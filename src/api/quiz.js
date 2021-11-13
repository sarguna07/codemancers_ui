import makeRequest from ".";

export function createQuiz(requestBody) {
    return makeRequest({
        uri: `/api/quizzes`,
        body: JSON.stringify(requestBody),
        method: 'POST'
    });
}