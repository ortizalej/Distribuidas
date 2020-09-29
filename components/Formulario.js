import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
    Container,
    Content,
    Item,
    Input,

    Form,
    Button,
    Text,
    Picker
} from "native-base";
const { width, height } = Dimensions.get('screen');
export default class Formulario extends React.Component {
    constructor(props) {
        super(props);
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
            banco: undefined
        };
    }

    onChangeCantidad(value) {
        this.setState({
            cantidad: value
        });
    }
    onChangePropietario(value) {
        this.setState({
            propietario: value
        });
    }
    onChangeOtros(value) {
        this.setState({
            otros: value
        });
    }
    onChangeTitular(value) {
        this.setState({
            titularName: value
        });
    }
    onChangeCBU(value) {
        this.setState({
            CBU: value
        });
    }
    onChangeBanco(value) {
        this.setState({
            bankName: value
        });
    }
    onChangeVencimientos(value) {
        this.setState({
            vencimiento: value
        });
    }
    onChangeCuotas(value) {
        this.setState({
            cuotas: value
        });
    }

    onChangeInteres(value) {
        this.setState({
            interes: value
        });
    }

    onChangeTipoServicio(value) {
        this.setState({
            tipoServicio: value
        });
    }
    onChangeTipo(value) {
        this.setState({
            tipo: value
        });
    }

    onChangeMedio(value) {
        this.setState({
            medio: value
        });
    }

    onChangeDestino(value) {
        this.setState({
            destino: value
        });
    }

    onChangeFuente(value) {
        this.setState({
            fuente: value,
        });
    }

    onChangeCuenta(value) {
        this.setState({
            cuenta: value
        });
    }

    onChangeMoneda(value) {
        this.setState({
            moneda: value
        });
    }
    onChangeUserName(value) {
        this.setState({
            userName: value
        });
    }

    onChangePassword(value) {
        this.setState({
            password: value
        });
    }

    getFormData(data) {
        this.props.getFormData(data);
    }

    render() {
        if (this.props.type === 'Ingresos') {
            return renderIngresos(this);
        } else if (this.props.type === 'Egresos') {
            return renderEgresos(this);
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
        } else if(this.props.type === 'Cuenta') {
            return renderCuentaBancaria(this)
        }
    }
}



function renderIngresos(props) {
    return (
        <Container style={styles.container}>
            <Content>
                <Form scrollEnabled={false}>
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Monto"
                            placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}

                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Moneda"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.moneda}
                            onValueChange={props.onChangeMoneda.bind(props)}
                        >

                            <Picker.Item label="Moneda" value="" color="#697A8C" />
                            <Picker.Item label='Pesos' value='Pesos' color="#697A8C" />
                            <Picker.Item label='Dolares' value='Dolares' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Fuente"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.fuente}
                            onValueChange={props.onChangeFuente.bind(props)}
                        >
                            <Picker.Item label="Fuente" value="" color="#697A8C" />
                            <Picker.Item label='Alquiler' value='Alquiler' color="#697A8C" />
                            <Picker.Item label='Sueldo' value='Sueldo' color="#697A8C" />
                            <Picker.Item label='Facturacion' value='Facturacion' color="#697A8C" />
                            <Picker.Item label='Extraordinario' value='Extraordinario' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Medio"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.medio}
                            onValueChange={props.onChangeMedio.bind(props)}
                        >

                            <Picker.Item label="Medio" value="" color="#697A8C" />
                            <Picker.Item label='Efectivo' value='Efectivo' color="#697A8C" />
                            <Picker.Item label='Transferencia Bancaria' value='Transf.' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item style={props.state.medio === 'Transf.' ? { display: 'flex' } : { display: 'none' }} >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Cuentas vinculadas"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.cuenta}
                            onValueChange={props.onChangeCuenta.bind(props)}
                        >
                            <Picker.Item label="Cuentas vinculadas" value="" color="#697A8C" />
                            <Picker.Item label='Cuenta1' value='Cuenta1' color="#697A8C" />
                            <Picker.Item label='Cuenta2' value='Cuenta2' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
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
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Monto" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}
                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Moneda"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.moneda}
                            onValueChange={props.onChangeMoneda.bind(props)}
                        >
                            <Picker.Item label="Moneda" value="" color="#697A8C" />
                            <Picker.Item label='Pesos' value='Pesos' color="#697A8C" />
                            <Picker.Item label='Dolares' value='Dolares' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Tipo"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.tipo}
                            onValueChange={props.onChangeTipo.bind(props)}
                        >
                            <Picker.Item label="Tipo" value="" color="#697A8C" />
                            <Picker.Item label='Servicio' value='Servicio' color="#697A8C" />
                            <Picker.Item label='Impuestos Nacionales' value='Impuestos Nacionales' color="#697A8C" />
                            <Picker.Item label='Impuestos Provinciales' value='Impuestos Provinciales' color="#697A8C" />
                            <Picker.Item label='Impuestos Municipales' value='Impuestos Municipales' color="#697A8C" />
                            <Picker.Item label='Educacion' value='Educacion' color="#697A8C" />
                            <Picker.Item label='Salud' value='Salud' color="#697A8C" />
                            <Picker.Item label='Gastos Varios' value='Gastos Varios' color="#697A8C" />
                            <Picker.Item label='Comida' value='Comida' color="#697A8C" />
                            <Picker.Item label='Entretenimiento' value='Entretenimiento' color="#697A8C" />
                            <Picker.Item label='Viaticos' value='Viaticos' color="#697A8C" />
                            <Picker.Item label='Otros' value='Otros' color="#697A8C" />


                        </Picker>
                    </Item>
                    <Item style={props.state.tipo === 'Servicio' ? { display: 'flex' } : { display: 'none' }} >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Tipo de Servicio"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.tipoServicio}
                            onValueChange={props.onChangeTipoServicio.bind(props)}
                        >
                            <Picker.Item label="Tipo de Servicio" value="" color="#697A8C" />
                            <Picker.Item label='Luz' value='Luz' color="#697A8C" />
                            <Picker.Item label='Gas' value='Gas' color="#697A8C" />
                            <Picker.Item label='Agua' value='Agua' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item stackedLabel style={props.state.tipo === 'Otros' ? { display: 'flex' } : { display: 'none' }}>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Otros" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeOtros.bind(props)}
                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Medio"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.medio}
                            onValueChange={props.onChangeMedio.bind(props)}
                        >
                            <Picker.Item label="Medio" value="" color="#697A8C" />
                            <Picker.Item label='Efectivo' value='Efectivo' color="#697A8C" />
                            <Picker.Item label='Transferencia Bancaria' value='Transf.' color="#697A8C" />
                            <Picker.Item label='Tarjeta de Credito' value='Tarjeta de Credito' color="#697A8C" />
                            <Picker.Item label='Tarjeta de Debito' value='Tarjeta de Debito' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item style={props.state.medio === 'Tarjeta de Credito' ? { display: 'flex' } : { display: 'none' }} >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Cuotas"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.cuotas}
                            onValueChange={props.onChangeCuotas.bind(props)}
                        >
                            <Picker.Item label="Cuotas" value="" color="#697A8C" />
                            <Picker.Item label='3' value='3' color="#697A8C" />
                            <Picker.Item label='6' value='6' color="#697A8C" />
                            <Picker.Item label='12' value='12' color="#697A8C" />

                        </Picker>
                    </Item>
                    <Item stackedLabel style={props.state.medio === 'Tarjeta de Credito' ? { display: 'flex' } : { display: 'none' }}>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Interes" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeInteres.bind(props)}
                        />
                    </Item>
                    <Button style={styles.btnIngresar}>
                        <Text>SUBIR ARCHIVO</Text>
                    </Button>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
                                    cantidad: props.state.cantidad,
                                    tipo: props.state.tipo,
                                    medio: props.state.medio,
                                    moneda: props.state.moneda,
                                    interes: props.state.interes,
                                    cuotas: props.state.cuotas,
                                    otros: props.state.otros,
                                    tipoServicio: props.state.tipoServicio

                                })
                        }}>
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
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Monto" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Destinatario" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeDestino.bind(props)}
                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Moneda"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.moneda}
                            onValueChange={props.onChangeMoneda.bind(props)}
                        >
                            <Picker.Item label="Moneda" value="" color="#697A8C" />
                            <Picker.Item label='Pesos' value='Pesos' color="#697A8C" />
                            <Picker.Item label='Dolares' value='Dolares' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Medio"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.medio}
                            onValueChange={props.onChangeMedio.bind(props)}
                        >
                            <Picker.Item label="Medio" value="" color="#697A8C" />
                            <Picker.Item label='Efectivo' value='Efectivo' color="#697A8C" />
                            <Picker.Item label='Transferencia Bancaria' value='Transf.' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item style={props.state.medio === 'Transf.' ? { display: 'flex' } : { display: 'none' }} >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Cuentas vinculadas"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.cuenta}
                            onValueChange={props.onChangeCuenta.bind(props)}
                        >
                            <Picker.Item label="Cuentas vinculadas" value="" color="#697A8C" />
                            <Picker.Item label='Cuenta1' value='Cuenta1' color="#697A8C" />
                            <Picker.Item label='Cuenta2' value='Cuenta2' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
                                    cantidad: props.state.cantidad,
                                    destino: props.state.destino,
                                    medio: props.state.medio,
                                    type: 'Prestado',
                                    cuenta: props.state.cuenta,
                                    moneda: props.state.moneda

                                })
                        }}>
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
            <Content bounces={false} >
                <Form scrollEnabled={false}>
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Monto" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Propietario" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangePropietario.bind(props)}
                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Moneda"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.moneda}
                            onValueChange={props.onChangeMoneda.bind(props)}
                        >
                            <Picker.Item label="Moneda" value="" color="#697A8C" />
                            <Picker.Item label='Pesos' value='Pesos' color="#697A8C" />
                            <Picker.Item label='Dolares' value='Dolares' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Medio"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.medio}
                            onValueChange={props.onChangeMedio.bind(props)}
                        >
                            <Picker.Item label="Medio" value="" color="#697A8C" />

                            <Picker.Item label='Efectivo' value='Efectivo' color="#697A8C" />
                            <Picker.Item label='Transferencia Bancaria' value='Transf.' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item style={props.state.medio === 'Transf.' ? { display: 'flex' } : { display: 'none' }} >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Cuentas vinculadas"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.cuenta}
                            onValueChange={props.onChangeCuenta.bind(props)}
                        >
                            <Picker.Item label="Cuentas vinculadas" value="" color="#697A8C" />
                            <Picker.Item label='Cuenta1' value='Cuenta1' color="#697A8C" />
                            <Picker.Item label='Cuenta2' value='Cuenta2' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item  >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Cuotas"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.cuotas}
                            onValueChange={props.onChangeCuotas.bind(props)}
                        >
                            <Picker.Item label="Cuotas" value="" color="#697A8C" />
                            <Picker.Item label='3' value='3' color="#697A8C" />
                            <Picker.Item label='6' value='6' color="#697A8C" />
                            <Picker.Item label='12' value='12' color="#697A8C" />

                        </Picker>
                    </Item>
                    <Item>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Interes Mensual (%)" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeInteres.bind(props)}
                        />
                    </Item>
                    <Item>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Fecha primera cuota (DD-MM-YYYY)" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeVencimientos.bind(props)}
                        />
                    </Item>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
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
                        }}>
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
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Monto" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}
                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Tipo"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.tipo}
                            onValueChange={props.onChangeTipo.bind(props)}
                        >
                            <Picker.Item label="Tipo" value="" color="#697A8C" />
                            <Picker.Item label='Servicio' value='Servicio' color="#697A8C" />
                            <Picker.Item label='Impuestos Nacionales' value='Impuestos Nacionales' color="#697A8C" />
                            <Picker.Item label='Impuestos Provinciales' value='Impuestos Provinciales' color="#697A8C" />
                            <Picker.Item label='Impuestos Municipales' value='Impuestos Municipales' color="#697A8C" />
                            <Picker.Item label='Educacion' value='Educacion' color="#697A8C" />
                            <Picker.Item label='Salud' value='Salud' color="#697A8C" />
                            <Picker.Item label='Gastos Varios' value='Gastos Varios' color="#697A8C" />
                            <Picker.Item label='Comida' value='Comida' color="#697A8C" />
                            <Picker.Item label='Entretenimiento' value='Entretenimiento' color="#697A8C" />
                            <Picker.Item label='Viaticos' value='Viaticos' color="#697A8C" />
                            <Picker.Item label='Otros' value='Otros' color="#697A8C" />


                        </Picker>
                    </Item>

                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
                                    cantidad: props.state.cantidad,
                                    tipo: props.state.tipo
                                })
                        }}>
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
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Cantidad Invertida" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}
                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Tipo"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.tipo}
                            onValueChange={props.onChangeTipo.bind(props)}
                        >
                            <Picker.Item label="Tipo" value="" color="#697A8C" />
                            <Picker.Item label='Plazo Fijo' value='Plazo Fijo' color="#697A8C" />
                            <Picker.Item label='Compra de titulos' value='Compra de titulos' color="#697A8C" />
                            <Picker.Item label='Acciones' value='Acciones' color="#697A8C" />
                            <Picker.Item label='Bienes Raices' value='Bienes Raices' color="#697A8C" />
                            <Picker.Item label='Energias Renovables' value='Energias Renovables' color="#697A8C" />
                            <Picker.Item label='Divisas' value='Divisas' color="#697A8C" />
                            <Picker.Item label='Bono' value='Bono' color="#697A8C" />
                            <Picker.Item label='Comodities' value='Comodities' color="#697A8C" />
                            <Picker.Item label='Futuros' value='Futuros' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item stackedLabel style={props.state.tipo === 'Plazo Fijo' ? { display: 'flex' } : { display: 'none' }}>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Interes (%)" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeInteres.bind(props)}
                        />
                    </Item>
                    <Item stackedLabel style={props.state.tipo === 'Acciones' ? { display: 'flex' } : { display: 'none' }}>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Empresas" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeDestino.bind(props)}
                        />
                    </Item>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
                                    cantidad: props.state.cantidad,
                                    tipo: props.state.tipo,
                                    interes: props.state.interes,
                                    empresa: props.state.destino
                                })
                        }}>
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
            <Content >
                <Form >
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Usuario"
                            placeholderTextColor="#697A8C"
                            onChangeText={prop.onChangeUserName.bind(prop)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Contraseña"
                            placeholderTextColor="#697A8C"
                            onChangeText={prop.onChangePassword.bind(prop)}
                        />
                    </Item>

                    <Button
                        style={styles.btnIngresar}
                        onPress={() => actionButton('login', prop)}>
                        <Text>INGRESAR</Text>
                    </Button>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            prop.props.navigation.navigate('Sign In')
                        }}>
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
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Titular" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeTitular.bind(props)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="CBU"
                            placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCBU.bind(props)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Banco"
                            placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeBanco.bind(props)}
                        />
                    </Item>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
                                    titularName: props.state.titularName,
                                    CBU: props.state.CBU,
                                    bankName: props.state.bankName,
                                })
                        }}>
                        <Text>REGISTRAR</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}
 
function renderSingIn(prop) { 
    return (
        <Container style={styles.container}>
            <Content >
                <Form >
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Email"
                            placeholderTextColor="#697A8C"
                            onChangeText={prop.onChangeUserName.bind(prop)}

                        />
                    </Item>
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Contraseña"
                            placeholderTextColor="#697A8C"
                            onChangeText={prop.onChangePassword.bind(prop)}

                        />
                    </Item>

                    <Button
                        style={styles.btnIngresar}
                        onPress={() => actionButton('sign in', prop)}>
                        <Text>REGISTRARSE</Text>
                    </Button>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            prop.props.navigation.navigate('Login')
                        }}>
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
            prop.props.actionButton(prop.state.userName, prop.state.password);
        case 'sign in':
            prop.props.actionButton(prop.state.userName, prop.state.password);
        default:
            break;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0B1F35",
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
        justifyContent: "center",
        alignSelf: 'center'
    }
});
