import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import ColorContext from './ColorContext'

import { TouchableOpacity, StyleSheet, View } from 'react-native'

import CustomText from './CustomText'

function Navigation(props) {
  const [colors, setColors] = useState(useContext(ColorContext))

  let history = useHistory()

  let onClickInfo = () => {
    props.isVisibleCallback(!props.visible)
  }
  let onClickNew = () => {
    console.log('New Game')
    history.push('/')
  }

  let onClickScoreboard = () => {
    history.push('/scoreboard')
  }
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tab: {
      backgroundColor: colors.light,
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderColor: colors.purple,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    tabActive: {
      backgroundColor: colors.pink,
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderColor: colors.purple,
      borderWidth: 1,
      borderStyle: 'solid',
    },
  })

  return (
    <View style={styles.row}>
      <TouchableOpacity
        accessibilityLabel="Information about the app"
        style={props.visible ? styles.tabActive : styles.tab}
        onPress={onClickInfo}
      >
        <CustomText style={styles.textUppercase} content="?" />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="New Game"
        style={styles.tab}
        onPress={onClickNew}
      >
        <CustomText style={styles.textUppercase} content="New Game" />
      </TouchableOpacity>

      <TouchableOpacity
        accessibilityLabel="Link to Scoreboard"
        style={styles.tab}
        disabled={props.isGame}
        onPress={onClickScoreboard}
      >
        <CustomText style={styles.textUppercase} content="Scoreboard" />
      </TouchableOpacity>
    </View>
  )
}

export default Navigation
