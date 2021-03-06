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

import AsyncStorage from '@react-native-community/async-storage'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'

import { server, showError } from '../common'

import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../components/Task'
import AddTask from './AddTask'

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  showEditTask: false,
  selectedTaskId: null,
  visibleTasks: [],
  tasks: [],
}

export default class TaskList extends Component {
  state = {
    ...initialState,
  }
  // Life cicle method. Update filterTasks when the component did mount
  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState')
    const savedState = JSON.parse(stateString) || initialState
    this.setState(
      {
        showDoneTasks: savedState.showDoneTasks,
      },
      this.filterTasks
    )
    this.loadTasks()
  }

  loadTasks = async () => {
    try {
      const maxDate = moment()
        .add({ days: this.props.daysAhead })
        .format('YYYY-MM-DD 23:59:59')
      const res = await axios.get(`${server}/tasks?date=${maxDate}`)
      this.setState({ tasks: res.data }, this.filterTasks)
    } catch (e) {
      showError(e)
    }
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
    AsyncStorage.setItem(
      'tasksState',
      JSON.stringify({
        showDoneTasks: this.state.showDoneTasks,
      })
    ) // Record the state no async storage
  }

  toggleTask = async taskId => {
    try {
      await axios.put(`${server}/tasks/${taskId}/toggle`)
      this.loadTasks()
    } catch (e) {
      showError(e)
    }
  }

  addTask = async newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados inv??lidos', 'Descri????o n??o informada')
      return
    }

    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date,
      })

      this.setState({ showAddTask: false }, this.loadTasks)
    } catch (e) {
      showError(e)
    }
  }

  deleteTask = async taskId => {
    try {
      await axios.delete(`${server}/tasks/${taskId}`)
      this.loadTasks()
    } catch (e) {
      showError(e)
    }
  }

  saveEditTask = async newTask => {
    const taskId = this.state.selectedTaskId
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados inv??lidos', 'Descri????o n??o informada')
      return
    }
    try {
      await axios.patch(`${server}/tasks/${taskId}/update`, {
        desc: newTask.desc,
        estimateAt: newTask.date,
      })

      this.setState({ showEditTask: false }, this.loadTasks)
    } catch (e) {
      showError(e)
    }
  }

  editTask = async taskId => {
    this.setState({ showEditTask: true, selectedTaskId: taskId })
    // this.saveEditTask(taskId)
  }

  getImageAndColor = () => {
    switch (this.props.daysAhead) {
      case 0:
        return [todayImage, commonStyles.colors.today]
      case 1:
        return [tomorrowImage, commonStyles.colors.tomorrow]
      case 7:
        return [weekImage, commonStyles.colors.week]
      default:
        return [monthImage, commonStyles.colors.month]
    }
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <AddTask
          onCancel={() => this.setState({ showAddTask: false })}
          isVisible={this.state.showAddTask}
          onSave={this.addTask}
          title="Nova tarefa"
        />
        <AddTask
          onCancel={() => this.setState({ showEditTask: false })}
          isVisible={this.state.showEditTask}
          onSave={this.saveEditTask}
          title="Editar tarefa"
          // value={
          //   this.state.tasks.find(task => task.id === this.state.selectedTaskId)
          //     .desc
          // }
        />
        <ImageBackground
          style={styles.background}
          source={this.getImageAndColor()[0]}>
          <View style={styles.iconBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <FontAwesomeIcon
                name="bars"
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleFilter}>
              <FontAwesomeIcon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.title}</Text>
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
                onEdit={this.editTask}
                // showEditModal={() => this.setState({ showEditTask: true })}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.addButtom,
            { backgroundColor: this.getImageAndColor()[1] },
          ]}
          onPress={() => this.setState({ showAddTask: true })}
          activeOpacity={0.7}>
          <FontAwesomeIcon
            name="plus"
            size={20}
            color={commonStyles.colors.secondary}
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
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
})
