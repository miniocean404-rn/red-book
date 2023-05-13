// counterSlice.ts 文件

import { homeListApi } from '@/api/home'
import { HomeList, HomeSliceType } from '@/store/feature/home-list.d'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// 步调用形式
export const fetchHomeListApi = createAsyncThunk(
  'home-list/fetchHomeListApi',
  async (page: number, { getState, requestId }: any) => {
    if (!getState()['isRefresh']) {
      let currentPage

      if (page === -1) {
        currentPage = 1
      } else {
        currentPage = getState()['homeList'].page += 1
      }

      const [err, res] = await homeListApi({
        page: currentPage,
        size: 5,
      })

      if (err) {
      } else {
        return { value: res.data, page: currentPage }
      }
    }
  },
)

export const initialState: HomeSliceType = {
  page: 0,
  list: [],
  isRefresh: false,
}

// 创建一个 Slice 切片
const homeListSlice = createSlice({
  name: 'home-list',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 非异步调用形式
    getHomeList(
      state,
      action: PayloadAction<{ value: HomeList[]; page: number }>,
    ) {
      if (action.payload.page === 1) {
        state.list = action.payload.value
      } else {
        state.list = state.list.concat(action.payload.value)
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchHomeListApi.pending, (state, action) => {
      state.isRefresh = true
    })
    builder.addCase(fetchHomeListApi.fulfilled, (state, action) => {
      if (action.payload?.page === 1) {
        state.list = action.payload?.value
      } else {
        state.list = state.list.concat(action.payload?.value)
      }
      state.isRefresh = false
    })
  },
})

// 导出加减的方法
export const { getHomeList } = homeListSlice.actions

// 默认导出
export default homeListSlice.reducer
