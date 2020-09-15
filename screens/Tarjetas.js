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
import moment from 'moment';

const { width, height } = Dimensions.get('screen');
function getMatchedData(dateFilter, rowValues) {
    let filterDataRows = [];
    switch (dateFilter) {
        case 'Mensual':
            let monthDate = moment().startOf('month')
            compareDates(monthDate, filterDataRows, rowValues)
            break;
        case 'Semestral':
            let semestralDate = moment().add(-6, 'M')
            compareDates(semestralDate, filterDataRows, rowValues)
            break;
        case 'Anual':
            let anualDate = moment().startOf('year')
            compareDates(anualDate, filterDataRows, rowValues)
            break;
    }
    return filterDataRows;

}
function compareDates(filterDate, filterDataRows, rowValues) {
    for (let i = 0; i < rowValues.length; i++) {
        let baseDate = moment(rowValues[i][0], 'DD-MM-YYYY');
        if (baseDate.isAfter(filterDate)) {
            filterDataRows.push(rowValues[i]);
        }
    }
}

function sumValues(rowValues) {
    let totalSum = 0;
    for (let i = 0; i < rowValues.length; i++) {
        if (!rowValues[i]) { continue; }
        totalSum += rowValues[i][1];
    }
    return totalSum;
}

export default class Tarjetas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'card',
            cards: [
                {
                    name: "Alejandro Ortiz",
                    number: 'XXXXXXXX2 123',
                    expiry: '22/11',
                    brand: "visa",
                }
            ],
            rowValues: [
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['02-09-2020', 1000, 'Tipo', 'Medio'],
                ['02-07-2020', 1000, 'Tipo', 'Medio'],
                ['13-01-2020', 1000, 'Tipo', 'Medio']
                // INIT QUERY
            ],
            colTable: ['Fecha', 'Cantidad', 'Tipo', 'Operacion']
        }
    }
    defaultDate = 'Mensual'
    defaultCoin = '$'
    getDisplayFilter(date) {
        if (this.state.rowValues.length > 0) {
            let filterData = getMatchedData(date, this.state.rowValues);
            let filterSum = sumValues(filterData)
            this.HistoricTable.updateState(filterData);
            this.Display.updateState(filterSum);
        }
    }

    render() {
        let totalSum = 0;
        for (let i = 0; i < this.state.rowValues.length; i++) {
            if (!this.state.rowValues[i]) { continue; }
            totalSum += this.state.rowValues[i][1];
        }
        return (
            <Block style={styles.tarjetas}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Button
                        style={styles.btnNuevo}
                        onPress={() => this.props.navigation.navigate('Agregar Tarjeta', { method: this })}

                    >
                        <Text style={{ fontWeight: "bold" }}>+</Text>
                    </Button>
                    <CarrouselCard items={this.state.cards} type={this.state.type} />
                    <Display style={styles.display}
                        ref={(display) => { this.Display = display }}

                        defaultBudget={totalSum}
                        defaultCoin={this.defaultCoin}
                        defaultDate={this.defaultDate}
                        getDate={this.getDisplayFilter.bind(this)}
                    />
                    <HistoricTable type={'Tarjetas'}
                        ref={(table) => { this.HistoricTable = table }}
                        cols={this.state.colTable}
                        rows={this.state.rowValues}
                    />
                </ScrollView>
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
    }
});

