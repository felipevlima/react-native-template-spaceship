import React, { useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet
} from 'react-native'

import { StatusBar } from 'expo-status-bar'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withDelay,
  withTiming
} from 'react-native-reanimated'

import { RFValue } from 'react-native-responsive-fontsize'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import LogoSvg from '@assets/logo.svg'
import GithubSvg from '@assets/github.svg'

import { theme } from '@styles/theme'

export default function App() {
  const positionY = useSharedValue(0)

  const FINAL_POSITION = Platform.OS === 'ios' ? -500 : -400

  const positionAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(positionY.value, [0, FINAL_POSITION], [1, 0.6])
        },
        {
          translateY: positionY.value
        }
      ]
    }
  })

  const opacityAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(positionY.value, [0, FINAL_POSITION], [0, 1])
    }
  })

  useEffect(() => {
    positionY.value = withDelay(
      600,
      withTiming(FINAL_POSITION, {
        duration: 800
      })
    )
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Animated.View style={[positionAnimationStyle, { position: 'absolute' }]}>
        <LogoSvg />
      </Animated.View>

      <Animated.View style={[styles.content, opacityAnimationStyle]}>
        <Text style={styles.heading}>Spaceship</Text>
        <Text style={styles.body}>Shaping the ship that will impose you.</Text>
      </Animated.View>

      <TouchableOpacity
        style={styles.footer}
        activeOpacity={0.5}
        onPress={() => Linking.openURL('https://github.com/lucasaugustscode')}
      >
        <GithubSvg />
        <Text style={styles.creator}>/lucasaugustscode</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.COLORS.background
  },
  heading: {
    fontSize: RFValue(36),
    fontWeight: '700',
    color: theme.COLORS.heading,

    marginBottom: 10
  },
  body: {
    fontSize: RFValue(16),
    fontWeight: '400',
    color: theme.COLORS.body
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',

    position: 'absolute',
    bottom: getBottomSpace() + 22
  },
  creator: {
    fontSize: RFValue(16),
    fontWeight: '400',
    color: theme.COLORS.shape,

    marginLeft: 8
  }
})
