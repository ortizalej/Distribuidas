import React from 'react';
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { Block } from 'galio-framework';
import CarrouselCard from '../components/CarrouselCard';
import Display from '../components/DisplayMount'
import HistoricTable from '../components/HistoricTable';
import moment from 'moment';
import Form from '../components/Formulario'
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
    colTable = ['Fecha', 'Cantidad', 'Tipo', '']

    constructor(props) {
        super(props);
        this.state = {
            type: 'Bank',
            carouselItems: [],
            rowToShow: [],
            rowtoDetail: [],
            data: undefined

        }
    }

    getCuentaData(data) {

        AsyncStorage.getItem(data.userName + "-" + data.password).then((value) => {
            let userData = JSON.parse(value)
            this.state.data = userData
            console.log('CUENTAS', JSON.stringify(this.state.data.cuentasBancarias))
            this.Carrousel.updateState(this.state.data.cuentasBancarias)

            let arrayDataDetail = [];
            let showData = [];
            // if (userData.ingresos.length > 0) {


            //     for (let i = 0; i < userData.ingresos.length; i++) {
            //         arrayDataDetail.push(
            //             [
            //                 userData.ingresos[i][0],
            //                 userData.ingresos[i][1],
            //                 userData.ingresos[i][2],
            //                 userData.ingresos[i][3],
            //                 userData.ingresos[i][4],
            //                 userData.ingresos[i][5]
            //             ]);
            //         showData.push(
            //             [
            //                 userData.ingresos[i][0],
            //                 userData.ingresos[i][1],
            //                 userData.ingresos[i][2],
            //                 ''
            //             ]);
            //     }

            //     if (userData.egresos.length > 0) {
            //         for (let i = 0; i < userData.egresos.length; i++) {
            //             arrayDataDetail.push(
            //                 [
            //                     userData.egresos[i][0],
            //                     userData.egresos[i][1],
            //                     userData.egresos[i][2],
            //                     userData.egresos[i][3],
            //                     userData.egresos[i][4],
            //                     userData.egresos[i][5]
            //                 ]);
            //             showData.push(
            //                 [
            //                     userData.egresos[i][0],
            //                     userData.egresos[i][1],
            //                     userData.egresos[i][2],
            //                     ''
            //                 ]);
            //         }
            //     }
            //     this.setState({
            //         rowToShow: showData,
            //         rowtoDetail: arrayDataDetail
            //     })


            //     for (let i = 0; i < this.state.rowtoDetail.length; i++) {
            //         if (!this.state.rowtoDetail[i]) { continue; }
            //         if (this.state.rowtoDetail[i][2] === 'Pesos') {
            //             this.totalSumPesos += this.state.rowtoDetail[i][1];
            //         } else if (this.state.rowtoDetail[i][2] === 'Dolares') {
            //             this.totalSumaDolares += this.state.rowtoDetail[i][1]
            //         }
            //     }

            //     this.Display.updateState(this.totalSumPesos, this.totalSumaDolares);
            //     this.HistoricTable.updateState(this.state.rowToShow);
            // }
        })

    }
 
    insertData(accountData) {
        console.log('ACCOUNT', accountData) 
        this.state.data.cuentasBancarias.push(accountData);
        this.state.carouselItems.push(accountData)
        let dataToShow = this.state.carouselItems 
        this.Carrousel.updateState(dataToShow)
        
        AsyncStorage.mergeItem(
            this.state.data.seguridad.userName + '-' + this.state.data.seguridad.password,
            JSON.stringify(this.state.data)
        )


    }

    formData(data) {
        this.insertData(data)

    }
    getDisplayFilter(date) {
        if (this.state.rowtoDetail.length > 0) {
            let filterDataToShow = getMatchedData(date, this.state.rowToShow);
            let filterData = getMatchedData(date, this.state.rowtoDetail);
            let filterSumPesos = sumValues(filterData)[0]
            let filterSumDolares = sumValues(filterData)[1]
            this.HistoricTable.updateState(filterDataToShow);
            this.Display.updateState(filterSumPesos, filterSumDolares);
        }
    }

    render() {
        let userData = this.props.route.params
        console.log(userData)
        if (!this.state.data) {
            this.getCuentaData(userData)
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

                    <CarrouselCard
                        items={this.state.carouselItems}
                        type={this.state.type}
                        ref={(carrousel) => { this.Carrousel = carrousel }}
                        onch

                    />
                    <Display
                        ref={(display) => { this.Display = display }}
                        defaultDate={this.defaultDate}
                        defaultPesos={totalSumPesos}
                        defaultDolares={totalSumaDolares}
                        getDate={this.getDisplayFilter.bind(this)}

                    />
                    <Form type={'Cuenta'}
                        getFormData={this.formData.bind(this)}
                    />
                    <HistoricTable type={'Cuenta'}
                        ref={(table) => { this.HistoricTable = table }}
                        cols={this.colTable}
                        rows={this.state.rowToShow}
                        detailRows={this.state.rowtoDetail}
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

