import React, { Component } from "react";
import { StyleSheet, View, Switch } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {
    Item,
    Picker,
    Container,
    Content,
    Form,
    Button,
    Text,
    Input
} from "native-base";
import DatePicker from 'react-native-datepicker';
import { color } from "react-native-reanimated";

let data = undefined;
export default class DisplayMount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cuenta: undefined,
            cierre: undefined,
            tipo: undefined,
            vencimiento: undefined
        };
    }
    onChangeCuenta(value) {
        this.setState({
            cuenta: value
        });
    }
    onChangeCierre(value) {
        this.setState({
            cierre: value
        });
    }
    onChangeVencimiento(value) {
        this.setState({
            vencimiento: value
        });
    }
    onChangeTipo(value) {
        this.setState({
            tipo: value
        });
    }

    _onChange = (formData) => { data = formData; };
    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Content>
                    <Form >
                        <Button style={styles.btnGoBack} onPress={() => goBack()}>
                            <Text style={{ fontWeight: "bold" }}>{'<'}Tarjetas</Text>
                        </Button>
                        <CreditCardInput
                            requiresName
                            label={{ number: "CARD", expiry: "EXPIRY", cvc: "CVC/CCV" }}
                            requiresCVC={false}
                            allowScroll={true}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                            validColor={"gray"}
                            invalidColor={"red"}
                            placeholderColor={"gray"}
                            inputContainerStyle={styles.inputCointaer}
                            onChange={this._onChange}
                        />
                        <Item >
                            <Picker
                                textStyle={{ color: '#697A8C' }}
                                placeholder="Tipo"
                                placeholderTextColor="#697A8C"
                                selectedValue={this.state.tipo}
                                onValueChange={this.onChangeTipo.bind(this)}
                            >
                                <Picker.Item label='Credito' value='Credito' color="#697A8C" />
                                <Picker.Item label='Debito' value='Debito' color="#697A8C" />
                            </Picker>
                        </Item>
                        <Item >
                            <Picker
                                textStyle={{ color: '#697A8C' }}
                                placeholder="Cuentas Bancarias"
                                placeholderTextColor="#697A8C"
                                selectedValue={this.state.cuenta}
                                onValueChange={this.onChangeCuenta.bind(this)}
                            >
                                <Picker.Item label='Cuenta 1' value='cuenta1' color="#697A8C" />
                                <Picker.Item label='Cuentas 2 ' value='cuenta2' color="#697A8C" />
                            </Picker>
                        </Item>
                        <Item stackedLabel>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.date} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Fecha de Cierre"
                                format="DD-MM-YYYY"
                                minDate="01-01-2016"
                                maxDate="01-01-2025"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
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
                                        color: "white"
                                    },
                                    dateText: {
                                        textAlign: 'left',
                                        fontSize: 14,
                                        color: 'white'
                                    }
                                }}
                                onDateChange={this.onChangeCierre.bind(this)}
                            />
                        </Item>
                        <Item stackedLabel>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.vencimiento} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Fecha de Vencimiento"
                                format="DD-MM-YYYY"
                                minDate="01-01-2016"
                                maxDate="01-01-2025"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
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
                                        color: "white"
                                    },
                                    dateText: {
                                        textAlign: 'left',
                                        fontSize: 14,
                                        color: 'white'
                                    }
                                }}
                                onDateChange={this.onChangeVencimiento.bind(this)}
                            />
                        </Item>
                        <Button style={styles.btnIngresar}
                            onPress={() => navigateWithParam(data.values, this.props, this.state.cuenta)}>
                            <Text>Agregar</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>

        );
    }
}
function navigateWithParam(data, props) {
    props.navigation.navigate(
        'Tarjetas',
        { data: data },
    )
}
const styles = StyleSheet.create({

    container: {
        backgroundColor: "#071019",
        paddingTop: 20
    },
    label: {
        color: "gray",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "gray",
    },
    inputCointaer: {
        borderBottomWidth: 1,
        borderBottomColor: "#071019"
    },
    btnIngresar: {
        width: 200,
        height: 33,
        backgroundColor: '#F41F1F',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        justifyContent: "center",
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
    }
});