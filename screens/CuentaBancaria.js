import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block } from 'galio-framework';
import CarrouselCard from '../components/CarrouselCard';
import Display from '../components/DisplayMount'
import HistoricTable from '../components/HistoricTable';
import {
    Button,
    Text,
    Picker
} from "native-base";
const { width, height } = Dimensions.get('screen');

export default class Tarjetas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'card',
            carouselItems: [
                {
                    name: "Item 1",
                    number: '12313123123',
                    cvc: '123',
                    brand: "visa",
                },
                {
                    name: "Item 1",
                    number: '12313123123',
                    cvc: '123',
                    brand: "visa",
                },
                {
                    name: "Item 1",
                    number: '12313123123',
                    cvc: '123',
                    brand: "visa",
                }
            ]
        }
    }
    defaultDate = 'Mensual'
    defaultBudget = '2400'
    defaultCoin = '$'
    render() {
        return (
            <Block style={styles.tarjetas}>
                <Button
                    style={styles.btnNuevo}
                    onPress={() => this.props.navigation.navigate('Agregar Tarjeta')}>

                        <Text>Nueva tarjeta</Text>
                </Button>
                <CarrouselCard items={this.state.carouselItems} type={this.state.type} />
                <Display style={styles.display}
                    defaultBudget={this.defaultBudget}
                    defaultCoin={this.defaultCoin}
                    defaultDate={this.defaultDate}
                />
                <HistoricTable type={'Ingresos'} />

            </Block>
        );
    }
}
const styles = StyleSheet.create({
    tarjetas: {
        width: width,
        height: height,
        backgroundColor: "#071019",
        alignContent: 'center'
    },
    btnNuevo: {
        width: 150,
        height: 33,
        backgroundColor: '#F41F1F',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        marginEnd: 30,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    }
});

