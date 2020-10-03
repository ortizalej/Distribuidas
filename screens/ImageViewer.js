import React from 'react'
import { StyleSheet, Dimensions, ScrollView, AsyncStorage, ImageBackground, View, Image } from 'react-native'
import { Button, Block } from 'galio-framework'
import { showMessage, hideMessage } from 'react-native-flash-message'
import Form from '../components/Formulario'

const { width, height } = Dimensions.get('screen')

export default class ImageViewer extends React.Component {
    render() {
        return (
            <View>
                <Image source={{uri: this.props.data}} style={
                    { width: 200, height: 200, alignContent:"center",marginLeft: 60, marginTop: -100, marginBottom: 200}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    login: {
        width: width,
        height: height
    },
    backgoundContainer: {
        flex: 1,
        width: 500,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
