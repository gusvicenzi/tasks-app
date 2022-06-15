import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default props => {
  return (
    <View style={styles.container}>
      <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
      <View>
        <Text>{props.desc}</Text>
        <Text>{props.estimateAt + ''}</Text>
      </View>
    </View>
  )
}

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <FontAwesomeIcon
          name="check"
          color="#FFF"
          size={20}
        />
      </View>
    )
  } else {
    return <View style={styles.pending}></View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#AAA',
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
