import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Display from '../components/DisplayMount';
import Form from '../components/Formulario';
import HistoricTable from '../components/HistoricTable';
const { width, height } = Dimensions.get('screen');
import moment from 'moment';
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
export default class Prestamos extends React.Component {
  defaultDate = 'Mensual'
  defaultCoin = '$'
  colTable = ['Fecha', 'Cantidad', 'Dest.', 'Medio'];
  rowValuesPrestados = [
    ['02-09-2020', 1000, 'Tipo', 'Medio'],
    ['02-07-2020', 1000, 'Tipo', 'Medio'],
    ['13-01-2020', 1000, 'Tipo', 'Medio']
    // INIT QUERY
  ];

  rowValuesTomados = [
    ['02-09-2020', 1000, 'Tipo', 'Medio'],
    ['02-07-2020', 1000, 'Tipo', 'Medio'],
    ['13-01-2020', 1000, 'Tipo', 'Medio']
    // INIT QUERY
  ];

  formData(data) {
    var now = moment().format('DD-MM-YYYY');
    let arrayData = [now, parseInt(data.cantidad), data.destino, data.medio];
    let totalSum = 0
    if (data.type === 'Prestado') {
      this.rowValuesPrestados.push(arrayData);

      for (let i = 0; i < this.rowValuesPrestados.length; i++) {
        if (!this.rowValuesPrestados[i]) { continue; }
        totalSum += this.rowValuesPrestados[i][1];
      }

      this.tablePrestados.updateState(this.rowValuesPrestados);
      this.displayPrestados.updateState(totalSum);

    } else if (data.type === 'Tomado') {
      this.rowValuesTomados.push(arrayData);

      for (let i = 0; i < this.rowValuesTomados.length; i++) {
        if (!this.rowValuesTomados[i]) { continue; }
        totalSum += this.rowValuesTomados[i][1];
      }
      this.tableTomados.updateState(this.rowValuesTomados);
      this.displayTomados.updateState(totalSum);
    }
  }
  getDisplayFilterPrestados(date) {
    if (this.rowValuesPrestados.length > 0) {
      let filterData = getMatchedData(date, this.rowValuesPrestados);
      let filterSum = sumValues(filterData)
      this.tablePrestados.updateState(filterData);
      this.displayPrestados.updateState(filterSum);
    }
  }
  getDisplayFilterTomados(date) {
    if (this.rowValuesTomados.length > 0) {
      let filterData = getMatchedData(date, this.rowValuesTomados);
      let filterSum = sumValues(filterData)
      this.tableTomados.updateState(filterData);
      this.displayTomados.updateState(filterSum);
    }
  }


  render() {

    let totalSumPrestados = 0;
    let totalSumTomados = 0;
    for (let i = 0; i < this.rowValuesPrestados.length; i++) {
      if (!this.rowValuesPrestados[i]) { continue; }
      totalSumPrestados += this.rowValuesPrestados[i][1];
    }

    for (let i = 0; i < this.rowValuesTomados.length; i++) {
      if (!this.rowValuesTomados[i]) { continue; }
      totalSumTomados += this.rowValuesTomados[i][1];
    }
    return (
      <Block center style={styles.egresos}>
        <ScrollView>
          {/* Prestamos Prestados */}

          <Display
            ref={(displayPrestados) => { this.displayPrestados = displayPrestados }}
            defaultDate={this.defaultDate}
            defaultBudget={totalSumPrestados}
            defaultCoin={this.defaultCoin}
            getDate={this.getDisplayFilterPrestados.bind(this)}

          />
          <Form
            type={'Prestamos Prestados'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable
            ref={(tablePrestados) => { this.tablePrestados = tablePrestados }}
            cols={this.colTable}
            rows={this.rowValuesPrestados}
          />
          {/* Prestamos Tomados */}
          <Display
            ref={(displayTomados) => { this.displayTomados = displayTomados }}
            defaultDate={this.defaultDate}
            defaultBudget={totalSumTomados}
            defaultCoin={this.defaultCoin}
            getDate={this.getDisplayFilterTomados.bind(this)}

          />
          <Form
            type={'Prestamos Tomados'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable
            ref={(tableTomados) => { this.tableTomados = tableTomados }}
            cols={this.colTable}
            rows={this.rowValuesTomados}
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

