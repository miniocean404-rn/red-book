import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  View,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
  ImageSourcePropType,
  LayoutAnimation,
} from 'react-native'
import { PropsTypes } from './PropsTypes'

import { Indicator } from './indicator'
import { styles } from './style'

import icon_close_modal from '@/assets/icon_close_modal.png'

const { width } = Dimensions.get('screen')
const Os = Platform.OS
export type DataType = { img: ImageSourcePropType }
export const ImageSlider = ({
  data = [],
  previewImageContainerStyle = {},
  previewImageStyle = {},
  caroselImageStyle = {},
  caroselImageContainerStyle = {},
  timer = 2000,
  autoPlay = false,
  showIndicator = true,
  activeIndicatorStyle = {},
  inActiveIndicatorStyle = {},
  indicatorContainerStyle = {},
  onItemChanged = (itemData) => {},
  localImg = false,
  onClick = (item: DataType, index: number) => {},
  preview = true,
  children,
  blurRadius = 50,
}: PropsTypes) => {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const imageW = width * 0.7
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [imageViewer, setImageViewer] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const slider = useRef(null)
  const timerRef = useRef<any>(null)
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    // Use viewable items in state or as intended
    if (viewableItems.length > 0) {
      let index = viewableItems[0].index
      onItemChanged(viewableItems[0].item)
      setSelectedIndex(index)
    }
  })
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

  useEffect(() => {
    if (autoPlay) {
      if (data.length > 0) startAutoPlay(imageViewer ? true : false)
    }
  }, [])

  useEffect(() => {
    if (!imageViewer) {
      if (autoPlay) {
        if (data.length > 0) startAutoPlay(imageViewer ? true : false)
      }
    } else {
      clearTimeout(timerRef?.current)
    }
  }, [currentIndex, imageViewer])

  const switchViewer = useCallback(() => {
    LayoutAnimation.easeInEaseOut()
    setImageViewer(!imageViewer)
  }, [imageViewer])

  const changeSliderListIndex = () => {
    if (slider.current) {
      if (currentIndex == data.length - 1) {
        setCurrentIndex(0)
        // @ts-ignore
        slider.current.scrollToIndex({
          index: currentIndex,
          animated: true,
        })
      } else {
        setCurrentIndex(currentIndex + 1)
        // @ts-ignore
        slider.current.scrollToIndex({
          index: currentIndex,
          animated: true,
        })
      }
    }
  }

  const startAutoPlay = (isViewer: boolean) => {
    if (!imageViewer) {
      ;((viewer) => {
        let viewBool = viewer
        timerRef.current = setTimeout(() => {
          if (!viewBool) {
            changeSliderListIndex()
          }
        }, timer)
      })(isViewer)
    }
  }

  // 预览图片
  const previewImage = () => {
    return (
      <Modal
        visible={imageViewer}
        onDismiss={switchViewer}
        onRequestClose={switchViewer}
      >
        <View style={StyleSheet.absoluteFillObject}>
          {data.map((val, ind) => {
            const inputRange = [
              (ind - 1) * width,
              ind * width,
              (ind + 1) * width,
            ]
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            })
            return (
              <Animated.Image
                key={`image-${ind}`}
                // @ts-ignore
                source={localImg ? val.img : { uri: val.img }}
                style={[StyleSheet.absoluteFillObject, { opacity }]}
                blurRadius={blurRadius}
              />
            )
          })}
        </View>

        <Animated.FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          horizontal
          pagingEnabled
          initialScrollIndex={selectedIndex}
          pinchGestureEnabled={true}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500))
            wait.then(() => {
              // @ts-ignore
              slider.current?.scrollToIndex({
                index: info.index,
                animated: true,
              })
            })
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.previewImageContainerStyle,
                  previewImageContainerStyle,
                ]}
              >
                <Image
                  // @ts-ignore
                  source={localImg ? item.img : { uri: item.img }}
                  style={[styles.previewImageStyle, previewImageStyle]}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(index)
                    switchViewer()
                  }}
                  style={{
                    position: 'absolute',
                    top: Os == 'ios' ? 30 : 12,
                    left: 12,
                  }}
                >
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: 'white',
                    }}
                    source={icon_close_modal}
                  />
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </Modal>
    )
  }

  return (
    <View>
      {imageViewer && previewImage()}

      {/* 图片滚动区域 */}
      <Animated.FlatList
        ref={slider}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={selectedIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500))
          wait.then(() => {
            // flatList.current?.scrollToIndex({ index: info.index, animated: true });
          })
        }}
        // 当设置了此属性时，会让滚动视图滚动停止后，停止在snapToInterval的倍数的位置。这可以在一些子视图比滚动视图本身小的时候用于实现分页显示。需要与snapToAlignment组合使用
        snapToInterval={width}
        // 一个浮点数，用于决定当用户抬起手指之后，滚动视图减速停下的速度。你也可以设置为"normal"或者"fast"，
        // 'normal': iOS 上是 0.998，Android 上是 0.985（默认值）
        // 'fast': 0.99
        decelerationRate="fast"
        // 设置为 true 时，ScrollView 会允许用户使用双指缩放操作
        pinchGestureEnabled={true}
        // 获取可见元素的列表
        onViewableItemsChanged={onViewRef.current}
        // 配置 onViewableItemsChanged 可见范围和变化频率等参数
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item, index }) => {
          return (
            <View style={[caroselImageContainerStyle]}>
              <>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (!preview) {
                      onClick(item, index)
                    } else {
                      setSelectedIndex(index)
                      switchViewer()
                    }
                  }}
                >
                  <Image
                    // @ts-ignore
                    source={localImg ? item.img : { uri: item.img }}
                    style={[styles.caroselImageStyle, caroselImageStyle]}
                  />
                </TouchableOpacity>
                {children}
              </>
            </View>
          )
        }}
      />

      {/* 指示器 */}
      <View
        style={{
          width: '100%',
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor: 'red',
          bottom: 20,
        }}
      >
        {showIndicator && (
          <Indicator
            data={data}
            currenIndex={selectedIndex}
            indicatorContainerStyle={indicatorContainerStyle}
            activeIndicatorStyle={activeIndicatorStyle}
            inActiveIndicatorStyle={inActiveIndicatorStyle}
          />
        )}
      </View>
    </View>
  )
}
