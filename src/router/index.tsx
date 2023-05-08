import { RouterParamList } from '@/router/typings/stack-params-list'
import { NavigationContainer } from '@react-navigation/native'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import Welcome from '@/view/welcome'
import Login from '@/view/login'

const Stack = createStackNavigator<RouterParamList>()

const Router = () => {
  return (
    <>
      {/* 导航栈的容器 */}
      <NavigationContainer>
        {/* 管理子屏幕的导航器组件 */}
        <Stack.Navigator
          // initialRouteName 默认打开的页面
          initialRouteName={'Login'}
          screenOptions={{
            cardStyle: {
              // 提高页面导航栈层级，避免出现 B 页面透过能看到 A 页面情况
              elevation: 1,
            },
          }}
        >
          {/* 用于指定路由配置的组件 */}
          <Stack.Screen
            name={'Welcome'}
            component={Welcome}
            options={{
              // 隐藏系统自带的标题栏
              headerShown: false,

              // 设置预设的页面跳转动画
              ...TransitionPresets.SlideFromRightIOS,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{
              headerShown: false,
              // 设置预设的页面跳转动画
              ...TransitionPresets.SlideFromRightIOS,
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default Router
