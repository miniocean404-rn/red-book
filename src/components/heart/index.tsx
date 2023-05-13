import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import icon_heart from '@/assets/icon_heart.png'
import icon_heart_empty from '@/assets/icon_heart_empty.png'

type Props = {
  light: boolean
  size?: number
  onLightChange?: (light: boolean) => void
}

const Heart = ({ light, size = 20, onLightChange }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const scale = useRef<Animated.Value>(new Animated.Value(0)).current
  const alpha = useRef<Animated.Value>(new Animated.Value(0)).current

  useEffect(() => {
    setIsShow(light)
  }, [light])

  const onPress = () => {
    const newState = !isShow
    setIsShow(newState)
    onLightChange?.(newState)

    if (newState) {
      alpha.setValue(1)
      const scaleAnim = Animated.timing(scale, {
        toValue: 1.8,
        duration: 300,
        useNativeDriver: false,
      })

      const alphaAnim = Animated.timing(alpha, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
        delay: 200,
      })

      Animated.parallel([scaleAnim, alphaAnim]).start()
    } else {
      scale.setValue(0)
      alpha.setValue(0)
    }
  }

  return (
    // 必须使用 react native 的 TouchableOpacity 否则无法扩充按键的外观到 2 倍的样子
    <TouchableOpacity onPress={onPress}>
      <Image
        style={[styles.heart, { width: size, height: size }]}
        source={isShow ? icon_heart : icon_heart_empty}
      />
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 20,
          position: 'absolute',
          borderColor: '#ff2442',
          transform: [{ scale: scale }],
          opacity: alpha,
        }}
      />
    </TouchableOpacity>
  )
}

export default Heart

const styles = StyleSheet.create({
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
})
