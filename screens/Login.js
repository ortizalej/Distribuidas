import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Snackbar, AsyncStorage } from 'react-native';
import { Button, Block } from 'galio-framework';
import Form from '../components/Formulario';
const { width, height } = Dimensions.get('screen');

export default class Login extends React.Component {

    actionButton(userName, password) {
        this.props.navigation.navigate("Home")
        // AsyncStorage.getItem(userName + "-" + password).then((value) => {
        //     console.log(value)
        // }).then(res => {
        //         console.log('RES',res)
        //     }); 
    }

    render() {
        return (
            <Block center style={styles.login}>

                <ScrollView>
                    <Form
                        type={'Login'}
                        navigation={this.props.navigation}
                        actionButton={this.actionButton.bind(this)}
                    />
                </ScrollView>
            </Block>
        );
    }

}

const styles = StyleSheet.create({
    login: {
        width: width,
        height: height,
        backgroundColor: "#071019"
    }
});

