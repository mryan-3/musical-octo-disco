import { icons } from '@/constants'
import { useState } from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

interface FormFieldProps {
  title: string
  value: string
  placeholder: string
  handleChange: (e: string) => void
  keyboardType?: string
  otherStyles?: string
}

const FormField = ({
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
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='w-full flex flex-row items-center border-2 border-black-300 rounded-2xl h-16 bg-black-100 px-4 focus:border-secondary'>
        <TextInput
          className='flex-1 text-white text-base '
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode='contain'
              className='w-6 h-6'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
