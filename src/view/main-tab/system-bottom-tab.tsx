import icon_tab_home_normal from '@/assets/icon_tab_home_normal.png'
import icon_tab_home_selected from '@/assets/icon_tab_home_selected.png'

import icon_tab_message_normal from '@/assets/icon_tab_message_normal.png'
import icon_tab_message_selected from '@/assets/icon_tab_message_selected.png'

import icon_tab_shop_normal from '@/assets/icon_tab_shop_normal.png'
import icon_tab_shop_selected from '@/assets/icon_tab_shop_selected.png'

import icon_tab_mine_normal from '@/assets/icon_tab_mine_normal.png'
import icon_tab_mine_selected from '@/assets/icon_tab_mine_selected.png'
import { Image } from 'react-native'
import { RouterParamList } from '@/router/typings/stack-params-list'
import { RouteProp } from '@react-navigation/native'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

export const systemBottomBar = ({
  route,
}: {
  route: RouteProp<RouterParamList>
  navigation: any
}): BottomTabNavigationOptions => {
  return {
    tabBarIcon: ({ focused, color, size }) => {
      let img

      if (route.name === 'Home') {
        img = focused ? icon_tab_home_selected : icon_tab_home_normal
      } else if (route.name === 'Shop') {
        img = focused ? icon_tab_shop_selected : icon_tab_shop_normal
      } else if (route.name === 'Message') {
        img = focused ? icon_tab_message_selected : icon_tab_message_normal
      } else if (route.name === 'Mine') {
        img = focused ? icon_tab_mine_selected : icon_tab_mine_normal
      }

      return (
        <Image
          style={{ width: size, height: size, tintColor: color }}
          source={img}
        />
      )
    },
    tabBarActiveTintColor: '#ff2442',
    tabBarInactiveTintColor: '#999',
  }
}
