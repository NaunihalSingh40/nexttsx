import { createContext, useState, useEffect } from 'react'
import { getCall } from '../api/axios'
import { getValueFromCookie } from '../utils/cookies'
import { getOrCreateDeviceId, getUserId } from '../helper'

export const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {
    return
  },
  getCartItems: () => {
    return
  },
})

export function CartContextProvider({ children }) {
  const userId = getUserId()
  let user = {}
  const userCookie = getValueFromCookie('user')

  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch (error) {
      return error
    }
  }

  const [cartItems, setCartItems] = useState([])

  const getCartItems = async () => {
    const deviceId = await getOrCreateDeviceId()
  

    try {
      const url = `/clientApis/v2/cart/${userId}/${deviceId}`

      // const url = `/clientApis/v2/cart/${user.id ? user.id : customCartId}`
      const res = await getCall(url)
      setCartItems(res)
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (Object.keys(user)?.length) getCartItems()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        fetchCartItems: getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
