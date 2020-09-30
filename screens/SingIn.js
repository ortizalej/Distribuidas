import React from 'react'
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native'
import { Button, Block } from 'galio-framework'
import Form from '../components/Formulario'
import { showMessage, hideMessage } from 'react-native-flash-message'
const { width, height } = Dimensions.get('screen')

export default class SignIn extends React.Component {
  actionButton (userName, password, name, lastName) {
    let insertUser = {
      seguridad: {
        userName: userName,
        password: password,
        name: name,
        lastName: lastName
      },
      ingresos: [],
      egresos: [],
      tarjetas: [],
      cuentasBancarias: [],
      inversiones: [],
      prestamos: {
        prestado: [],
        tomado: [],
        presupuestos: []
      }
    }
    showMessage({
      message: '¡Usuario creado con éxito!',
      type: 'success'
    })
    AsyncStorage.setItem(userName + '-' + password, JSON.stringify(insertUser))
      .then(() => {
        console.log('‘It was saved successfully’')
      })
      .catch(() => {
        console.log('‘There was an error saving the product’')
      })
    this.props.navigation.navigate('Login')
  }
  render () {
    return (
      <Block center style={styles.singin}>
        <ScrollView>
          <Form
            type={'SingIn'}
            navigation={this.props.navigation}
            actionButton={this.actionButton.bind(this)}
          />
        </ScrollView>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  singin: {
    width: width,
    height: height,
    backgroundColor: '#071019'
  }
})
