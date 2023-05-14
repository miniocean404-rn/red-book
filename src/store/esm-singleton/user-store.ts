import { getUser } from '@/api/login'
import { load, save } from '@/utils/storage'
import { ToastAndroid } from 'react-native'

// ESM 单例模式 store
class UserStore {
  userInfo: any = null

  // static {}

  async reqLogin(params: any, callback?: Function) {
    const [_, res] = await getUser(params)

    if (_) {
      console.error(_.message)
      return
    }

    if (res.data) {
      this.userInfo = res.data
      await save('userInfo', JSON.stringify(this.userInfo))

      ToastAndroid.show(`${JSON.stringify(res.data)}`, 3000)

      callback?.(true)
    } else {
      this.userInfo = null
      callback?.(false)
    }
  }

  async loadUserInfo() {
    this.userInfo = await load('userInfo')
  }
}

export default new UserStore()
