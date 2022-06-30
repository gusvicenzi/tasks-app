import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'

export default props => {
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
})
