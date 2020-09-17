import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Form from '../components/Formulario';
const { width, height } = Dimensions.get('screen');

export default class SignIn extends React.Component {

    render() {
        return (
            <Block center style={styles.singin}>
                <ScrollView>
                    <Form
                        type={'SingIn'}
                        navigation ={this.props.navigation}

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

