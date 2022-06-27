import React, { Component } from 'react'
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'
import commonStyles from '../commonStyles'

import bgImg from '../../assets/imgs/login.jpg'
import AuthInput from '../components/AuthInput'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

export default class Auth extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      Alert.alert('Sucesso!', 'Criar conta')
    } else {
      Alert.alert('Sucesso!', 'Logar')
    }
  }

  render() {
    return (
      <ImageBackground
        source={bgImg}
        style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
          </Text>
          {this.state.stageNew && (
            <AuthInput
              icon="user"
              placeholder="Nome"
              value={this.state.name}
              style={styles.input}
              onChangeText={name => this.setState({ name })}
            />
          )}
          <AuthInput
            icon="at"
            placeholder="E-mail"
            value={this.state.email}
            style={styles.input}
            onChangeText={email => this.setState({ email })}
          />
          <AuthInput
            icon="key"
            placeholder="Senha"
            value={this.state.password}
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
          />
          {this.state.stageNew && (
            <AuthInput
              icon="key"
              placeholder="Confirmar senha"
              value={this.state.confirmPassword}
              style={styles.input}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
              secureTextEntry={true}
            />
          )}
          <TouchableOpacity onPress={this.signinOrSignup}>
            <View style={styles.button}>
              <FontAwesomeIcon
                name="sign-in-alt"
                size={20}
                color="#FFF"
                style={styles.buttonIcon}
                solid
              />
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
          <Text style={styles.buttonText}>
            {this.state.stageNew
              ? 'Já possui conta? Fazer login'
              : 'Criar nova conta'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
    borderRadius: 8,
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
})