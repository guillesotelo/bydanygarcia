import axios from 'axios';
import { postType } from '../types';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
const authorization = `Bearer ${user.token}`

const getHeaders = () => {
    return { authorization }
}
const getConfig = () => {
    return { headers: { authorization } }
}

const getAllPosts = async (isAdmin?: boolean) => {
    try {
        const posts = await axios.get(`${API_URL}/api/post/getAll`, { params: { isAdmin }, headers: getHeaders() })
        return posts.data
    } catch (err) { console.log(err) }
}

const getPostById = async (_id: string) => {
    try {
        const post = await axios.get(`${API_URL}/api/post/getById`, { params: { _id }, headers: getHeaders() })
        return post.data
    } catch (err) { console.log(err) }
}

const createPost = async (data: postType) => {
    try {
        const post = await axios.post(`${API_URL}/api/post/create`, data, getConfig())
        return post.data
    } catch (err) { console.log(err) }
}

const updatePost = async (data: postType) => {
    try {
        const post = await axios.post(`${API_URL}/api/post/update`, data, getConfig())
        return post.data
    } catch (err) { console.log(err) }
}

const deletePost = async (data: postType) => {
    try {
        const deleted = await axios.post(`${API_URL}/api/post/remove`, data, getConfig())
        return deleted.data
    } catch (err) { console.log(err) }
}

export {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
}