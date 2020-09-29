import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';

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
      password: undefined
    }
  }

  onChangeCantidad(value) {
    this.setState({
      cantidad: value
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
    }
  }
}

function renderIngresos(props) {
  return (
    <Container style={styles.container}>
      <Content>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label="Monto"
            onChangeText={props.onChangeCantidad.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <Dropdown
            label='Moneda'
            data={monedaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
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
              data={cuentaOptions}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              selectedValue={props.state.cuenta}
              onChangeText={props.onChangeCuenta.bind(props)}
            />
          </Item>

          <Button
            style={styles.btnIngresar}
            onPress={() => {
              props.getFormData({
                cantidad: props.state.cantidad,
                medio: props.state.medio,
                fuente: props.state.fuente,
                cuenta: props.state.cuenta,
                moneda: props.state.moneda,
                tipo: props.state.tipo
              })
            }}
          >
            <Text>INGRESAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderEgresos(props) {
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label="Monto"
            onChangeText={props.onChangeCantidad.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <Dropdown
            label='Moneda'
            data={monedaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
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
              label="Especifique otro servicio"
              onChangeText={props.onChangeOtros.bind(props)}
              mode="outlined"
              style={styles.itemTextInput}
              theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
            />
          </Item>
          <Dropdown
            label='Medio'
            data={medioOptions2}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
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
              data={cuentaOptions}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
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
              data={tarjetaDebitoOptions}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
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
              data={tarjetaCreditoOptions}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
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
              label="Interés mensual en %"
              onChangeText={props.onChangeInteres.bind(props)}
              mode="outlined"
              style={styles.itemTextInput}
              theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
            />
          </Item>
          <Button style={styles.btnIngresar}>
            <Text>SUBIR ARCHIVO</Text>
          </Button>
          <Button
            style={styles.btnIngresar}
            onPress={() => {
              props.getFormData({
                cantidad: props.state.cantidad,
                tipo: props.state.tipo,
                medio: props.state.medio,
                moneda: props.state.moneda,
                interes: props.state.interes,
                cuotas: props.state.cuotas,
                otros: props.state.otros,
                tipoServicio: props.state.tipoServicio
              })
            }}
          >
            <Text>REGISTRAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderPrestamosPrestados(props) {
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label="Monto"
            onChangeText={props.onChangeCantidad.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <TextInput
            keyboardType='number-pad'
            label="Destinatario"
            onChangeText={props.onChangeDestino.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <Dropdown
            label='Moneda'
            data={monedaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
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
              data={cuentaOptions}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
              selectedValue={props.state.cuenta}
              onChangeText={props.onChangeCuenta.bind(props)}
            />
          </Item>
          <Button
            style={styles.btnIngresar}
            onPress={() => {
              props.getFormData({
                cantidad: props.state.cantidad,
                destino: props.state.destino,
                medio: props.state.medio,
                type: 'Prestado',
                cuenta: props.state.cuenta,
                moneda: props.state.moneda
              })
            }}
          >
            <Text>REGISTRAR</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

function renderPrestamosTomados(props) {
  return (
    <Container style={styles.container}>
      <Content bounces={false}>
        <Form scrollEnabled={false}>
          <TextInput
            keyboardType='number-pad'
            label="Monto"
            onChangeText={props.onChangeCantidad.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <TextInput
            label="Propietario"
            onChangeText={props.onChangePropietario.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <Dropdown
            label='Moneda'
            data={monedaOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
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
              data={cuentaOptions}
              dropdownOffset={{ top: 10, left: 30 }}
              containerStyle={styles.itemCombo}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              baseColor='#697A8C'
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
            selectedValue={props.state.cuotas}
            onChangeText={props.onChangeCuotas.bind(props)}
          />

          <TextInput
            keyboardType='number-pad'
            label="Interés mensual en %"
            onChangeText={props.onChangeInteres.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <TextInput
            label="Fecha primera cuota (DD-MM-YYYY)"
            onChangeText={props.onChangeVencimientos.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />
          <Button
            style={styles.btnIngresar}
            onPress={() => {
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
            }}
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
            label="Monto"
            onChangeText={props.onChangeCantidad.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <Dropdown
            label='Tipo'
            data={tipoEgresoOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
            selectedValue={props.state.tipo}
            onChangeText={props.onChangeTipo.bind(props)}
          />

          <Button
            style={styles.btnIngresar}
            onPress={() => {
              props.getFormData({
                cantidad: props.state.cantidad,
                tipo: props.state.tipo
              })
            }}
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
            label="Cantidad a invertir"
            onChangeText={props.onChangeCantidad.bind(props)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />

          <Dropdown
            label='Tipo'
            data={inversionOptions}
            dropdownOffset={{ top: 10, left: 30 }}
            containerStyle={styles.combo}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            baseColor='#697A8C'
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
              label="Interés mensual en %"
              onChangeText={props.onChangeInteres.bind(props)}
              mode="outlined"
              style={styles.itemTextInput}
              theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
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
              keyboardType='number-pad'
              label="Nombre de la empresa"
              onChangeText={props.onChangeDestino.bind(props)}
              mode="outlined"
              style={styles.itemTextInput}
              theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
            />
          </Item>
          <Button
            style={styles.btnIngresar}
            onPress={() => {
              props.getFormData({
                cantidad: props.state.cantidad,
                tipo: props.state.tipo,
                interes: props.state.interes,
                empresa: props.state.destino
              })
            }}
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
    <Container style={styles.container}>
      <Content>
        <Form>
          <TextInput
            label="Usuario"
            onChangeText={prop.onChangeUserName.bind(prop)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />
          <TextInput
            label="Contraseña"
            onChangeText={prop.onChangePassword.bind(prop)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
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

function renderSingIn(prop) {
  return (
    <Container style={styles.container}>
      <Content>
        <Form>
          <TextInput
            label="Email"
            onChangeText={prop.onChangeUserName.bind(prop)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />
          <TextInput
            label="Contraseña"
            onChangeText={prop.onChangePassword.bind(prop)}
            mode="outlined"
            style={styles.textInput}
            theme={{ colors: { placeholder: '#697A8C', text: '#697A8C', primary: '#FF8141', backdrop: 'white' } }}
          />
          <Button
            style={styles.btnIngresar}
            onPress={() => actionButton('sign in', prop)}
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

function actionButton(type, prop) {
  switch (type) {
    case 'login':
      prop.props.actionButton(prop.state.userName, prop.state.password)
    case 'sign in':
      prop.props.actionButton(prop.state.userName, prop.state.password)
    default:
      break
  }
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
  hide: {
    display: 'none'
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
  textInput: {
    backgroundColor: '#0B1F35',
    width: 300,
    height: 50,
    justifyContent: "center",
    alignSelf: 'center',
    marginLeft: 15,
    marginTop: 10
  },
  itemTextInput: {
    backgroundColor: '#0B1F35',
    width: 300,
    height: 50,
    justifyContent: "center",
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
    marginLeft: 20,
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

const monedaOptions = [{ value: 'Pesos' }, { value: 'Dolares' }];
const fuenteOptions = [{ value: 'Alquiler' }, { value: 'Sueldo' }, { value: 'Facturación' }, { value: 'Extraordinario' }];
const medioOptions1 = [{ value: 'Efectivo' }, { value: 'Transferencia Bancaria' }];
const medioOptions2 = [{ value: 'Efectivo' }, { value: 'Transferencia Bancaria' }, { value: 'Tarjeta de Crédito' }, { value: 'Tarjeta de Débito' }];
const cuentaOptions = [{ value: 'Cuenta 1' }, { value: 'Cuenta 2' }];
const tipoEgresoOptions = [{ value: 'Impuestos Nacionales' }, { value: 'Impuestos Provinciales' }, { value: 'Impuestos Municipales' }, { value: 'Educacion' }, { value: 'Salud' }, { value: 'Gastos Varios ' }, { value: 'Entretenimiento' }, { value: 'Viaticos' }, { value: 'Otros' }];
const tipoServicioOptions = [{ value: 'Luz' }, { value: 'Gas' }, { value: 'Agua' }, { value: 'Otro' }];
const tarjetaDebitoOptions = [{ value: 'Tarjeta débito 1' }, { value: 'Tarjeta débito 2' }];
const tarjetaCreditoOptions = [{ value: 'Tarjeta crédito 1' }, { value: 'Tarjeta crédito 2' }];
const coutaOptions = [{ value: '3' }, { value: '6' }, { value: '12' }, { value: '18' }];
const inversionOptions = [{ value: 'Plazo Fijo' }, { value: 'Compra de titulos' }, { value: 'Acciones' }, { value: 'Bienes Raices ' }, { value: 'Energias Renovables' }, { value: 'Divisas' }, { value: 'Bono' }, { value: 'Comodities' }, { value: 'Futuros' }];