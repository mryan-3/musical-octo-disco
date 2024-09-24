import { Image, ImageSourcePropType, Text, View } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '@/constants'

interface TabIconProps {
    color: string
    focused: boolean
    icon: ImageSourcePropType
    name: string
}

const TabIcon = ({ color, focused, icon, name }: TabIconProps) => {
  return (
    <View className='flex flex-col items-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffa001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopColor: '#232533',
            borderTopWidth: 1,
            height: 74,
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.home}
                name='Home'
              />
            ),
          }}
        />

        <Tabs.Screen
          name='bookmark'
          options={{
            title: 'Bome',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.bookmark}
                name='Bookmark'
              />
            ),
          }}
        />

        <Tabs.Screen
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.plus}
                name='Create'
              />
            ),
          }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.profile}
                name='Profile'
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
