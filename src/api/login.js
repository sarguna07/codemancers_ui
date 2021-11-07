import { apiHost } from "../config";
import { headers } from "../helpers";

export function logIn(user_name, password) {
    return fetch(`${apiHost}/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ user_name, password })
    }).then(async response => {
        if (response.ok) {
            alert("Login Successfully.!!!");
            return response.json();
        }
        throw [response.status, await response.json()];
    });
}

export function signUp(requestBody) {
    return fetch(`${apiHost}/api/users`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(requestBody)
    }).then(async response => {
        if (response.ok) {
            alert("Registered Successfully.!!!");
            return response.json();
        }
        throw [response.status, await response.json()];
    });
}

export function LogOut(requestBody) {
    return fetch(`${apiHost}/logout`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(requestBody)
    }).then(async response => {
        if (response.ok) {
            alert("Registered Successfully.!!!");
            return response.json();
        }
        throw [response.status, await response.json()];
    });
}
