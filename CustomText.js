import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import * as Font from 'expo-font'

function CustomText(props) {
  // use state for font status.
  const [isFontReady, setFontReady] = useState(false)
  let font = props.font

  if (!font) {
    font = 'PoppinsMedium'
  }

  // Get custom font.
  useEffect(() => {
    async function loadFont() {
      return await Font.loadAsync({
        SigmarOne: require('./assets/fonts/SigmarOne-Regular.ttf'),
        PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
        PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
        PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
        PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
      })
    }

    // After the loading set the font status to true.
    loadFont().then(() => {
      setFontReady(true)
    })
  }, [])

  return <>{isFontReady && <Text style={props.style}>{props.content}</Text>}</>
}

export default CustomText
