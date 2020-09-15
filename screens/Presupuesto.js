import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme, View } from 'galio-framework';
import {
    BarChart,
    PieChart,

} from 'react-native-chart-kit'
import Form from '../components/Formulario'
const { width, height } = Dimensions.get('screen');
chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "3",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

export default class Presupuesto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: "Servicios",
                    money: 2000,
                    color: "rgba(131, 167, 234, 1)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Comida",
                    money: 3000,
                    color: "green",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Ocio",
                    money: 4000,
                    color: "red",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Total",
                    money: 25000,
                    color: "white",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                }

            ]
        }
    }
    formData(data) {
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].name == 'Total') {
                this.state.data[i].money = parseInt(data.cantidad);
            }
        }
        this.forceUpdate()
    }
    render() {
        return (
            <Block style={styles.presupuesto}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <PieChart
                        data={this.state.data}
                        width={width}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="money"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                    <Form
                        type={'Presupuesto'}
                        getFormData={this.formData.bind(this)}
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

