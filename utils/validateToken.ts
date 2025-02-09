import Cookies from 'js-cookie'
import { deleteAllCookies } from './cookies'
import { toast_actions, toast_types } from 'components/shared/toast/utils/toast'
import { useContext } from 'react'
import { ToastContext } from '@/context/toastContext'

export function isLoggedIn() {
  if (Cookies.get('token')) {
    return true
  }

  // Check if the user is currently logged in
  if (Cookies.get('user') || Cookies.get('phone')) {
    deleteAllCookies()
    localStorage.clear()
  }

  return false
}

export function getUser() {
  const dispatch = useContext(ToastContext)
  if (isLoggedIn()) {
    const user = Cookies.get('phone') || Cookies.get('user')
    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        return parsedUser
      } catch (error) {
        dispatch({
          type: toast_actions.ADD_TOAST,
          payload: {
            id: Math.floor(Math.random() * 100),
            type: toast_types.warning,
            message: 'We are facing some issue while fetching user info',
          },
        })
        return error
      }
    }
  }

  return {}
}
