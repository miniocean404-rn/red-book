import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import icon_daily from '@/assets/icon_daily.png'
import icon_search from '@/assets/icon_search.png'

type Props = {
  tab: number
  onTabChange: (tab: number) => void
}

const TitleBar = ({ tab, onTabChange }: Props) => {
  const [tabIndex, setTabIndex] = useState(1)

  useEffect(() => {
    setTabIndex(tab)
  }, [tab])

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.dailyButton}>
        <Image style={styles.icon} source={icon_daily}></Image>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(0)
          onTabChange?.(0)
        }}
      >
        <Text style={tabIndex === 0 ? styles.tabTxtSelect : styles.tabTxt}>
          关注
        </Text>
        {tabIndex === 0 && <View style={styles.line}></View>}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(1)
          onTabChange?.(1)
        }}
      >
        <Text style={tabIndex === 1 ? styles.tabTxtSelect : styles.tabTxt}>
          发现
        </Text>
        {tabIndex === 1 && <View style={styles.line}></View>}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(2)
          onTabChange?.(2)
        }}
      >
        <Text style={tabIndex === 2 ? styles.tabTxtSelect : styles.tabTxt}>
          南京
        </Text>
        {tabIndex === 2 && <View style={styles.line}></View>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchButton}>
        <Image style={styles.icon} source={icon_search}></Image>
      </TouchableOpacity>
    </View>
  )
}

export default TitleBar

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  dailyButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // 增加点击区域大小
    paddingRight: 12,
    marginRight: 42,
  },
  searchButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // 增加点击区域大小
    paddingLeft: 12,
    marginLeft: 42,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabTxtSelect: {
    fontSize: 17,
    color: '#333',
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6,
  },
})
