import axios from 'axios'

const getUsers = async (url) => {
    const result = await axios.get(url)
    return result.data
}

const getUserById = async (url, userId) => {
    const result = await axios.get(`${url}${userId}`)
    return result.data
}

export { getUsers, getUserById }
