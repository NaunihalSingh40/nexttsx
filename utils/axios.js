import axios from 'axios'
import { AddCookie, deleteAllCookies } from './cookies'
import Cookies from 'js-cookie'
import instance from 'services/axiosInstance'

const axiosHttp = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

axiosHttp.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
      },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosHttp.interceptors.response.use(
  (response) => {
    //const url = response.config.url;
    //setLocalStorageToken(token);
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = Cookies.get('refreshToken')

      try {
        const res = await instance.get('/clientApis/refresh-token', {
          headers: {
            refreshtoken: `${refreshToken}`,
          },
        })
        const newToken = res?.data?.token
        Cookies.remove('token')
        Cookies.set('token', newToken)
        AddCookie('token', res?.data?.token)
        window.location.reload()
      } catch (error) {
        deleteAllCookies()
        localStorage.clear()
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
  },
)

export default axiosHttp
