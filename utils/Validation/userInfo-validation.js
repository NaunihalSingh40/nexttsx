import * as Yup from 'yup'

export const USER_INFO_VALIDATION = Yup.object().shape({
  userName: Yup.string()
    .required('Please enter name')
    .matches(/^\S.*/, 'First character cannot be space')
    .matches(/^[a-zA-Z ]+$/, 'Name must contain only alphabetic characters')
    .max(25, 'Maximum 25 characters are allowed')
    .min(3, 'Minimum 3 characters are required'),
  email: Yup.string()
    .required('Please enter email')
    .matches(/^\S.*/, 'First character cannot be space')
    .email('Please enter a valid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+\w+$/, 'Please enter a valid email'),
  phone: Yup.string()
    .required('Please enter phone number')
    .matches(/^\S.*/, 'First character cannot be space')
    .min(12, 'Phone number must be at least 10 characters long'),
  file: Yup.string(),
})
