import React from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage,
  Platform,
  ImageBackground,
  Image
} from 'react-native'
import { Button, Block } from 'galio-framework'
import Form from '../components/Formulario'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { Container } from 'native-base'

import { TextInput, Text } from 'react-native-paper'

import moment from 'moment'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import XLSX from 'xlsx'
import { NetworkInfo } from 'react-native-network-info'

export default class Configuracion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: undefined
    }
  }

  getData (user) {
    AsyncStorage.getItem(user.userName + '-' + user.password).then(value => {
      let userData = JSON.parse(value)
      this.state.data = userData
    })
  }

  render () {
    let userData = this.props.route.params
    if (!this.state.data) {
      this.getData(userData)
    }

    return (
      <Block center style={styles.ingresos}>
        <ImageBackground
          source={require('../assets/images/fondo.jpg')}
          style={styles.backgoundContainer}
        >
          <Image
            source={require('../assets/images/Logo-MoneyManager.png')}
            style={styles.logo}
          />
          <Button
            style={styles.btnStyle}
            onPress={() => {
              exportDataToMongoDB(userData)
            }}
          >
            <Text style={{marginTop: 17}}>Generar Back-up</Text>
          </Button>
          <Button
            style={styles.btnStyle}
            onPress={() => {
              importDataToMongoDB(userData)
            }}
          >
            <Text style={{marginTop: 17}}>Recuperar Back-Up</Text>
          </Button>
          <Button
            style={styles.btnStyle}
            onPress={() => {
              exportExcel(
                `MoneyManagerData-${userData.lastName}-${moment().format(
                  'DD-MM-YYYY'
                )}`,
                this.state.data
              )
            }}
          >
            <Text style={{marginTop: 17}}>Exportar CSV</Text>
          </Button>
        </ImageBackground>
      </Block>
    )
  }
}

async function exportExcel (fileName, data) {
  await createExcel(fileName, data)
}
function exportDataToMongoDB (user) {
  AsyncStorage.getItem(user.userName + '-' + user.password).then(value => {
    console.log(user.userName)
    let body = {
      username: user.userName,
      password: user.password,
      data: value
    }
    fetch('https://api-proyect.herokuapp.com/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
      .catch(error => {
        console.error(error)
      })
  })
}
function importDataToMongoDB (user) {
  let body = {
    username: user.userName,
    password: user.password
  }
  fetch('https://api-proyect.herokuapp.com/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      AsyncStorage.mergeItem(user.userName + '-' + user.password, json.data)
    })
    .catch(error => {
      console.error(error)
    })
}
async function createExcel (fileName, data) {
  var wb = XLSX.utils.book_new()

  /*Ingresos */
  var ingresos = XLSX.utils.json_to_sheet(data.ingresos)
  XLSX.utils.book_append_sheet(wb, ingresos, 'Ingresos')

  /*Egresos*/
  var egresos = XLSX.utils.json_to_sheet(data.egresos)
  XLSX.utils.book_append_sheet(wb, egresos, 'Egresos')

  /*Cuentas Bancarias*/
  var cuentasBancarias = XLSX.utils.json_to_sheet(data.cuentasBancarias)
  XLSX.utils.book_append_sheet(wb, cuentasBancarias, 'Cuentas Bancarias')

  /*Tarjetas de Credito*/
  var tarjetas = XLSX.utils.json_to_sheet(data.tarjetas)
  XLSX.utils.book_append_sheet(wb, tarjetas, 'Tarjetas de Crédito')

  /*Presupuestos*/
  var presupuestos = XLSX.utils.json_to_sheet(data.presupuestos)
  XLSX.utils.book_append_sheet(wb, presupuestos, 'Presupuestos')

  /*Prestamos Prestados*/
  var prestados = XLSX.utils.json_to_sheet(data.prestamos.prestado)
  XLSX.utils.book_append_sheet(wb, prestados, 'Prestamos Prestados')

  /*Prestamos Tomados*/
  var tomados = XLSX.utils.json_to_sheet(data.prestamos.tomado)
  XLSX.utils.book_append_sheet(wb, tomados, 'Prestamos Tomados')

  /* Inversiones*/
  var inversiones = XLSX.utils.json_to_sheet(data.inversiones)
  XLSX.utils.book_append_sheet(wb, inversiones, 'Inversiones')

  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: 'xlsx'
  })
  const uri = FileSystem.cacheDirectory + fileName + '.xlsx'

  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  })

  await Sharing.shareAsync(uri, {
    UTI: 'com.microsoft.excel.xlsx'
  })
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#FF8141',
    width: 340,
    height: 50,
    paddingRight: 15,
    paddingBottom: 20,
    marginTop: 20,
    borderRadius: 25,
  },
  backgoundContainer: {
    flex: 1,
    width: 500,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: -40,
    marginTop: -200,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
