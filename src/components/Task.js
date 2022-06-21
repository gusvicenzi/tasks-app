import { ListItem } from '@rneui/base'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../commomStyles'

export default props => {
  const doneOrNotStyle =
    props.doneAt != null ? { textDecorationLine: 'line-through' } : {}

  const date = props.doneAt ? props.doneAt : props.estimateAt
  const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

  const getRightContent = () => {
    return (
      <TouchableOpacity
        style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.id)}>
        <FontAwesomeIcon
          name="trash-alt"
          size={30}
          color="#FFF"
          solid
        />
      </TouchableOpacity>
    )
  }
  return (
    <ListItem.Swipeable
      // style={styles.container}
      rightContent={getRightContent}
      animation={{ duration: 500, type: 'timing' }}
      bottomDivider>
      {/* <View style={styles.container}> */}
      <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
        <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{formattedDate + ''}</Text>
      </View>
      {/* </View> */}
    </ListItem.Swipeable>
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
  // container: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: 10,
  //   borderColor: '#AAA',
  //   borderBottomWidth: 2,
  // },
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
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    borderRadius: 2,
    // paddingHorizontal: 20,
  },
})
