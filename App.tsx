// export { default as Home } from '\@/view/home' // 这个语法不是默认导出
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import Router from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { UseCheckHotUpdate } from '@/utils/check-update'

const App = (): JSX.Element => {
  UseCheckHotUpdate()

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
