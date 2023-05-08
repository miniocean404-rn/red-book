import AsyncStorage from '@react-native-async-storage/async-storage'

const save = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value)
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }
}

const load = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }
}

const remove = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }
}

const clear = async () => {
  try {
    return await AsyncStorage.clear()
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }
}
