import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Platform, AsyncStorage } from 'react-native';
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
import DatePicker from 'react-native-datepicker'


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
    defaultDate = 'Anual'
    colTable = ['Fecha', 'Cantidad', 'Moneda', ''];
    differenceDate = 0;
    constructor(props) {
        super(props);
        this.state = {
            type: 'Card',
            cards: [],
            rowToShow: [],
            rowtoDetail: [],
            data: undefined
        }
    }

    totalSumPesos = 0
    totalSumDolares = 0

    getTarjetasData(data) {
        AsyncStorage.getItem(data.userName + "-" + data.password).then((value) => {
            let userData = JSON.parse(value)
            this.state.data = userData
            let actualCard = this.state.data.tarjetas[0]

            let arrayDataDetail = [];
            let showData = [];

            if (userData.egresos.length > 0) {
                for (let i = 0; i < userData.egresos.length; i++) {
                    if (actualCard.numero.replace(/ /g,'') === userData.egresos[i][8]) {
                        arrayDataDetail.push(
                            [
                                userData.egresos[i][0],
                                userData.egresos[i][1],
                                userData.egresos[i][2],
                                userData.egresos[i][3],
                                userData.egresos[i][4],
                                userData.egresos[i][5],
                                userData.egresos[i][6],
                                userData.egresos[i][7],
                                userData.egresos[i][8],
                                userData.egresos[i][9],
                                userData.egresos[i][10],
                            ]
                        );

                        showData.push(
                            [
                                userData.egresos[i][0],
                                userData.egresos[i][1],
                                userData.egresos[i][2],
                                ''
                            ]);
                    }
                }
            }
            this.setState({
                rowToShow: showData,
                rowtoDetail: arrayDataDetail
            })
            
            for (let i = 0; i < this.state.rowtoDetail.length; i++) {
                if (!this.state.rowtoDetail[i]) { continue; }
                if (this.state.rowtoDetail[i][2] === 'Pesos') {
                    this.totalSumPesos += this.state.rowtoDetail[i][1];
                } else if (this.state.rowtoDetail[i][2] === 'Dolares') {
                    this.totalSumDolares += this.state.rowtoDetail[i][1];
                }
            }

            this.Display.updateState(this.totalSumPesos, this.totalSumDolares);
            this.HistoricTable.updateState(this.state.rowToShow);
            var startDate = moment("DD-MM-YYYY")
            var endDate = moment("25-12-2016", "DD-MM-YYYY");
            // this.differenceDate = moment.duration(endDate.diff(startDate)).asSeconds();
            // this.CountDown.until = differenceDate
        })
    }

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

    render() {
        let userData = this.props.route.params
        if (!this.state.data) {
            this.getTarjetasData(userData)
        }
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
                    {0 > 0 ?
                        <CountDown
                            ref={(countdown) => { this.CountDown = countdown }}

                            style={{ marginTop: 50 }}
                            until={0}
                            digitTxtStyle={{ fontSize: 12, color: 'black' }}
                            timeToShow={['D', 'H', 'M', 'S']}
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
                        />
                    }
                    <HistoricTable type={'Tarjetas'}
                        ref={(table) => { this.HistoricTable = table }}
                        cols={this.colTable}
                        rows={[]}
                        detailRows={[]}
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
        title: 'Actualizar la fecha de vencimiento',
        body: 'Recuerda actualizar la fecha de Vencimiento de tu tarjeta',
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

