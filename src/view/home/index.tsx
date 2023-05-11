import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { homeListApi } from '@/api/home'
import { getHomeList } from '@/store/feature/home-list'
import { Dispatch } from '@reduxjs/toolkit'
import { RootState } from '@/store/index.d'
import { HomeList, HomeReducer } from '@/store/feature/home-list.d'

const Home = () => {
  const list = useSelector<RootState, HomeList[]>(
    (state) => state.homeList.list,
  )
  const dispatch = useDispatch<Dispatch<HomeReducer>>()

  useEffect(() => {
    init()
    return () => {}
  }, [])

  const init = async () => {
    const [_, res] = await homeListApi({
      page: 1,
      size: 10,
    })

    dispatch(getHomeList(res.data))
  }

  return (
    <View>
      <Text>Home</Text>
      <Text>{JSON.stringify(list)}</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
