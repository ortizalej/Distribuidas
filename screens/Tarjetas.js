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
import CountDown from 'react-native-countdown-component';
import { diff } from 'react-native-reanimated';
import NotificationPopup from 'react-native-push-notification-popup';
const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
    <View>
        <Text>{title}</Text>
        <Text>{body}</Text>
        <Button title='My button' onPress={() => console.log('Popup button onPress!')} />
    </View>
);
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
var startDate = moment("25-12-2015", "DD-MM-YYYY")
var endDate = moment("25-12-2100", "DD-MM-YYYY");
var differenceDate = moment.duration(endDate.diff(startDate)).asSeconds();

export default class Tarjetas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'Card',
            cards: [
                {
                    name: "Alejandro Ortiz",
                    number: 'XXXXXXXX2 123',
                    expiry: '22/11',
                    brand: "visa",
                },
                {
                    name: "Alejandro Ortiz",
                    number: 'XXXXXXXX2 452',
                    expiry: '12/04',
                    brand: "master-card",
                }
            ]
        }
    }
    defaultDate = 'Anual'
    colTable = ['Fecha', 'Cantidad', 'Moneda', ''];
    rowToShow = [
        ['02-09-2020', 1000, 'Pesos', ''],
        ['02-07-2020', 1000, 'Dolares', ''],
        ['13-01-2020', 1000, 'Pesos', '']
        // INIT QUERY
    ];

    rowtoDetail = [
        ['02-09-2020', 1000, 'Pesos', 'Medio', 'Fuente', 'Cuenta'],
        ['02-07-2020', 1000, 'Dolares', 'Medio', 'Fuente', 'Cuenta'],
        ['13-01-2020', 1000, 'Pesos', 'Medio', 'Fuente', 'Cuenta']
        // INIT QUERY
    ]
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
        } return (
            <Block style={styles.tarjetas}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <NotificationPopup
                        ref={ref => this.popup = ref}
                        renderPopupContent={renderCustomPopup}
                        shouldChildHandleResponderStart={true}
                        shouldChildHandleResponderMove={true} 
                        />
                    <Button
                        style={styles.btnNuevo}
                        onPress={() => this.props.navigation.navigate('Agregar Tarjeta')}
                    >
                        <Text style={{ fontWeight: "bold" }}>+</Text>
                    </Button>
                    <CarrouselCard items={this.state.cards} type={this.state.type} />
                    <Display style={styles.display}
                        ref={(display) => { this.Display = display }}
                        defaultDate={this.defaultDate}
                        defaultPesos={totalSumPesos}
                        defaultDolares={totalSumaDolares}
                        getDate={this.getDisplayFilter.bind(this)}
                    />
                    <CountDown
                        style={{ marginTop: 50 }}
                        until={differenceDate}
                        digitTxtStyle={{ fontSize: 12, color: 'black' }}
                        timeToShow={['D', 'H', 'M', 'S']}
                        onFinish={() => alert('finished')}
                        size={20}
                    />
                    <HistoricTable type={'Tarjetas'}
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

