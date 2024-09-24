import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

export const useAppwrite = (fn: any) => {
  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fn()
      setData(response)
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    fetchData()
  }
  return { data , isLoading, refetch}
}
