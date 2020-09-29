import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Platform } from 'react-native';
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
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

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
var endDate = moment("25-12-2016", "DD-MM-YYYY");
var differenceDate = moment.duration(endDate.diff(startDate)).asSeconds();

export default class Tarjetas extends React.Component {
    defaultDate = 'Anual'
    colTable = ['Fecha', 'Cantidad', 'Moneda', ''];
    constructor(props) {
        super(props);
        this.state = {
            type: 'Card',
            cards: [
                // {
                //     name: "Alejandro Ortiz",
                //     number: 'XXXXXXXX2 123',
                //     expiry: '22/11',
                //     brand: "visa",
                // },
                // {
                //     name: "Alejandro Ortiz",
                //     number: 'XXXXXXXX2 452',
                //     expiry: '12/04',
                //     brand: "master-card",
                // }
            ],
            rowToShow: [],

            rowtoDetail: []
        }
    }
    // insertData(arrayData) { 
    //     this.state.data.ingresos.push(arrayData)
    //     AsyncStorage.mergeItem(
    //         this.state.data.seguridad.userName + '-' + this.state.data.seguridad.password,
    //         JSON.stringify(this.state.data),
    //         (value) => {
    //             console.log(value)
    //         })
    // }

    // deleteData(ingresosItems) {
    //     this.state.data.ingresos = ingresosItems
    //     AsyncStorage.mergeItem(
    //         this.state.data.seguridad.userName + '-' + this.state.data.seguridad.password,
    //         JSON.stringify(this.state.data),
    //         (value) => {
    //             console.log(value)
    //         })
    // }

    formData(data) {
        var now = moment().format('DD-MM-YYYY');
        let arrayDataToShow = [now, parseInt(data.cantidad), data.moneda, ''];
        let arrayData = [now, parseInt(data.cantidad), data.moneda, data.medio, data.fuente, data.cuenta]
        this.state.rowtoDetail.push(arrayData);
        this.state.rowtoshow.push(arrayDataToShow);
        let totalSumPesos = sumValues(this.state.rowtoDetail)[0]
        let totalSumDolares = sumValues(this.state.rowtoDetail)[1]
        this.HistoricTable.updateState(this.state.rowtoshow);
        this.Display.updateState(totalSumPesos, totalSumDolares);
    }
    getDisplayFilter(date) {
        if (this.state.rowtoDetail.length > 0) {
            let filterDataToShow = getMatchedData(date, this.state.rowtoshow);
            let filterData = getMatchedData(date, this.state.rowtoDetail);
            let filterSumPesos = sumValues(filterData)[0]
            let filterSumDolares = sumValues(filterData)[1]
            this.HistoricTable.updateState(filterDataToShow);
            this.Display.updateState(filterSumPesos, filterSumDolares);
        }
    }
    deleteRow(index) {
        this.state.rowtoDetail.splice(index, 1);
        this.state.rowtoshow.splice(index, 1);
        let totalSumPesos = sumValues(this.state.rowtoDetail)[0]
        let totalSumDolares = sumValues(this.state.rowtoDetail)[1]
        this.HistoricTable.updateState(this.state.rowtoshow);
        this.Display.updateState(totalSumPesos, totalSumDolares);
    }

    render() {
        let totalSumPesos = 0;
        let totalSumaDolares = 0;
        for (let i = 0; i < this.state.rowtoDetail.length; i++) {
            if (!this.state.rowtoDetail[i]) { continue; }
            if (this.state.rowtoDetail[i][2] === 'Pesos') {
                totalSumPesos += this.state.rowtoDetail[i][1];
            } else if (this.state.rowtoDetail[i][2] === 'Dolares') {
                totalSumaDolares += this.state.rowtoDetail[i][1]
            }
        }
        return (

            <Block style={styles.tarjetas}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <Button
                        style={styles.btnNuevo}
                        onPress={() => this.props.navigation.navigate('Agregar Tarjeta')}
                    >
                        <Text style={{ fontWeight: "bold" }}>+</Text>
                    </Button>
                    <CarrouselCard
                        items={this.state.cards}
                        type={this.state.type}
                    />
                    <Display style={styles.display}
                        ref={(display) => { this.Display = display }}
                        defaultDate={this.defaultDate}
                        defaultPesos={totalSumPesos}
                        defaultDolares={totalSumaDolares}
                        getDate={this.getDisplayFilter.bind(this)}
                    />
                    {differenceDate > 0 ?
                        <CountDown
                            style={{ marginTop: 50 }}
                            until={differenceDate}
                            digitTxtStyle={{ fontSize: 12, color: 'black' }}
                            timeToShow={['D', 'H', 'M', 'S']}
                            onFinish={() => alert('finished')}
                            size={20}
                            onFinish={componentWillMount}
                            onPress={componentWillMount}
                        />
                        :
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.vencimiento} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="Fecha de Vencimiento"
                            format="DD-MM-YYYY"
                            minDate="01-01-2016"
                            maxDate="01-01-2025"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    marginTop: 20

                                },
                                placeholderText: {
                                    fontSize: 14,
                                    color: "white"
                                },
                                dateText: {
                                    textAlign: 'left',
                                    fontSize: 14,
                                    color: 'white'
                                }
                            }}
                            onDateChange={this.onChangeVencimiento.bind(this)}
                        />
                    }
                    <HistoricTable type={'Tarjetas'}
                        ref={(table) => { this.HistoricTable = table }}
                        cols={this.colTable}
                        rows={[]}
                        detailRows={[]}
                        deleteRow={this.deleteRow.bind(this)}
                    />
                </ScrollView>
            </Block>
        );
    }
}

async function componentWillMount(title, message) {
    // get expo push token
    const token = await Notifications.getExpoPushTokenAsync()
    console.log(token)
    let body = JSON.stringify({
        to: token,
        title: 'New Notification',
        body: 'The notification worked!',
    })
    console.log(body)
    fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate',
        },
        body: body,
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => { console.log(error) });
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

