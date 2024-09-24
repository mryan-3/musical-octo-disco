import CustomButton from '@/components/custom-button'
import FormField from '@/components/form-field'
import { images } from '@/constants'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true)
    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username,
      })
      setUser(result)
      setIsLogged(true)

      // Set to global state

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
          <Text className='text-2xl font-bold text-white'>Sign Up</Text>

          <FormField
            title='Username'
            placeholder='Enter your unique username'
            value={form.username}
            handleChange={(e) => setForm({ ...form, username: e })}
            otherStyles='mt-7 w-full'
          />
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
          />
          <CustomButton
            title='Sign Up'
            onPress={submit}
            className='mt-7 w-full'
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='font-pregular text-gray-100 text-lg'>
              {' '}
              Already have an account?
            </Text>
            <Link
              href='/sign-in'
              className='font-psemibold text-secondary text-lg'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
