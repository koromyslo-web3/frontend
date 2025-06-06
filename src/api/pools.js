import axios from "axios";
import auth from "./auth";

const poolApi = axios.create({
    baseURL: `http://127.0.0.1:8001/pools`
});

poolApi.interceptors.request.use((config) => {
    const token = auth.getStoredAccessToken();
    console.log(token)
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

async function getMyPools() {
    const { data } = await poolApi.get("")
    return data
}

async function getPool(id) {
    const { data } = await poolApi.get(`/${id}`)
    return data
}

async function addPool(networkId, contract) {
    const { data } = await poolApi.post("", { network_id: networkId, contract: contract })
    return data
}

async function getAllowance(networkId, poolId, address) {
    const { data } = await poolApi.post("/check-allowance", { network_id: networkId, pool_id: poolId, address: address })
    return data
}

export default {
    getMyPools,
    addPool,
    getAllowance,
    getPool
}