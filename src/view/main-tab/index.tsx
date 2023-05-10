import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouterParamList } from '@/router/typings/stack-params-list'
import Home from '@/view/home'
import Shop from '@/view/shop'
import Message from '@/view/message'
import Mine from '@/view/mine'

import Publish from '@/view/publish'
import CustomBottomTab from '@/view/main-tab/custom-bottom-tab'
import { systemBottomBar } from '@/view/main-tab/system-bottom-tab'

const BottomTab = createBottomTabNavigator<RouterParamList>()

const MainTab = () => {
  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        // 用于构建自定义 tab 样式
        tabBar={(props) => <CustomBottomTab {...props} />}

        // 自带的 tabbar 使用方式
        // screenOptions={systemBottomBar}
      >
        <BottomTab.Screen
          name={'Home'}
          component={Home}
          options={{ title: '首页' }}
        />
        <BottomTab.Screen
          name={'Shop'}
          component={Shop}
          options={{ title: '购物' }}
        />

        <BottomTab.Screen
          name={'Publish'}
          component={Publish}
          options={{ title: '发布' }}
        />

        <BottomTab.Screen
          name={'Message'}
          component={Message}
          options={{ title: '消息' }}
        />
        <BottomTab.Screen
          name={'Mine'}
          component={Mine}
          options={{ title: '我' }}
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
