import axios from 'axios';
import { contactType } from '../types';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
const authorization = `Bearer ${user.token}`

const getHeaders = () => {
    return { authorization }
}
const getConfig = () => {
    return { headers: { authorization } }
}

const sendContactEmail = async (data: contactType) => {
    try {
        const email = await axios.post(`${API_URL}/api/app/sendContactEmail`, data, getConfig())
        return email.data
    } catch (err) { console.log(err) }
}

const scrapeUrl = async (data: { url: string }) => {
    try {
        const scrape = await axios.post(`${API_URL}/api/app/scrape-url`, data, getConfig())
        return scrape.data
    } catch (err) { console.log(err) }
}

export {
    sendContactEmail,
    scrapeUrl
}