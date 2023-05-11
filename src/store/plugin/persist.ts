export const persistConfig = {
  key: 'root', // 必须有的
  storage: createWeAPPStorage(), // 缓存机制
  // stateReconciler: autoMergeLevel2 // 合并 reducer 的几层深度
  // blacklist: ['loginStatus'] reducer 里不持久化的数据,除此外均为持久化数据
  // whitelist: ['loginStatus'], // reducer 里持久化的数据,除此外均为不持久化数据
}

function createWeAPPStorage() {
  return {
    getItem: (key: string) => {
      return new Promise((resolve) => {
        // resolve(getStorageSync(key))
      })
    },
    setItem: (key: string, item: any) => {
      return new Promise((resolve) => {
        // setStorageSync(key, item)
        // resolve()
      })
    },
    removeItem: (key: string) => {
      return new Promise((resolve) => {
        // removeStorageSync(key)
        // resolve()
      })
    },
  }
}
