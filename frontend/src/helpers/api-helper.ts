import { SearchPoliciesRequestBody } from "../models";

const SERVER_BASE_URL = 'http://localhost:4000'

async function searchPolicies(body: SearchPoliciesRequestBody) {
    return makePostAPICall('/search-policies', body);
}

async function makePostAPICall(url: string, data: any) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
        const resp = await fetch(`${SERVER_BASE_URL}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers
        });
        return handleResponse(resp);
    } catch (err: any) {
        err.message = undefined;
        throw err;
    }

}

async function handleResponse(resp: any) {
    const data = await resp.json();

    if (resp.ok) {
        return data;
    }

    const error = new Error(resp.name);
    error.message = data.message;
    //error.details = data.details;
    throw error;
}

export {
    searchPolicies
}