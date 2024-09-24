import {
    Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextBase,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/search-input'
import { Trending } from '@/components/trending'
import { EmptyState } from '@/components/empty-state'
import { useEffect, useState } from 'react'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { VideoCard } from '@/components/video-card'

const Home = () => {
    const { data: posts, refetch } = useAppwrite(getAllPosts)
    const { data: latestPosts } = useAppwrite(getLatestPosts)
    const [refreshing, setRefreshing] = useState(false)


    const onRefresh = () => {
        setRefreshing(true)
        refetch()
        setRefreshing(false)
    }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className='my-6  px-4 space-y-6'>
            <View className='flex flex-row  justify-between items-start mb-6'>
              <View>
                <Text className='text-sm text-gray-100 font-pmedium'>
                  Welcome Back
                </Text>
                <Text className='text-2xl text-white font-psemibold'>Gwen</Text>
              </View>

              <View>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-9 '
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput />

            <View className='w-full flex-1 mt-5 pb-8 pt-5 '>
              <Text className='text-gray-100 text-lg font-pregular'>
                Latest Videos
              </Text>
              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            subtitle='No videos found'
            text='Be the first to upload a video'
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Home
