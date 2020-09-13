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
            type: 'Card',
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
    defaultCoin = '$'
    colTable = ['Fecha', 'Cantidad', 'Tipo', 'Operacion'];
    rowValues = [
        ['1', 200, '3', '4'],
        ['a', 300, 'c', 'd'],
        ['1', 300, '3', '456\n789'],
        ['a', 300, 'c', 'd']
        ['1', 300, '3', '4'],
        ['a', 300, 'c', 'd'],
        ['1', 300, '3', '456\n789'],
        ['1', 200, '3', '4'],
        ['a', 300, 'c', 'd'],
        ['1', 300, '3', '456\n789'],
        ['a', 300, 'c', 'd']
        ['1', 300, '3', '4'],
        ['a', 300, 'c', 'd'],
        ['1', 300, '3', '456\n789']
    ];
    render() {
        let totalSum = 0;
        for (let i = 0; i < this.rowValues.length; i++) {
            if (!this.rowValues[i]) { continue; }
            totalSum += this.rowValues[i][1];
        }
        return (
            <Block style={styles.tarjetas}>
                <ScrollView>

                    <Button
                        style={styles.btnNuevo}
                        onPress={() => this.props.navigation.navigate('Agregar Tarjeta')}>

                        <Text>Nueva tarjeta</Text>
                    </Button>
                    <CarrouselCard items={this.state.carouselItems} type={this.state.type} />
                    <Display style={styles.display}
                        defaultBudget={totalSum}
                        defaultCoin={this.defaultCoin}
                        defaultDate={this.defaultDate}
                    />
                    <HistoricTable type={'Egresos'}
                        cols={this.colTable}
                        rows={this.rowValues}
                    />
                </ScrollView>
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

