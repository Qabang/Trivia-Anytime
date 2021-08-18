import { FlatList, Text, View, StyleSheet } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import CustomText from './CustomText'
import ColorContext from './ColorContext'
import PlayerContext from './PlayerContext'

function Scoreboard(props) {
  const [players, setPlayers] = useState(useContext(PlayerContext))
  const [playersOrder, setPlayersOrder] = useState(
    players.players.sort((a, b) => a.points < b.points)
  )
  const [colors, setColors] = useState(useContext(ColorContext))

  useEffect(() => {
    setPlayersOrder(players.players.sort((a, b) => a.points < b.points))
  }, [players])

  const styles = StyleSheet.create({
    h2: {
      fontSize: 20,
      color: colors.light,
      fontFamily: 'PoppinsSemiBold',
      marginVertical: 20,
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      color: colors.light,
      fontFamily: 'PoppinsSemiBold',
      marginVertical: 20,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  })
  const listHeader = () => {
    return (
      <>
        <CustomText
          content="Points"
          style={{
            alignSelf: 'flex-end',
            fontFamily: 'PoppinsSemiBold',
            fontSize: 12,
            color: colors.light,
          }}
        />
      </>
    )
  }
  let Placing = (data) => {
    let index = data.index
    let viewColor = data.defaultColor
    let textColor = colors.light

    switch (index + 1) {
      case 1:
        viewColor = 'gold'
        textColor = colors.dark

        break
      case 2:
        viewColor = 'silver'
        textColor = colors.dark

        break
      case 3:
        viewColor = '#a78928'
        textColor = colors.dark

        break

      default:
        viewColor = data.defaultColor
        break
    }
    return (
      <View
        style={{
          backgroundColor: viewColor,
          borderRadius: 4,
          width: 40,
          height: 40,
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <CustomText
          content={index + 1}
          style={{
            color: textColor,
            paddingVertical: 5,
            alignSelf: 'center',
            fontFamily: 'PoppinsSemiBold',
            fontSize: 16,
          }}
        />
      </View>
    )
  }

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: colors.light,
        height: 0.5,
      }}
    />
  )

  return (
    <>
      <CustomText
        content="🎉 Scoreboard 🏆"
        style={({ margin: 5, textAlign: 'center' }, styles.h2)}
      />
      {players.players.length === 0 && (
        <Text style={({ margin: 5, textAlign: 'center' }, styles.text)}>
          🔎
          {'\n'}
          Sorry! {'\n'}
          We can't seem to find any players...
        </Text>
      )}
      {players.players.length > 0 && (
        <FlatList
          style={{
            borderColor: colors.light,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: 20,
            borderRadius: 4,
            minWidth: '75%',
            marginHorizontal: 20,
            height: 'auto',
            flexGrow: 0,
          }}
          ListHeaderComponent={listHeader}
          scrollEnabled={false}
          data={playersOrder}
          ItemSeparatorComponent={renderSeparator}
          renderItem={({ item, index, separators }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <Placing index={index} defaultColor={colors.dark} />
                <CustomText
                  content={item.name}
                  style={{
                    alignSelf: 'center',
                    color: colors.pink,
                    fontFamily: 'PoppinsSemiBold',
                    fontSize: 16,
                    maxWidth: '70%',
                  }}
                />
                <CustomText
                  content={item.points}
                  style={{
                    alignSelf: 'center',
                    marginLeft: 'auto',
                    color: colors.light,
                    fontFamily: 'PoppinsSemiBold',
                    fontSize: 16,
                  }}
                />
              </View>
            )
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  )
}

export default Scoreboard
