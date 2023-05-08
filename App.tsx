// export { default as Home } from '\@/view/home' // 这个语法不是默认导出
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import Router from '@/router'

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'}></StatusBar>

      <Router></Router>
    </SafeAreaProvider>
  )
}

export default App
