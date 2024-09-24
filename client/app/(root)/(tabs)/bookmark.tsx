import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
  return (
    <SafeAreaView className='flex flex-row items-center justify-center h-screen'>
      <Text className='text-3xl font-bold'>Bookmark</Text>
    </SafeAreaView>
  )
}

export default Bookmark
