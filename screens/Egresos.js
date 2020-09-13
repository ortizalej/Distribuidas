import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Display from '../components/DisplayMount';
import Form from '../components/Formulario';
import HistoricTable from '../components/HistoricTable';
const { width, height } = Dimensions.get('screen');
export default class Egresos extends React.Component {
  defaultDate = 'Mensual'
  defaultCoin = '$'
  colTable = ['Fecha', 'Cantidad', 'Dest', 'Medio'];
  rowValues = [
    ['1', 200, '3', '4'],
    ['a', 300, 'c', 'd'],
    ['1', 300, '3', '456\n789'],
    ['a', 300, 'c', 'd']
    ['1', 300, '3', '4'],
    ['a', 300, 'c', 'd'],
    ['1', 300, '3', '456\n789']
  ];
  render() {
    let totalSum = 0;
    for (let i = 0; i < this.rowValues.length; i++) {
      if (!this.rowValues[i]) { continue; }
      totalSum += this.rowValues[i][1];
    }
    return (
      <Block center style={styles.egresos}>
        <ScrollView>
          <Display
            defaultDate={this.defaultDate}
            defaultBudget={totalSum}
            defaultCoin={this.defaultCoin}
          />
          <Form type={'Egresos'} />
          <HistoricTable type={'Egresos'}
            cols={this.colTable}
            rows={this.rowValues}
          />
        </ScrollView>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  egresos: {
    width: width,
    height: height,
    backgroundColor: "#071019"
  }
});

