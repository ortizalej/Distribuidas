import React from 'react'
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native'
import { Button, Block, Text } from 'galio-framework'
import Display from '../components/DisplayMount'
import Form from '../components/Formulario'
import HistoricTable from '../components/HistoricTable'
const { width, height } = Dimensions.get('screen')
import moment from 'moment'
function getMatchedData(dateFilter, rowValues) {
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

function compareDates(filterDate, filterDataRows, rowValues) {
  for (let i = 0; i < rowValues.length; i++) {
    let baseDate = moment(rowValues[i][0], 'DD-MM-YYYY')
    if (baseDate.isAfter(filterDate)) {
      filterDataRows.push(rowValues[i])
    }
  }
}

function sumValues(rowValues) {
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
  constructor(props) {
    super(props)
    this.state = {
      rowToShowPrestado: [],
      rowtoDetailPrestado: [],
      rowToShowTomado: [],
      rowtoDetailTomado: [],
      data: undefined
    }
  }
  totalSumPesosPrestados = 0
  totalSumaDolaresPrestados = 0
  totalSumPesosTomados = 0
  totalSumaDolaresTomados = 0
  getPrestamoData(data) {
    AsyncStorage.getItem(data.userName + '-' + data.password).then(value => {
      let userData = JSON.parse(value)
      this.state.data = userData
      if (userData.prestamos.prestado.length > 0) {
        let arrayDataDetailPrestado = []
        let showDataPrestado = []
        console.log(userData)
        for (let i = 0; i < userData.prestamos.prestado.length; i++) {
          arrayDataDetailPrestado.push([
            userData.prestamos.prestado[i][0],
            userData.prestamos.prestado[i][1],
            userData.prestamos.prestado[i][2],
            userData.prestamos.prestado[i][3],
            userData.prestamos.prestado[i][4]
          ])

          showDataPrestado.push([
            userData.prestamos.prestado[i][0],
            userData.prestamos.prestado[i][1],
            userData.prestamos.prestado[i][2], 
            ''
          ])
        }
        this.setState({
          rowToShowPrestado: showDataPrestado,
          rowtoDetailPrestado: arrayDataDetailPrestado
        })
        console.log('PRESTADO',showDataPrestado)
        for (let i = 0; i < this.state.rowtoDetailPrestado.length; i++) {
          if (!this.state.rowtoDetailPrestado[i]) {
            continue
          }
          if (this.state.rowtoDetailPrestado[i][2] === 'Pesos') {
            this.totalSumPesosPrestados += this.state.rowtoDetailPrestado[i][1]
          } else if (this.state.rowtoDetailPrestado[i][2] === 'Dolares') {
            this.totalSumaDolaresPrestados += this.state.rowtoDetailPrestado[i][1]
          }
        }
        this.displayPrestados.updateState(this.totalSumPesosPrestados, this.totalSumaDolaresPrestados)

        this.tablePrestados.updateState(showDataPrestado)
      }
      if (userData.prestamos.tomado.length > 0) {
        let arrayDataDetailTomado = []
        let showDataTomado = []
        for (let i = 0; i < userData.prestamos.tomado.length; i++) {
          arrayDataDetailTomado.push([
            userData.prestamos.tomado[i][0],
            userData.prestamos.tomado[i][1],
            userData.prestamos.tomado[i][2],
            userData.prestamos.tomado[i][3],
            userData.prestamos.tomado[i][4],
            userData.prestamos.tomado[i][5],
            userData.prestamos.tomado[i][6],
            userData.prestamos.tomado[i][7]           
          ]) 
          showDataTomado.push([
            userData.prestamos.tomado[i][0],
            userData.prestamos.tomado[i][1],
            userData.prestamos.tomado[i][2],
            ''
          ])
        }

        this.setState({
          rowToShowTomado: showDataTomado,
          rowtoDetailTomado: arrayDataDetailTomado 
        })

        for (let i = 0; i < this.state.rowtoDetailTomado.length; i++) {
          if (!this.state.rowtoDetailTomado[i]) {
            continue
          }
          if (this.state.rowtoDetailTomado[i][2] === 'Pesos') {
            this.totalSumPesosTomados += this.state.rowtoDetailTomado[i][1]
          } else if (this.state.rowtoDetailTomado[i][2] === 'Dolares') {
            this.totalSumaDolaresTomados += this.state.rowtoDetailTomado[i][1]
          }
        }
        this.displayTomados.updateState(this.totalSumPesosTomados, this.totalSumaDolaresTomados)
        this.tableTomados.updateState(this.state.rowToShowTomado)
      }
    })
  }

  insertData(arrayData, type) {
    if (type === 'Prestado') {
      this.state.data.prestamos.prestado.push(arrayData)
      console.log(JSON.stringify(this.state.data))
    } else if (type === 'Tomado') {
      this.state.data.prestamos.tomado.push(arrayData)

    }
    AsyncStorage.mergeItem(
      this.state.data.seguridad.userName +
      '-' +
      this.state.data.seguridad.password,
      JSON.stringify(this.state.data),
      value => {
        console.log(value)
      }
    )
  }

  formData(data) {
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
      this.insertData(arrayDataPrestado, data.type)

      this.state.rowtoDetailPrestado.push(arrayDataPrestado)
      this.state.rowToShowPrestado.push(arrayDataToShow)
      let totalSumPesos = sumValues(this.state.rowtoDetailPrestado)[0]
      let totalSumDolares = sumValues(this.state.rowtoDetailPrestado)[1]

      this.tablePrestados.updateState(this.state.rowToShowPrestado)
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
      this.insertData(arrayDataTomado, data.type)
      this.state.rowtoDetailTomado.push(arrayDataTomado)
      this.state.rowToShowTomado.push(arrayDataToShow)
      let totalSumPesos = sumValues(this.state.rowtoDetailTomado)[0]
      let totalSumDolares = sumValues(this.state.rowtoDetailTomado)[1]
      this.tableTomados.updateState(this.state.rowToShowTomado)
      this.displayTomados.updateState(totalSumPesos, totalSumDolares)
    }
  }
  getDisplayFilterPrestados(date) {
    if (this.state.rowtoDetailPrestado.length > 0) {
      let filterDataToShow = getMatchedData(date, this.state.rowToShowPrestado)
      let filterData = getMatchedData(date, this.state.rowtoDetailPrestado)
      let filterSumPesos = sumValues(filterData)[0]
      let filterSumDolares = sumValues(filterData)[0]
      this.tablePrestados.updateState(filterDataToShow)
      this.displayPrestados.updateState(filterSumPesos, filterSumDolares)
    }
  }
  getDisplayFilterTomados(date) {
    if (this.state.rowtoDetailTomado.length > 0) {
      let filterDataToShow = getMatchedData(date, this.state.rowToShowTomado)
      let filterData = getMatchedData(date, this.state.rowtoDetailTomado)
      let filterSumPesos = sumValues(filterData)[0]
      let filterSumDolares = sumValues(filterData)[0]
      this.tableTomados.updateState(filterDataToShow)
      this.displayTomados.updateState(filterSumPesos, filterSumDolares)
    }
  }
  deleteRow(index, type) {
    if (type === 'Tomados') {
      this.state.rowtoDetailTomado.splice(index, 1)
      this.state.rowToShowTomado.splice(index, 1)
      let totalSumPesos = sumValues(this.state.rowtoDetailTomado)[0]
      let totalSumDolares = sumValues(this.state.rowtoDetailTomado)[1]
      this.tableTomados.updateState(this.state.rowToShowTomado)
      this.displayTomados.updateState(totalSumPesos, totalSumDolares)
    } else if (type === 'Prestados') {
      this.state.rowtoDetailPrestado.splice(index, 1)
      this.state.rowToShowPrestado.splice(index, 1)
      let totalSumPesos = sumValues(this.state.rowtoDetailPrestado)[0]
      let totalSumDolares = sumValues(this.state.rowtoDetailPrestado)[1]
      this.tablePrestados.updateState(this.state.rowToShowPrestado)
      this.displayPrestados.updateState(totalSumPesos, totalSumDolares)
    }
  }

  render() {
    let userData = this.props.route.params
    if (!this.state.data) {
      this.getPrestamoData(userData)
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
            defaultPesos={this.totalSumPesosPrestados}
            defaultDolares={this.totalSumDolaresPrestados}
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
            rows={this.state.rowToShowPrestado}
            detailRows={this.state.rowtoDetailPrestado}
            deleteRow={this.deleteRow.bind(this)}
          />
          {/* Prestamos Tomados */}
          <Text style={styles.titleText}> TOMADOS</Text>

          <Display
            ref={displayTomados => {
              this.displayTomados = displayTomados
            }}
            defaultDate={this.defaultDate}
            defaultPesos={this.totalSumPesosTomados}
            defaultDolares={this.totalSumDolaresTomados}
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
            rows={this.state.rowToShowTomado}
            detailRows={this.state.rowtoDetailTomado}
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
