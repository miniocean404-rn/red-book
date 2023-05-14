import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouterParamList } from '@/router/typings/stack-params-list'
import Home from '@/view/home'
import Shop from '@/view/shop'
import Message from '@/view/message'
import Mine from '@/view/mine'

import CustomBottomTab from '@/view/main-tab/custom-bottom-tab'
import { systemBottomBar } from '@/view/main-tab/system-bottom-tab'
import StatusPlaceHolder from '@/components/status-placeholder'

const BottomTab = createBottomTabNavigator<RouterParamList>()

const MainTab = () => {
  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        // 用于构建自定义 tab 样式
        tabBar={(props) => <CustomBottomTab {...props} />}
        // 自带的 tabbar 使用方式
        screenOptions={{
          ...systemBottomBar,
          header(props) {
            return <StatusPlaceHolder></StatusPlaceHolder>
          },
        }}
      >
        <BottomTab.Screen
          name={'Home'}
          component={Home}
          options={{ title: '首页', headerShown: true }}
        />

        <BottomTab.Screen
          name={'Shop'}
          component={Shop}
          options={{ title: '购物', headerShown: true }}
        />

        <BottomTab.Screen
          name={'Publish'}
          component={View}
          options={{ title: '发布', headerShown: true }}
        />

        <BottomTab.Screen
          name={'Message'}
          component={Message}
          options={{ title: '消息', headerShown: true }}
        />

        <BottomTab.Screen
          name={'Mine'}
          component={Mine}
          options={{ title: '我', headerShown: true }}
        />
      </BottomTab.Navigator>
    </View>
  )
}

export default MainTab

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
})
