import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Display from '../components/DisplayMount';
import Form from '../components/Formulario';
import HistoricTable from '../components/HistoricTable';
const { width, height } = Dimensions.get('screen');

export default class Ingresos extends React.Component {
  defaultBudget = '2400'
  defaultDate = 'Mensual'
  defaultCoin = '$'
  
  render() {
    return (
      <Block center style={styles.ingresos}>
        <Display
          defaultDate={this.defaultDate}
          defaultBudget={this.defaultBudget}
          defaultCoin={this.props.defaultCoin}
        />
        <Form type={'Ingresos'} />
        <HistoricTable type={'Ingresos'} />
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  ingresos: {
    width: width,
    height: height,
    backgroundColor: "#071019"
  }
});

