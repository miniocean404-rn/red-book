import { StyleSheet, NativeModules, View } from 'react-native'
import React from 'react'

type Props = {
  color?: string
}

const { StatusBarManager } = NativeModules

const StatusPlaceHolder = ({ color = 'white' }: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: StatusBarManager.HEIGHT,
        backgroundColor: color,
      }}
    ></View>
  )
}

export default StatusPlaceHolder

const styles = StyleSheet.create({})
