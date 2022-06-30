import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

export default props => {
  const logout = () => {
    delete axios.defaults.headers.common['Authorization']
    AsyncStorage.removeItem('userData')
    props.navigation.navigate('Auth')
  }
  return (
    <DrawerContentScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Tasks</Text>
          <Gravatar
            style={styles.avatar}
            options={{
              email: props.email,
              secure: true,
            }}
          />
          <View style={styles.userIfno}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.email}>{props.email}</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <View style={styles.logout}>
              <FontAwesomeIcon
                name="sign-out-alt"
                solid
                size={30}
                color="#800"
                style={{ marginRight: 10 }}
              />
              <Text>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  title: {
    color: '#000',
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  userIfno: {
    marginLeft: 10,
  },
  name: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginBottom: 5,
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    color: commonStyles.colors.subText,
    marginBottom: 5,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
})
