import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import {
    Container,
    Header,
    Title,
    Content,
    Item,
    Label,
    Input,
    Body,
    Left,
    Right,
    Icon,
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
        if (this.props.type === 'Ingresos') {
            return renderIngresos(this);
        } else if (this.props.type === 'Egresos') {
            return renderEgresos(this);
        } else if (this.props.type === 'Prestamos Prestados') {
            return renderPrestamosPrestados(this)
        } else if (this.props.type === 'Prestamos Tomados') {
            return renderPrestamosTomados(this)
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
                            <Picker.Item label='Transferencia Bancaria' value='transferencia' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Item style={props.state.tipo === 'transferencia' ? { display: 'flex' } : { display: 'none' }} >
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
                                    fecha: '12/12/12',
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
                            <Picker.Item label='Transferencia Bancaria' value='transferencia' color="#697A8C" />
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
                                    fecha: '12/12/12',
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
                            <Picker.Item label='Transferencia Bancaria' value='transferencia' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
                                    fecha: '12/12/12',
                                    cantidad: props.state.cantidad,
                                    destino: props.state.destino,
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
                            <Picker.Item label='Transferencia Bancaria' value='transferencia' color="#697A8C" />
                        </Picker>
                    </Item>
                    <Button
                        style={styles.btnIngresar}
                        onPress={() => {
                            props.getFormData(
                                {
                                    fecha: '12/12/12',
                                    cantidad: props.state.cantidad,
                                    destino: props.state.destino,
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0B1F35",
        width: 320,
        height: 290,
        paddingRight: 15,
        marginTop: 20,
        borderRadius: 20
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
