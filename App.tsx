// export { default as Home } from '\@/view/home' // 这个语法不是默认导出
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import Router from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/store'

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'white'}
        ></StatusBar>

        <Router></Router>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
