import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  TextInput,
  LayoutAnimation,
  ToastAndroid,
} from 'react-native'
import React, { useState } from 'react'
import logo from '@/assets/icon_main_logo.png'
import icon_unselected from '@/assets/icon_unselected.png'
import icon_selected from '@/assets/icon_selected.png'
import icon_arrow from '@/assets/icon_arrow.png'
import icon_wx_small from '@/assets/icon_wx_small.png'
import icon_triangle from '@/assets/icon_triangle.png'
import icon_eye_open from '@/assets/icon_eye_open.png'
import icon_eye_close from '@/assets/icon_eye_close.png'
import icon_exchange from '@/assets/icon_exchange.png'
import icon_wx from '@/assets/icon_wx.png'
import icon_qq from '@/assets/icon_qq.webp'
import icon_close_modal from '@/assets/icon_close_modal.png'
import { RouterParamList } from '@/router/typings/stack-params-list'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { formartPhone, replaceBlank } from '@/utils/string'
import { request } from '@/utils/request'
import { getUser } from '@/api/login'
import userStore from '@/store/esm-singleton/user-store'

type LoginTypeDeclare = 'quick' | 'input'

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RouterParamList>>()

  const [loginType, setLoginType] = useState<LoginTypeDeclare>('quick')
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(true)
  const [phone, setPhone] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')

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
      },
    })

    const radioOnPress = async () => {
      setIsCheck(!isCheck)
    }

    const protocolOnPress = async () => {
      await Linking.openURL('https://www.baidu.com')
    }

    const otherLoginOnPress = () => {
      LayoutAnimation.easeInEaseOut()
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
            <Image
              style={styles.radioButton}
              source={isCheck ? icon_selected : icon_unselected}
            ></Image>
          </TouchableOpacity>
          <Text style={styles.labelTxt}>我已阅读并同意</Text>

          <TouchableOpacity onPress={protocolOnPress}>
            <Text style={styles.protocolTxt}>《用户协议》 和 《隐私政策》</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={otherLoginOnPress}
        >
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
        paddingHorizontal: 48,
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
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28,
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 6,
      },
      pre86: {
        fontSize: 24,
        color: '#bbb',
      },
      phoneInput: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginLeft: 16,
      },
      pwdLayout: {
        marginTop: 8,
      },
      pwdInput: {
        marginLeft: 0,
        marginRight: 16,
      },
      icon_eye: {
        width: 30,
        height: 30,
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
      },
      exchange: {
        width: 16,
        height: 16,
      },
      codeLogTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
        marginLeft: 4,
      },
      forgetPwdTxt: {
        fontSize: 14,
        color: '#303080',
      },
      loginButton: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      loginButtonDisable: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      loginTxt: {
        fontSize: 20,
        color: 'white',
      },
      protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 40,
        marginTop: 12,
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
      WxQQLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center',
      },
      iconWX: {
        width: 50,
        height: 50,
        marginRight: 60,
      },
      iconQQ: {
        width: 50,
        height: 50,
        marginLeft: 60,
      },
      closeButton: {
        position: 'absolute',
        left: 36,
        top: 24,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    })

    const loginOnPress = async () => {
      userStore.reqLogin(
        {
          name: '18751609896' || 'dagongjue' || replaceBlank(phone),
          pwd: '123456',
        },
        (success: boolean) => {
          if (success) {
            navigation.replace('MainTab')
          } else {
            // ToastAndroid.show('登陆失败，请检查用户名和密码', ToastAndroid.LONG)
          }
        },
      )
    }

    const phoneOnChangeText = (v: string) => {
      setPhone(formartPhone(v))
    }
    const pwdOnChangeText = (v: string) => {
      setPwd(v)
    }

    const canLogin = phone?.length === 13 && pwd?.length === 6

    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>

        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image style={styles.triangle} source={icon_triangle}></Image>

          <TextInput
            style={styles.phoneInput}
            placeholderTextColor={'#bbb'}
            placeholder="请输入手机号码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={13}
            value={phone}
            onChangeText={phoneOnChangeText}
          />
        </View>

        <View style={[styles.phoneLayout, styles.pwdLayout]}>
          <TextInput
            style={[styles.phoneInput, styles.pwdInput]}
            placeholderTextColor={'#bbb'}
            placeholder="请输入手机密码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={6}
            value={pwd}
            secureTextEntry={!isEyeOpen}
            onChangeText={pwdOnChangeText}
          />

          <TouchableOpacity
            onPress={() => {
              setIsEyeOpen(!isEyeOpen)
            }}
          >
            <Image
              style={styles.icon_eye}
              source={isEyeOpen ? icon_eye_open : icon_eye_close}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.changeLayout}>
          <Image style={styles.exchange} source={icon_exchange}></Image>
          <Text style={styles.codeLogTxt}>验证码登录</Text>
          <Text style={styles.forgetPwdTxt}>忘记密码 ?</Text>
        </View>

        <TouchableOpacity
          style={canLogin ? styles.loginButton : styles.loginButtonDisable}
          activeOpacity={canLogin ? 0.7 : 1}
          onPress={(canLogin && loginOnPress) || undefined}
        >
          <Text style={styles.loginTxt}>登录</Text>
        </TouchableOpacity>

        <View style={styles.protocolLayout}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.radioButton}
              source={isCheck ? icon_selected : icon_unselected}
            ></Image>
          </TouchableOpacity>
          <Text style={styles.labelTxt}>我已阅读并同意</Text>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.protocolTxt}>《用户协议》 和 《隐私政策》</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.WxQQLayout}>
          <Image style={styles.iconWX} source={icon_wx}></Image>
          <Image style={styles.iconQQ} source={icon_qq}></Image>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut()
            setLoginType('quick')
          }}
        >
          <Image style={styles.closeImg} source={icon_close_modal}></Image>
        </TouchableOpacity>
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
