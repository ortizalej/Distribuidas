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
export default class DisplayMount extends React.Component {
    addtionalInputsProps = {
        name: {
            defaultValue: 'my name',
            maxLength: 40,
        }
    };
    _onChange = (formData) => console.log(JSON.stringify(formData));
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Form >
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
                            onChange={this._onChange}
                            additionalInputsProps={this.addtionalInputsProps} />
                        <Picker
                            textStyle={{ color: '#697A8C' }}
                            placeholder="Cuenta Bancaria"
                            placeholderTextColor="#697A8C"

                        >
                            <Picker.Item label='Cuenta1' value='Cuenta1' color="#697A8C" />
                        </Picker>
                        <Button style={styles.btnIngresar}>
                            <Text>Agregar</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>

        );
    }
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
    }
});