import React from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage,
  ImageBackground,
  Platform
} from 'react-native'
import { Button, Block } from 'galio-framework'
import { showMessage, hideMessage } from 'react-native-flash-message'
import Form from '../components/Formulario'

const { width, height } = Dimensions.get('screen')

export default class Login extends React.Component {
  actionButton(userName, password) {
    AsyncStorage.getItem(userName + '-' + password)
      .then(value => {
        if (value) {
          this.props.navigation.navigate('Home', JSON.parse(value))
 
          showMessage({
            message: '¡Inicio de sesión exitoso!',
            type: 'success',
            animationDuration: 300
          })
        } else {
          //ALERTA ERROR

          showMessage({
            message: 'El usuario o contraseña es incorrecto',
            type: 'danger',
            animationDuration: 300
          })
        }
      })
      .catch(res => { })
  }

  render() {
    return (
      <Block center style={styles.login}>
        <ImageBackground
          source={require('../assets/images/fondo.jpg')}
          style={styles.backgoundContainer}
        >
          <ScrollView>
            <Form
              type={'Login'}
              navigation={this.props.navigation}
              actionButton={this.actionButton.bind(this)}
            />
          </ScrollView>
        </ImageBackground>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    width: width,
    height: height
  },
  backgoundContainer: {
    flex: 1,
    width: 500,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
