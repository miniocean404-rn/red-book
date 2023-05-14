// export { default as Home } from '\@/view/home' // 这个语法不是默认导出
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SafeAreaView, StatusBar } from 'react-native'
import Router from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { UseCheckHotUpdate } from '@/utils/check-update'

const App = (): JSX.Element => {
  UseCheckHotUpdate()

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* 状态栏路由导航时候，状态栏不跟着动画，需要搭配 */}
        {/* StatusBar 的 translucent true 和 backgroundColor={'#00000000'} */}
        {/* Stack.Navigator 和 BottomTab.Navigator 的自定义 header 及 headerShown 来实现 */}
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'#00000000'}
          translucent={true}
        ></StatusBar>
        <Router></Router>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
