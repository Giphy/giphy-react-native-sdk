import React from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  ModalProps,
  ScrollView,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    flexDirection: 'column',
    paddingTop: getStatusBarHeight() ?? 0,
  },
  content: {
    flex: 1,
    overflow: 'scroll',
    marginBottom: 0,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 16,
    marginHorizontal: 32,
    marginVertical: 16,
    padding: 10,
  },
  buttonTextClose: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export const Dialog: React.FC<ModalProps> = (props) => {
  const { children, onRequestClose, ...other } = props

  return (
    <Modal onRequestClose={onRequestClose} {...other}>
      <View style={styles.container}>
        <ScrollView style={styles.content} testID="gph-dialog-content">
          {children}
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => (onRequestClose ? onRequestClose() : undefined)}
        >
          <Text style={styles.buttonTextClose} testID="gph-close-dialog">
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
