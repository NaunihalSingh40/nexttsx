import { getCall } from './axios'
import { getOrCreateDeviceId, getUserId } from 'helper'
const getPinCode = localStorage.getItem('pinCode')
const currentpinCode = localStorage.getItem('currentpinCode')

/**
 * function to get all products
 * @returns
 */
export const getAllProductRequest = async (params) => {
  const deviceId = await getOrCreateDeviceId()
  const userId = getUserId()

  // Ensure platform is set in params
  const updatedParams = {
    ...params,
    platform: 'himira',
  }

  return new Promise((resolve, reject) => {
    getCall(
      `/clientApis/v2/search/${userId ? userId : deviceId}?deviceId=${deviceId}&pincode=${getPinCode ? getPinCode : currentpinCode}`,
      updatedParams,
    )
      .then((data) => resolve(data.response))
      .catch((err) => reject(err))
  })
}

/**
 * function to get all filters
 * @returns
 */
export const getAllFiltersRequest = (subCatName = null, providerId = null) => {
  let params = {}
  if (subCatName) {
    let subCategoryName = subCatName.replace('And', '&')
    params.category = subCategoryName
  }

  if (providerId) {
    params.provider = providerId
  }

  return new Promise((resolve, reject) => {
    getCall(`/clientApis/v2/attributes`, params)
      .then((data) => resolve(data.response))
      .catch((err) => reject(err))
  })
}

/**
 * function to get all filters
 * @returns
 */
export const getAllFilterValuesRequest = (attributeCode, subCatName = null, providerId = null) => {
  let params = {
    attribute_code: attributeCode,
  }

  if (subCatName) {
    let subCategoryName = subCatName.replace('And', '&')
    params.category = subCategoryName
  }

  if (providerId) {
    params.provider = providerId
  }

  return new Promise((resolve, reject) => {
    getCall(`/clientApis/v2/attributeValues`, params)
      .then((data) => resolve(data.response))
      .catch((err) => reject(err))
  })
}
