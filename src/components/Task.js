import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../commomStyles'

export default props => {
  const doneOrNotStyle =
    props.doneAt != null ? { textDecorationLine: 'line-through' } : {}

  const date = props.doneAt ? props.doneAt : props.estimateAt
  const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

  return (
    <View style={styles.container}>
      <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{formattedDate + ''}</Text>
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
  desc: {
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.subText,
  },
})
