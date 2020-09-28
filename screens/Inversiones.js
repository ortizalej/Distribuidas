import React from 'react';
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { Button, Block, Text, Input, theme, View } from 'galio-framework';
import Form from '../components/Formulario'
import Carrousel from '../components/CarrouselCard'
import HistoricTable from '../components/HistoricTable';
import moment from 'moment';

const { width, height } = Dimensions.get('screen');

export default class Inversiones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowToShow: [],
            rowtoDetail: [],
            data: undefined
        }
    }
    defaultDate = 'Anual'
    colTable = ['Fecha', 'Cantidad', 'Tipo', ''];
    totalSumPesos = 0;
    totalSumaDolares = 0;

    getInversionesData(data) {
        AsyncStorage.getItem(data.userName + "-" + data.password).then((value) => {
            let userData = JSON.parse(value)
            this.state.data = userData
            console.log(userData)

            if (userData.inversiones.length > 0) {
                let arrayDataDetail = [];
                let showData = [];

                for (let i = 0; i < userData.inversiones.length; i++) {
                    arrayDataDetail.push(
                        [
                            userData.inversiones[i][0],
                            userData.inversiones[i][1],
                            userData.inversiones[i][2],
                            userData.inversiones[i][3],
                            userData.inversiones[i][4],
                            userData.inversiones[i][5],
                            userData.inversiones[i][6]
                        ]);
                    showData.push(
                        [
                            userData.inversiones[i][0],
                            userData.inversiones[i][1],
                            userData.inversiones[i][2],
                            ''
                        ]);
                }

                this.setState({
                    rowToShow: showData,
                    rowtoDetail: arrayDataDetail
                })

                console.log('ROW DETAIL', this.state.rowtoDetail)

                for (let i = 0; i < this.state.rowtoDetail.length; i++) {
                    if (!this.state.rowtoDetail[i]) { continue; }
                    if (this.state.rowtoDetail[i][2] === 'Pesos') {
                        totalSumPesos += this.state.rowtoDetail[i][1];
                    } else if (this.state.rowtoDetail[i][2] === 'Dolares') {
                        totalSumaDolares += this.state.rowtoDetail[i][1]
                    }
                }

                this.Display.updateState(this.totalSumPesos, this.totalSumaDolares);
                this.HistoricTable.updateState(this.state.rowToShow);
            }
        })
    }

    deleteInversionData() {
        let itemToDelete = this.state.rowtoDetail[0];
        let items = this.state.data.inversiones

        for (let i = 0; i < items.length; i++) {
            let inversionesItem = items[i];

            if (inversionesItem[0] === itemToDelete[0] &&
                inversionesItem[1] === itemToDelete[1] &&
                inversionesItem[2] === itemToDelete[2] &&
                inversionesItem[3] === itemToDelete[3] &&
                inversionesItem[4] === itemToDelete[4] &&
                inversionesItem[5] === itemToDelete[5] &&
                inversionesItem[6] === itemToDelete[6]) {
                items.splice(i, 1);
            }
        }

        this.deleteData(items);
    }

    insertData(arrayData) {
        this.state.data.inversiones.push(arrayData)
        
        AsyncStorage.mergeItem(
            this.state.data.seguridad.userName + '-' + this.state.data.seguridad.password,
            JSON.stringify(this.state.data),
            () => {
                console.log("Inversion Guardada");
            })
    }

    deleteData(inversionesItems) {
        this.state.data.inversiones = inversionesItems
        AsyncStorage.mergeItem(
            this.state.data.seguridad.userName + '-' + this.state.data.seguridad.password,
            JSON.stringify(this.state.data),
            () => {
                console.log("Inversion Eliminada");
            })
    }

    formData(data) {
        console.log(data)
        var now = moment().format('DD-MM-YYYY');
        let arrayDataToShow = [
            now,
            parseInt((parseInt(data.cantidad) * (1 + (data.interes ? parseInt(data.interes) : 0) / 100))),
            data.tipo,
            ''
        ];
        let arrayData = [
            now,
            parseInt((parseInt(data.cantidad) * (1 + (data.interes ? parseInt(data.interes) : 0) / 100))),
            data.tipo,
            data.interes,
            data.destino,
        ]
        this.insertData(arrayData);
        this.state.rowtoDetail.push(arrayData);
        this.state.rowToShow.push(arrayDataToShow);
        this.HistoricTable.updateState(this.state.rowToShow);
    }

    getDisplayFilter(date) {
        if (this.state.rowtoDetail.length > 0) {
            let filterDataToShow = getMatchedData(date, this.state.rowToShow);
            this.HistoricTable.updateState(filterDataToShow);
        }
    }

    deleteRow(index) {
        this.deleteInversionData();
        this.state.rowtoDetail.splice(index, 1);
        this.state.rowToShow.splice(index, 1);
        this.HistoricTable.updateState(this.state.rowToShow);
    }

    render() {
        let userData = this.props.route.params
        if (!this.state.data) {
            this.getInversionesData(userData)
        }

        return (
            <Block style={styles.inversiones}>
                <ScrollView>
                    <Carrousel items={this.state.items} type={'Inversiones'} />
                    <Form
                        type={'Inversiones'}
                        getFormData={this.formData.bind(this)}
                    />
                    <HistoricTable type={'Inversiones'}
                        ref={(table) => { this.HistoricTable = table }}
                        cols={this.colTable}
                        rows={this.state.rowToShow}
                        detailRows={this.state.rowtoDetail}
                        deleteRow={this.deleteRow.bind(this)}
                    />
                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    inversiones: {
        width: width,
        backgroundColor: "#071019",
        height: height
    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    titleGraph: {
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#fff',
        marginLeft: 10
    }
});

