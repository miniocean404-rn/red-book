import { getUser } from '@/api/login'
import { save } from '@/utils/storage'

// ESM 单例模式 store
class UserStore {
  userInfo: any = null

  async reqLogin(params: any, callback?: Function) {
    const [_, res] = await getUser(params)

    if (res.data) {
      this.userInfo = res.data
      save('userInfo', this.userInfo)

      callback?.(true)
    } else {
      this.userInfo = null
      callback?.(false)
    }

    if (_) {
      console.error(_.message)
    }
  }
}

export default new UserStore()
