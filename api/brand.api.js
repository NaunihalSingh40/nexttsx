import { getCall } from './axios'
const getPinCode = localStorage.getItem('pinCode')
const currentpinCode = localStorage.getItem('currentpinCode')

/**
 * function to get all brands
 * @returns
 */

export const getAllBrandsRequest = async (paginationData = { page: 1, pageSize: 18 }, domain, name) => {
  const pageNumber = paginationData.page
  const limit = paginationData.pageSize

  try {
    let queryParams = `?limit=${limit}&pageNumber=${pageNumber}&pincode=${getPinCode ? getPinCode : currentpinCode}`
    if (domain) {
      queryParams += `&domain=${domain}` // Adds domain query parameter if domain exists
    }

    if (name) {
      queryParams += `&search=${name}` // Adds name query parameter if domain is not provided but name is
    } else if (getPinCode || currentpinCode) {
      queryParams // Adds name query parameter if domain is not provided but name is
    }

    const data = await getCall(`/clientApis/v2/providers${queryParams}`) // Calls the API with the constructed query parameters
    return data?.response
  } catch (err) {
    return err
  }
}

/**
 * function to get brand details
 * @returns
 */
export const getBrandDetailsRequest = async (brandId) => {
  try {
    const data = await getCall(`${process.env.REACT_APP_BASE_PROTOCOL_URL}/protocol/provider-details?id=${brandId}`)
    return data
  } catch (err) {
    return err
  }
}

/**
 * function to get brand details
 * @returns
 */
export const getBrandCustomMenuRequest = async (domain, brandId) => {
  try {
    const data = await getCall(`/clientApis/v2/custom-menus?domain=${domain}&provider=${brandId}`)
    return data
  } catch (err) {
    return err
  }
}

/**
 * function to get brand details
 * @returns
 */
export const getCustomMenuItemsRequest = async (menuName) => {
  try {
    const data = await getCall(`/clientApis/v2/items?customMenu=${menuName}`)
    return data
  } catch (err) {
    return err
  }
}

/**
 * function to get all outlets
 * @returns
 */
export const getAllOutletsRequest = async (brandId, params) => {
  const reqParams = {
    latitude: params.lat,
    longitude: params.lng,
    radius: 100,
  }
  try {
    const data = await getCall(`/clientApis/v2/locations?provider=${brandId}`, reqParams)
    return data
  } catch (err) {
    return err
  }
}

/**
 * function to get all outlets
 * @returns
 */

export const getAllOutletsFromCategoryAndLocationRequest = async (params) => {
  // Initialize reqParams with mandatory parameters
  const reqParams = {
    latitude: params.lat,
    longitude: params.lng,
    radius: 100,
  }

  // Conditionally add the domain parameter if it exists
  if (params.domain) {
    reqParams.domain = params.domain
  }

  try {
    const data = await getCall(`${process.env.REACT_APP_BASE_PROTOCOL_URL}/protocol/locations`, reqParams)
    return data
  } catch (err) {
    return err
  }
}

/**
 * function to get outlet details
 * @returns
 */

export const getOutletDetailsRequest = async (locationId) => {
  try {
    const data = await getCall(`${process.env.REACT_APP_BASE_PROTOCOL_URL}/protocol/location-details?id=${locationId}`)
    return data
  } catch (err) {
    return err
  }
}
