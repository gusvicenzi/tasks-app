import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerNavigator = props => {}

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={Auth}
      />
      <Stack.Screen
        name="Home"
        component={TaskList}
      />
    </Stack.Navigator>
  )
}

export default Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}
