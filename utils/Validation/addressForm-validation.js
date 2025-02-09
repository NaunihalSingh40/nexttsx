import * as Yup from 'yup'

export const ADD_ADDRESS_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Please enter name')
    .matches(/^\S.*/, 'First character cannot be space')
    .matches(/^[a-zA-Z ]+$/, 'Name must contain only alphabetic characters'),
  email: Yup.string()
    .required('Please enter email')
    .matches(/^\S.*/, 'First character cannot be space')
    .email('Please enter a valid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+\w+$/, 'Please enter a valid email'),
  phone: Yup.string()
    .required('Please enter phone number')
    .transform((value) => value.replace(/^(\+91|91)/, ''))
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits long')
    .matches(/^\S.*/, 'First character cannot be space')
    .min(10, 'Phone number must be at least 10 characters long'),
  building: Yup.string()
    .required('Please enter the building')
    .min(3, 'Minimum 3 characters are allowed')
    .max(250, 'maximum 250 characters are allowed')
    .matches(/^\S.*/, 'First character cannot be space'),
  pincode: Yup.number().required('Please enter the pincode').typeError('Please enter valid pincode'),
  locality: Yup.string().required('Please select the locality'),
  city: Yup.string().required('Please enter the city').matches(/^\S.*/, 'First character cannot be space'),
  state: Yup.string().required('Please enter the state').matches(/^\S.*/, 'First character cannot be space'),
  country: Yup.string().required('Please enter the country').matches(/^\S.*/, 'First character cannot be space'),
})

export const EDIT_ADDRESS_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Please enter name')
    .matches(/^\S.*/, 'First character cannot be space')
    .matches(/^[a-zA-Z ]+$/, 'Name must contain only alphabetic characters'),
  email: Yup.string()
    .required('Please enter email')
    .matches(/^\S.*/, 'First character cannot be space')
    .email('Please enter a valid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+\w+$/, 'Please enter a valid email')
    .min(10, 'Phone number must be at least 10 characters long'),
  phone: Yup.string()
    .required('Please enter phone number')
    .transform((value) => value.replace(/^(\+91|91)/, ''))
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits long'),
  building: Yup.string()
    .required('Please enter the building')
    .min(3, 'Minimum 3 characters are allowed')
    .max(250, 'maximum 250 characters are allowed')
    .matches(/^\S.*/, 'First character cannot be space'),
  pincode: Yup.number().required('Please enter the pincode').typeError('Please enter the pincode'),
  locality: Yup.string().required('Please select the locality'),
  city: Yup.string().required('Please enter the city'),
  state: Yup.string().required('Please enter the state'),
  country: Yup.string().required('Please enter the country'),
})
