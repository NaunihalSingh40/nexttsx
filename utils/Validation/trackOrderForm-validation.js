import * as Yup from 'yup'

export const TRACK_ORDER_VALIDATION = Yup.object().shape({
  trackingNumber: Yup.string().required('Please enter order number').matches(/^\S.*/, 'First character cannot be space'),
})
