import { Platform } from 'react-native'

import _updateConfig from '@/../update.json'
import {
  CheckResult,
  checkUpdate,
  downloadUpdate,
  isFirstTime,
  isRolledBack,
  markSuccess,
  switchVersion,
  switchVersionLater,
} from 'react-native-update'
import { useEffect } from 'react'
import { save } from '@/utils/storage'

export const UseCheckHotUpdate = () => {
  useEffect(() => {
    if (isFirstTime) {
      // 在每次更新完毕后的首次启动时，isFirstTime常量会为true。
      // 你必须在应用退出前合适的任何时机，调用markSuccess，
      // 否则应用下一次启动的时候将会进行回滚操作
      markSuccess()
      console.log('更新完成，需要上报服务器统计')
    } else if (isRolledBack) {
      console.log('刚刚更新失败了,版本被回滚.需要上报服务器统计')
    }

    startCheck()
  }, [])

  const startCheck = async () => {
    if (Platform.OS === 'android') {
      const { appKey } = _updateConfig[Platform.OS]
      console.log(Platform.constants.Release)

      // {expired: true} 原生包已经过期，需要先更新原生包
      // {upToDate: true} 无需热更新
      // {update: true} 需要热更新
      // info 的 name、description 字段可以用于提示用户，而 metaInfo 字段则可以根据你的需求自定义其它属性(如是否静默更新、是否强制更新等等)，
      // 具体用法可参考场景实践。另外还有几个字段，包含了补丁包的下载地址等。 pushy 会首先尝试耗费流量更少的更新方式

      try {
        const info: CheckResult = await checkUpdate(appKey)

        // name 是补丁的版本号
        const { update, name, description, metaInfo } = info
        // 上传热更新补丁的时候的 字段信息
        const { forceUpdate } = JSON.parse(metaInfo)
        // 保存补丁版本号，便于设置中查看对应的热跟新补丁的版本
        save('patchVersion', name)

        // 如果强制更新 弹窗提示 否则 默默操作
        if (forceUpdate) {
        }

        if (update) {
          const patchHash = await downloadUpdate(
            info,
            // 下载进度回调为可选参数，从v5.8.3版本开始加入
            {
              onDownloadProgress: ({ received, total }) => {
                // 已下载的字节数, 总字节数
                console.log(received, total)
              },
            },
          )

          if (forceUpdate) {
            // 立刻切换版本，此时应用会立即重新加载，会闪屏一下，再启动
            patchHash && switchVersion(patchHash)
          } else {
            // 让应用在下一次启动的时候再加载新的版本。
            patchHash && switchVersionLater(patchHash)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
