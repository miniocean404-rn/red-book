import { request } from '@/utils/request'

export const accountInfoApi = (params?: any): any => {
  return new Promise((resolve) => {
    request
      .get('/mine/accountInfo', {
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
