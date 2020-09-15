import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Display from '../components/DisplayMount';
import Form from '../components/Formulario';
import HistoricTable from '../components/HistoricTable';
import moment from 'moment';
const { width, height } = Dimensions.get('screen');

function getMatchedData(dateFilter, rowValues) {
  let filterDataRows = [];
  switch (dateFilter) {
    case 'Mensual':
      let monthDate = moment().startOf('month')
      compareDates(monthDate, filterDataRows, rowValues)
      break;
    case 'Semestral':
      let semestralDate = moment().add(-6, 'M')
      compareDates(semestralDate, filterDataRows, rowValues)
      break;
    case 'Anual':
      let anualDate = moment().startOf('year')
      compareDates(anualDate, filterDataRows, rowValues)
      break;
  }
  return filterDataRows;

}

function compareDates(filterDate, filterDataRows, rowValues) {
  for (let i = 0; i < rowValues.length; i++) {
    let baseDate = moment(rowValues[i][0], 'DD-MM-YYYY');
    if (baseDate.isAfter(filterDate)) {
      filterDataRows.push(rowValues[i]);
    }
  }
}

function sumValues(rowValues) {
  let totalSum = 0;
  for (let i = 0; i < rowValues.length; i++) {
    if (!rowValues[i]) { continue; }
    totalSum += rowValues[i][1];
  }
  return totalSum;
}

export default class Ingresos extends React.Component {
  defaultDate = 'Mensual'
  defaultCoin = '$'
  colTable = ['Fecha', 'Cantidad', 'Tipo', 'Fuente'];
  rowValues = [
    ['02-09-2020', 1000, 'Tipo', 'Medio'],
    ['02-07-2020', 1000, 'Tipo', 'Medio'],
    ['13-01-2020', 1000, 'Tipo', 'Medio']
    // INIT QUERY
  ];

  formData(data) {
    var now = moment().format('DD-MM-YYYY');
    let arrayData = [now, parseInt(data.cantidad), data.tipo, data.medio];
    this.rowValues.push(arrayData);
    let totalSum = this.sumValues(this.rowValues)
    this.HistoricTable.updateState(this.rowValues);
    this.Display.updateState(totalSum);
  }
  getDisplayFilter(date) {
    if (this.rowValues.length > 0) {
      let filterData = getMatchedData(date, this.rowValues);
      let filterSum = sumValues(filterData)
      this.HistoricTable.updateState(filterData);
      this.Display.updateState(filterSum);
    }
  }

  render() {
    let totalSum = 0;
    for (let i = 0; i < this.rowValues.length; i++) {
      if (!this.rowValues[i]) { continue; }
      totalSum += this.rowValues[i][1];
    }
    return (
      <Block center style={styles.ingresos}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Display
            ref={(display) => { this.Display = display }}
            defaultDate={this.defaultDate}
            defaultBudget={totalSum}
            defaultCoin={this.defaultCoin}
            getDate={this.getDisplayFilter.bind(this)}

          />
          <Form type={'Ingresos'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable type={'Ingresos'}
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
  ingresos: {
    width: width,
    height: height,
    backgroundColor: "#071019"
  }
});

