import { apiHost } from "../config";
import {
    headers
} from "../helpers";

export default async function ({ uri, method = "GET", body }) {
    return fetch(apiHost + uri, {
        method,
        body,
        headers: headers()
    }).then(async response => {
        if (response.ok) {
            try {
                return response.json();
            } catch (err) {
                return true;
            }
        }
        throw [response.status, await response.json()];
    });
}
