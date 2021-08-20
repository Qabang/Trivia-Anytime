import React, { useEffect, useState } from 'react'

import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import ModalSelector from 'react-native-modal-selector'
import RadioGroup from 'react-native-radio-buttons-group'

import { useContext } from 'react'
import CustomText from './CustomText'
import Section from './Section'

import ColorContext from './ColorContext'
import PlayerContext from './PlayerContext'

const axios = require('axios')

const radioButtonsData = [
  {
    id: 'boolean', // acts as primary key, should be unique and non-empty string
    label: 'True / False',
    value: 'boolean',
    selected: true,
    color: '#EACDC2',
    borderColor: '#774C60',
    labelStyle: { color: '#EACDC2' },
  },
  {
    id: 'multiple',
    label: 'Multiple Choice',
    value: 'multiple',
    color: '#EACDC2',
    borderColor: '#774C60',
    labelStyle: { color: '#EACDC2' },
  },
]

function QuestionAlternatives(props) {
  const [players, setPlayers] = useState(useContext(PlayerContext))
  const [colors, setColors] = useState(useContext(ColorContext))
  const [difficulty, setDifficulty] = useState('Mixed')
  const [amount, setAmount] = useState('10')
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray)
  }

  const levels = [
    {
      key: 'mixed',
      label: 'Mixed',
      accessibilityLabel:
        'Tap here for questions that ranges from easy to hard',
    },
    {
      key: 'easy',
      label: 'Easy',
      accessibilityLabel: 'Tap here for Easy questions',
    },
    {
      key: 'medium',
      label: 'Medium',
      accessibilityLabel: 'Tap here for Medium hard questions',
    },
    {
      key: 'hard',
      label: 'Hard',
      accessibilityLabel: 'Tap here for Hard questions',
    },
  ]

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      let cat = []
      let data = res.data

      data.trivia_categories.map((element) => {
        cat.push({
          label: element.name,
          key: element.id,
        })
      })
      cat.unshift({ label: 'Random', key: 'random' })
      setCategories(cat)
    })
  }, [])

  function onClickStartGame() {
    let tmp_players = players.players
    // Before we begin we want to reset every players score to 0.
    for (let i = 0; i < tmp_players.length; i++) {
      const player = tmp_players[i]
      player.points = 0
      player.answers = []
    }

    let tmpPlayersObj = { players: tmp_players }

    setPlayers(tmpPlayersObj)

    props.questionsCallback({
      level: difficulty === 'Mixed' ? '' : difficulty.toLowerCase(),
      type: radioButtons.filter((button) => button.selected === true),
      amount: amount,
      category: {
        name: category,
        id: categoryId === 'random' ? '' : categoryId,
      },
    })
  }

  const styles = StyleSheet.create({
    buttonDisabled: {
      alignItems: 'center',
      backgroundColor: colors.pink,
      borderColor: colors.light,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      opacity: 0.4,
    },
    button: {
      marginBottom: 50,
      alignItems: 'center',
      backgroundColor: colors.pink,
      borderColor: colors.light,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    h2: {
      fontSize: 20,
      color: colors.light,
      fontFamily: 'PoppinsSemiBold',
      marginBottom: 20,
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
      flexBasis: '100%',
    },
  })

  return (
    <>
      <Section>
        <CustomText style={styles.h2} content="Question Alternatives" />

        <View style={{ marginBottom: 20 }}>
          <CustomText style={styles.label} content="Type of questions" />
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            style={{ color: colors.light }}
            color={colors.light}
            layout="row"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
            width: '100%',
            marginBottom: 20,
          }}
        >
          <View style={{ flexBasis: '50%' }}>
            <CustomText style={styles.label} content="Choose Difficulty" />
            <ModalSelector
              data={levels}
              initValue="Choose Difficulty"
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => {
                setDifficulty(option.label)
              }}
            >
              <TextInput
                style={styles.input}
                editable={false}
                placeholder="Choose Difficulty"
                value={difficulty}
              />
            </ModalSelector>
          </View>
          <View style={{ flexBasis: '50%' }}>
            <CustomText style={styles.label} content="Number of Questions:" />
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={(amount) => setAmount(amount)}
              placeholder="Enter number of questions"
              placeholderTextColor={colors.pink}
              keyboardType="numeric"
            />
          </View>
        </View>
        {categories && (
          <View>
            <CustomText style={styles.label} content="Choose Category" />
            <ModalSelector
              data={categories}
              initValue="Choose Category"
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => {
                setCategoryId(option.key)
                setCategory(option.label)
              }}
            >
              <TextInput
                style={styles.input}
                editable={false}
                placeholder="Choose Category"
                value={category}
              />
            </ModalSelector>
          </View>
        )}
      </Section>
      <TouchableOpacity
        accessibilityLabel="Start the trivia game"
        style={
          players.players.length < 1 ? styles.buttonDisabled : styles.button
        }
        onPress={onClickStartGame}
        disabled={players.players.length < 1 ? true : false}
      >
        <CustomText
          content="Let the Game begin!"
          style={{
            fontFamily: 'SigmarOne',
            fontSize: 20,
            color: '#fff',
          }}
        />
      </TouchableOpacity>
    </>
  )
}

export default QuestionAlternatives
