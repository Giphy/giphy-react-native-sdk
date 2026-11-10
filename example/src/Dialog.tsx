import React from 'react'
import { Modal, ModalProps, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    flexDirection: 'column',
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
      {/* A modal is a separate native view tree, so it needs its own provider to get safe area insets. */}
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.content} testID="gph-dialog-content">
            {children}
          </ScrollView>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={(e) => (onRequestClose ? onRequestClose(e) : undefined)}
          >
            <Text style={styles.buttonTextClose} testID="gph-close-dialog">
              Close
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  )
}
