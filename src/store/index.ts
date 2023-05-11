import { middleware } from '@/store/plugin/middleware'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import homeListSlice from '@/store/feature/home-list'
import { RootState } from './index.d'

// 函数式组件使用：https://juejin.cn/post/7101688098781659172#heading-3
// 类组件使用：https://github.com/icesman/issues/issues/1

// 设置 reducer 的初始状态值 （只能是 reducers 包含的）
const preloadedState = {}

// export type RootState = ReturnType<typeof store.getState>

// 合并 reducer
const reducer = combineReducers<RootState>({
  homeList: homeListSlice,
})

export const store = configureStore({
  preloadedState,
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
})
