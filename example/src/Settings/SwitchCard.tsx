import React from 'react'
import { View, Switch, StyleSheet, Text, SwitchProps } from 'react-native'

import { Card, CardProps } from './Card'

const switchCardFieldStyles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  switchText: {
    marginLeft: 8,
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
})

type SwitchCardFieldProps = SwitchProps & {
  selectedLabel?: React.ReactNode
  unselectedLabel?: React.ReactNode
}

export const SwitchCardField: React.FC<SwitchCardFieldProps> = (props) => {
  const {
    value,
    selectedLabel = 'Enabled',
    unselectedLabel = 'Disabled',
    ...other
  } = props

  return (
    <View style={switchCardFieldStyles.switchContainer}>
      <Switch value={value} {...other} />
      <Text style={switchCardFieldStyles.switchText}>
        {value ? selectedLabel : unselectedLabel}
      </Text>
    </View>
  )
}

export const SwitchCard: React.FC<SwitchCardFieldProps & CardProps> = (
  props
) => {
  const { title, ...other } = props

  return (
    <Card title={title}>
      <SwitchCardField {...other} />
    </Card>
  )
}
