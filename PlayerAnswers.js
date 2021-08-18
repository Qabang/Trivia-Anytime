import CustomText from './CustomText'
import ColorContext from './ColorContext'

import React, { useState, useContext, useEffect } from 'react'
import { View } from 'react-native'

import RadioGroup from 'react-native-radio-buttons-group'

function PlayerAnswers(props) {
  const [colors, setColors] = useState(useContext(ColorContext))
  const [radioButtons, setRadioButtons] = useState([])
  const [player, setPlayer] = useState(props.player)

  useEffect(() => {
    if (props.answers.length > 2) {
      setRadioButtons([
        {
          id: '0', // acts as primary key, should be unique and non-empty string
          value: props.answers[0],
          selected: false,
          selected: true,
          color: '#EACDC2',
          borderColor: '#774C60',
          labelStyle: { color: '#EACDC2' },
        },
        {
          id: '1',
          value: props.answers[1],
          selected: false,
          color: '#EACDC2',
          borderColor: '#774C60',
          labelStyle: { color: '#EACDC2' },
        },
        {
          id: '2',
          value: props.answers[2],
          selected: false,
          color: '#EACDC2',
          borderColor: '#774C60',
          labelStyle: { color: '#EACDC2' },
        },
        {
          id: '3',
          value: props.answers[3],
          selected: false,
          color: '#EACDC2',
          borderColor: '#774C60',
          labelStyle: { color: '#EACDC2' },
        },
      ])
    } else {
      setRadioButtons([
        {
          id: 'true', // acts as primary key, should be unique and non-empty string
          value: 'True',
          selected: false,
          color: '#EACDC2',
          borderColor: '#774C60',
          labelStyle: { color: '#EACDC2' },
        },
        {
          id: 'false', // acts as primary key, should be unique and non-empty string
          value: 'False',
          selected: false,
          color: '#EACDC2',
          borderColor: '#774C60',
          labelStyle: { color: '#EACDC2' },
        },
      ])
    }
  }, [props.answers])

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray)

    props.playerAnswersCallback({
      player: player.id,
      answer: radioButtonsArray.filter((button) => button.selected === true),
    })
  }
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: -7,
          marginBottom: 10,
          paddingLeft: 15,
        }}
      >
        <CustomText
          content={player.name}
          style={{
            fontFamily: 'PoppinsMedium',
            fontSize: 14,
            alignSelf: 'center',
            marginLeft: 10,
            color: colors.light,
            width: '100%',
            maxWidth: '45%',
            flex: 1,
          }}
        />
        <View
          style={{
            maxWidth: props.answers.length > 2 ? '55%' : '40%',
            width: '100%',
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          {radioButtons && (
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              layout="row"
            />
          )}
        </View>
      </View>
    </>
  )
}

export default PlayerAnswers
