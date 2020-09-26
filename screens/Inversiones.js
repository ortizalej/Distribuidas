import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
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
            items: [{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: [20, 45, 28, 80, 99, 43],
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ],
                legend: ["Plazo Fijo"] // optional
            },
            {
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: [20, 45, 28, 80, 99, 43],
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ],
                legend: ["Acciones"] // optional
            }]
        }
    }
    defaultDate = 'Anual'
    colTable = ['Fecha', 'Cantidad', 'Tipo', ''];
    rowToShow = [
        ['02-09-2020', 1000, 'Tipo', ''],
        ['02-07-2020', 1000, 'Tipo', ''],
        ['13-01-2020', 1000, 'Tipo', '']
        // INIT QUERY
    ];

    rowtoDetail = [
        ['02-09-2020', 1000, 'Tipo', 'Interes', 'Empresa'],
        ['02-07-2020', 1000, 'Tipo', 'Interes', 'Empresa'],
        ['13-01-2020', 1000, 'Tipo', 'Interes', 'Empresa']
        // INIT QUERY
    ]

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
        this.rowtoDetail.push(arrayData);
        this.rowToShow.push(arrayDataToShow);
        this.HistoricTable.updateState(this.rowToShow);
    }

    getDisplayFilter(date) {
        if (this.rowtoDetail.length > 0) {
            let filterDataToShow = getMatchedData(date, this.rowToShow);
            this.HistoricTable.updateState(filterDataToShow);
        }
    }
    deleteRow(index) {
        this.rowtoDetail.splice(index, 1);
        this.rowToShow.splice(index, 1);

        this.HistoricTable.updateState(this.rowToShow);
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

