import React from 'react';
import { StyleSheet, Dimensions, ScrollView, AsyncStorage, PureComponent } from 'react-native';
import { Button, Block, Text, Input, theme, View, } from 'galio-framework';
import {
  BarChart,
  PieChart,
  LineChart,
  StackedBarChart
} from 'react-native-chart-kit'
import moment from 'moment'

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


export default class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataMedioPagoPesos: {
        labels: ['Tarjeta', 'Transf.'],
        datasets: [{
          data: [0, 0]
        }]
      },
      dataMedioPagoDolares: {
        labels: ['Tarjeta', 'Transf.'],
        datasets: [{
          data: [0, 0]
        }]
      },
      dataCuenta: {
        labels: [],
        datasets: [{
          data: []
        }]
      },
      dataRealvsPres: {
        labels: ["Real", "Presupuesto"],
        datasets: [{
          data: [0, 0]
        }]
      },
      data: undefined
    }
  }
  getHomeData(data) {
    AsyncStorage.getItem(data.userName + '-' + data.password).then(value => {
      let userData = JSON.parse(value)
      this.state.data = userData
      if (userData.egresos.length > 0) {
        let egresosTranfPesos = 0
        let egresosTarjetaPesos = 0
        let totalEgresosPesos = 0

        let egresosTranfDolares = 0
        let egresosTarjetaDolares = 0
        let totalEgresosDolares = 0
        for (let i = 0; i < userData.egresos.length; i++) {
          //Monto Por mes
          if(userData.egresos[i][2] === "Pesos") {
            if (userData.egresos[i][3] == 'Tarjeta de Crédito' || userData.egresos[i][3] == 'Tarjeta de Débito') {
              egresosTarjetaPesos += userData.egresos[i][1]
            } else if (userData.egresos[i][3] == 'Transferencia Bancaria') {
              egresosTranfPesos += userData.egresos[i][1]
            }
            totalEgresosPesos += userData.egresos[i][1]
          } else {
            if (userData.egresos[i][3] == 'Tarjeta de Crédito' || userData.egresos[i][3] == 'Tarjeta de Débito') {
              egresosTarjetaDolares += userData.egresos[i][1]
            } else if (userData.egresos[i][3] == 'Transferencia Bancaria') {
              egresosTranfDolares += userData.egresos[i][1]
            }
            totalEgresosDolares += userData.egresos[i][1]
          }
        }

        console.log("Tarjeta", egresosTarjetaPesos, "Transf", egresosTranfPesos)
        this.state.dataMedioPagoPesos.datasets[0].data[0] = egresosTarjetaPesos
        this.state.dataMedioPagoPesos.datasets[0].data[1] = egresosTranfPesos

        this.state.dataMedioPagoDolares.datasets[0].data[0] = egresosTarjetaDolares
        this.state.dataMedioPagoDolares.datasets[0].data[1] = egresosTranfDolares

        this.state.dataRealvsPres.datasets[0].data[0] = totalEgresosPesos
      }
      if (userData.presupuestos.length > 0) {
        let totalPresupuesto = 0

        for (let i = 0; i < userData.presupuestos[0].length; i++) {
          totalPresupuesto += userData.presupuestos[0][i]
        }
        this.state.dataRealvsPres.datasets[0].data[1]= totalPresupuesto
      }

      if (userData.cuentasBancarias.length > 0) {
        for (let i = 0; i < userData.cuentasBancarias.length; i++) {
          let cuentaBancariaSaldo = 0;
          this.state.dataCuenta.labels.push(userData.cuentasBancarias[i].CBU)
          for (let j = 0; j < userData.ingresos.length; j++) {
            //Monto Por Cuenta
            if (userData.cuentasBancarias[i].CBU == userData.ingresos[j][5]) {
              cuentaBancariaSaldo += userData.ingresos[j][1]
            }
          }
          for (let j = 0; j < userData.egresos.length; j++) {
            //Monto Por Cuenta
            if (userData.cuentasBancarias[i].CBU == userData.egresos[j][8]) {
              cuentaBancariaSaldo -= userData.egresos[j][1]
            }
          }
          this.state.dataCuenta.datasets[0].data.push(cuentaBancariaSaldo)
        }
      }
      this.forceUpdate()
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
          <Text style={styles.titleGraph}>Monto Gastado Por Mes en Pesos</Text>
          <BarChart
            style={graphStyle}
            data={this.state.dataMedioPagoPesos}
            width={width}
            height={310}
            yAxisLabel="$"
            chartConfig={chartConfig}
          />

        <Text style={styles.titleGraph}>Monto Gastado Por Mes en Dolares</Text>
          <BarChart
            style={graphStyle}
            data={this.state.dataMedioPagoDolares}
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

          <Text style={styles.titleGraph}>Desvio Presupuestal en Pesos</Text>
          <BarChart
            style={graphStyle}
            data={this.state.dataRealvsPres}
            width={width}
            height={310}
            yAxisLabel="$"
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
