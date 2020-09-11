import React from 'react';
import { StyleSheet, Dimensions, Text, Button, Alert, View, Picker, TextInput, Stack } from 'react-native';
import { Block } from 'galio-framework';
import { Checkbox, TextField } from '@fluentui/react-native';

const { width } = Dimensions.get('screen');

export default class Table extends React.Component {

    render() {
        if (this.props.type === 'Ingresos') {
            return ingresosScreen()
        } else {
            return (
                <View style={styles.container}>

                </View>
            );
        }

    }

}

function ingresosScreen() {
    return (
        <View style={styles.container}>
            <TextInput
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email"
            />
            <TextInput
                secureTextEntry
                autoCompleteType="password"
                placeholder="Password"
            />
            <Button title="Submit" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0B1F35',
        width: 270,
        flex: 1,
        padding: 15,
        marginTop: 30        
    }
});
