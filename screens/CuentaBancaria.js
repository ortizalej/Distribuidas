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
    let totalSumPesos = 0;
    let totalSumaDolares = 0;
    let sumas = []
    for (let i = 0; i < rowValues.length; i++) {
        if (!rowValues[i]) { continue; }
        if (rowValues[i][2] === 'Pesos') {
            totalSumPesos += rowValues[i][1];
        } else if (rowValues[i][2] === 'Dolares') {
            totalSumaDolares += rowValues[i][1]
        }
    }
    sumas.push(totalSumPesos);
    sumas.push(totalSumaDolares)
    return sumas;
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

    rowToShow = [
        ['02-09-2020', 1000, 'Pesos', ''],
        ['02-07-2020', 1000, 'Dolares', ''],
        ['13-01-2020', 1000, 'Pesos', '']
        // INIT QUERY
    ];

    rowtoDetail = [
        ['02-09-2020', 1000, 'Pesos', 'Santander', 'Titular', 'Tipo'],
        ['02-07-2020', 1000, 'Dolares', 'Santander', 'Titular', 'Tipo'],
        ['13-01-2020', 1000, 'Pesos', 'Santander', 'Titular', 'Tipo']
        // INIT QUERY
    ]

    colTable = ['Fecha', 'Cantidad', 'Tipo', 'Operacion']
    formData(data) {
        console.log(data)
        var now = moment().format('DD-MM-YYYY');
        let arrayDataToShow = [now, parseInt(data.cantidad), data.moneda, ''];
        let arrayData = [now, parseInt(data.cantidad), data.moneda, data.medio, data.fuente, data.cuenta]
        this.rowtoDetail.push(arrayData);
        this.rowToShow.push(arrayDataToShow);
        let totalSumPesos = sumValues(this.rowtoDetail)[0]
        let totalSumDolares = sumValues(this.rowtoDetail)[1]
        this.HistoricTable.updateState(this.rowToShow);
        this.Display.updateState(totalSumPesos, totalSumDolares);
    }
    getDisplayFilter(date) {
        if (this.rowtoDetail.length > 0) {
            let filterDataToShow = getMatchedData(date, this.rowToShow);
            let filterData = getMatchedData(date, this.rowtoDetail);
            let filterSumPesos = sumValues(filterData)[0]
            let filterSumDolares = sumValues(filterData)[1]
            this.HistoricTable.updateState(filterDataToShow);
            this.Display.updateState(filterSumPesos, filterSumDolares);
        }
    }
    deleteRow(index) {
        this.rowtoDetail.splice(index, 1);
        this.rowToShow.splice(index, 1);
        let totalSumPesos = sumValues(this.rowtoDetail)[0]
        let totalSumDolares = sumValues(this.rowtoDetail)[1]
        this.HistoricTable.updateState(this.rowToShow);
        this.Display.updateState(totalSumPesos, totalSumDolares);
    }
    render() {
        let totalSumPesos = 0;
        let totalSumaDolares = 0;
        for (let i = 0; i < this.rowtoDetail.length; i++) {
            if (!this.rowtoDetail[i]) { continue; }
            if (this.rowtoDetail[i][2] === 'Pesos') {
                totalSumPesos += this.rowtoDetail[i][1];
            } else if (this.rowtoDetail[i][2] === 'Dolares') {
                totalSumaDolares += this.rowtoDetail[i][1]
            }
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
                        defaultPesos={totalSumPesos}
                        defaultDolares={totalSumaDolares}
                        getDate={this.getDisplayFilter.bind(this)}

                    />
                    <HistoricTable type={'Cuenta'}
                        ref={(table) => { this.HistoricTable = table }}
                        cols={this.colTable}
                        rows={this.rowToShow}
                        detailRows={this.rowtoDetail}
                        deleteRow={this.deleteRow.bind(this)}
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

