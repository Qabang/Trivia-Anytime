import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, DynamicColorIOS, Platform } from 'react-native'
import ColorContext from './ColorContext'
import CustomText from './CustomText'

function Info() {
  const [colors, setColors] = useState(useContext(ColorContext))

  let IOScolorSettingsBgr = ''
  let IOScolorSettingsText = ''

  if (Platform.OS === 'ios') {
    IOScolorSettingsBgr = DynamicColorIOS({
      dark: colors.dark,
      light: colors.pink,
    })

    IOScolorSettingsText = DynamicColorIOS({
      dark: colors.light,
      light: colors.dark,
    })
  }

  const styles = StyleSheet.create({
    h2: {
      fontSize: 20,
      color: colors.light,
      fontFamily: 'PoppinsSemiBold',
    },
    box: {
      borderColor: colors.light,
      position: 'absolute',
      top: 100,
      borderStyle: 'solid',
      borderWidth: 1,
      marginBottom: 20,
      borderRadius: 4,
      padding: 20,
      height: 'auto',
      flexBasis: 'auto',
      backgroundColor: IOScolorSettingsBgr ? IOScolorSettingsBgr : colors.pink,
      zIndex: 10,
    },
    text: {
      flexBasis: 100,
      color: IOScolorSettingsText ? IOScolorSettingsText : colors.dark,
    },
  })
  return (
    <View style={styles.box}>
      <View>
        <CustomText style={styles.h2} content="Trivia Anytime" />
        <View style={{ padding: 10 }}>
          <Text style={{ flexBasis: 100 }}>
            Play and have fun by yourself or with your friends.
          </Text>
          <Text style={{ flexBasis: 100, marginVertical: 10 }}>
            The app is an "offline"* Trivia game where you can play alone or
            with your friends (on the same device)
          </Text>
        </View>
      </View>
      <View>
        <CustomText style={styles.h2} content="About" />
        <View style={{ padding: 10 }}>
          <Text style={{ flexBasis: 100, marginVertical: 10 }}>
            The app uses the Open Trivia API to generate the questions for the
            game. If there are any errors in the questions, report it to
            "https://opentdb.com/"
          </Text>
          <Text style={{ flexBasis: 100, fontStyle: 'italic' }}>
            * The app requires a network connection to be able to retrieve the
            data from the server.
          </Text>
        </View>
      </View>
      <View>
        <CustomText style={styles.h2} content="FAQ" />
        <View style={{ padding: 10 }}>
          <Text>Nothing here yet...</Text>
        </View>
      </View>
    </View>
  )
}

export default Info
