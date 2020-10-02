import React, { Component } from 'react'
import { StyleSheet, View, Switch, AsyncStorage, Platform } from 'react-native'
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input'
import { TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-material-dropdown'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { Item, Picker, Container, Content, Form, Button, Text, Input } from 'native-base'
import DatePicker from 'react-native-datepicker'
import { color } from 'react-native-reanimated'

let data = undefined
export default class DisplayMount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cuenta: undefined,
      cierre: undefined,
      tipo: undefined,
      vencimiento: undefined,
      cardData: undefined,
      data: undefined
    }
  }
  cuentas = [];
  onChangeCuenta(value) {
    this.setState({
      cuenta: value
    })
  }
  onChangeCierre(value) {
    this.setState({
      cierre: value
    })
  }
  onChangeVencimiento(value) {
    this.setState({
      vencimiento: value
    })
  }
  onChangeTipo(value) {
    this.setState({
      tipo: value
    })
  }
  _onChange(value) {
    this.setState({
      cardData: value
    })
  }

  getNewCardData(data) {

    AsyncStorage.getItem(data.userName + '-' + data.password).then(value => {
      let userData = JSON.parse(value)
      this.state.data = userData
      for (let i = 0; i < userData.cuentasBancarias.length; i++) {
        this.cuentas.push({ value: userData.cuentasBancarias[i].CBU })
      }
    })
  }

  render() {
    let userData = this.props.route.params
    if (!this.state.data) {
      this.getNewCardData(userData)
    }
    const { goBack } = this.props.navigation
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Button style={styles.btnGoBack} onPress={() => goBack()}>
              <Text style={{ fontWeight: 'bold' }}>{'<'}Tarjetas</Text>
            </Button>
            <CreditCardInput
              requiresName
              label={{ number: 'CARD', expiry: 'EXPIRY', cvc: 'CVC/CCV' }}
              requiresCVC={false}
              allowScroll={true}
              labelStyle={styles.label}
              inputStyle={styles.input}
              validColor={'gray'}
              invalidColor={'red'}
              placeholderColor={'gray'}
              inputContainerStyle={styles.inputCointaer}
              onChange={this._onChange.bind(this)}
            />
            <Dropdown
              label='Tipo'
              data={tarjetaOptionsTipo}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.combo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={this.state.tipo}
              onChangeText={this.onChangeTipo.bind(this)}
            />
            <Dropdown
              label='Cuentas bancarias'
              data={this.cuentas}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.combo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={this.state.cuenta}
              onChangeText={this.onChangeCuenta.bind(this)}
            />
            <DatePicker
              style={styles.dataPicker}
              date={this.state.cierre} //initial date from state
              mode='date' //The enum of date, datetime and time
              placeholder='Fecha de Cierre'
              format='DD-MM-YYYY'
              minDate='01-01-2016'
              maxDate='01-01-2025'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                  marginTop: 20
                },
                placeholderText: {
                  fontSize: 14,
                  color: 'white'
                },
                dateText: {
                  textAlign: 'left',
                  fontSize: 14,
                  color: 'white'
                }
              }}
              onDateChange={this.onChangeCierre.bind(this)}
            />
            <DatePicker
              style={styles.dataPicker}
              date={this.state.vencimiento} //initial date from state
              mode='date' //The enum of date, datetime and time
              placeholder='Fecha de Vencimiento'
              format='DD-MM-YYYY'
              minDate='01-01-2016'
              maxDate='01-01-2025'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                  marginTop: 20
                },
                placeholderText: {
                  fontSize: 14,
                  color: 'white'
                },
                dateText: {
                  textAlign: 'left',
                  fontSize: 14,
                  color: 'white'
                }
              }}
              onDateChange={this.onChangeVencimiento.bind(this)}
            />
            <Button
              style={styles.btnIngresar}
              onPress={() => { validateNewCard(this) }}
            >
              <Text>Agregar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

function validateNewCard(props) {
  let result = validateNewCardData(props)
  if (result === '') {

    let newCard = {
      numero: props.state.cardData.values.number,
      tipoCard: props.state.cardData.values.type,
      fechaExpiracion: props.state.cardData.values.expiry,
      nombre: props.state.cardData.values.name,
      tipo: props.state.tipo,
      cuenta: props.state.cuenta,
      cierre: props.state.cierre,
      vencimiento: props.state.vencimiento
    };

    props.state.data.tarjetas.push(newCard);

    AsyncStorage.mergeItem(
      props.state.data.seguridad.userName + '-' + props.state.data.seguridad.password,
      JSON.stringify(props.state.data),
      value => {
        showMessage({
          message: '¡Tarjeta agregada con éxito!',
          type: 'success'
        })
      }
    )
    props.props.navigation.navigate('Tarjetas')
  } else {
    showMessage({ message: result, type: 'danger', animationDuration: 300 })

  }
}

function validateNewCardData(prop) {
  let msg = "";

  if (!prop.state.cardData) { msg += "Todos los campos de la tarjeta son requeridos \n"; }
  if (!prop.state.tipo) { msg += "Indique un tipo de tarjeta \n"; }

  return msg
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#071019',
    paddingTop: 20
  },
  label: {
    color: 'gray',
    fontSize: 12
  },
  input: {
    fontSize: 16,
    color: 'gray'
  },
  inputCointaer: {
    borderBottomWidth: 1,
    borderBottomColor: '#071019'
  },
  btnIngresar: {
    width: 200,
    height: 33,
    backgroundColor: '#F41F1F',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  combo: {
    borderWidth: 0.9,
    borderColor: '#697A8C',
    borderRadius: 5,
    width: 300,
    height: 50,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btnGoBack: {
    width: 110,
    height: 33,
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    marginEnd: 46,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataPicker: {
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  }
})

const tarjetaOptionsTipo = [
  { value: 'Tarjeta de Crédito' },
  { value: 'Tarjeta de Débito' }
]
const CuentaOptions = [{ value: 'Cuenta1' }, { value: 'Cuenta2' }]
