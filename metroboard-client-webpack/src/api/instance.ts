import { getCookie } from '@/utils/getCookie'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    accept: 'application/json'
  }
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = getCookie('token')

  return config
})

export default api
