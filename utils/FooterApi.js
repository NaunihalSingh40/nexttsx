import { getCall } from 'api/axios'
import { useState, useEffect } from 'react'

const FooterApi = (endpoint) => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      const res = await getCall(`/clientApis/getConfigurations/${endpoint}`)
      setData(res?.data)
    } catch (err) {
      return err
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint])

  return { data }
}

export default FooterApi
