import { icons } from '@/constants'
import { useState } from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

interface FormFieldProps {
  title?: string
  value?: string
  placeholder?: string
  handleChange?: (e: string) => void
  keyboardType?: string
  otherStyles?: string
}

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChange,
  keyboardType,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className='w-full space-x-4 flex flex-row items-center border-2 border-black-300 rounded-2xl h-16 bg-black-100 px-4 focus:border-secondary'>
      <TextInput
        className='flex-1 text-white text-base font-pregular mt-0.5'
        value={value}
        onChangeText={handleChange}
        placeholder='Search for a video topic'
        placeholderTextColor='#7b7b8b'
        secureTextEntry={title === 'Password' && !showPassword}
      />
      <TouchableOpacity>
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
