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

  ];

  formData(data) {
    let arrayData = [data.fecha, parseInt(data.cantidad), data.tipo, data.medio];
    let totalSum = 0
    this.rowValues.push(arrayData); 
    for (let i = 0; i < this.rowValues.length; i++) {
      if (!this.rowValues[i]) { continue; }
      totalSum += this.rowValues[i][1];
    }
    this.HistoricTable.updateState(this.rowValues);
    this.Display.updateState(totalSum);
  }

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
            ref={(display) => { this.Display = display }}
            defaultDate={this.defaultDate}
            defaultBudget={totalSum}
            defaultCoin={this.defaultCoin}
          />
          <Form
            type={'Egresos'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable type={'Egresos'}
            ref={(table) => { this.HistoricTable = table }}
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

