import * as Yup from 'yup'

export const CONTACT_US_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Please enter name')
    .matches(/^\S.*/, 'First character cannot be space')
    .matches(/^[a-zA-Z ]+$/, 'Name must contain only alphabetic characters'),
  email: Yup.string()
    .required('Please enter email')
    .matches(/^\S.*/, 'First character cannot be space')
    .email('Please enter a valid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+\w+$/, 'Please enter a valid email'),
  subject: Yup.string().required('Please enter subject').matches(/^\S.*/, 'First character cannot be space'),
  message: Yup.string().required('Please enter message').matches(/^\S.*/, 'First character cannot be space'),
})
