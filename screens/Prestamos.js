import React from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Button, Block, Text } from 'galio-framework'
import Display from '../components/DisplayMount'
import Form from '../components/Formulario'
import { showMessage, hideMessage } from 'react-native-flash-message'
import HistoricTable from '../components/HistoricTable'
const { width, height } = Dimensions.get('screen')
import moment from 'moment'
function getMatchedData (dateFilter, rowValues) {
  let filterDataRows = []
  switch (dateFilter) {
    case 'Mensual':
      let monthDate = moment().startOf('month')
      compareDates(monthDate, filterDataRows, rowValues)
      break
    case 'Semestral':
      let semestralDate = moment().add(-6, 'M')
      compareDates(semestralDate, filterDataRows, rowValues)
      break
    case 'Anual':
      let anualDate = moment().startOf('year')
      compareDates(anualDate, filterDataRows, rowValues)
      break
  }
  return filterDataRows
}

function compareDates (filterDate, filterDataRows, rowValues) {
  for (let i = 0; i < rowValues.length; i++) {
    let baseDate = moment(rowValues[i][0], 'DD-MM-YYYY')
    if (baseDate.isAfter(filterDate)) {
      filterDataRows.push(rowValues[i])
    }
  }
}

function sumValues (rowValues) {
  let totalSumPesos = 0
  let totalSumaDolares = 0
  let sumas = []
  for (let i = 0; i < rowValues.length; i++) {
    if (!rowValues[i]) {
      continue
    }
    if (rowValues[i][2] === 'Pesos') {
      totalSumPesos += rowValues[i][1]
    } else if (rowValues[i][2] === 'Dolares') {
      totalSumaDolares += rowValues[i][1]
    }
  }
  sumas.push(totalSumPesos)
  sumas.push(totalSumaDolares)
  return sumas
}
export default class Prestamos extends React.Component {
  defaultDate = 'Anual'
  colTable = ['Fecha', 'Cantidad', 'Moneda', '']
  rowToShowPrestado = [
    ['02-09-2020', 1000, 'Pesos', ''],
    ['02-07-2020', 1000, 'Dolares', ''],
    ['13-01-2020', 1000, 'Pesos', '']
    // INIT QUERY
  ]
  rowtoDetailPrestado = [
    ['02-09-2020', 1000, 'Pesos', 'Medio', 'Destino', 'Cuenta'],
    ['02-07-2020', 1000, 'Dolares', 'Medio', 'Destino', 'Cuenta'],
    ['13-01-2020', 1000, 'Pesos', 'Medio', 'Destino', 'Cuenta']
    // INIT QUERY
  ]

  rowToShowTomado = [
    ['02-09-2020', 1000, 'Pesos', ''],
    ['02-07-2020', 1000, 'Dolares', ''],
    ['13-01-2020', 1000, 'Pesos', '']
    // INIT QUERY
  ]

  rowtoDetailTomado = [
    [
      '02-09-2020',
      1000,
      'Pesos',
      'Medio',
      'propietario',
      'cuenta',
      'interes',
      'cuotas',
      'vencimiento'
    ],
    [
      '02-07-2020',
      1000,
      'Dolares',
      'Medio',
      'propietario',
      'cuenta',
      'interes',
      'cuotas',
      'vencimiento'
    ],
    [
      '13-01-2020',
      1000,
      'Pesos',
      'Medio',
      'propietario',
      'cuenta',
      'interes',
      'cuotas',
      'vencimiento'
    ]
    // INIT QUERY
  ]
  formData (data) {
    var now = moment().format('DD-MM-YYYY')
    let arrayDataToShow = [
      now,
      parseInt(
        (parseInt(data.cantidad) *
          (1 + (data.interes ? parseInt(data.interes) : 0) / 100)) /
          (data.cuotas ? parseInt(data.cuotas) : 1)
      ),
      data.moneda,
      ''
    ]
    if (data.type === 'Prestado') {
      let arrayDataPrestado = [
        now,
        parseInt(data.cantidad),
        data.moneda,
        data.medio,
        data.destino,
        data.cuenta
      ]
      this.rowtoDetailPrestado.push(arrayDataPrestado)
      this.rowToShowPrestado.push(arrayDataToShow)
      let totalSumPesos = sumValues(this.rowtoDetailPrestado)[0]
      let totalSumDolares = sumValues(this.rowtoDetailPrestado)[1]

      this.tablePrestados.updateState(this.rowToShowPrestado)
      this.displayPrestados.updateState(totalSumPesos, totalSumDolares)
    } else if (data.type === 'Tomado') {
      let arrayDataTomado = [
        now,
        parseInt(
          (parseInt(data.cantidad) *
            (1 + (data.interes ? parseInt(data.interes) : 0) / 100)) /
            (data.cuotas ? parseInt(data.cuotas) : 1)
        ),
        data.moneda,
        data.medio,
        data.propietario,
        data.cuenta,
        data.interes,
        data.cuota,
        data.vencimiento
      ]
      this.rowtoDetailTomado.push(arrayDataTomado)
      this.rowToShowTomado.push(arrayDataToShow)
      let totalSumPesos = sumValues(this.rowtoDetailTomado)[0]
      let totalSumDolares = sumValues(this.rowtoDetailTomado)[1]
      this.tableTomados.updateState(this.rowToShowTomado)
      this.displayTomados.updateState(totalSumPesos, totalSumDolares)
    }
  }
  getDisplayFilterPrestados (date) {
    if (this.rowtoDetailPrestado.length > 0) {
      let filterDataToShow = getMatchedData(date, this.rowToShowPrestado)
      let filterData = getMatchedData(date, this.rowtoDetailPrestado)
      let filterSumPesos = sumValues(filterData)[0]
      let filterSumDolares = sumValues(filterData)[0]
      this.tablePrestados.updateState(filterDataToShow)
      this.displayPrestados.updateState(filterSumPesos, filterSumDolares)
    }
  }
  getDisplayFilterTomados (date) {
    if (this.rowtoDetailTomado.length > 0) {
      let filterDataToShow = getMatchedData(date, this.rowToShowTomado)
      let filterData = getMatchedData(date, this.rowtoDetailTomado)
      let filterSumPesos = sumValues(filterData)[0]
      let filterSumDolares = sumValues(filterData)[0]
      this.tableTomados.updateState(filterDataToShow)
      this.displayTomados.updateState(filterSumPesos, filterSumDolares)
    }
  }
  deleteRow (index, type) {
    if (type === 'Tomados') {
      this.rowtoDetailTomado.splice(index, 1)
      this.rowToShowTomado.splice(index, 1)
      let totalSumPesos = sumValues(this.rowtoDetailTomado)[0]
      let totalSumDolares = sumValues(this.rowtoDetailTomado)[1]
      this.tableTomados.updateState(this.rowToShowTomado)
      this.displayTomados.updateState(totalSumPesos, totalSumDolares)
    } else if (type === 'Prestados') {
      this.rowtoDetailPrestado.splice(index, 1)
      this.rowToShowPrestado.splice(index, 1)
      let totalSumPesos = sumValues(this.rowtoDetailPrestado)[0]
      let totalSumDolares = sumValues(this.rowtoDetailPrestado)[1]
      this.tablePrestados.updateState(this.rowToShowPrestado)
      this.displayPrestados.updateState(totalSumPesos, totalSumDolares)
    }
  }

  render () {
    let totalSumPesosPrestados = 0
    let totalSumDolaresPrestados = 0

    let totalSumDolaresTomados = 0
    let totalSumPesosTomados = 0

    for (let i = 0; i < this.rowtoDetailPrestado.length; i++) {
      if (!this.rowtoDetailPrestado[i]) {
        continue
      }
      if (this.rowtoDetailPrestado[i][2] === 'Pesos') {
        totalSumPesosPrestados += this.rowtoDetailPrestado[i][1]
      } else if (this.rowtoDetailPrestado[i][2] === 'Dolares') {
        totalSumDolaresPrestados += this.rowtoDetailPrestado[i][1]
      }
    }

    for (let i = 0; i < this.rowtoDetailTomado.length; i++) {
      if (!this.rowtoDetailTomado[i]) {
        continue
      }
      if (this.rowtoDetailTomado[i][2] === 'Pesos') {
        totalSumPesosTomados += this.rowtoDetailTomado[i][1]
      } else if (this.rowtoDetailPrestado[i][2] === 'Dolares') {
        totalSumDolaresTomados += this.rowtoDetailTomado[i][1]
      }
    }
    return (
      <Block center style={styles.egresos}>
        <ScrollView>
          {/* Prestamos Prestados */}
          <Text style={styles.titleText}> PRESTADOS</Text>

          <Display
            ref={displayPrestados => {
              this.displayPrestados = displayPrestados
            }}
            defaultDate={this.defaultDate}
            defaultPesos={totalSumPesosPrestados}
            defaultDolares={totalSumDolaresPrestados}
            getDate={this.getDisplayFilterPrestados.bind(this)}
          />
          <Form
            type={'Prestamos Prestados'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable
            type={'Prestados'}
            ref={tablePrestados => {
              this.tablePrestados = tablePrestados
            }}
            cols={this.colTable}
            rows={this.rowToShowPrestado}
            detailRows={this.rowtoDetailPrestado}
            deleteRow={this.deleteRow.bind(this)}
          />
          {/* Prestamos Tomados */}
          <Text style={styles.titleText}> TOMADOS</Text>

          <Display
            ref={displayTomados => {
              this.displayTomados = displayTomados
            }}
            defaultDate={this.defaultDate}
            defaultPesos={totalSumPesosTomados}
            defaultDolares={totalSumDolaresTomados}
            getDate={this.getDisplayFilterTomados.bind(this)}
          />
          <Form
            type={'Prestamos Tomados'}
            getFormData={this.formData.bind(this)}
          />
          <HistoricTable
            type={'Tomados'}
            ref={tableTomados => {
              this.tableTomados = tableTomados
            }}
            cols={this.colTable}
            rows={this.rowToShowTomado}
            detailRows={this.rowtoDetailTomado}
            deleteRow={this.deleteRow.bind(this)}
          />
        </ScrollView>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  egresos: {
    width: width,
    height: height,
    backgroundColor: '#071019'
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  }
})
