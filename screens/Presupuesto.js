import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
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
            data: {
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
                    [20, 40, 50],
                    [30, 20, 50, 20, 40, 50, 20, 30, 50, 20, 30]

                ],
                barColors: ["#e57373", "#e53935", "#b71c1c", "#e57373", "#e53935", "#b71c1c", "#e57373", "#e53935", "#b71c1c", "#e57373", "#e53935"]
            }
        }
    }
    formData(data) {
        if (data.tipo === 'Servicio') {
            this.state.data.data[1][0] = parseInt(data.cantidad);
        } else if (data.tipo === 'Impuesto Nacionales') {
            this.state.data.data[1][1] = parseInt(data.cantidad);
        } else if (data.tipo === 'Impuesto Municipales') {
            this.state.data.data[1][2] = parseInt(data.cantidad);
        } else if (data.tipo === 'Impuesto Provinciales') {
            this.state.data.data[1][3] = parseInt(data.cantidad);
        } else if (data.tipo === 'Educacion') {
            this.state.data.data[1][4] = parseInt(data.cantidad);
        } else if (data.tipo === 'Salud') {
            this.state.data.data[1][5] = parseInt(data.cantidad);
        } else if (data.tipo === 'Gastos Varios') {
            this.state.data.data[1][6] = parseInt(data.cantidad);
        } else if (data.tipo === 'Comida') {
            this.state.data.data[1][7] = parseInt(data.cantidad);
        } else if (data.tipo === 'Entretenimiento') {
            this.state.data.data[1][8] = parseInt(data.cantidad);
        } else if (data.tipo === 'Viaticos') {
            this.state.data.data[1][9] = parseInt(data.cantidad);
        } else if (data.tipo === 'Otros') {
            this.state.data.data[1][10] = parseInt(data.cantidad);
        }
        this.forceUpdate()
    }
    render() {
        return (
            <Block style={styles.presupuesto}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Form
                        type={'Presupuesto'}
                        getFormData={this.formData.bind(this)}
                    />
                        <StackedBarChart
                            style={graphStyle}
                            data={this.state.data}
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

