import { images } from '@/constants'
import { View, Text, Image } from 'react-native'
import CustomButton from './custom-button'
import { router } from 'expo-router'

export const EmptyState = ({ text, subtitle }: any) => {
  return (
    <View className='justify-center items-center px-4 '>
      <Image
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />

      <Text className='text-xl text-white font-psemibold mt-2'>{subtitle}</Text>
      <Text className='text-sm text-gray-100 font-pmedium'>{text}</Text>
      <CustomButton className='my-5 w-full ' title='Upload Video' onPress={() => router.push('/create')} />
    </View>
  )
}
