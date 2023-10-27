import axios from 'axios';
import { dataObj } from '../types';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL

const getHeaders = () => {
    const { token }: { [key: string | number]: any } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return token ? { authorization: `Bearer ${token}` } : {}
}
const getConfig = () => {
    const { token }: { [key: string | number]: any } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return token ? { headers: { authorization: `Bearer ${token}` } } : {}
}

const sendContactEmail = async (data: dataObj) => {
    try {
        const email = await axios.post(`${API_URL}/api/app/sendContactEmail`, data, getConfig())
        return email.data
    } catch (err) { console.log(err) }
}

const scrapeUrl = async (data: dataObj) => {
    try {
        const scrape = await axios.post(`${API_URL}/api/app/scrape-url`, data, getConfig())
        return scrape.data
    } catch (err) { console.log(err) }
}

export {
    sendContactEmail,
    scrapeUrl
}