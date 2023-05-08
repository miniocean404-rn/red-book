import { Image, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import logo from '@/assets/icon_main_logo.png'
import icon_unselected from '@/assets/icon_unselected.png'
import icon_selected from '@/assets/icon_selected.png'
import icon_arrow from '@/assets/icon_arrow.png'
import icon_wx_small from '@/assets/icon_wx_small.png'

type LoginTypeDeclare = 'quick' | 'input'

const Login = () => {
  const [loginType, setLoginType] = useState<LoginTypeDeclare>('quick')
  const [isCheck, setIsCheck] = useState<boolean>(false)

  const quickRender = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 40,
      },
      logo: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170,
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      labelTxt: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
      },
      protocolTxt: {
        fontSize: 12,
        color: '#1020ff',
        marginLeft: 6,
      },
      otherLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingBottom: 100,
      },
      otherLoginTxt: {
        fontSize: 14,
        color: '#303080',
      },
      icon_arrow: {
        width: 16,
        height: 16,
        transform: [{ rotate: '180deg' }],
      },
      wxLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon_wx_small: {
        width: 32,
        height: 32,
      },
      wxLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 16,
      },
      oneKeyLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      oneKeyLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 16,
      },
    })

    const radioOnPress = () => {
      setIsCheck(!isCheck)
    }

    const protocolOnPress = async () => {
      await Linking.openURL('https://www.baidu.com')
    }

    const otherLoginOnPress = () => {
      setLoginType((type: LoginTypeDeclare) => {
        if (type === 'quick') {
          return 'input'
        } else {
          return 'quick'
        }
      })
    }

    return (
      <View style={styles.root}>
        <View style={styles.protocolLayout}>
          <TouchableOpacity onPress={radioOnPress}>
            <Image style={styles.radioButton} source={isCheck ? icon_selected : icon_unselected}></Image>
          </TouchableOpacity>
          <Text style={styles.labelTxt}>我已阅读并同意</Text>

          <TouchableOpacity onPress={protocolOnPress}>
            <Text style={styles.protocolTxt}>《用户协议》 和 《隐私政策》</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.otherLoginButton} onPress={otherLoginOnPress}>
          <Text style={styles.otherLoginTxt}>其他登录方式</Text>
          <Image style={styles.icon_arrow} source={icon_arrow}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wxLoginButton}
          onPress={radioOnPress}
          // 点击透明度
          activeOpacity={0.7}
        >
          <Image style={styles.icon_wx_small} source={icon_wx_small}></Image>
          <Text style={styles.wxLoginTxt}>微信登录</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.oneKeyLoginButton}
          onPress={radioOnPress}
          // 点击透明度
          activeOpacity={0.7}
        >
          <Text style={styles.oneKeyLoginTxt}>一键登录</Text>
        </TouchableOpacity>

        <Image style={styles.logo} source={logo}></Image>
      </View>
    )
  }

  const inputRender = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      pwdLogin: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 56,
        color: '#333',
      },
      tip: {
        fontSize: 14,
        color: '#BBB',
        marginTop: 6,
      },
    })

    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      {(loginType === 'quick' && quickRender()) || null}
      {(loginType === 'input' && inputRender()) || null}
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
})
