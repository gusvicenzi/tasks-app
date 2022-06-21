import React, { Component } from 'react'
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native'

import commomStyles from '../commomStyles'
import todayImage from '../../assets/imgs/today.jpg'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../components/Task'
import AddTask from './AddTask'
export default class TaskList extends Component {
  state = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: [
      {
        id: Math.random(),
        desc: 'Comprar livro de react native',
        estimateAt: new Date(2022, 5, 18),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Ler livro de react native',
        estimateAt: new Date(2022, 6, 28),
        doneAt: null,
      },
    ],
  }
  // Life cicle method. Update filterTasks when the component did mount
  componentDidMount = () => {
    this.filterTasks()
  }

  toggleFilter = () => {
    this.setState(
      { showDoneTasks: !this.state.showDoneTasks },
      this.filterTasks
    )
    // Update visible tasks (filterTasks) passing this.filterTasks as a callback fnc when the state changes
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }
    this.setState({ visibleTasks })
  }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date()
      }
    })

    this.setState({ tasks }, this.filterTasks)
  }

  addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados inválidos', 'Descrição não informada')
      return
    }
    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random,
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    })

    this.setState({ tasks, showAddTask: false }, this.filterTasks)
  }

  deleteTask = taskId => {
    const tasks = this.state.tasks.filter(task => task.id !== taskId)
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <AddTask
          onCancel={() => this.setState({ showAddTask: false })}
          isVisible={this.state.showAddTask}
          onSave={this.addTask}
        />
        <ImageBackground
          style={styles.background}
          source={todayImage}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <FontAwesomeIcon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commomStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <Task
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.addButtom}
          onPress={() => this.setState({ showAddTask: true })}
          activeOpacity={0.7}>
          <FontAwesomeIcon
            name="plus"
            size={20}
            color={commomStyles.colors.secondary}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
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
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  addButtom: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commomStyles.colors.today,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
