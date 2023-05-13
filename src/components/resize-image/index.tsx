import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

interface Props {
  uri: string
}

const { width: Screen_Width, height } = Dimensions.get('window')

const ShowWidth = (Screen_Width - 18) >> 1

// 根据图片在屏幕实际展示的宽度，与原图片比例来计算出真实图片在设备屏幕上的高度
const ResizeImage = ({ uri }: Props) => {
  const [height, setHeight] = useState<number>(200)

  useEffect(() => {
    Image.getSize(uri, (width: number, height: number) => {
      const showHeight = (ShowWidth * height) / width
      setHeight(showHeight)
    })

    return () => {}
  }, [uri])

  return <Image style={[styles.image, { height }]} source={{ uri }}></Image>
}

export default ResizeImage

const styles = StyleSheet.create({
  image: {
    width: ShowWidth,
    resizeMode: 'cover',
  },
})
