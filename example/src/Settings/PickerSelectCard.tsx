import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { Card, CardProps } from './Card'

interface PickerItem<T> {
  label: string
  value: T
}

interface PickerSelectCardProps<T> extends CardProps {
  items: PickerItem<T>[]
  value: T
  onValueChange: (value: T) => void
  testID?: string
}

export const PickerSelectCard = <T,>({ title, testID, items, value, onValueChange }: PickerSelectCardProps<T>) => {
  const [modalVisible, setModalVisible] = React.useState(false)

  const selectedLabel = items.find((item) => item.value === value)?.label || 'Select an option'

  return (
    <Card testID={testID} title={title}>
      <TouchableOpacity testID="gph-card_picker" style={styles.pickerButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.pickerText}>{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item.value)
                    setModalVisible(false)
                  }}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </Card>
  )
}

const styles = StyleSheet.create({
  pickerButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    maxHeight: 400,
    paddingVertical: 12,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
})
