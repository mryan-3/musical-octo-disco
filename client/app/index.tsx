import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, ScrollView, Text, View } from 'react-native'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomButton from '@/components/custom-button'
import { useGlobalContext } from '@/context/global-provider'

const Home = () => {
    const {isLoggedIn, isLoading} = useGlobalContext()
    if(!isLoading && isLoggedIn) {
       <Redirect href='/(root)/(tabs)/home' />
    }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[130px] h-[84px]'
          />
          <Image
            source={images.cards}
            className='w-full max-w-[380px] h-[300px]'
            resizeMode='contain'
          />

          <View className='relative mt-4'>
            <Text className='text-3xl font-bold text-white text-center'>
              Discover Endless possibilities with{' '}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>
            <Image
              source={images.path}
              className='w-[120px] h-[15px] absolute -bottom-2 -right-6'
            />
          </View>
          <Text className='text-gray-100 mt-7 text-center'>
            Whrere creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton onPress={() => router.replace('/(auth)/sign-in')} title='Continue with Email' className='mt-10' />
        </View>
      </ScrollView>
      <StatusBar style='light' backgroundColor='#161622'/>
    </SafeAreaView>
  )
}

export default Home
