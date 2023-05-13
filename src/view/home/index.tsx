import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListRenderItemInfo,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import icon_heart from '@/assets/icon_heart.png'
import icon_heart_empty from '@/assets/icon_heart_empty.png'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store/index'
import { fetchHomeListApi } from '@/store/feature/home-list'
import { HomeSliceType } from '@/store/feature/home-list.d'
import FlowList from '@/components/flowlist/FlowList.js'
import ResizeImage from '@/components/resize-image'
import Heart from '@/components/heart'
import TitleBar from '@/view/home/conponents/title-bar'

const { width: Screen_Width, height } = Dimensions.get('window')

const Home = () => {
  const { list, isRefresh } = useSelector<RootState, HomeSliceType>(
    (state) => state.homeList,
  )
  // const dispatch = useDispatch<Dispatch<HomeReducer>>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    dispatch(fetchHomeListApi(1))
  }
  const onRefresh = () => {
    dispatch(fetchHomeListApi(-1))
  }

  const onEndReached = () => {
    dispatch(fetchHomeListApi(1))
  }

  const renderItem = ({ item }: ListRenderItemInfo<any>) => {
    return (
      <View style={styles.item}>
        <ResizeImage uri={item?.image}></ResizeImage>
        <Text style={styles.titleTxt}>{item?.title}</Text>

        <View style={styles.nameLayout}>
          <Image
            style={styles.avatarImg}
            source={{ uri: item?.avatarUrl }}
          ></Image>
          <Text style={styles.nameTxt}>{item?.userName}</Text>

          <Heart light={item?.isFavorite}></Heart>
          <Text style={styles.countTxt}>{item?.favoriteCount}</Text>
        </View>
      </View>
    )
  }

  const Footer = () => {
    return <Text style={styles.footerTxt}>没有更多数据</Text>
  }

  return (
    <View style={styles.root}>
      <TitleBar
        tab={1}
        onTabChange={(tab) => {
          console.log(tab)
        }}
      ></TitleBar>

      {/* 封装瀑布流组件 */}
      <FlowList
        style={styles.flatList}
        data={list}
        renderItem={renderItem}
        keyExtractor={(item: any, index: number) => `${item?.id}-${index}`}
        contentContainerStyle={styles.container}
        numColumns={2}
        // 是否显示滚动条 分别为横向和纵向
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshing={isRefresh}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        ListFooterComponent={Footer}
      />

      {/* 原始使用 */}
      {/* <FlatList
        style={styles.flatList}
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
        contentContainerStyle={styles.container}
        numColumns={2}
        // 是否显示滚动条 分别为横向和纵向
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshing={isRefresh}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        ListFooterComponent={Footer}
      /> */}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 6,
  },
  item: {
    width: (Screen_Width - 18) >> 1,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  footerTxt: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})
