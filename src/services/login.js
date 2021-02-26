import axios from 'axios'

const base = '/api/login'

export const login= async credentials => {

    const response = await axios.post(base, credentials)
    return response.data
}