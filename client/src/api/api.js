import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8888/api",
})

export const createUser = payload => api.post(`/user`, payload)
export const getUserByUsernameAndPassword = (username, password) => api.get(`/user/${username}/${password}`)

const apis = {
    createUser,
    getUserByUsernameAndPassword,
}

export default apis


