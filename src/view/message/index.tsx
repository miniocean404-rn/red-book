import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef } from 'react'
import FloatMenu, { FloatMenuRef } from './float-menu'

import icon_group from '@/assets/icon_group.png'

const Message = () => {
  const ref = useRef<FloatMenuRef>(null)
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>消息</Text>
        <TouchableOpacity
          style={styles.groupButton}
          onPress={(event: GestureResponderEvent) => {
            // 获取点击按钮时的 点击位置，每次点击位置并不相同
            // 48 是在点击位置的基础上，让卡片位移一段距离
            const { pageY } = event.nativeEvent

            ref.current?.show(pageY + 48)
          }}
        >
          <Image style={styles.iconGroup} source={icon_group} />
          <Text style={styles.groupTxt}>群聊</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      {renderTitle()}
      <FloatMenu ref={ref} />
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333',
  },
  groupButton: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  iconGroup: {
    width: 16,
    height: 16,
  },
  groupTxt: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
})
