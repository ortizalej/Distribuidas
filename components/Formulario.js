import React from 'react'
import { StyleSheet, Dimensions, Image, AsyncStorage } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-material-dropdown'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { validate } from 'validate.js'

import {
  Container,
  Content,
  Item,
  Input,
  Form,
  Button,
  Text,
  Picker
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'

const { width, height } = Dimensions.get('screen')
export default class Formulario extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tipo: undefined,
      fuente: undefined,
      cantidad: undefined,
      medio: undefined,
      destino: undefined,
      moneda: undefined,
      cuotas: undefined,
      interes: undefined,
      vencimiento: undefined,
      propietario: undefined,
      otros: undefined,
      tipoServicio: undefined,
      userName: undefined,
      password: undefined,
      titular: undefined,
      CBU: undefined,
      banco: undefined,
      uri: undefined
    }
  }

  onChangeCantidad(value) {
    this.setState({
      cantidad: value
    })
  }
  onChangeUri(value) {
    this.setState({
      uri: value
    })
  }
  onChangePropietario(value) {
    this.setState({
      propietario: value
    })
  }
  onChangeOtros(value) {
    this.setState({
      otros: value
    })
  }
  onChangeTitular(value) {
    this.setState({
      titularName: value
    })
  }
  onChangeCBU(value) {
    this.setState({
      CBU: value
    })
  }
  onChangeBanco(value) {
    this.setState({
      bankName: value
    })
  }
  onChangeVencimientos(value) {
    this.setState({
      vencimiento: value
    })
  }
  onChangeCuotas(value) {
    this.setState({
      cuotas: value
    })
  }
  onChangeInteres(value) {
    this.setState({
      interes: value
    })
  }
  onChangeTipoServicio(value) {
    this.setState({
      tipoServicio: value
    })
  }
  onChangeTipo(value) {
    this.setState({
      tipo: value
    })
  }
  onChangeMedio(value) {
    this.setState({
      medio: value
    })
  }
  onChangeDestino(value) {
    this.setState({
      destino: value
    })
  }
  onChangeFuente(value) {
    this.setState({
      fuente: value
    })
  }
  onChangeCuenta(value) {
    this.setState({
      cuenta: value
    })
  }
  onChangeMoneda(value) {
    this.setState({
      moneda: value
    })
  }
  onChangeUserName(value) {
    this.setState({
      userName: value
    })
  }
  onChangeLastName(value) {
    this.setState({
      lastName: value
    })
  }
  onChangeName(value) {
    this.setState({
      name: value
    })
  }
  onChangePassword(value) {
    this.setState({
      password: value
    })
  }

  getFormData(data) {
    this.props.getFormData(data)
  }

  render() {
    if (this.props.type === 'Ingresos') {
      return renderIngresos(this)
    } else if (this.props.type === 'Egresos') {
      return renderEgresos(this)
    } else if (this.props.type === 'Prestamos Prestados') {
      return renderPrestamosPrestados(this)
    } else if (this.props.type === 'Prestamos Tomados') {
      return renderPrestamosTomados(this)
    } else if (this.props.type === 'Login') {
      return renderLogin(this)
    } else if (this.props.type === 'Presupuesto') {
      return renderPresupuesto(this)
    } else if (this.props.type === 'SingIn') {
      return renderSingIn(this)
    } else if (this.props.type === 'Inversiones') {
      return renderInversiones(this)
    } else if (this.props.type === 'Cuenta') {
      return renderCuentaBancaria(this)
    }
  }
}

function renderIngresos(props) {
  let user = props.props.user
  let cuentas = [];
  AsyncStorage.getItem(user.userName + '-' + user.password).then(value => {
    let userData = JSON.parse(value)
    console.log(userData)
    for (let i = 0; i < userData.cuentasBancarias.length; i++) {
      cuentas.push({ value: userData.cuentasBancarias[i].CBU })
    }

  })
  return (
    <Container style={styles.container}>
      <Content>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label='Monto'
            onChangeText={props.onChangeCantidad.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />
          <Dropdown
            label='Moneda'
            data={monedaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.moneda}
            onChangeText={props.onChangeMoneda.bind(props)}
          />
          <Dropdown
            label='Fuente'
            data={fuenteOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.fuente}
            onChangeText={props.onChangeFuente.bind(props)}
          />

          <Dropdown
            label='Medio'
            data={medioOptions1}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.medio}
            onChangeText={props.onChangeMedio.bind(props)}
          />

          <Item
            style={
              props.state.medio === 'Transferencia Bancaria'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <Dropdown
              label='Cuentas vinculadas'
              data={cuentas}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={props.state.cuenta}
              onChangeText={props.onChangeCuenta.bind(props)}
            />
          </Item>

          <Button
            style={styles.btnIngresar}
            onPress={() => { actionButton('ingreso', props) }}
          >
            <Text>INGRESAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderEgresos(props) {
  let user = props.props.user
  let cuentas = [];
  let tarjetaCredito = []
  let tarjetaDebito = []
  AsyncStorage.getItem(user.userName + '-' + user.password).then(value => {
    let userData = JSON.parse(value)
    console.log(userData)
    for (let i = 0; i < userData.tarjetas.length; i++) {
      if (userData.tarjetas[i] === 'Tarjeta de Crédito') {
        tarjetaCredito.push({ value: userData.tarjetas[i].numero })
      } else if (userData.tarjetas[i] === 'Tarjeta de Debito') {
        tarjetaDebito.push({ value: userData.tarjetas[i].numero })
      }
    }
    for (let i = 0; i < userData.cuentasBancarias.length; i++) {
      cuentas.push({ value: userData.cuentasBancarias[i].CBU })
    }

  })
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log(pickerResult)
    props.onChangeUri(pickerResult.uri)
  }
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label='Monto'
            onChangeText={props.onChangeCantidad.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />

          <Dropdown
            label='Moneda'
            data={monedaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.moneda}
            onChangeText={props.onChangeMoneda.bind(props)}
          />

          <Dropdown
            label='Tipo'
            data={tipoEgresoOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.tipo}
            onChangeText={props.onChangeTipo.bind(props)}
          />

          <Item
            style={
              props.state.tipo === 'Servicio'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <Dropdown
              label='Tipo de Servicio'
              data={tipoServicioOptions}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.combo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={props.state.tipoServicio}
              onChangeText={props.onChangeTipoServicio.bind(props)}
            />
          </Item>
          <Item
            stackedLabel
            style={
              props.state.tipo === 'Otros'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <TextInput
              label='Especifique otro servicio'
              onChangeText={props.onChangeOtros.bind(props)}
              mode='outlined'
              style={styles.itemTextInput}
              theme={theme}
            />
          </Item>
          <Dropdown
            label='Medio'
            data={medioOptions2}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.medio}
            onChangeText={props.onChangeMedio.bind(props)}
          />

          <Item
            style={
              props.state.medio === 'Transferencia Bancaria'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <Dropdown
              label='Cuentas vinculadas'
              data={cuentas}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedItemColor='#697A8C'
              selectedValue={props.state.cuenta}
              onChangeText={props.onChangeCuenta.bind(props)}
            />
          </Item>

          <Item
            style={
              props.state.medio === 'Tarjeta de Débito'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <Dropdown
              label='Seleccione la tarjeta'
              data={tarjetaDebito}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={props.state.cuenta}
              onChangeText={props.onChangeCuenta.bind(props)}
            />
          </Item>

          <Item
            style={
              props.state.medio === 'Tarjeta de Crédito'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <Dropdown
              label='Seleccione la tarjeta'
              data={tarjetaCredito}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={props.state.cuenta}
              onChangeText={props.onChangeCuenta.bind(props)}
            />
          </Item>
          <Item
            style={
              props.state.medio === 'Tarjeta de Crédito'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <Dropdown
              label='Cuotas'
              data={coutaOptions}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={props.state.cuotas}
              onChangeText={props.onChangeCuotas.bind(props)}
            />
          </Item>
          <Item
            stackedLabel
            style={
              props.state.medio === 'Tarjeta de Crédito'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <TextInput
              keyboardType='number-pad'
              label='Interés mensual en %'
              onChangeText={props.onChangeInteres.bind(props)}
              mode='outlined'
              style={styles.itemTextInput}
              theme={theme}
            />
          </Item>
          <Button style={styles.btnIngresar} onPress={openImagePickerAsync}>
            <Text>SUBIR ARCHIVO</Text>
          </Button>
          <Button
            style={styles.btnIngresar}
            onPress={() => { actionButton('egreso', props) }}
          >
            <Text>REGISTRAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderPrestamosPrestados(props) {
  let user = props.props.user
  let cuentas = [];
  AsyncStorage.getItem(user.userName + '-' + user.password).then(value => {
    let userData = JSON.parse(value)
    console.log(userData)
    for (let i = 0; i < userData.cuentasBancarias.length; i++) {
      cuentas.push({ value: userData.cuentasBancarias[i].CBU })
    }

  })
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label='Monto'
            onChangeText={props.onChangeCantidad.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />

          <TextInput
            label='Destinatario'
            onChangeText={props.onChangeDestino.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />

          <Dropdown
            label='Moneda'
            data={monedaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.moneda}
            onChangeText={props.onChangeMoneda.bind(props)}
          />

          <Dropdown
            label='Medio'
            data={medioOptions1}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.medio}
            onChangeText={props.onChangeMedio.bind(props)}
          />

          <Item
            style={
              props.state.medio === 'Transferencia Bancaria'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <Dropdown
              label='Cuentas vinculadas'
              data={cuentas}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={props.state.cuenta}
              onChangeText={props.onChangeCuenta.bind(props)}
            />
          </Item>
          <Button
            style={styles.btnIngresar}
            onPress={() => { actionButton('prestados', props) }}
          >
            <Text>REGISTRAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderPrestamosTomados(props) {
  let user = props.props.user
  let cuentas = [];
  AsyncStorage.getItem(user.userName + '-' + user.password).then(value => {
    let userData = JSON.parse(value)
    console.log(userData)
    for (let i = 0; i < userData.cuentasBancarias.length; i++) {
      cuentas.push({ value: userData.cuentasBancarias[i].CBU })
    }

  })
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label='Monto'
            onChangeText={props.onChangeCantidad.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />

          <TextInput
            label='Propietario'
            onChangeText={props.onChangePropietario.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />

          <Dropdown
            label='Moneda'
            data={monedaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.moneda}
            onChangeText={props.onChangeMoneda.bind(props)}
          />

          <Dropdown
            label='Medio'
            data={medioOptions1}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.medio}
            onChangeText={props.onChangeMedio.bind(props)}
          />

          <Item
            style={
              props.state.medio === 'Transferencia Bancaria'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <Dropdown
              label='Cuentas vinculadas'
              data={cuentas}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              textColor='#697A8C'
              selectedValue={props.state.cuenta}
              onChangeText={props.onChangeCuenta.bind(props)}
            />
          </Item>

          <Dropdown
            label='Cuotas'
            data={coutaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.cuotas}
            onChangeText={props.onChangeCuotas.bind(props)}
          />

          <TextInput
            keyboardType='number-pad'
            label='Interés mensual en %'
            onChangeText={props.onChangeInteres.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />

          <TextInput
            label='Fecha primera cuota (DD-MM-YYYY)'
            onChangeText={props.onChangeVencimientos.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />
          <Button
            style={styles.btnIngresar}
            onPress={() => { actionButton('tomados', props) }}
          >
            <Text>REGISTRAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderPresupuesto(props) {
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label='Monto'
            onChangeText={props.onChangeCantidad.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />

          <Dropdown
            label='Tipo'
            data={tipoEgresoOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.tipo}
            onChangeText={props.onChangeTipo.bind(props)}
          />

          <Button
            style={styles.btnIngresar}
            onPress={() => { actionButton('presupuesto', props) }}
          >
            <Text>REGISTRAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderInversiones(props) {
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label='Cantidad a invertir'
            onChangeText={props.onChangeCantidad.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />

          <Dropdown
            label='Tipo'
            data={inversionOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            textColor='#697A8C'
            selectedValue={props.state.tipo}
            onChangeText={props.onChangeTipo.bind(props)}
          />

          <Item
            stackedLabel
            style={
              props.state.tipo === 'Plazo Fijo'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <TextInput
              keyboardType='number-pad'
              label='Interés mensual en %'
              onChangeText={props.onChangeInteres.bind(props)}
              mode='outlined'
              style={styles.itemTextInput}
              theme={theme}
            />
          </Item>
          <Item
            stackedLabel
            style={
              props.state.tipo === 'Acciones'
                ? { display: 'flex', borderColor: 'transparent' }
                : { display: 'none' }
            }
          >
            <TextInput
              label='Nombre de la empresa'
              onChangeText={props.onChangeDestino.bind(props)}
              mode='outlined'
              style={styles.itemTextInput}
              theme={theme}
            />
          </Item>
          <Button
            style={styles.btnIngresar}
            onPress={() => { actionButton('inversion', props) }}
          >
            <Text>REGISTRAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderLogin(prop) {
  return (
    <Container style={styles.containerLogin}>
      <Content>
        <Image
          source={require('../assets/images/Logo-MoneyManager.png')}
          style={styles.logo}
        />
        <Form>
          <TextInput
            label='Email'
            onChangeText={prop.onChangeUserName.bind(prop)}
            mode='outlined'
            style={styles.textInputLogin}
            theme={theme}
          />
          <TextInput
            label='Contraseña'
            secureTextEntry={true}
            onChangeText={prop.onChangePassword.bind(prop)}
            mode='outlined'
            style={styles.textInputLogin}
            theme={theme}
          />

          <Button
            style={styles.btnIngresar}
            onPress={() => actionButton('login', prop)}
          >
            <Text>INGRESAR</Text>
          </Button>
          <Button
            style={styles.btnIngresar}
            onPress={() => {
              prop.props.navigation.navigate('Sign In')
            }}
          >
            <Text>REGISTRARSE</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderCuentaBancaria(props) {
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            label='Titular'
            onChangeText={props.onChangeTitular.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />
          <TextInput
            label='CBU'
            keyboardType='number-pad'
            onChangeText={props.onChangeCBU.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />
          <TextInput
            label='Banco'
            onChangeText={props.onChangeBanco.bind(props)}
            mode='outlined'
            style={styles.textInput}
            theme={theme}
          />
          <Button
            style={styles.btnIngresar}
            onPress={() => { actionButton('cuenta bancaria', props) }}
          >
            <Text>REGISTRAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderSingIn(prop) {
  return (
    <Container style={styles.containerLogin}>
      <Content>
        <Image
          source={require('../assets/images/Logo-MoneyManager.png')}
          style={styles.logo}
        />
        <Form>
          <TextInput
            label='Email'
            onChangeText={prop.onChangeUserName.bind(prop)}
            mode='outlined'
            style={styles.textInputLogin}
            theme={theme}
          />
          <TextInput
            label='Contraseña'
            secureTextEntry={true}
            onChangeText={prop.onChangePassword.bind(prop)}
            mode='outlined'
            style={styles.textInputLogin}
            theme={theme}
          />
          <TextInput
            label='Nombre'
            onChangeText={prop.onChangeName.bind(prop)}
            mode='outlined'
            style={styles.textInputLogin}
            theme={theme}
          />

          <TextInput
            label='Apellido'
            onChangeText={prop.onChangeLastName.bind(prop)}
            mode='outlined'
            style={styles.textInputLogin}
            theme={theme}
          />

          <Button
            style={styles.btnIngresar}
            onPress={() => actionButton('signUp', prop)}
          >
            <Text>REGISTRARSE</Text>
          </Button>
          <Button
            style={styles.btnIngresar}
            onPress={() => {
              prop.props.navigation.navigate('Login')
            }}
          >
            <Text>Volver</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function actionButton(type, props) {
  let result;
  switch (type) {
    case 'login':
      props.props.actionButton(props.state.userName, props.state.password)
      break;
    case 'signUp':
      result = validateSignUp(props);
      if (result === '') {
        props.props.actionButton(props.state.userName, props.state.password, props.state.name, props.state.lastName)
      } else {
        showMessage({ message: result, type: 'danger', animationDuration: 300 })
      }
      break;
    case 'ingreso':
      result = validateIngreso(props);
      if (result === '') {
        props.getFormData({
          cantidad: props.state.cantidad,
          medio: props.state.medio,
          fuente: props.state.fuente,
          cuenta: props.state.cuenta,
          moneda: props.state.moneda,
          tipo: props.state.tipo
        })
        showMessage({ message: '¡Ingreso registrado con éxito!', type: 'success' })
      } else {
        showMessage({ message: result, type: 'danger', animationDuration: 300 })
      }
      break;
    case 'egreso':
      result = validateEgreso(props);
      if (result === '') {
        props.getFormData({
          cantidad: props.state.cantidad,
          tipo: props.state.tipo,
          medio: props.state.medio,
          moneda: props.state.moneda,
          interes: props.state.interes,
          cuenta: props.state.cuenta,
          cuotas: props.state.cuotas,
          otros: props.state.otros,
          tipoServicio: props.state.tipoServicio,
          uriImage: props.state.uri,
          cuenta: cuenta
        })
        showMessage({ message: '¡Egreso registrado con éxito!', type: 'success' })
      } else {
        showMessage({ message: result, type: 'danger', animationDuration: 300 })
      }
      break;
    case 'prestados':
      result = validatePrestamosPrestados(props);
      if (result === '') {
        props.getFormData({
          cantidad: props.state.cantidad,
          destino: props.state.destino,
          medio: props.state.medio,
          type: 'Prestado',
          cuenta: props.state.cuenta,
          moneda: props.state.moneda
        })
        showMessage({ message: '¡Prestamo prestado registrado con éxito!', type: 'success' })
      } else {
        showMessage({ message: result, type: 'danger', animationDuration: 300 })
      }
      break;
    case 'tomados':
      result = validatePrestamosTomados(props)
      if (result === '') {
        props.getFormData({
          cantidad: props.state.cantidad,
          propietario: props.state.propietario,
          medio: props.state.medio,
          vencimiento: props.state.vencimiento,
          interes: props.state.vencimiento,
          cuotas: props.state.cuotas,
          cuentas: props.state.cuentas,
          moneda: props.state.moneda,
          type: 'Tomado'
        })
        showMessage({ message: '¡Prestamo tomado registrado con éxito!', type: 'success' })
      } else {
        showMessage({ message: result, type: 'danger', animationDuration: 300 })
      }
      break;
    case 'presupuesto':
      result = validatePresupuesto(props)
      if (result === '') {
        props.getFormData({
          cantidad: props.state.cantidad,
          tipo: props.state.tipo
        })
        showMessage({ message: '¡Presupuesto registado con éxito!', type: 'success' })
      } else {
        showMessage({ message: result, type: 'danger', animationDuration: 300 })
      }
      break;
    case 'inversion':
      result = validateInversion(props)
      if (result === '') {
        props.getFormData({
          cantidad: props.state.cantidad,
          tipo: props.state.tipo,
          interes: props.state.interes,
          empresa: props.state.destino
        })
        showMessage({ message: '¡Inversión registado con éxito!', type: 'success' })
      } else {
        showMessage({ message: result, type: 'danger', animationDuration: 300 })
      }
      break;
    case 'cuenta bancaria':
      result = validateCuentaBancaria(props)
      if (result === '') {
        props.getFormData({
          titularName: props.state.titularName,
          CBU: props.state.CBU,
          bankName: props.state.bankName
        })
        showMessage({ message: '¡Cuenta bancaria registada con éxito!', type: 'success' })
      } else {
        showMessage({ message: result, type: 'danger', animationDuration: 300 })
      }
      break;
    default:
      break
  }
}

function validateSignUp(prop) {
  let msg = "";
  const validationResult = validate(prop.state.userName);

  if (typeof prop.state.userName === 'undefined' || typeof validationResult !== 'undefined' || prop.state.userName?.length < 6) { msg += "El mail es inválido. \n"; }
  if (typeof prop.state.password === 'undefined' || prop.state.password === null || prop.state.password.length < 8) { msg += "La contraseña es inválida \n"; }
  if (typeof prop.state.name === 'undefined' || prop.state.name === null || prop.state.name === '') { msg += "El nombre es obligatorio. \n"; }
  if (typeof prop.state.lastName === 'undefined' || prop.state.lastName === null || prop.state.lastName === '') { msg += "El apellido es obligatorio. \n"; }

  return msg
}

function validateIngreso(prop) {
  let msg = "";

  if (typeof prop.state.cantidad === 'undefined' || prop.state.cantidad === null) { msg += "Ingrese un monto. \n"; }
  if (typeof prop.state.moneda === 'undefined' || prop.state.moneda === null) { msg += "Ingrese una moneda. \n"; }
  if (typeof prop.state.fuente === 'undefined' || prop.state.fuente === null) { msg += "Ingrese una fuente. \n"; }
  if (typeof prop.state.medio === 'undefined' || prop.state.medio === null) { msg += "Ingrese un medio. \n"; }
  if (prop.state.medio === "Transferencia Bancaria" && (typeof prop.state.cuenta === 'undefined' || prop.state.medio === null)) { msg += "Ingrese una cuenta. \n"; }

  return msg
}

function validateEgreso(prop) {
  let msg = "";

  if (typeof prop.state.cantidad === 'undefined' || prop.state.cantidad === null) { msg += "Ingrese un monto. \n"; }
  if (typeof prop.state.moneda === 'undefined' || prop.state.moneda === null) { msg += "Ingrese una moneda. \n"; }
  if (typeof prop.state.tipo === 'undefined' || prop.state.fuente === null) { msg += "Ingrese un tipo. \n"; }
  if (prop.state.tipo === 'Otros' && (typeof prop.state.otros === 'undefined' || prop.state.otros === null)) { msg += "Ingrese el nuevo servicio. \n"; }
  if (typeof prop.state.medio === 'undefined' || prop.state.medio === null) { msg += "Ingrese un medio. \n"; }
  if (prop.state.medio === "Transferencia Bancaria" && (typeof prop.state.cuenta === 'undefined' || prop.state.medio === null)) { msg += "Ingrese una cuenta. \n"; }
  if (prop.state.medio === "Tarjeta de Crédito" && (typeof prop.state.cuenta === 'undefined' || prop.state.medio === null)) { msg += "Ingrese una cuenta. \n"; }
  if (prop.state.medio === "Tarjeta de Crédito" && (typeof prop.state.cuotas === 'undefined' || prop.state.cuotas === null)) { msg += "Ingrese la cantidad de cuotas. \n"; }
  if (prop.state.medio === "Tarjeta de Crédito" && (typeof prop.state.interes === 'undefined' || prop.state.interes === null)) { msg += "Ingrese el interés. \n"; }
  if (prop.state.medio === "Tarjeta de Débito" && (typeof prop.state.cuenta === 'undefined' || prop.state.medio === null)) { msg += "Ingrese una cuenta. \n"; }

  return msg
}

function validatePrestamosPrestados(prop) {
  let msg = "";

  if (typeof prop.state.cantidad === 'undefined' || prop.state.cantidad === null) { msg += "Ingrese un monto. \n"; }
  if (typeof prop.state.destino === 'undefined' || prop.state.destino === null) { msg += "Ingrese un destinatario. \n"; }
  if (typeof prop.state.moneda === 'undefined' || prop.state.moneda === null) { msg += "Ingrese una moneda. \n"; }
  if (typeof prop.state.medio === 'undefined' || prop.state.medio === null) { msg += "Ingrese un medio. \n"; }
  if (prop.state.medio === "Transferencia Bancaria" && (typeof prop.state.cuenta === 'undefined' || prop.state.medio === null)) { msg += "Ingrese una cuenta. \n"; }

  return msg
}

function validatePrestamosTomados(prop) {
  let msg = "";

  if (typeof prop.state.cantidad === 'undefined' || prop.state.cantidad === null) { msg += "Ingrese un monto. \n"; }
  if (typeof prop.state.propietario === 'undefined' || prop.state.propietario === null) { msg += "Ingrese un propietario. \n"; }
  if (typeof prop.state.moneda === 'undefined' || prop.state.moneda === null) { msg += "Ingrese una moneda. \n"; }
  if (typeof prop.state.medio === 'undefined' || prop.state.medio === null) { msg += "Ingrese un medio. \n"; }
  if (prop.state.medio === "Transferencia Bancaria" && (typeof prop.state.cuenta === 'undefined' || prop.state.medio === null)) { msg += "Ingrese una cuenta. \n"; }
  if (typeof prop.state.cuotas === 'undefined' || prop.state.cuotas === null) { msg += "Ingrese la cantidad de cuotas. \n"; }
  if (typeof prop.state.interes === 'undefined' || prop.state.interes === null) { msg += "Ingrese el interés mensual. \n"; }
  if (typeof prop.state.vencimiento === 'undefined' || prop.state.vencimiento === null) { msg += "Ingrese la fecha de vencimiento. \n"; }

  return msg
}

function validatePresupuesto(prop) {
  let msg = "";

  if (typeof prop.state.cantidad === 'undefined' || prop.state.cantidad === null) { msg += "Ingrese un monto. \n"; }
  if (typeof prop.state.tipo === 'undefined' || prop.state.fuente === null) { msg += "Ingrese un tipo. \n"; }

  return msg
}

function validateInversion(prop) {
  let msg = "";

  if (typeof prop.state.cantidad === 'undefined' || prop.state.cantidad === null) { msg += "Ingrese un monto. \n"; }
  if (typeof prop.state.tipo === 'undefined' || prop.state.tipo === null) { msg += "Ingrese un tipo. \n"; }
  if (prop.state.tipo === "Plazo Fijo" && (typeof prop.state.interes === 'undefined' || prop.state.interes === null)) { msg += "Ingrese el interés. \n"; }
  if (prop.state.tipo === "Acciones" && (typeof prop.state.destino === 'undefined' || prop.state.destino === null)) { msg += "Ingrese el nombre de la empresa. \n"; }

  return msg
}

function validateCuentaBancaria(prop) {
  let msg = "";
  return msg
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B1F35',
    width: 340,
    height: 'auto',
    paddingRight: 15,
    paddingBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    alignSelf: 'center'
  },
  containerLogin: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 340,
    height: 'auto',
    paddingRight: 15,
    paddingBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    alignSelf: 'center'
  },
  hide: {
    display: 'none'
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: -40,
    marginTop: -40,
    marginLeft: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnIngresar: {
    width: 200,
    height: 33,
    backgroundColor: '#F41F1F',
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textInputLogin: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 15,
    marginTop: 10
  },
  textInput: {
    backgroundColor: '#0B1F35',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 15,
    marginTop: 10
  },
  itemTextInput: {
    backgroundColor: '#0B1F35',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5
  },
  combo: {
    borderWidth: 0.9,
    borderColor: '#697A8C',
    borderRadius: 5,
    width: 300,
    height: 50,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 20
  },
  itemCombo: {
    borderWidth: 0.9,
    borderColor: '#697A8C',
    borderRadius: 5,
    width: 300,
    height: 50,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 5
  }
})

const monedaOptions = [{ value: 'Pesos' }, { value: 'Dolares' }]
const fuenteOptions = [
  { value: 'Alquiler' },
  { value: 'Sueldo' },
  { value: 'Facturación' },
  { value: 'Extraordinario' }
]
const medioOptions1 = [
  { value: 'Efectivo' },
  { value: 'Transferencia Bancaria' }
]
const medioOptions2 = [
  { value: 'Efectivo' },
  { value: 'Transferencia Bancaria' },
  { value: 'Tarjeta de Crédito' },
  { value: 'Tarjeta de Débito' }
]
const cuentaOptions = [{ value: 'Cuenta 1' }, { value: 'Cuenta 2' }]
const tipoEgresoOptions = [
  { value: 'Impuestos Nacionales' },
  { value: 'Impuestos Provinciales' },
  { value: 'Impuestos Municipales' },
  { value: 'Educacion' },
  { value: 'Salud' },
  { value: 'Gastos Varios ' },
  { value: 'Entretenimiento' },
  { value: 'Viaticos' },
  { value: 'Otros' }
]
const tipoServicioOptions = [
  { value: 'Luz' },
  { value: 'Gas' },
  { value: 'Agua' },
  { value: 'Otro' }
]
const tarjetaDebitoOptions = [
  { value: 'Tarjeta débito 1' },
  { value: 'Tarjeta débito 2' }
]
const tarjetaCreditoOptions = [
  { value: '4517555555555555' },
  { value: '4517888888888888' }
]
const coutaOptions = [
  { value: '1' },
  { value: '3' },
  { value: '6' },
  { value: '12' },
  { value: '18' }
]
const inversionOptions = [
  { value: 'Plazo Fijo' },
  { value: 'Compra de titulos' },
  { value: 'Acciones' },
  { value: 'Bienes Raices ' },
  { value: 'Energias Renovables' },
  { value: 'Divisas' },
  { value: 'Bono' },
  { value: 'Comodities' },
  { value: 'Futuros' }
]

const theme = {
  colors: {
    placeholder: '#697A8C',
    text: '#697A8C',
    primary: '#FF8141',
    backdrop: 'white'
  }
}
