import { request } from '@/utils/request'

export const homeListApi = (params: any): any => {
  return new Promise((resolve) => {
    request
      .get('/home/homeList', {
        params,
      })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, null])
      })
  })
}
