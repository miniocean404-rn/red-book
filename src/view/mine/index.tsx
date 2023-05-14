import {
  Image,
  LayoutChangeEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import icon_mine_bg from '@/assets/icon_mine_bg.png'
import icon_menu from '@/assets/icon_menu.png'
import icon_shop_car from '@/assets/icon_shop_car.png'
import icon_share from '@/assets/icon_share.png'
import icon_location_info from '@/assets/icon_location_info.png'
import icon_qrcode from '@/assets/icon_qrcode.png'
import icon_add from '@/assets/icon_add.png'
import icon_male from '@/assets/icon_male.png'
import icon_female from '@/assets/icon_female.png'
import icon_setting from '@/assets/icon_setting.png'
import icon_no_note from '@/assets/icon_no_note.webp'
import icon_no_collection from '@/assets/icon_no_collection.webp'
import icon_no_favorate from '@/assets/icon_no_favorate.webp'
import userStore from '@/store/esm-singleton/user-store'
import { load } from '@/utils/storage'
import { accountInfoApi } from '@/api/mine'
import SideMenu, { SideMenuRef } from '@/view/mine/side-menu'

const Mine = () => {
  const [bgImgHeight, setBgImgHeight] = useState<number>(400)
  const [userInfo, setUserInfo] = useState<any>({})
  const [accountInfo, setAccountInfo] = useState<any>({})
  const [tabIndex, setTabIndex] = useState<number>(0)

  const sideMenuRef = useRef<SideMenuRef>(null)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    setUserInfo(JSON.parse((await load('userInfo')) || ''))

    const [_, account] = await accountInfoApi()
    setAccountInfo(account?.data)
  }

  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuButton: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
      },
      menuImg: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
      rightMenuImg: {
        marginHorizontal: 12,
        tintColor: 'white',
      },
    })

    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            sideMenuRef.current?.show()
          }}
        >
          <Image style={styles.menuImg} source={icon_menu} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <Image
          style={[styles.menuImg, styles.rightMenuImg]}
          source={icon_shop_car}
        />
        <Image
          style={[styles.menuImg, styles.rightMenuImg]}
          source={icon_share}
        />
      </View>
    )
  }

  const renderInfo = () => {
    const { avatar, nickName, redBookId, desc, sex } = userInfo
    const info = accountInfo

    const styles = StyleSheet.create({
      avatarLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
      },
      avatarImg: {
        width: 96,
        height: 96,
        resizeMode: 'cover',
        borderRadius: 48,
      },
      addImg: {
        width: 28,
        height: 28,
        marginLeft: -28,
        marginBottom: 2,
      },
      nameLayout: {
        marginLeft: 20,
      },
      nameTxt: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
      },
      idLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
      },
      idTxt: {
        fontSize: 12,
        color: '#bbb',
      },
      qrcodeImg: {
        width: 12,
        height: 12,
        marginLeft: 6,
        tintColor: '#bbb',
      },
      descTxt: {
        fontSize: 14,
        color: 'white',
        paddingHorizontal: 16,
      },
      sexLayout: {
        width: 32,
        height: 24,
        backgroundColor: '#ffffff50',
        borderRadius: 12,
        marginTop: 12,
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
      sexImg: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
      },
      infoLayout: {
        width: '100%',
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 28,
      },
      infoItem: {
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      infoValue: {
        fontSize: 18,
        color: 'white',
      },
      infoLabel: {
        fontSize: 12,
        color: '#ddd',
        marginTop: 6,
      },
      infoButton: {
        height: 32,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
      },
      editTxt: {
        fontSize: 14,
        color: '#ffffff',
      },
      settingImg: {
        width: 20,
        height: 20,
        tintColor: '#ffffff',
      },
    })

    return (
      <View
        // 挂载 和 布局更改时调用
        onLayout={(e: LayoutChangeEvent) => {
          const { height } = e.nativeEvent.layout

          setBgImgHeight(height)
        }}
      >
        <View style={styles.avatarLayout}>
          <Image style={styles.avatarImg} source={{ uri: avatar }} />
          <Image style={styles.addImg} source={icon_add} />
          <View style={styles.nameLayout}>
            <Text style={styles.nameTxt}>{nickName}</Text>
            <View style={styles.idLayout}>
              <Text style={styles.idTxt}>小红书号：{redBookId}</Text>
              <Image style={styles.qrcodeImg} source={icon_qrcode} />
            </View>
          </View>
        </View>
        <Text style={styles.descTxt}>{desc}</Text>

        <View style={styles.sexLayout}>
          <Image
            style={styles.sexImg}
            source={sex === 'male' ? icon_male : icon_female}
          />
        </View>

        <View style={styles.infoLayout}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info?.followCount}</Text>
            <Text style={styles.infoLabel}>关注</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info?.fans}</Text>
            <Text style={styles.infoLabel}>粉丝</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info?.favorateCount}</Text>
            <Text style={styles.infoLabel}>获赞与收藏</Text>
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.editTxt}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Image style={styles.settingImg} source={icon_setting} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderTabs = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      icon: {
        width: 28,
        height: 28,
      },
      line: {
        width: 28,
        height: 2,
        backgroundColor: '#ff2442',
        borderRadius: 1,
        position: 'absolute',
        bottom: 6,
      },
      tabButton: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
      },
      tabTxt: {
        fontSize: 17,
        color: '#999',
      },
      tabTxtSelected: {
        fontSize: 17,
        color: '#333',
      },
    })
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(0)
          }}
        >
          <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>
            笔记
          </Text>
          {tabIndex === 0 && <View style={styles.line} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(1)
          }}
        >
          <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>
            收藏
          </Text>
          {tabIndex === 1 && <View style={styles.line} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(2)
          }}
        >
          <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>
            赞过
          </Text>
          {tabIndex === 2 && <View style={styles.line} />}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <Image
        // 计算背景图片高度
        style={[styles.bgImg, { height: bgImgHeight + 64 }]}
        source={icon_mine_bg}
      />
      {renderTitle()}
      <ScrollView
        style={styles.scrollView}
        // refreshControl={
        //     <RefreshControl
        //         refreshing={store.refreshing}
        //         onRefresh={store.requestAll}
        //     />
        // }
      >
        {renderInfo()}
        {renderTabs()}
        {/* {renderList()} */}
      </ScrollView>
      <SideMenu ref={sideMenuRef} />
    </View>
  )
}

export default Mine

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 400,
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
})
