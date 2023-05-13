import { request } from '@/utils/request'

export const artcleDetailApi = (params: any): any => {
  return new Promise((resolve) => {
    request
      .get('/article/articleDetail', {
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
