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

### 打包教学

https://blog.csdn.net/ych1274816963/article/details/120967009

### 热修复

1. 安装依赖

   ```js
   # 先全局安装命令行工具，每台电脑只用装一次
   yarn global add  react-native-update-cli --ignore-engines

   # 然后在项目目录中安装热更新模块
   yarn add react-native-update
   ```

2. 集成文档：https://pushy.reactnative.cn/docs/getting-started.html

### React Native Debugger 使用

博客：https://blog.csdn.net/A15029296293/article/details/129841557

### 库

轮播图：react-native-snap-carousel

### expo

1. 更简单的构建 react native 的平台，不用搭建 XCode（iOS）或 Android Studio 直接使用
2. Expo 允许你在手机、模拟器或浏览器上看到你正在进行的应用程序

### Bug

1. 不收起键盘，进行路由导航在生产环境会导致白屏的 bug

   ```js
   // 解决方案：手动失焦
   // 或者 使用滚动组件的 keyboardDismissMode = 'on-drag' && keyboardShouldPersistTaps={'never'}
   usernameInput.current?.blur()
   passwordInput.current?.blur()
   ```

### cocoapod install 依赖缓慢

开启 clashX 终端代理

```shell
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```
