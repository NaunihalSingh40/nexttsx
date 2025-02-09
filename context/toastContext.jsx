import React, { createContext, useReducer } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { toast_actions } from '../components/shared/toast/utils/toast'
// import Slide from '@mui/material/Slide'
import Fade from '@mui/material/Fade'
import { MainContainer, Wrapper } from '../styles/context/toast'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ToastContext = createContext([])

export default function ToastProvider({ ...props }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case toast_actions.ADD_TOAST: {
        handleRemoveToast(action.payload.id, 5000)
        return [...state, action.payload]
      }

      case toast_actions.REMOVE_TOAST: {
        return state.filter((toast) => toast.id !== action.id)
      }

      default:
        return state
    }
  }, [])
  function handleRemoveToast(id, duration) {
    setTimeout(() => {
      dispatch({
        type: toast_actions.REMOVE_TOAST,
        id: id,
      })
    }, duration)
  }

  return (
    <ToastContext.Provider value={dispatch}>
      {state?.length > 0 && (
        <MainContainer>
          <Wrapper>
            {state.map((toast, index) => {
              return (
                <div key={index}>
                  <Snackbar
                    open={true}
                    autoHideDuration={20000}
                    onClose={() => handleRemoveToast(toast.id, 200)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    TransitionComponent={Fade}
                  >
                    <Alert
                      onClose={() => handleRemoveToast(toast.id, 200)}
                      severity={toast.type}
                      sx={{ width: '100%' }}
                    >
                      {toast.message}
                    </Alert>
                  </Snackbar>
                </div>
              )
            })}
          </Wrapper>
        </MainContainer>
      )}
      {props.children}
    </ToastContext.Provider>
  )
}
