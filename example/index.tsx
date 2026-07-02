import React from 'react'
import { AppRegistry } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import App from './src/App'
import { name as appName } from './app.json'

function Main() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
