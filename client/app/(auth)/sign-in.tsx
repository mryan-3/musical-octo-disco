import CustomButton from '@/components/custom-button'
import FormField from '@/components/form-field'
import { images } from '@/constants'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert } from 'react-native'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if ( !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true)
    try {
      await signIn({
        email: form.email,
        password: form.password,
      })
      const result = await getCurrentUser()
      setUser(result)
      setIsLogged(true)

      // Set to global state

      Alert.alert('Success', 'Logged in successfully')
      router.replace('/(root)/(tabs)/home')
    } catch (error) {
      Alert.alert('Error', 'Failed to create account')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center items-start min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl mt-3 font-bold text-white'>Log In</Text>
          <FormField
            title='Email'
            placeholder='Enter your email'
            value={form.email}
            handleChange={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7 w-full'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            placeholder='Enter your password'
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7 w-full'
            keyboardType='password'
          />
          <CustomButton
            title='Sign In'
            onPress={submit}
            className='mt-7 w-full'
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='font-pregular text-gray-100 text-lg'>
              {' '}
              Don't have an account?{' '}
            </Text>
            <Link href='/sign-up' className='font-psemibold text-secondary text-lg'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
