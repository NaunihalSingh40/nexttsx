import { getSelectCall } from './axios'

/**
 * function to get all products
 * @returns
 */
export const getAllOrdersRequest = async (paginationData) => {
  const pageNumber = paginationData.page
  const limit = paginationData.pageSize
  const state = paginationData.status
  try {
    const quaryParams = `?limit=${limit}&pageNumber=${pageNumber}&state=${state}`
    const data = await getSelectCall(`/clientApis/v2/orders${quaryParams}`)
    return data
  } catch (err) {
    if (err.response.status !== 401) return err
  }
}

export const getOrderDetailsRequest = async (orderId) => {
  try {
    const data = await getSelectCall(`/clientApis/v2/orders/${orderId}`)

    return data
  } catch (err) {
    if (err.response.status !== 401) return err
  }
}
