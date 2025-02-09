import axios from 'axios'
import Cookies from 'js-cookie'

import axiosHttp from '@/utils/axios'

// Set the default base URL for Axios
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

// Define the types for the response data.
interface AxiosResponse<T = unknown> {
  data: T
  status: number
}

interface Params {
  [key: string]: string | number | boolean | undefined
}

// Define the interface for error responses.
interface ErrorResponse {
  response?: {
    status: number
    data: {
      message: string
    }
  }
}

// Define the interface for general API response.
interface ApiResponse<T = unknown> {
  data: T
}

// Type guard to check if an error is an instance of ErrorResponse
function isErrorResponse(err: unknown): err is ErrorResponse {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof (err as ErrorResponse).response === 'object'
  )
}

// Function to perform GET requests
export async function getCall<T>(url: string, params: Params | null = null): Promise<T | void> {
  try {
    const response: AxiosResponse<T> = await axiosHttp.get(url, {
      params: params,
    })
    return response.data
  } catch (err: unknown) {
    if (isErrorResponse(err) && err.response?.status !== 401) {
      throw err
    }
  }
}

// Function to perform GET requests with authentication
export async function getSelectCall<T>(
  url: string,
  params: Params | null = null
): Promise<T | void> {
  const token = Cookies.get('token')
  try {
    const response: AxiosResponse<T> = await axiosHttp.get(url, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    return response.data
  } catch (err: unknown) {
    if (isErrorResponse(err) && err.response?.status !== 401) {
      throw err
    }
  }
}

// Function to perform POST requests with login
export async function postLoginCall<T>(url: string, params: Params): Promise<T | void> {
  try {
    const response: AxiosResponse<T> = await axiosHttp.post(url, params)
    return response.data
  } catch (err: unknown) {
    if (isErrorResponse(err) && err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw err
  }
}

// Function to perform POST requests with authorization
export async function postCall<T>(url: string, params: Params): Promise<T | void> {
  const token = Cookies.get('token')
  try {
    const response: AxiosResponse<T> = await axiosHttp.post(url, params, {
      headers: {
        Authorization: token || '',
      },
    })
    return response.data
  } catch (err: unknown) {
    if (isErrorResponse(err)) {
      throw err
    }
  }
}

// Function for POST requests during checkout with authentication
export async function postCheckoutCall<T>(url: string, params: Params): Promise<T | void> {
  const token = Cookies.get('token')

  try {
    const response: AxiosResponse<T> = await axiosHttp.post(url, params, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    return response.data
  } catch (err: unknown) {
    if (isErrorResponse(err)) {
      throw err
    }
  }
}

// Function to perform PUT requests
export async function putCall<T>(url: string, params: Params): Promise<T | void> {
  try {
    const response: AxiosResponse<T> = await axiosHttp.put(url, params, {})
    return response.data
  } catch (err: unknown) {
    if (isErrorResponse(err)) {
      throw err
    }
  }
}

// Function to perform DELETE requests
export async function deleteCall(url: string): Promise<ApiResponse | void> {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosHttp.delete(url, {})
    return response.data
  } catch (err: unknown) {
    if (isErrorResponse(err)) {
      throw err
    }
  }
}

// Function to perform DELETE requests with authentication
export async function deleteWithAuthentication(url: string): Promise<ApiResponse | void> {
  const token = Cookies.get('token')

  try {
    const response: AxiosResponse<ApiResponse> = await axiosHttp.delete(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    return response.data
  } catch (err: unknown) {
    if (isErrorResponse(err)) {
      throw err
    }
  }
}

// Function to make cancelable promises
export function makeCancelable<T>(promise: Promise<T>) {
  let isCanceled = false
  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then((val) => !isCanceled && resolve(val)).catch((error) => !isCanceled && reject(error))
  })
  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true
    },
  }
}
