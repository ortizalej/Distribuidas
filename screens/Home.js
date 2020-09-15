import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme, View } from 'galio-framework';
import {
  BarChart,
  PieChart,
  LineChart
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
}
const dataMedioPago = {
  labels: ['MP', 'Tarjeta', 'Transf.'],
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
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};
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
          />
          <LineChart
            data={data}
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

});

