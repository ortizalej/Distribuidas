import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block } from 'galio-framework';
import CarrouselCard from '../components/CarrouselCard';
import Display from '../components/DisplayMount'
import HistoricTable from '../components/HistoricTable';
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
            type: 'Bank',
            carouselItems: [
                {
                    bankName: 'SANTANDER RIO',
                    titularName: 'TESTING',
                    tipo: 'CUENTA DE AHORRO',
                    CBU: '123123123131231'
                },
                {
                    bankName: 'SANTANDER RIO',
                    titularName: 'TESTING',
                    tipo: 'CUENTA DE AHORRO',
                    CBU: '123123123131231'
                }
            ]
        }
    }
    defaultDate = 'Mensual'
    defaultBudget = '2400'
    defaultCoin = '$'
    rowValues = [
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
    ]

    colTable = ['Fecha', 'Cantidad', 'Tipo', 'Operacion']
    formData(data) {
        var now = moment().format('DD-MM-YYYY');
        let arrayData = [now, parseInt(data.cantidad), data.tipo, data.medio];
        this.rowValues.push(arrayData);
        let totalSum = this.sumValues(this.rowValues)
        this.HistoricTable.updateState(this.rowValues);
        this.Display.updateState(totalSum);
    }
    getDisplayFilter(date) {
        if (this.rowValues.length > 0) {
            let filterData = getMatchedData(date, this.rowValues);
            let filterSum = sumValues(filterData)
            this.HistoricTable.updateState(filterData);
            this.Display.updateState(filterSum);
        }
    }
    render() {
        let totalSum = 0;
        for (let i = 0; i < this.rowValues.length; i++) {
            if (!this.rowValues[i]) { continue; }
            totalSum += this.rowValues[i][1];
        }
        return (
            <Block style={styles.tarjetas}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <CarrouselCard
                        items={this.state.carouselItems}
                        type={this.state.type}
                    />
                    <Display
                        ref={(display) => { this.Display = display }}
                        defaultDate={this.defaultDate}
                        defaultBudget={totalSum}
                        defaultCoin={this.defaultCoin}
                        getDate={this.getDisplayFilter.bind(this)}

                    />
                    <HistoricTable type={'Tarjetas'}
                        ref={(table) => { this.HistoricTable = table }}
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

