import React, { Component } from 'react'
import { ImageBackground, Text, View, StyleSheet } from 'react-native'

import commomStyles from '../commomStyles'
import todayImage from '../../assets/imgs/today.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../components/Task'
export default class TaskList extends Component {
  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={todayImage}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <Task
            desc="Comprar Livro"
            estimateAt={new Date()}
            doneAt={new Date()}
          />
          <Task
            desc="Ler Livro"
            estimateAt={new Date()}
            doneAt={null}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  background: {
    flexGrow: 3,
  },
  taskList: {
    flexGrow: 7,
  },
  titleBar: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
})
