import React, { useState, useContext } from 'react'
import { View } from 'react-native'
import ColorContext from './ColorContext'
function Section(props) {
  const [colors, setColors] = useState(useContext(ColorContext))

  return (
    <View
      style={{
        borderColor: colors.light,
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 4,
        padding: 20,
        height: 'auto',
        flexBasis: 'auto',
        width: '100%',
      }}
    >
      {props.children}
    </View>
  )
}

export default Section
