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
                legend: ["Ocio", "Comida", "Servicios"],
                labels: ["Real", "Presupuesto"],
                data: [
                    [300, 400, 500],
                    [200, 300, 600]

                ],
                barColors: ["#e57373", "#e53935", "#b71c1c"]
            }
        }
    }
    formData(data) {
        console.log(data.tipo);
        console.log(data.cantidad);
        if(data.tipo === 'Ocio') {
            this.state.data.data[0][0] = parseInt(data.cantidad);
        } else if(data.tipo === 'Comida') {
            this.state.data.data[0][1] = parseInt(data.cantidad);
        } else if(data.tipo === 'Servicios' ){
            this.state.data.data[0][2] = parseInt(data.cantidad);
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
                        height={220}
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

