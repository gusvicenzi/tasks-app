import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'
import commonStyles from './commonStyles'

import Menu from './screens/Menu'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const menuConfig = {
  drawerLabelStyle: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: 'normal',
    fontSize: 20,
  },
  drawerActiveTintColor: '#080',
  drawerActiveBackgroundColor: '#EEE',
  headerShown: false,
}

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator screenOptions={menuConfig}>
      <Drawer.Screen
        name="Today"
        options={{ title: 'Hoje' }}>
        {props => (
          <TaskList
            {...props}
            title="Hoje"
            daysAhead={0}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Tomorrow"
        options={{ title: 'Amanhã' }}>
        {props => (
          <TaskList
            {...props}
            title="Amanhã"
            daysAhead={1}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Week"
        options={{ title: 'Semana' }}>
        {props => (
          <TaskList
            {...props}
            title="Semana"
            daysAhead={7}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Month"
        options={{ title: 'Mês' }}>
        {props => (
          <TaskList
            {...props}
            title="Mês"
            daysAhead={30}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}

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
        component={DrawerNavigator}
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
