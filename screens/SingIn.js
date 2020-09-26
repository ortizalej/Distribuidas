import React from 'react';
import { StyleSheet, Dimensions, ScrollView,AsyncStorage } from 'react-native';
import { Button, Block } from 'galio-framework';
import Form from '../components/Formulario';
const { width, height } = Dimensions.get('screen');

export default class SignIn extends React.Component {
    
    actionButton(userName, password) {
        let insertUser = {

        }
        console.log(userName)
        console.log(password)
        // AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
        //     console.log(value)
        // }).then(res => {
        //     console.log('RES', res)
        // });
    }
    render() {
        return (
            <Block center style={styles.singin}>
                <ScrollView>
                    <Form
                        type={'SingIn'}
                        navigation={this.props.navigation}
                        actionButton={this.actionButton.bind(this)}


                    />
                </ScrollView>
            </Block>
        );
    }

}

const styles = StyleSheet.create({
    singin: {
        width: width,
        height: height,
        backgroundColor: "#071019"
    }
});

