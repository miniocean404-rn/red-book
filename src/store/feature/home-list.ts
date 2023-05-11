// counterSlice.ts 文件

import { HomeList, HomeSliceType } from '@/store/feature/home-list.d'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const initialState: HomeSliceType = {
  list: [],
}

// 创建一个 Slice 切片
const homeListSlice = createSlice({
  name: 'home-list',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    getHomeList(state, action: PayloadAction<HomeList>) {
      state.list = []
      state.list.concat(action.payload)
    },
  },
})

// 导出加减的方法
export const { getHomeList } = homeListSlice.actions

// 默认导出
export default homeListSlice.reducer
