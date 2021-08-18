import React, { useEffect, useState, useContext } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import CustomText from './CustomText'
import Section from './Section'

import ColorContext from './ColorContext'
import PlayerContext from './PlayerContext'

function AddPlayers(props) {
  const [colors, setColors] = useState(useContext(ColorContext))
  const [username, setUsername] = useState('')
  const { players, setPlayers } = useContext(PlayerContext)

  const styles = StyleSheet.create({
    h2: {
      fontSize: 20,
      color: colors.light,
      fontFamily: 'PoppinsSemiBold',
    },
    bold: {
      marginLeft: 20,
      paddingLeft: 10,
      fontSize: 20,
      color: colors.light,
      fontFamily: 'PoppinsBold',
    },
    label: {
      fontSize: 10,
      fontFamily: 'PoppinsLight',
      color: colors.light,
    },
    input: {
      backgroundColor: '#ffffff',
      borderRadius: 4,
      borderColor: colors.dark,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 10,
      marginRight: 20,
      flexBasis: '80%',
    },
    button: {
      minWidth: 38,
      height: 38,
      backgroundColor: colors.dark,
      borderColor: colors.light,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      alignItems: 'center',
    },
    player: {
      color: colors.pink,
      fontFamily: 'PoppinsSemiBold',
      fontSize: 16,
      marginLeft: 10,
      marginTop: 5,
    },
  })

  function addPlayers() {
    let id = username + '-' + new Date().getTime()

    let data = {
      id: id,
      name: username,
      answers: [],
      points: 0,
    }

    // Keep the old values and add new data.
    setPlayers((PlayerList) => [...PlayerList, data])

    // Clear username in input field.
    setUsername('')
  }

  function removePlayers(id) {
    // Copy players array but exclude the item that has a matching id.
    const newplayersArray = players.filter((player) => player.id !== id)

    // Update the player array.
    setPlayers(newplayersArray)
  }

  return (
    <Section style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <CustomText style={styles.h2} content="Players:" />
        <CustomText style={styles.bold} content={players && players.length} />
      </View>
      <View style={{ marginBottom: 20 }}>
        {players &&
          players.map((player, index) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              key={player.id}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <CustomText
                  key={index}
                  style={styles.player}
                  content={`${player.name}`}
                />
              </View>
              <TouchableOpacity
                accessibilityLabel="Remove player"
                style={styles.button}
                onPress={() => removePlayers(player.id)}
              >
                <CustomText
                  content="-"
                  style={{
                    fontFamily: 'SigmarOne',
                    fontSize: 28,
                    color: colors.light,
                    marginTop: -7,
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <CustomText style={styles.label} content="Add Player" />
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(username) => setUsername(username)}
          placeholder="Enter Player name..."
          placeholderTextColor={colors.pink}
        />
        <TouchableOpacity
          accessibilityLabel="Add Players"
          disabled={username === '' ? true : false}
          style={styles.button}
          onPress={addPlayers}
        >
          <CustomText
            content="+"
            style={{
              fontFamily: 'SigmarOne',
              fontSize: 28,
              color: colors.light,
              marginTop: -7,
            }}
          />
        </TouchableOpacity>
      </View>
    </Section>
  )
}

export default AddPlayers
