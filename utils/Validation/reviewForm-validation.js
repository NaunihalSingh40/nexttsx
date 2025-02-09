import * as Yup from 'yup'

export const createReviewFormValidation = (itemsCount) => {
  const schemaShape = {}
  for (let i = 0; i < itemsCount; i++) {
    schemaShape[`rating_${i}`] = Yup.number()
      .min(1, 'Please give a rating to the product')
      .required('Please give a rating to the product')
    schemaShape[`feedback_${i}`] = Yup.string().optional() // Feedback is optional
  }

  return Yup.object().shape(schemaShape)
}
