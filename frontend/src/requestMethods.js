import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1`;

const ROOT = JSON.parse(localStorage.getItem("persist:root"));

let user;
if (ROOT) {
    user = JSON.parse(
        JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser;
}

let TOKEN = "";
if (user) {
    TOKEN = user.token;
}

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { authorization: `Bearer ${TOKEN}` },
});
