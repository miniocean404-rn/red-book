### ESM 单例导出

1. 默认导出了一个 UserStore 实例，没有导出一个 UserStore 类，在别的地方无法再次进行创建
2. 该方法还形成了内部缓存数据的作用

   ```js
   class UserStore {
     userInfo: any = null

     async reqLogin(params: any, callback?: Function) {
       const [_, res] = await getUser(params)

       if (res.data) {
         this.userInfo = res.data

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
   ```

### React Native Debugger 使用

博客：https://blog.csdn.net/A15029296293/article/details/129841557
