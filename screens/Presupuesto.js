import React from 'react';
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { Button, Block, Text, Input, theme, View } from 'galio-framework';
import {
    StackedBarChart

} from 'react-native-chart-kit'
import Form from '../components/Formulario'
const { width, height } = Dimensions.get('screen');
const chartConfig = {
    backgroundColor: '#071019',
    backgroundGradientFrom: '#071019',
    backgroundGradientTo: '#071019',
    fillShadowGradient: 'white',
    fillShadowGradientOpacity: 20,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};
const graphStyle = {
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: 10
}

export default class Presupuesto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graphData: {
                legend: [
                    "Servicio",
                    "Impuesto Nacionales",
                    "Impuesto Municipales",
                    "Impuesto Provinciales",
                    "Educacion",
                    "Salud",
                    "Gastos Varios",
                    "Comida",
                    "Entretenimiento",
                    "Viaticos",
                    "Otros"
                ],
                labels: ["Real", "Presupuesto"],
                data: [
                    [null, null, null,null, null, null,null, null, null,null, null, null],
                    [null, null, null, null, null, null, null, null, null, null, 0.01]

                ],
                barColors: ["#e57373", "#e53935", "#b71c1c", "#e57373", "#e53935", "#b71c1c", "#e57373", "#e53935", "#b71c1c", "#e57373", "#e53935"]
            },
            data: undefined
        }
    }
    formData(data) {
        if (data.tipo === 'Servicio') {
            this.state.graphData.data[1][0] = parseInt(data.cantidad);
        } else if (data.tipo === 'Impuesto Nacionales') {
            this.state.graphData.data[1][1] = parseInt(data.cantidad);
        } else if (data.tipo === 'Impuesto Municipales') {
            this.state.graphData.data[1][2] = parseInt(data.cantidad);
        } else if (data.tipo === 'Impuesto Provinciales') {
            this.state.graphData.data[1][3] = parseInt(data.cantidad);
        } else if (data.tipo === 'Educacion') {
            this.state.graphData.data[1][4] = parseInt(data.cantidad);
        } else if (data.tipo === 'Salud') {
            this.state.graphData.data[1][5] = parseInt(data.cantidad);
        } else if (data.tipo === 'Gastos Varios') {
            this.state.graphData.data[1][6] = parseInt(data.cantidad);
        } else if (data.tipo === 'Comida') {
            this.state.graphData.data[1][7] = parseInt(data.cantidad);
        } else if (data.tipo === 'Entretenimiento') {
            this.state.graphData.data[1][8] = parseInt(data.cantidad);
        } else if (data.tipo === 'Viaticos') {
            this.state.graphData.data[1][9] = parseInt(data.cantidad);
        } else if (data.tipo === 'Otros') {
            this.state.graphData.data[1][10] = parseInt(data.cantidad);
        }
        this.insertData()
        this.forceUpdate()
    }
    insertData() {
        console.log('PRESUPUESTO',this.state.data.presupuestos)

        if(this.state.data.presupuestos[0]) {
            this.state.data.presupuestos[0] = this.state.graphData.data[1]
        } else {
            this.state.data.presupuestos.push(this.state.graphData.data[1])
        }
        AsyncStorage.mergeItem(
          this.state.data.seguridad.userName + 
            '-' +
            this.state.data.seguridad.password,
          JSON.stringify(this.state.data),
          value => {
          }
        )
      }
    getPresupuestoData(data) {
        AsyncStorage.getItem(data.userName + "-" + data.password).then((value) => {
            let userData = JSON.parse(value)
            this.state.data = userData 
            console.log(userData.egresos)

            if (userData.egresos.length > 0) {
                for (let i = 0; i < userData.egresos.length; i++) {
                    if(userData.egresos[i][2] == "Pesos"){
                        if (userData.egresos[i][4] === 'Servicio') {
                            this.state.graphData.data[0][0] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Impuesto Nacionales') {
                            this.state.graphData.data[0][1] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Impuesto Municipales') {
                            this.state.graphData.data[0][2] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Impuesto Provinciales') {
                            this.state.graphData.data[0][3] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Educacion') {
                            this.state.graphData.data[0][4] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Salud') {
                            this.state.graphData.data[0][5] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Gastos Varios') {
                            this.state.graphData.data[0][6] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Comida') {
                            this.state.graphData.data[0][7] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Entretenimiento') {
                            this.state.graphData.data[0][8] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Viaticos') { 
                            this.state.graphData.data[0][9] = userData.egresos[i][1];
                        } else if (userData.egresos[i][4] === 'Otros') {
                            this.state.graphData.data[0][10] = userData.egresos[i][1];
                        }
                    }
                } 
            }
            if(this.state.data.presupuestos[0]) { 
                this.state.graphData.data[1] = this.state.data.presupuestos[0]
            }
            this.forceUpdate()

        })
    }
    render() {
        let userData = this.props.route.params
        if (!this.state.data) {
            this.getPresupuestoData(userData)
        }
        return (
            <Block style={styles.presupuesto}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Form
                        type={'Presupuesto'}
                        getFormData={this.formData.bind(this)}
                    />
                    <StackedBarChart
                        style={graphStyle}
                        data={this.state.graphData}
                        width={width}
                        height={800}
                        chartConfig={chartConfig}
                        
                    />
                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    presupuesto: {
        width: width,
        height: height,
        backgroundColor: "#071019",
        justifyContent: "center"
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },

});

