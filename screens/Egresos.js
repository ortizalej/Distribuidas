import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Display from '../components/DisplayMount';
import Form from '../components/Formulario';
import HistoricTable from '../components/HistoricTable';
const { width, height } = Dimensions.get('screen');
export default class Egresos extends React.Component {
  defaultBudget = '2400'
  defaultDate = 'Mensual'
  defaultCoin = '$'

  render() {
    return (
      <Block center style={styles.egresos}>
        <Display
          defaultDate={this.defaultDate}
          defaultBudget={this.defaultBudget}
          defaultCoin={this.props.defaultCoin}
        />
        <Form type={'Egresos'} />
        <HistoricTable type={'Egresos'} />
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

