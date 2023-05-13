export type HomeSliceType = {
  page: number
  list: HomeList[]
  isRefresh: boolean
}

export interface HomeList {
  id?: string
  [string]: any
}

export interface HomeReducer {
  payload: { value: HomeList[]; page: number }
  type: 'home-list/getHomeList'
}
