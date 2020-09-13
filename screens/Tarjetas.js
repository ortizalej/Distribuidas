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
            cards: [
                {
                    name: "Item 1",
                    number: '12313123123',
                    cvc: '123',
                    brand: "visa",
                }
            ],
            rowValues: [

            ],
            colTable: ['Fecha', 'Cantidad', 'Tipo', 'Operacion']
        }
    }
    defaultDate = 'Mensual'
    defaultCoin = '$'
    render() {
        let totalSum = 0;
        for (let i = 0; i < this.state.rowValues.length; i++) {
            if (!this.state.rowValues[i]) { continue; }
            totalSum += this.state.rowValues[i][1];
        }
        return (
            <Block style={styles.tarjetas}>
                <Button
                    style={styles.btnNuevo}
                    onPress={() => this.props.navigation.navigate('Agregar Tarjeta')}

                    >
                    <Text style={{ fontWeight: "bold" }}>+</Text>
                </Button>
                <CarrouselCard items={this.state.cards} type={this.state.type} />
                <Display style={styles.display}
                    defaultBudget={this.defaultBudget}
                    defaultCoin={this.defaultCoin}
                    defaultDate={this.defaultDate}
                />
                <HistoricTable type={'Tarjetas'}
                    ref={(table) => { this.HistoricTable = table }}
                    cols={this.state.colTable}
                    rows={this.state.rowValues}
                />
            </Block>
        );
    }
}
const styles = StyleSheet.create({
    tarjetas: {
        height: height,
        width: width,
        backgroundColor: "#071019"
    },
    btnNuevo: {
        width: 50,
        height: 33,
        backgroundColor: '#F41F1F',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        marginEnd: 46,
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    display: {
        marginTop: 5,
        marginLeft: 20
    }
});

