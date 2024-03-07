import axios from 'axios';
import { templateType } from '../types';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
const authorization = `Bearer ${user.token}`

const getHeaders = () => {
    return { authorization }
}
const getConfig = () => {
    return { headers: { authorization } }
}

const getAllTemplates = async (isAdmin?: boolean) => {
    try {
        const templates = await axios.get(`${API_URL}/api/template/getAll`, { params: { isAdmin }, headers: getHeaders() })
        return templates.data
    } catch (err) { console.log(err) }
}

const getTemplateById = async (_id: string) => {
    try {
        const template = await axios.get(`${API_URL}/api/template/getById`, { params: { _id }, headers: getHeaders() })
        return template.data
    } catch (err) { console.log(err) }
}

const createTemplate = async (data: templateType) => {
    try {
        const template = await axios.post(`${API_URL}/api/template/create`, data, getConfig())
        return template.data
    } catch (err) { console.log(err) }
}

const updateTemplate = async (data: templateType) => {
    try {
        const template = await axios.post(`${API_URL}/api/template/update`, data, getConfig())
        return template.data
    } catch (err) { console.log(err) }
}

const deleteTemplate = async (data: templateType) => {
    try {
        const deleted = await axios.post(`${API_URL}/api/template/remove`, data, getConfig())
        return deleted.data
    } catch (err) { console.log(err) }
}

export {
    getAllTemplates,
    createTemplate,
    getTemplateById,
    updateTemplate,
    deleteTemplate
}