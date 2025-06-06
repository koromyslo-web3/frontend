import axios from "axios";

const authApi = axios.create({
    baseURL: `http://127.0.0.1:8002/auth`
});

let accessToken = null;

function setAccessToken(token) {
    accessToken = token;
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function getStoredAccessToken() {
    return accessToken;
}

async function getNonce(address) {
    const { data } = await authApi.post("/nonce", { address })
    return data
}

async function verifySig(nonce, singedData) {
    const { data } = await authApi.post("/verify", { nonce: nonce, signed_data: singedData }, { withCredentials: true })
    return data
}

async function logout() {
    const { data } = await authApi.post("/logout")
    setAccessToken("")
    return data
}

async function getAccessToken() {
    const { data } = await authApi.post("/token", {}, { withCredentials: true })
    return data.access_token
}


export default {
    setAccessToken,
    getNonce,
    verifySig,
    logout,
    getAccessToken,
    getStoredAccessToken
}
