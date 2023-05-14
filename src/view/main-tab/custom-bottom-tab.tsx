import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import icon_tab_publish from '@/assets/icon_tab_publish.png'
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker'
import { ScrollView } from 'react-native-gesture-handler'

const CustomBottomTab = (bottomTabProps: BottomTabBarProps) => {
  const { state, descriptors, navigation } = bottomTabProps
  const { routes, index } = state

  const onPublishPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      (res: ImagePickerResponse) => {
        const { assets } = res

        if (assets?.length) {
          const { uri, width, height, fileName, fileSize, type } = assets?.[0]
          console.log(uri, width, height, fileName, fileSize, type)
        }
      },
    )
  }

  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route, i: number) => {
        const { options } = descriptors[route.key]
        const label = options.title
        const isFocused = index === i

        if (options.title === '发布' || i === 2) {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={label}
              activeOpacity={1}
              onPress={onPublishPress}
            >
              <Image
                style={styles.iconTabPublish}
                source={icon_tab_publish}
              ></Image>
            </TouchableOpacity>
          )
        } else {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={label}
              activeOpacity={1}
              onPress={() => navigation.navigate(route.name)}
            >
              <Text
                style={{
                  fontSize: isFocused ? 18 : 16,
                  color: isFocused ? '#333' : '#999',
                  fontWeight: isFocused ? 'bold' : 'normal',
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )
        }
      })}
    </View>
  )
}

export default CustomBottomTab

const styles = StyleSheet.create({
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTabPublish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
})
