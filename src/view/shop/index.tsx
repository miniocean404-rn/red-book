import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import icon_search from '@/assets/icon_search.png'
import icon_shop_car from '@/assets/icon_shop_car.png'
import icon_orders from '@/assets/icon_orders.png'
import icon_menu_more from '@/assets/icon_menu_more.png'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouterParamList } from '@/router/typings/stack-params-list'

const Shop = () => {
  const navigation = useNavigation<StackNavigationProp<RouterParamList>>()

  const renderTitle = () => {
    const onSearchPress = () => {
      navigation.push('SearchGoods')
    }

    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity style={styles.searchLayout} onPress={onSearchPress}>
          <Image style={styles.searchIcon} source={icon_search} />
          <Text style={styles.searchTxt}>bm吊带1</Text>
        </TouchableOpacity>
        <Image style={styles.menuIcon} source={icon_shop_car} />
        <Image style={styles.menuIcon} source={icon_orders} />
        <Image style={styles.menuIcon} source={icon_menu_more} />
      </View>
    )
  }

  return (
    <View style={styles.root}>
      {renderTitle()}
      <Text>我是文字</Text>
    </View>
  )
}

export default Shop

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  titleLayout: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchLayout: {
    height: 32,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchTxt: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 6,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
})
