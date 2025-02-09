import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { getValueFromCookie } from 'utils/cookies'

export const generateUniqueBrowserId = async () => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()

  // Store the visitorId in local storage as deviceId
  localStorage.setItem('deviceId', result.visitorId)

  return result.visitorId
}

document.addEventListener('DOMContentLoaded', async () => {
  await generateUniqueBrowserId()
})

export const generateItemsPayloads = (items) => {
  const itemsPayloads = []
  let domain
  items?.forEach((item) => {
    const newItem = Object.assign({}, item)
    domain = newItem.domain

    const itemsPayload = {
      id: item?.id,
      local_id: item?.local_id,
      // tags: item?.tags,
      customisationState: item?.customisationState,
      quantity: item?.quantity,
      provider: {
        id: item?.provider?.id,
        local_id: item?.provider?.local_id,
        locations: item?.provider?.locations.map((location) => ({
          id: location.id,
          local_id: location.local_id,
        })),
      },
      customisations: item?.customisations,
      hasCustomisations: item?.hasCustomisations,
    }

    itemsPayloads.push(itemsPayload)
  })

  return { itemsPayloads, domain }
}

export const getUserId = () => {
  const userID = getValueFromCookie('userId')
  let user = {}
  const userCookie = getValueFromCookie('user')

  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch (error) {
      return 'guestUser'
    }
  }

  return userID ?? user.id ?? 'guestUser'
}

export const getOrCreateDeviceId = async () => {
  let deviceId = localStorage.getItem('deviceId')

  if (deviceId == null) {
    const randomID = await generateUniqueBrowserId()
    localStorage.setItem('deviceId', randomID)
    deviceId = randomID
  }

  return deviceId
}

export function formatIndianRupees(amount) {
  // Convert amount to a number if it is a string
  amount = parseFloat(amount)

  // Format the number with two decimal places
  let formattedAmount = amount.toFixed(2)

  // Split the amount into the integer and decimal parts
  let parts = formattedAmount.split('.')
  let integerPart = parts[0]
  let decimalPart = parts[1]

  // Regular expression to insert commas at the correct positions
  let lastThree = integerPart.slice(-3)
  let otherNumbers = integerPart.slice(0, -3)
  if (otherNumbers != '') {
    lastThree = ',' + lastThree
  }

  let indianNumberFormat = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree

  return indianNumberFormat + '.' + decimalPart
}
