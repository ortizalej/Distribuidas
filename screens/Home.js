import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme, View } from 'galio-framework';
import {
  BarChart,
  PieChart,

} from 'react-native-chart-kit'
const { width, height } = Dimensions.get('screen');
const chartConfig = {
  backgroundColor: '#071019',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
};
const graphStyle = {
  marginVertical: 8,
  borderRadius: 16
}
const dataMedioPago = {
  labels: ['Mercado Pago', 'Tarjeta', 'Transferencia'],
  datasets: [{
    data: [50, 20, 2]
  }]
}

const dataSaldos = {
  labels: ['Cuenta1', 'Cuenta2', 'Cuenta3'],
  datasets: [{
    data: [50, 20, 2]
  }]
}

const dataPresupuesto = {
  labels: ['Cuenta1', 'Cuenta2', 'Cuenta3'],
  datasets: [{
    data: [50, 20, 2]
  }]
}

export default class Home extends React.Component {

  render() {
    return (
      <Block style={styles.home}>
        <ScrollView style={styles.scrollView}>

          <BarChart
            style={graphStyle}
            data={dataMedioPago}
            width={width}
            height={310}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
          <BarChart
            style={graphStyle}
            data={dataSaldos}
            width={width}
            height={300}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
          <BarChart
            style={graphStyle}
            data={dataPresupuesto}
            width={width}
            height={300}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
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

});

