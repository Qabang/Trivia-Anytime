import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { decode } from 'html-entities'
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import * as Progress from 'react-native-progress'

import CustomText from './CustomText'
import ColorContext from './ColorContext'
import PlayerAnswers from './PlayerAnswers'
import PlayerContext from './PlayerContext'

const axios = require('axios')
const API_URL = 'https://opentdb.com/api.php?'
const shuffle = require('shuffle-array')

function GameView() {
  const location = useLocation()
  let history = useHistory()

  // Get url params.
  const query = location.state.query
  const type = location.state.type

  const [colors, setColors] = useState(useContext(ColorContext))
  const [questions, setQuestions] = useState(null)
  const [answers, setAnswers] = useState([])
  const [questionNumber, setQuestionNumber] = useState(-1)
  const [toggleSpinner, setToggleSpinner] = useState(true)
  const [players, setPlayers] = useState(useContext(PlayerContext))

  useEffect(() => {
    // To prevent memory leaks we set mounted to true while running async function.
    let componentMounted = true

    // Only get new questions if there is none.
    if (questions === null) {
      axios.get(API_URL + query).then((res) => {
        if (componentMounted) {
          setQuestions(res.data)
        }
      })
    }
    if (componentMounted) updateQuestion()

    // When we are done we need to clear the useEffect to prevent memory leaking. therefore we set the mounted component to false.
    return () => {
      componentMounted = false
    }
  }, [questions])

  function updateQuestion() {
    // Check if we have questions.
    if (questions === null) {
      // Bail if there is no questions.
      return
    }

    let nr = questionNumber + 1
    setQuestionNumber(nr)

    // update question answers.
    let ans = []

    // We have a questions Array now we need to prep the current questions answers.
    let item = questions.results[nr]

    // Handle answers depending on gametype.
    if (type === 'multiple') {
      // We need to shuffle answers.
      ans = item.incorrect_answers
      ans.push(item.correct_answer)
      ans = shuffle(ans)
    } else {
      // We only need true or false answers.
      ans = ['true', 'false']
    }
    setAnswers(ans)
    setToggleSpinner(false)
  }

  const ListLetters = ['A', 'B', 'C', 'D']

  function handlePlayerAnswer(data) {
    let current_player = players.players.filter(
      (player) => player.id === data.player
    )

    let players_array = []
    players.players.map((player) => {
      if (player.id !== data.player) {
        players_array.push(player)
      }
    })

    // IF we got a player push the answer to the answer array and update players array.
    if (current_player.length > 0) {
      current_player[0].answers.push(data.answer[0])
      players_array.push(current_player[0])
      setPlayers({ players: players_array })
    }
  }

  function onTouchNextQuestion() {
    if (questions.results.length - 1 > questionNumber) {
      updateQuestion()
    } else {
      // Validate
      console.log('END OF GAME')
      let current_players = players.players

      current_players.forEach((player) => {
        if (player.answers.length > 0) {
          let index = 0
          player.answers.map((ans) => {
            if (ans.value === questions.results[index].correct_answer) {
              player.points += 1
            }
            if (index < questions.results.length - 1) {
              index++
            }
          })
        }
      })

      setPlayers(current_players)
      setQuestions(null)
      setAnswers([])
      setQuestionNumber(-1)
      history.push('/scoreboard')
    }
  }

  const styles = StyleSheet.create({
    h2: {
      fontSize: 20,
      color: colors.light,
      fontFamily: 'PoppinsSemiBold',
    },
    question: {
      backgroundColor: colors.dark,
      paddingTop: 10,
      paddingBottom: 10,
      paddingHorizontal: 15,
      marginBottom: 40,
      marginHorizontal: 20,
    },
    label: {
      color: colors.light,
      textAlign: 'center',
      width: 43,
      alignSelf: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: colors.pink,
      borderColor: colors.light,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      marginHorizontal: 20,
      marginBottom: 30,
      shadowOffset: {
        width: 0,
        height: 4,
      },
    },
    labelsAns: {
      flexDirection: 'row',
      marginBottom: 20,
      paddingRight: answers.length < 3 ? 16 : 0,
    },
  })

  const listHeader = () => {
    return (
      <>
        <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
          <CustomText style={styles.h2} content={`Player Answers`} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <View style={styles.labelsAns}>
              <CustomText style={styles.label} content={'A'} />
              <CustomText style={styles.label} content={'B'} />
              {answers.length > 2 && (
                <>
                  <CustomText style={styles.label} content={'C'} />
                  <CustomText style={styles.label} content={'D'} />
                </>
              )}
            </View>
          </View>
        </View>
      </>
    )
  }

  const listHeaderQuestion = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
            marginTop: 20,
            padding: 15,
          }}
        >
          <CustomText
            style={styles.h2}
            content={`Question ${questionNumber + 1} of ${
              questions.results.length
            }`}
          />
          <TouchableOpacity
            accessibilityLabel="Quit the trivia game"
            style={{
              borderColor: colors.light,
              borderStyle: 'solid',
              borderWidth: 1,
              padding: 3,
              width: 40,
              height: 40,
              borderRadius: 5,
            }}
            onPress={() => {
              return Alert.alert(
                'This action will end this round!',
                'Do you want to end the game? (No points will be saved)',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      setQuestions(null)
                      history.push('/')
                    },
                  },
                ]
              )
            }}
          >
            <CustomText
              content="X"
              style={{
                fontFamily: 'SigmarOne',
                fontSize: 20,
                color: '#fff',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        {questions && (
          <View style={styles.question}>
            <CustomText
              style={{
                color: colors.light,
                fontFamily: 'PoppinsSemiBold',
                fontSize: 16,
              }}
              content={
                questions.results[questionNumber].question
                  ? decode(questions.results[questionNumber].question)
                  : 'null'
              }
            />
          </View>
        )}
      </>
    )
  }

  const listFooter = () => {
    return (
      <>
        <TouchableOpacity
          accessibilityLabel="Get the next question"
          style={styles.button}
          onPress={onTouchNextQuestion}
        >
          <CustomText
            content="Next!"
            style={{ fontFamily: 'SigmarOne', fontSize: 20, color: '#fff' }}
          />
        </TouchableOpacity>
      </>
    )
  }

  const listQuestionTop = () => {
    return (
      <>
        <FlatList
          ListHeaderComponent={listHeaderQuestion}
          ListFooterComponent={listHeader}
          scrollEnabled={true}
          data={answers}
          renderItem={({ item, index, separators }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                  marginHorizontal: 20,
                  // padding: 10,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderColor: colors.dark,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    paddingLeft: 5,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    borderRadius: 4,
                  }}
                >
                  <CustomText
                    content={ListLetters[index]}
                    style={{
                      fontFamily: 'SigmarOne',
                      fontSize: 20,
                      color: colors.pink,
                    }}
                  />
                </View>
                <CustomText
                  content={decode(item)}
                  style={{
                    fontFamily: 'PoppinsMedium',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginLeft: 10,
                    color: colors.light,
                  }}
                />
              </View>
            )
          }}
          keyExtractor={(item) => item}
        />
      </>
    )
  }
  return (
    <>
      {toggleSpinner && (
        <View
          style={{
            width: '100%',
            height: 40,
            flex: 0,
            marginTop: 50,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Progress.CircleSnail
              color={[colors.pink, colors.purple, colors.dark, colors.light]}
              animating={true}
            />
          </View>
        </View>
      )}
      {players.players && questionNumber != -1 && questions != null && (
        <FlatList
          style={{
            borderColor: colors.light,
            borderRadius: 4,
            borderWidth: 1,
            margin: 15,
          }}
          ListHeaderComponent={listQuestionTop}
          ListFooterComponent={listFooter}
          scrollEnabled={true}
          data={players.players.sort((a, b) => a.name > b.name)}
          renderItem={({ item, index, separators }) => {
            return (
              <PlayerAnswers
                player={item}
                answers={answers}
                playerAnswersCallback={handlePlayerAnswer}
              />
            )
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  )
}

export default GameView
