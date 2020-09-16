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
            destino: undefined
        };
    }
    onChangeCantidad(value) {
        this.setState({
            cantidad: value
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
    getFormData(data) {
        this.props.getFormData(data);
    }

    render() {
        console.log(this.props.type)
        if (this.props.type === 'Ingresos') {
            return renderIngresos(this);
        } else if (this.props.type === 'Egresos') {
            return renderEgresos(this);
        } else if (this.props.type === 'Prestamos Prestados') {
            return renderPrestamosPrestados(this)
        } else if (this.props.type === 'Prestamos Tomados') {
            return renderPrestamosTomados(this)
        } else if (this.props.type === 'Login') {
            const { navigation } = this.props;
            return renderLogin(navigation)
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
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Cantidad en $"
                            placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}

                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Fuente"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.fuente}
                            onValueChange={props.onChangeFuente.bind(props)}
                        >
                            <Picker.Item label='Alquiler de Propiedad' value='alquiler' color="#697A8C" />
                            <Picker.Item label='Sueldo' value='sueldo' color="#697A8C" />
                            <Picker.Item label='Facturacion' value='facturacion' color="#697A8C" />
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
                            <Picker.Item label='Efectivo' value='efectivo' color="#697A8C" />
                            <Picker.Item label='Transferencia Bancaria' value='transf.' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item style={props.state.tipo === 'transf.' ? { display: 'flex' } : { display: 'none' }} >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Cuenta"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.cuenta}
                            onValueChange={props.onChangeCuenta.bind(props)}
                        >
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
                                    tipo: props.state.tipo,
                                    fuente: props.state.fuente
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
                            placeholder="Cantidad en $" placeholderTextColor="#697A8C"
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
                            <Picker.Item label='Alquiler de Propiedad' value='alquiler' color="#697A8C" />
                            <Picker.Item label='Sueldo' value='sueldo' color="#697A8C" />
                            <Picker.Item label='Facturacion' value='facturacion' color="#697A8C" />
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
                            <Picker.Item label='Efectivo' value='efectivo' color="#697A8C" />
                            <Picker.Item label='Transferencia Bancaria' value='transf.' color="#697A8C" />
                        </Picker>
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
                                    medio: props.state.medio
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
                            placeholder="Cantidad en $" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}
                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Destinatario"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.destino}
                            onValueChange={props.onChangeDestino.bind(props)}
                        >
                            <Picker.Item label='Alquiler de Propiedad' value='alquiler' color="#697A8C" />
                            <Picker.Item label='Sueldo' value='sueldo' color="#697A8C" />
                            <Picker.Item label='Facturacion' value='facturacion' color="#697A8C" />
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
                            <Picker.Item label='Efectivo' value='efectivo' color="#697A8C" />
                            <Picker.Item label='Transferencia Bancaria' value='transf.' color="#697A8C" />
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
                                    type: 'Prestado'
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
            <Content bounces={false}>
                <Form scrollEnabled={false}>
                    <Item stackedLabel>
                        <Input
                            keyboardType="number-pad"
                            style={{ color: "#697A8C" }}
                            placeholder="Cantidad en $" placeholderTextColor="#697A8C"
                            onChangeText={props.onChangeCantidad.bind(props)}
                        />
                    </Item>
                    <Item >
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Destinatario"
                            placeholderTextColor="#697A8C"
                            selectedValue={props.state.destino}
                            onValueChange={props.onChangeDestino.bind(props)}
                        >
                            <Picker.Item label='Alquiler de Propiedad' value='alquiler' color="#697A8C" />
                            <Picker.Item label='Sueldo' value='sueldo' color="#697A8C" />
                            <Picker.Item label='Facturacion' value='facturacion' color="#697A8C" />
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
                            <Picker.Item label='Efectivo' value='efectivo' color="#697A8C" />
                            <Picker.Item label='Transferencia Bancaria' value='transf.' color="#697A8C" />
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
                            placeholder="Cantidad en $" placeholderTextColor="#697A8C"
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
                            <Picker.Item label='Ocio' value='Ocio' color="#697A8C" />
                            <Picker.Item label='Servicios' value='Servicios' color="#697A8C" />
                            <Picker.Item label='Comida' value='Comida' color="#697A8C" />

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
    const tipoDeInversion = [
        'Plazo Fijo',
        'Compra de Titulos'
    ]
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
                            selectedValue={props.state.medio}
                            onValueChange={props.onChangeMedio.bind(props)}
                        >

                            <Picker.Item label='Plazo Flijo' value='Plazo Fijo' color="#697A8C" />
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
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
                                    cantidad: props.state.cantidad
                                })
                        }}>
                        <Text>REGISTRAR</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}
function renderLogin(navigation) {
    return (
        <Container style={styles.container}>
            <Content >
                <Form >
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Usuario" placeholderTextColor="#697A8C"
                        />
                    </Item>
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Contraseña" placeholderTextColor="#697A8C"
                        />
                    </Item>

                    <Button
                        style={styles.btnIngresar}
                        onPress={() => navigation.navigate("Home")}>
                        <Text>INGRESAR</Text>
                    </Button>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            prop.navigation.navigate('Sing In')
                        }}>
                        <Text>REGISTRARSE</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

function renderSingIn(navigation) {
    return (
        <Container style={styles.container}>
            <Content >
                <Form >
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Email" placeholderTextColor="#697A8C"
                        />
                    </Item>
                    <Item stackedLabel>
                        <Input
                            style={{ color: "#697A8C" }}
                            placeholder="Contraseña" placeholderTextColor="#697A8C"
                        />
                    </Item>

                    <Button
                        style={styles.btnIngresar}
                        onPress={() => navigation.navigate("Home")}>
                        <Text>REGISTRARSE</Text>
                    </Button>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            prop.navigation.navigate('Sing In')
                        }}>
                        <Text>Volver</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
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
