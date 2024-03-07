import axios from 'axios';
import { susbscribeDataType, userType } from '../types';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
const authorization = `Bearer ${user.token}`

const getHeaders = () => {
    return { authorization }
}
const getConfig = () => {
    return { headers: { authorization } }
}

const loginUser = async (user: userType) => {
    try {
        const res = await axios.post(`${API_URL}/api/user/login`, user)
        const finalUser = res.data
        localStorage.removeItem('user')
        localStorage.removeItem('duedate')
        localStorage.removeItem('posts')
        localStorage.setItem('user', JSON.stringify({
            ...finalUser,
            app: 'bydanygarcia',
            login: new Date()
        }))
        return finalUser
    } catch (error) { console.log(error) }
}

const verifyToken = async () => {
    try {
        const verify = await axios.post(`${API_URL}/api/user/verify`, {}, getConfig())
        return verify.data
    } catch (err) { console.log(err) }
}

const registerUser = async (data: userType) => {
    try {
        const newUser = await axios.post(`${API_URL}/api/user/create`, data)
        return newUser.data
    } catch (err) { console.log(err) }
}

const updateUser = async (data: userType) => {
    try {
        const user = await axios.post(`${API_URL}/api/user/update`, data, getConfig())
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.log(err) }
}

export {
    loginUser,
    verifyToken,
    registerUser,
    updateUser,
}