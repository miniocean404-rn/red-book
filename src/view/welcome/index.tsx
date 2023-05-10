import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import logo from '@/assets/icon_main_logo.png'
import { useNavigation } from '@react-navigation/native'
import { RouterParamList } from '@/router/typings/stack-params-list'
import { StackNavigationProp } from '@react-navigation/stack'
import { load } from '@/utils/storage'

const Welcome = () => {
  const navigation = useNavigation<StackNavigationProp<RouterParamList>>()

  useEffect(() => {
    setTimeout(async () => {
      const res = await load('userInfo')
      if (!res) {
        navigation.replace('Login')
      } else {
        navigation.replace('MainTab')
      }
    }, 3000)

    return () => {}
  }, [])

  return (
    <View style={styles.root}>
      <Image style={styles.logo} source={logo}></Image>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 105,
    marginTop: 300,
    resizeMode: 'contain',
  },
})
