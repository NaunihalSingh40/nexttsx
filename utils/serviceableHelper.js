import pointInPolygon from 'point-in-polygon'

export const checkPolygonAvailability = async (providerTags, productCategory, currentCoords) => {
  const product = providerTags.find(
    (item) =>
      item.code === 'serviceability' &&
      item.list.some((prop) => prop.code === 'type' && prop.value === '13') &&
      item.list.some((prop) => prop.code === 'category' && prop.value === productCategory),
  )

  if (!product) {
    return 'Sorry, the mentioned pincode lies in a non serviceable region & cannot proceed with this. Please change the pincode & try again.'
  }

  const valItem = product.list.find((prop) => prop.code === 'val')
  const val = valItem ? JSON.parse(valItem.value) : null

  if (!val || !val.features || !val.features.length) {
    return 'Sorry, the mentioned pincode lies in a non serviceable region & cannot proceed with this. Please change the pincode & try again.'
  }

  const polyCoordsIsInside = val.features.some((geo) => pointInPolygon(currentCoords, geo?.geometry?.coordinates[0]))

  return polyCoordsIsInside
    ? 'Pincode is serviceable'
    : 'Sorry, the mentioned pincode lies in a non serviceable region & cannot proceed with this. Please change the pincode & try again.'
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = earthRadius * c // Distance in km
  return distance
}

export const checkInterCityHyperLocal = (data, categoryId, code, userLat, userLon) => {
  const itemsWithinDistance = []
  const itemsOutsideDistance = []

  // Extract repeated computations outside the loop
  const codeValue = code
  const getProviderDetails = (item) => item.provider_details
  const getLocationDetails = (item) => item.location_details
  const getTags = (providerDetails) => providerDetails.tags
  const getGPS = (locationDetails) => locationDetails.gps
  const getDeliveryDistance = (tag) => parseFloat(tag?.list?.[3]?.value)

  // Iterate through the data array
  for (const item of data) {
    const providerDetails = getProviderDetails(item)
    const tags = getTags(providerDetails)
    const findHyperLocalTags = tags.find((tag) => tag?.list[2]?.value === '10' && tag?.list[1]?.value === categoryId)

    // Check if the last tag value matches the provided code
    if (findHyperLocalTags && findHyperLocalTags.list && findHyperLocalTags.list[2]?.value === codeValue) {
      const locationDetails = getLocationDetails(item)
      const gps = getGPS(locationDetails)
      const [sellerLat, sellerLon] = gps.split(',').map(parseFloat)
      const sellerDeliveryDistance = getDeliveryDistance(findHyperLocalTags)

      // Calculate distance
      const distance = getDistanceFromLatLonInKm(userLat, userLon, sellerLat, sellerLon)

      // Decide whether the item is within the delivery distance
      const itemObject = { item }
      if (distance <= sellerDeliveryDistance) {
        itemsWithinDistance.push(itemObject)
      } else {
        itemsOutsideDistance.push(itemObject)
      }
    }
  }

  if (itemsWithinDistance.length > 0) {
    return 'Pincode is serviceable.'
  } else if (itemsOutsideDistance) {
    return 'Sorry, the mentioned pincode lies in a non serviceable region & cannot proceed with this. Please change the pincode & try again.'
  }
}

export const filterPincodeToCheckIntercity = (data, userPincode, code) => {
  const sellersWithInAreaCode = data.filter((item) => {
    const sellerAreaCode = item?.location_details?.address?.area_code
    const lastTagIndex = item.provider_details.tags.length - 1
    return sellerAreaCode === userPincode && item.provider_details.tags[lastTagIndex]?.list?.[2]?.value === code
  })

  const sellersOutofAreaCode = data.filter((item) => {
    const sellerAreaCode = item?.location_details?.address?.area_code
    const lastTagIndex = item.provider_details.tags.length - 1
    return sellerAreaCode !== userPincode || item.provider_details.tags[lastTagIndex]?.list?.[2]?.value !== code
  })

  return {
    sellersWithInAreaCode,
    sellersOutofAreaCode,
  }
}

// export const filterPincodeToCheckIntercity = (data, userPincode, code) => {
//   const sellersWithInAreaCode = []
//   const sellersOutofAreaCode = []

//   data.forEach((item) => {
//     const sellerAreaCode = item?.location_details?.address?.area_code
//     const lastTagIndex = item.provider_details.tags.length - 1

//     if (sellerAreaCode === userPincode && item.provider_details.tags[lastTagIndex]?.list?.[2]?.value === code) {
//       sellersWithInAreaCode.push(item)
//     } else {
//       sellersOutofAreaCode.push(item)
//     }
//   })

//   return {
//     sellersWithInAreaCode: sellersWithInAreaCode,
//     sellersOutofAreaCode: sellersOutofAreaCode,
//   }
// }
