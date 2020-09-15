import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Display from '../components/DisplayMount';
import Form from '../components/Formulario';
import HistoricTable from '../components/HistoricTable';
const { width, height } = Dimensions.get('screen');

export default class Prestamos extends React.Component {
  defaultDate = 'Mensual'
  defaultCoin = '$'
  colTable = ['Fecha', 'Cantidad', 'Destinatario', 'Medio'];
  rowValues = [

  ];

  formData(data) {
    console.log(JSON.stringify(data))
    let arrayData = [data.fecha, parseInt(data.cantidad), data.destino, data.medio];
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
            type={'Prestamos Prestados'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable
            ref={(table) => { this.HistoricTable = table }}
            cols={this.colTable}
            rows={this.rowValues}
          />
          <Display
            ref={(display) => { this.Display = display }}
            defaultDate={this.defaultDate}
            defaultBudget={totalSum}
            defaultCoin={this.defaultCoin} 
          />
          <Form
            type={'Prestamos Tomados'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable
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

