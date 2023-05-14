import { getUser } from '@/api/login'
import { load, save } from '@/utils/storage'

// ESM 单例模式 store
class UserStore {
  userInfo: any = null

  // static {}

  async reqLogin(params: any, callback?: Function) {
    const [_, res] = await getUser(params)

    if (res.data) {
      this.userInfo = res.data
      await save('userInfo', JSON.stringify(this.userInfo))

      callback?.(true)
    } else {
      this.userInfo = null
      callback?.(false)
    }

    if (_) {
      console.error(_.message)
    }
  }

  async loadUserInfo() {
    this.userInfo = await load('userInfo')
  }
}

export default new UserStore()
