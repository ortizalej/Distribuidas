import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme, View } from 'galio-framework';
import Form from '../components/Formulario'
import Carrousel from '../components/CarrouselCard'
const { width, height } = Dimensions.get('screen');

export default class Inversiones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: [20, 45, 28, 80, 99, 43],
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ],
                legend: ["Plazo Fijo"] // optional
            },
            {
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: [20, 45, 28, 80, 99, 43],
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ],
                legend: ["Acciones"] // optional
            }]
        }
    }


    render() {
        return (
            <Block style={styles.inversiones}>
                <ScrollView>
                    <Form type={'Inversiones'} />
                    <Carrousel items={this.state.items} type={'Inversiones'} />
                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    inversiones: {
        width: width,
        backgroundColor: "#071019",
        height: height
    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    titleGraph: {
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#fff',
        marginLeft: 10
    }
});

