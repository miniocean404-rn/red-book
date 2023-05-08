// 为全局添加声明,模块内部是 declare 就直接声明 declare
// 否则就以下方式继承 xx 是引用模块的字符串 并不是自定义的 as 后的名字 as 只是为了导入进来
// declare module xx {
//    interface xx {
// }
// }

import * as ReactNative from 'react-native'

declare global {
  interface AlterFn {
    (any): void
  }

  var alert: AlterFn

  declare module '*.svg'
  declare module '*.png'
  declare module '*.jpg'
  declare module '*.jpeg'
  declare module '*.gif'
  declare module '*.bmp'
  declare module '*.tiff'
}

declare module 'react-native' {
  export interface UIManagerStatic {
    NativeInfoView: any
  }
}

type BaseProps = {
  name: string
}
