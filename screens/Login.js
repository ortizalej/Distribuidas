import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Display from '../components/DisplayMount';
import Form from '../components/Formulario';
import HistoricTable from '../components/HistoricTable';
const { width, height } = Dimensions.get('screen');

export default class Login extends React.Component {

    render() {
        return (
            <Block center style={styles.login}>
                <ScrollView>
                    <Form
                        type={'Login'} 
                        navigation ={this.props.navigation}
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

