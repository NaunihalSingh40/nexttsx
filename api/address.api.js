import { getSelectCall } from './axios'
import { isLoggedIn } from '../utils/validateToken'
/**
 * function to get all products
 * @returns
 */
export const getAllDeliveryAddressRequest = async () => {
  try {
    if (isLoggedIn()) {
      const data = await getSelectCall(`/clientApis/v1/delivery_address`)
      return data
    }
  } catch (err) {
    return err
  }
}

export const getAllBillingAddressRequest = async () => {
  try {
    if (isLoggedIn()) {
      const data = await getSelectCall(`/clientApis/v1/billing_details`)
      return data
    }
  } catch (err) {
    return err
  }
}
