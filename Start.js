import React, { useContext, useEffect, useState } from 'react'

import { ScrollView } from 'react-native'
import AddPlayers from './AddPlayers'
import QuestionAlternatives from './QuestionsAlternatives'

import PlayerContext from './PlayerContext'

import { useHistory } from 'react-router-dom'

function Start() {
  let history = useHistory()

  const [query, setQuery] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    // When there is no query do nothing.
    if (!query) {
      return
    }

    history.push('/game', { query: query, type: type })
  }, [query])

  let handleQuestionsCallback = (data) => {
    let queryString = `amount=${data.amount}&category=${data.category.id}&difficulty=${data.level}&type=${data.type[0].id}`
    setQuery(queryString)
    setType(data.type[0].id)
    console.log('Game starts!')
  }

  return (
    <>
      <ScrollView style={{ flex: 1, padding: 20, maxWidth: '100%' }}>
        <AddPlayers />
        <QuestionAlternatives questionsCallback={handleQuestionsCallback} />
      </ScrollView>
    </>
  )
}

export default Start
