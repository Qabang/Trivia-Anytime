import React, { useEffect, useState } from 'react'
import { NativeRouter, Route, Link } from 'react-router-native'

import { StatusBar } from 'expo-status-bar'

import {
  StyleSheet,
  LayoutAnimation,
  SafeAreaView,
  Platform,
  UIManager,
} from 'react-native'

import PlayerContext from './PlayerContext'
import ColorContext from './ColorContext'
import CustomText from './CustomText'
import Scoreboard from './Scoreboard'
import Start from './Start'
import Info from './Info'
import Navigation from './Navigation'
import GameView from './GameView'

const MAIN_COLORS = {
  dark: '#1A1423',
  blue: '#372549',
  purple: '#774C60',
  pink: '#B75D69',
  light: '#EACDC2',
}

// For animation to work on android we have to change the UIManager value.
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [players, setPlayers] = useState([])

  let handleIsVisible = (data) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    setIsVisible(data)
  }

  const styles = StyleSheet.create({
    borderContainer: {
      borderStyle: 'solid',
      borderColor: MAIN_COLORS.light,
      borderWidth: 1,
      padding: 20,
      borderRadius: 4,
    },
    container: {
      flex: 1,
      height: 100,
      backgroundColor: MAIN_COLORS.blue,
      color: MAIN_COLORS.light,
    },
    contentContainer: {
      flex: 1,
      padding: 20,
      maxWidth: '100%',
    },
    header: {
      backgroundColor: MAIN_COLORS.dark,
      width: '100%',
      alignSelf: 'stretch',
    },

    text: {
      color: MAIN_COLORS.light,
    },
    textUppercase: {
      textTransform: 'uppercase',
      fontFamily: 'PoppinsMedium',
      color: MAIN_COLORS.dark,
    },
    droidSafeArea: {
      backgroundColor: MAIN_COLORS.dark,
      paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
  })

  return (
    <ColorContext.Provider value={MAIN_COLORS}>
      <PlayerContext.Provider value={{ players, setPlayers }}>
        <NativeRouter>
          <SafeAreaView style={styles.droidSafeArea}>
            <StatusBar translucent={true} style="light" />
          </SafeAreaView>
          <SafeAreaView
            nestedScrollEnabled={true}
            style={styles.container}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SafeAreaView style={styles.header}>
              <CustomText
                style={{
                  alignSelf: 'center',
                  color: MAIN_COLORS.pink,
                  fontFamily: 'SigmarOne',
                  fontSize: 28,
                  paddingBottom: 10,
                  textShadowColor: MAIN_COLORS.light,
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 1,
                }}
                content="Trivia Anytime"
              />
            </SafeAreaView>
            <Navigation
              isVisibleCallback={handleIsVisible}
              visible={isVisible}
            />
            {isVisible && <Info />}
            <Route exact path="/" component={() => <Start />} />
            <Route
              path="/scoreboard"
              component={() => <Scoreboard players={players} />}
            />
            <Route path="/game" component={() => <GameView />} />
          </SafeAreaView>
        </NativeRouter>
      </PlayerContext.Provider>
    </ColorContext.Provider>
  )
}
