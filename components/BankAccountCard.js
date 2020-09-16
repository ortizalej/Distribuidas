import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Modal, TouchableHighlight } from 'react-native';
import { Block } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Item,
    Label,
    Text,
    Picker
} from "native-base";

export default class DisplayMount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankName: props.bankName,
            titularName: props.titularName,
            tipo: props.tipo,
            CBU: props.CBU
        }
    }
    updateState(value) {
        this.setState(
            {
                defaultBudget: value
            }
        )
    }


    render() {
        return (
            <Block center >
                <View style={styles.buttonStyle}>
                    <LinearGradient colors={['#FF004E', '#FF9040']} style={styles.linearGradient} start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }} >
                        <Text
                            style={styles.bankNameTest}>
                            {this.state.bankName}
                        </Text>
                        <Text
                            style={styles.labelText}>
                            Titular
                        </Text>
                        <Text
                            style={styles.valueText}>
                            {this.state.titularName}
                        </Text>
                        <Text
                            style={styles.labelText}>
                            Tipo
                        </Text>
                        <Text
                            style={styles.valueText}>
                            {this.state.tipo}
                        </Text>
                        <Text
                            style={styles.labelText}>
                            CBU
                        </Text>
                        <Text
                            style={styles.valueText}>
                            {this.state.CBU}
                        </Text>
                    </LinearGradient>
                </View>
            </Block>

        );
    }

}

const styles = StyleSheet.create({

    linearGradient: {
        borderRadius: 12,
        height: 185,
        width: 290,
        paddingLeft: 20,
        marginTop: 30,
        paddingTop: 20
    },
    bankNameTest: {
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#fff',

    },
    labelText: {
        backgroundColor: 'transparent',
        fontSize: 12,
        color: 'gray',
    },
    valueText: {
        backgroundColor: 'transparent',
        fontSize: 12,
        color: '#fff'
    },

    budgetText: {
        backgroundColor: 'transparent',
        fontSize: 34,
        color: '#fff',
    }
});
