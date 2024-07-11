import axios from 'axios';
import { postType } from '../types';
import { retryWithDelay } from '../helpers';

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
        const posts = await retryWithDelay(() => axios.get(`${API_URL}/api/post/getAll`, { params: { isAdmin }, headers: getHeaders() }), 5, 100)
        return posts.data
    } catch (err) { console.log(err) }
}

const getPostById = async (_id: string) => {
    try {
        const post = await retryWithDelay(() => axios.get(`${API_URL}/api/post/getById`, { params: { _id }, headers: getHeaders() }), 5, 100)
        return post.data
    } catch (err) { console.log(err) }
}

const getPostByTitle = async (title: string) => {
    try {
        const post = await retryWithDelay(() => axios.get(`${API_URL}/api/post/getByTitle`, { params: { title }, headers: getHeaders() }), 5, 100)
        return post.data
    } catch (err) { console.log(err) }
}

const createPost = async (data: postType) => {
    try {
        const post = await retryWithDelay(() => axios.post(`${API_URL}/api/post/create`, data, getConfig()), 5, 100)
        return post.data
    } catch (err) { console.log(err) }
}

const updatePost = async (data: postType) => {
    try {
        const post = await retryWithDelay(() => axios.post(`${API_URL}/api/post/update`, data, getConfig()), 5, 100)
        return post.data
    } catch (err) { console.log(err) }
}

const deletePost = async (data: postType) => {
    try {
        const deleted = await retryWithDelay(() => axios.post(`${API_URL}/api/post/remove`, data, getConfig()), 5, 100)
        return deleted.data
    } catch (err) { console.log(err) }
}

export {
    getAllPosts,
    createPost,
    getPostById,
    getPostByTitle,
    updatePost,
    deletePost
}