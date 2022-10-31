import React from 'react'
import { StyleSheet } from 'react-native'
import PickerSelect, { PickerSelectProps } from 'react-native-picker-select'

import { Card, CardProps } from './Card'

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
})

export const PickerSelectCard: React.FC<CardProps & PickerSelectProps> = (props) => {
  const { pickerProps, textInputProps, testID, title, ...other } = props

  return (
    <Card testID={testID} title={title}>
      <PickerSelect
        pickerProps={{ testID: 'gph-card_picker', ...pickerProps }}
        style={pickerSelectStyles}
        textInputProps={{ testID: 'gph-card_text-input', ...textInputProps }}
        {...other}
      />
    </Card>
  )
}
