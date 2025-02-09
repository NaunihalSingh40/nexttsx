import React, { createContext, useEffect, useState } from 'react'

export const LocationContext = createContext()

export const LocationProvider = ({ children }) => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  useEffect(() => {
    const latAndLng = window.localStorage.getItem('latAndLng')
    const lat = latAndLng?.split(',')[0]
    const lng = latAndLng?.split(',')[1]

    if (lat && lng) {
      // const newlat = parseInt(lat).toFixed(6)
      // const newlong = parseInt(lng).toFixed(6)

      setLatitude(lat)
      setLongitude(lng)
    } else if (latitude && longitude) {
      const LatAndLng = latitude + ',' + longitude
      window.localStorage.setItem('latAndLng', LatAndLng)
    }
  }, [latitude, longitude])

  // Function to set latitude and longitude
  const setLocation = (lat, lng) => {
    setLatitude(lat)
    setLongitude(lng)
  }

  return <LocationContext.Provider value={{ latitude, longitude, setLocation }}>{children}</LocationContext.Provider>
}
