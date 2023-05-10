import { request } from '@/utils/request'

export const getUser = (params: any): any => {
  return new Promise((resolve) => {
    request
      .get('/user/login', {
        params,
      })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export const useApi = (data: any) => {
  return new Promise((resolve) => {
    request
      .post('', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
