import moment from 'moment'
import validator from 'validator'

// Utility function to remove null or undefined values from an object or array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeNullValues = (object: Record<string, any> | Array<any>): Record<string, any> | Array<any> => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') removeNullValues(v)
    if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined || v.length === 0) {
      if (Array.isArray(object)) object.splice(Number(k), 1)
      else if (!(v instanceof Date)) delete object[k]
    }
  })
  return object
}

// Function to compare the date with a given duration
export const compareDateWithDuration = (duration: string, dateStr: string): boolean => {
  const currentDate = new Date()
  const providedDate = new Date(dateStr)
  const durationInMilliseconds = parseDuration(duration)
  const newDate = new Date(providedDate.getTime() + durationInMilliseconds)
  return currentDate.getTime() > newDate.getTime()
}

// Parse ISO 8601 duration format (PT1H, PT30S, etc.)
export function parseDuration(duration: string): number {
  return moment.duration(duration).asMilliseconds()
}

// Interface for address
interface Address {
  name: string
  email: string
  phone: string
  street: string
  door: string
  city: string
  state: string
  tag: string
  areaCode: string
}

// Function to validate name
export const checkName = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (validator.isEmpty(address?.name.trim())) {
    setError((error) => ({
      ...error,
      name_error: 'Please enter Name',
    }))
    return false
  }
  return true
}

// Function to validate email
export const checkEmail = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (validator.isEmpty(address?.email.trim())) {
    setError((error) => ({
      ...error,
      email_error: 'Please enter Email',
    }))
    return false
  }

  if (!validator.isEmail(address?.email.trim())) {
    setError((error) => ({
      ...error,
      email_error: 'Please enter a valid Email',
    }))
    return false
  }

  return true
}

// Function to validate phone number
export const checkPhoneNumber = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (validator.isEmpty(address?.phone.trim())) {
    setError((error) => ({
      ...error,
      phone_error: 'Please enter a valid phone number',
    }))
    return false
  }

  if (!validator.isMobilePhone(address?.phone.trim(), 'en-IN')) {
    setError((error) => ({
      ...error,
      phone_error: 'Please enter a valid phone number',
    }))
    return false
  }

  return true
}

// Function to validate street name
export const checkStreetName = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (!address.street || validator.isEmpty(address?.street.trim())) {
    setError((error) => ({
      ...error,
      street_name_error: 'Street Name cannot be empty',
    }))
    return false
  } else {
    setError((error) => ({
      ...error,
      street_name_error: '',
    }))
  }

  return true
}

// Function to validate landmark
export const checkLandMark = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (validator.isEmpty(address?.door.trim())) {
    setError((error) => ({
      ...error,
      door_error: 'Landmark cannot be empty',
    }))
    return false
  }

  return true
}

// Function to validate city name
export const checkCity = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (!address.city || validator.isEmpty(address?.city.trim())) {
    setError((error) => ({
      ...error,
      city_name_error: 'City Name cannot be empty',
    }))
    return false
  } else {
    setError((error) => ({
      ...error,
      city_name_error: '',
    }))
  }

  return true
}

// Function to validate state name
export const checkState = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (!address.state || validator.isEmpty(address?.state.trim())) {
    setError((error) => ({
      ...error,
      state_name_error: 'State Name cannot be empty',
    }))
    return false
  } else {
    setError((error) => ({
      ...error,
      state_name_error: '',
    }))
  }

  return true
}

// Function to validate tag selection
export const checkTag = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (validator.isEmpty(address?.tag.trim())) {
    setError((error) => ({
      ...error,
      tag_error: 'Please select tag',
    }))
    return false
  } else {
    setError((error) => ({
      ...error,
      tag_error: '',
    }))
  }

  return true
}

// Function to validate pin code
export const checkPinCode = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (!address.areaCode || validator.isEmpty(address?.areaCode?.trim())) {
    setError((error) => ({
      ...error,
      areaCode_error: 'Pin code cannot be empty',
    }))
    return false
  } else if (address?.areaCode?.length < 6) {
    setError((error) => ({
      ...error,
      areaCode_error: 'Please enter a valid Pin Code',
    }))
    return false
  } else {
    setError((error) => ({
      ...error,
      areaCode_error: '',
    }))
  }

  return true
}

// Function to validate door/building name
export const checkDoor = (address: Address, setError: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  if (!address.door || validator.isEmpty(address?.door.trim())) {
    setError((error) => ({
      ...error,
      door_error: 'Building cannot be empty',
    }))
    return false
  } else {
    setError((error) => ({
      ...error,
      door_error: '',
    }))
  }

  return true
}

// Function to calculate discount percentage
export const CalculateDiscount = (totalPrice: number, price: number): number => {
  let discount = 0

  if (totalPrice >= price) {
    discount = ((totalPrice - price) * 100) / totalPrice
    if (discount > 100) {
      discount = 100
    }

    discount = Math.round(discount * 100) / 100
  }

  return discount
}
