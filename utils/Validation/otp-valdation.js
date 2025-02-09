import * as Yup from 'yup'
export const OTP_LOGIN_VALIDATION = Yup.object().shape({
    otpp: Yup.string(),
    // otp1: Yup.string().required(),
    // otp2: Yup.string().required(),
    // otp3: Yup.string().required(),
    // otp4: Yup.string().required(),
  })