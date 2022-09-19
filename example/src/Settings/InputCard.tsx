import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { Card, CardProps } from './Card'

const textInputCardStyles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
})

export const TextInputCard: React.FC<TextInputProps & CardProps> = (props) => {
  const { title, ...other } = props

  return (
    <Card title={title}>
      <TextInput style={textInputCardStyles.textInput} {...other} />
    </Card>
  )
}

type NumberFieldCardProps = Omit<TextInputProps, 'value'> &
  CardProps & {
    value: number
    onNumberChange: (value: number) => void
  }

export const NumberInputCard: React.FC<NumberFieldCardProps> = (props) => {
  const { title, value: valueProp, onNumberChange, ...other } = props
  const [value, setValue] = useState<string>(`${valueProp}`)

  useEffect(
    () => {
      if (Number.isFinite(+value)) {
        onNumberChange(+value)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )

  return (
    <TextInputCard
      title={title}
      keyboardType="numeric"
      {...other}
      value={value}
      onChangeText={setValue}
    />
  )
}
