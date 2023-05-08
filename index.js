/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

import { Platform, UIManager } from 'react-native'

// 开启 RN 自带的 LayoutAnimation 布局动画
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

AppRegistry.registerComponent(appName, () => App)
