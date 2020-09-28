import React from 'react';
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native';
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
  let totalSumPesos = 0;
  let totalSumaDolares = 0;
  let sumas = []
  for (let i = 0; i < rowValues.length; i++) {
    if (!rowValues[i]) { continue; }
    if (rowValues[i][2] === 'Pesos') {
      totalSumPesos += rowValues[i][1];
    } else if (rowValues[i][2] === 'Dolares') {
      totalSumaDolares += rowValues[i][1]
    }
  }
  sumas.push(totalSumPesos);
  sumas.push(totalSumaDolares)
  return sumas;
}

export default class Ingresos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowToShow: [],
      rowtoDetail: [],
      data: undefined
    }
  }
  defaultDate = 'Anual'
  colTable = ['Fecha', 'Cantidad', 'Moneda', ''];
  totalSumPesos = 0;
  totalSumaDolares = 0;
  getIngresoData(data) {

    AsyncStorage.getItem(data.userName + "-" + data.password).then((value) => {
      let userData = JSON.parse(value)
      this.state.data = userData
      console.log(userData)

      if (userData.ingresos.length > 0) {
        let arrayDataDetail = [];
        let showData = [];

        for (let i = 0; i < userData.ingresos.length; i++) {
          arrayDataDetail.push(
            [
              userData.ingresos[i][0],
              userData.ingresos[i][1],
              userData.ingresos[i][2], 
              userData.ingresos[i][3], 
              userData.ingresos[i][4], 
              userData.ingresos[i][5]
            ]);
          showData.push(
            [
              userData.ingresos[i][0], 
              userData.ingresos[i][1], 
              userData.ingresos[i][2], 
              ''
            ]);
        }

        this.setState({
          rowToShow: showData,
          rowtoDetail: arrayDataDetail
        })

        console.log('ROW DETAIL', this.state.rowtoDetail)

        for (let i = 0; i < this.state.rowtoDetail.length; i++) {
          if (!this.state.rowtoDetail[i]) { continue; }
          if (this.state.rowtoDetail[i][2] === 'Pesos') {
            this.totalSumPesos += this.state.rowtoDetail[i][1];
          } else if (this.state.rowtoDetail[i][2] === 'Dolares') {
            this.totalSumaDolares += this.state.rowtoDetail[i][1]
          }
        }

        this.Display.updateState(this.totalSumPesos, this.totalSumaDolares);
        this.HistoricTable.updateState(this.state.rowToShow);
      }
    })
  }

  deleteIngresoData() {
    let itemToDelete = this.state.rowtoDetail[0];
    let items = this.state.data.ingresos

    for (let i = 0; i < items.length; i++) {
      let ingresoItem = items[i];

      if(ingresoItem[0] === itemToDelete[0] &&
        ingresoItem[1] === itemToDelete[1] &&
        ingresoItem[2] === itemToDelete[2] &&
        ingresoItem[3] === itemToDelete[3] &&
        ingresoItem[4] === itemToDelete[4] &&
        ingresoItem[5] === itemToDelete[5])
     {
        items.splice(i, 1);
     }
    }

    this.deleteData(items);
  }

  insertData(arrayData) {
    this.state.data.ingresos.push(arrayData)
    AsyncStorage.mergeItem(
      this.state.data.seguridad.userName + '-' + this.state.data.seguridad.password,
      JSON.stringify(this.state.data),
      (value) => {
        console.log(value)
      })
  }

  deleteData(ingresosItems) {
    this.state.data.ingresos = ingresosItems
    AsyncStorage.mergeItem(
      this.state.data.seguridad.userName + '-' + this.state.data.seguridad.password,
      JSON.stringify(this.state.data),
      (value) => {
        console.log(value)
      })
  }

  formData(data) {
    var now = moment().format('DD-MM-YYYY');
    let arrayDataToShow = [now, parseInt(data.cantidad), data.moneda, ''];
    let arrayData = [now, parseInt(data.cantidad), data.moneda, data.medio, data.fuente, data.cuenta]
    this.insertData(arrayData)
    this.state.rowtoDetail.push(arrayData);
    this.state.rowToShow.push(arrayDataToShow);
    let totalSumPesos = sumValues(this.state.rowtoDetail)[0]
    let totalSumDolares = sumValues(this.state.rowtoDetail)[1]
    this.HistoricTable.updateState(this.state.rowToShow);
    this.Display.updateState(totalSumPesos, totalSumDolares);
  }

  getDisplayFilter(date) {
    if (this.state.rowtoDetail.length > 0) {
      let filterDataToShow = getMatchedData(date, this.state.rowToShow);
      let filterData = getMatchedData(date, this.state.rowtoDetail);
      let filterSumPesos = sumValues(filterData)[0]
      let filterSumDolares = sumValues(filterData)[1]
      this.HistoricTable.updateState(filterDataToShow);
      this.Display.updateState(filterSumPesos, filterSumDolares);
    }
  }

  deleteRow(index) {
    this.deleteIngresoData()
    this.state.rowtoDetail.splice(index, 1);
    this.state.rowToShow.splice(index, 1);
    let totalSumPesos = sumValues(this.state.rowtoDetail)[0]
    let totalSumDolares = sumValues(this.state.rowtoDetail)[1]
    this.HistoricTable.updateState(this.state.rowToShow);
    this.Display.updateState(totalSumPesos, totalSumDolares);
  } 

  render() {
    let userData = this.props.route.params
    if (!this.state.data) {
      this.getIngresoData(userData)
    }
    return (
      <Block center style={styles.ingresos}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Display
            ref={(display) => { this.Display = display }}
            defaultDate={this.defaultDate}
            defaultPesos={this.totalSumPesos}
            defaultDolares={this.totalSumaDolares}
            getDate={this.getDisplayFilter.bind(this)}

          />
          <Form type={'Ingresos'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable type={'Ingresos'}
            ref={(table) => { this.HistoricTable = table }}
            cols={this.colTable}
            rows={this.state.rowToShow}
            detailRows={this.state.rowtoDetail}
            deleteRow={this.deleteRow.bind(this)}
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
