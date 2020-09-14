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
    Text
} from "native-base";
let data = undefined;
export default class DisplayMount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cuenta: undefined
        };
    }
    onChangeCuenta(value) {
        this.setState({
            cuenta: value
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
                            requiresCVC
                            allowScroll={true}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                            validColor={"gray"}
                            invalidColor={"red"}
                            placeholderColor={"gray"}
                            inputContainerStyle={styles.inputCointaer}
                            onChange={this._onChange} />

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
                        <Button style={styles.btnIngresar}
                            onPress={() => navigateWithParam(data.values, this.props,this.state.cuenta)}
                        >
                            <Text>Agregar</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>

        );
    }
}
function navigateWithParam(data, props, bankAccount) {
    data.cuenta = bankAccount;
    console.log(data)
    props.navigation.navigate(
        'Tarjetas',
        { data },
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