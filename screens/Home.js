import React from 'react';
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { Button, Block, Text, Input, theme, View,  } from 'galio-framework';
import {
  BarChart,
  PieChart,
  LineChart,
  StackedBarChart
} from 'react-native-chart-kit'
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


export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataMedioPago: {
        labels: ['Tarjeta', 'Transf.'],
        datasets: [{
          data: [0, 0]
        }]
      },
      dataCuenta: {
        labels: [],
        datasets: [{
          data: [0]
        }]
      },
      dataVencimientoSemanal: {
        legend: ["Egresos", "Inversiones", "Prestamos"],
        labels: ["Semana Pasada", "Esta semana"],
        data: [
          [60, 60, 60],
          [30, 30, 60],

        ],
        barColors: ["#e57373", "#e53935", "#b71c1c"]
      },
      dataRealvsPres: {
        legend: ["Egresos", "Inversiones", "Prestamos"],
        labels: ["Real", "Presupuesto"],
        data: [
          [60, 60, 60],
          [20]

        ],
        barColors: ["#e57373", "#e53935", "#b71c1c"]
      },
      data: undefined
    }
  }
  getHomeData(data) {
    AsyncStorage.getItem(data.userName + '-' + data.password).then(value => {
      let userData = JSON.parse(value)
      this.state.data = userData

      if (userData.egresos.length > 0) {
        let egresosTranf = 0
        let egresosTarjeta = 0
        let totalEgresos = 0
        for (let i = 0; i < userData.egresos.length; i++) {

          //Monto Por mes
          if (userData.egresos[i][3] == 'Tarjeta de Crédito' || userData.egresos[i][3] == 'Tarjeta de Debito') {
            egresosTarjeta += userData[i][1]
          } else if (userData.egresos[i][3] == 'Transferencia Bancaria') {
            egresosTranf += userData[i][1]
          }


        }
        this.state.dataMedioPago.datasets[0].data[0] = egresosTarjeta
        this.state.dataMedioPago.datasets[0].data[1] = egresosTranf

      }
    })
  }
  render() {
    let userData = this.props.route.params
    if (!this.state.data) {
      this.getHomeData(userData)
    }
    return (
      <Block style={styles.home}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.titleGraph}>Monto Gastado Por Mes</Text>

          <BarChart
            style={graphStyle}
            data={this.state.dataMedioPago}
            width={width}
            height={310}
            yAxisLabel="$"
            chartConfig={chartConfig}
          />
          <Text style={styles.titleGraph}>Saldos de Cuentas Bancarias</Text>

          <BarChart
            style={graphStyle}
            data={this.state.dataCuenta}
            width={width}
            height={310}
            yAxisLabel="$"
            chartConfig={chartConfig}
          />
          <Text style={styles.titleGraph}>Vencimiento Semanal</Text>

          <StackedBarChart
            style={graphStyle}
            data={this.state.dataVencimientoSemanal}
            width={width}
            height={220}
            chartConfig={chartConfig}
          />
          <Text style={styles.titleGraph}>Desvio Presupuestal</Text>

          <StackedBarChart
            style={graphStyle}
            data={this.state.dataRealvsPres}
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
  home: {
    width: width,
    backgroundColor: "#071019"
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
  titleGraph: {
    backgroundColor: 'transparent',
    fontSize: 20,
    color: '#fff',
    marginLeft: 10
  }
});

