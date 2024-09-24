import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite'

export const appwriteConfig = {
  endpoint: process.env.EXPO_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: process.env.EXPO_APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_APPWRITE_STORAGE_ID,
}

interface UserParams {
  email: string
  password: string
  username: string
}

interface SignInParams {
  email: string
  password: string
}

const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async ({ email, password, username }: UserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    )
    if (!newAccount) throw new Error('Failed to create account')

    const avatarUrl = avatars.getInitials(username)
    await signIn({ email, password })

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    )

    return newUser
  } catch (error) {
    console.log(`Error creating user: ${error}`)
    throw error
  }
}

export async function signIn({ email, password }: SignInParams) {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.log(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw new Error('Failed to get current account')

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )

    if (!user) throw new Error('Failed to get user')
    return user.documents[0]
  } catch (error) {
    console.log(error)
  }
}

export const signOut = async () => {
  try {
    await account.deleteSession('current')
  } catch (error) {
    console.log(error)
  }
}

export const getAllPosts = async ( ) => {
try {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId
    )
    return posts.documents

} catch (error) {
    console.log(error)

}
}


export const getLatestPosts = async ( ) => {
try {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(7)],
    )
    return posts.documents

} catch (error) {
    console.log(error)

}
}
