import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme, View } from 'galio-framework';
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
const dataMedioPago = {
  labels: ['MP', 'Tarjeta', 'Transf.'],
  datasets: [{
    data: [50, 20, 2]
  }]
}

const dataCuenta = {
  labels: ['Cuenta1', 'Cuenta2', 'Cuenta3'],
  datasets: [{
    data: [50, 20, 2]
  }]
}

const dataVencimientoSemanal = {
  legend: ["Egresos", "Inversiones", "Prestamos"],
  labels: ["Semana1", "Semana2", "Semana3"],
  data: [
    [60, 60, 60],
    [30, 30, 60],
    [30, 30, 60]

  ],
  barColors: ["#e57373", "#e53935", "#b71c1c"]
};

const dataRealvsPres = {
  legend: ["Egresos", "Inversiones", "Prestamos"],
  labels: ["Real", "Presupuesto"],
  data: [
    [60, 60, 60],
    [20]

  ],
  barColors: ["#e57373", "#e53935", "#b71c1c"]
};


export default class Home extends React.Component {  
  render() {
    return (
      <Block style={styles.home}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.titleGraph}>Monto Gastado Por Mes</Text>

          <BarChart
            style={graphStyle}
            data={dataMedioPago}
            width={width}
            height={310}
            yAxisLabel="$"
            chartConfig={chartConfig}
          />
          <Text style={styles.titleGraph}>Saldos de Cuentas Bancarias</Text>

          <BarChart
            style={graphStyle}
            data={dataCuenta}
            width={width}
            height={310}
            yAxisLabel="$"
            chartConfig={chartConfig}
          />
          <Text style={styles.titleGraph}>Vencimiento Semanal</Text>

          <StackedBarChart
            style={graphStyle}
            data={dataVencimientoSemanal}
            width={width}
            height={220}
            chartConfig={chartConfig}
          />
          <Text style={styles.titleGraph}>Desvio Presupuestal</Text>

          <StackedBarChart
            style={graphStyle}
            data={dataRealvsPres}
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

