import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL

const getHeaders = () => {
    const { token }: { [key: string | number]: any } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return { authorization: `Bearer ${token}` }
}
const getConfig = () => {
    const { token }: { [key: string | number]: any } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return { headers: { authorization: `Bearer ${token}` } }
}

const getAllPosts = async () => {
    try {
        const posts = await axios.get(`${API_URL}/api/log/getAll`, { headers: getHeaders() })
        return posts.data
    } catch (err) { console.log(err) }
}

const createPost = async (data: { [key: string | number]: any }) => {
    try {
        const post = await axios.post(`${API_URL}/api/log/create`, data, getConfig())
        return post.data
    } catch (err) { console.log(err) }
}

const updatePost = async (data: { [key: string | number]: any }) => {
    try {
        const post = await axios.post(`${API_URL}/api/log/update`, data, getConfig())
        return post.data
    } catch (err) { console.log(err) }
}

const deletePost = async (data: { [key: string | number]: any }) => {
    try {
        const deleted = await axios.post(`${API_URL}/api/log/remove`, data, getConfig())
        return deleted.data
    } catch (err) { console.log(err) }
}

export {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}