export type HomeSliceType = {
  list: HomeList[]
}

export interface HomeList {
  id: number
  name: string
}

export interface HomeReducer {
  payload: HomeList
  type: 'home-list/getHomeList'
}
