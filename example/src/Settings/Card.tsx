import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export type CardProps = {
  title: React.ReactNode
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
})

export const Card: React.FC<CardProps> = (props) => {
  const { title, children } = props

  return (
    <View>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  )
}
