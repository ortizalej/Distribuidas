import React from 'react'
import { StyleSheet, Dimensions, ScrollView, AsyncStorage, Platform } from 'react-native'
import { Button, Block } from 'galio-framework'
import Display from '../components/DisplayMount'
import Form from '../components/Formulario'
import HistoricTable from '../components/HistoricTable'
import { showMessage, hideMessage } from 'react-native-flash-message'
import ImageViewer from './ImageViewer'
import moment from 'moment'

const { width, height } = Dimensions.get('screen')

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

export default class Egresos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rowToShow: [],
      rowtoDetail: [],
      data: undefined,
      uriImage: undefined
    }
  }
  defaultDate = 'Anual'
  colTable = ['Fecha', 'Cantidad', 'Moneda', '']
  totalSumPesos = 0
  totalSumaDolares = 0

  getEgresoData(data) {
    AsyncStorage.getItem(data.userName + '-' + data.password).then(value => {
      let userData = JSON.parse(value)
      this.state.data = userData
      if (userData.egresos.length > 0) {
        let arrayDataDetail = []
        let showData = []
        for (let i = 0; i < userData.egresos.length; i++) {
          
          arrayDataDetail.push([
            userData.egresos[i][0],
            userData.egresos[i][1],
            userData.egresos[i][2],
            userData.egresos[i][3],
            userData.egresos[i][4],
            userData.egresos[i][5],
            userData.egresos[i][6],
            userData.egresos[i][7],
            userData.egresos[i][8],
            userData.egresos[i][9]
          ])

          showData.push([
            userData.egresos[i][0],
            userData.egresos[i][1],
            userData.egresos[i][2],
            ''
          ])

        }
        
        this.setState({
          rowToShow: showData,
          rowtoDetail: arrayDataDetail
        })

        for (let i = 0; i < this.state.rowtoDetail.length; i++) {
          if (!this.state.rowtoDetail[i]) {
            continue
          }
          if (this.state.rowtoDetail[i][2] === 'Pesos') {
            this.totalSumPesos += this.state.rowtoDetail[i][1]
          } else if (this.state.rowtoDetail[i][2] === 'Dolares') {
            this.totalSumaDolares += this.state.rowtoDetail[i][1]
          }
        }

        this.Display.updateState(this.totalSumPesos, this.totalSumaDolares)
        this.HistoricTable.updateState(this.state.rowToShow)
      }
    })
  }

  deleteEgresoData() {
    let itemToDelete = this.state.rowtoDetail[0]
    let items = this.state.data.egresos

    for (let i = 0; i < items.length; i++) {
      let egresoItem = items[i]

      if (
        egresoItem[0] === itemToDelete[0] &&
        egresoItem[1] === itemToDelete[1] &&
        egresoItem[2] === itemToDelete[2] &&
        egresoItem[3] === itemToDelete[3] &&
        egresoItem[4] === itemToDelete[4] &&
        egresoItem[5] === itemToDelete[5] &&
        egresoItem[6] === itemToDelete[6] &&
        egresoItem[7] === itemToDelete[7] &&
        egresoItem[8] === itemToDelete[8]
      ) {
        items.splice(i, 1)
      }
    }

    this.deleteData(items)
  }

  insertData(arrayData) {
    console.log('DATA TO SAVE', arrayData)
    this.state.data.egresos.push(arrayData)
    AsyncStorage.mergeItem(
      this.state.data.seguridad.userName +
      '-' +
      this.state.data.seguridad.password,
      JSON.stringify(this.state.data)
    )
  }

  deleteData(egresosItems) {
    this.state.data.egresos = egresosItems
    AsyncStorage.mergeItem(
      this.state.data.seguridad.userName +
      '-' +
      this.state.data.seguridad.password,
      JSON.stringify(this.state.data),
      value => {
        console.log(value)
      }
    )
    showMessage({
      message: '¡Egreso eliminado con éxito!',
      type: 'success'
    })

  }

  formData(data) {
    console.log(JSON.stringify(data))
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
    let arrayData = [
      now,
      parseInt(
        (parseInt(data.cantidad) *
          (1 + (data.interes ? parseInt(data.interes) : 0) / 100)) /
        (data.cuotas ? parseInt(data.cuotas) : 1)
      ),
      data.moneda,
      data.medio,
      data.tipo,
      data.tipoServicio,
      data.interes,
      data.cuotas,
      data.cuenta,
      data.otros,
      data.uriImage
    ]
    this.insertData(arrayData)
    this.state.rowtoDetail.push(arrayData)
    this.state.rowToShow.push(arrayDataToShow)
    let totalSumPesos = sumValues(this.state.rowtoDetail)[0]
    let totalSumDolares = sumValues(this.state.rowtoDetail)[1]
    this.HistoricTable.updateState(this.state.rowToShow)
    this.Display.updateState(totalSumPesos, totalSumDolares)
  }

  getDisplayFilter(date) {
    if (this.state.rowtoDetail.length > 0) {
      let filterDataToShow = getMatchedData(date, this.state.rowToShow)
      let filterData = getMatchedData(date, this.state.rowtoDetail)
      let filterSumPesos = sumValues(filterData)[0]
      let filterSumDolares = sumValues(filterData)[1]
      this.HistoricTable.updateState(filterDataToShow)
      this.Display.updateState(filterSumPesos, filterSumDolares)
    }
  }
  navigateToImage(data) {
    console.log('DATA', data)
    this.setState({ uriImage: data[10] })

  }
  deleteRow(index) {
    this.deleteEgresoData()
    this.state.rowtoDetail.splice(index, 1)
    this.state.rowToShow.splice(index, 1)
    let totalSumPesos = sumValues(this.state.rowtoDetail)[0]
    let totalSumDolares = sumValues(this.state.rowtoDetail)[1]
    this.HistoricTable.updateState(this.state.rowToShow)
    this.Display.updateState(totalSumPesos, totalSumDolares)
  }

  render() {
    let userData = this.props.route.params
    if (!this.state.data) {
      this.getEgresoData(userData)
    }

    return (
      <Block center style={styles.egresos}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Display
            ref={display => {
              this.Display = display
            }}
            defaultDate={this.defaultDate}
            defaultPesos={this.totalSumPesos}
            defaultDolares={this.totalSumaDolares}
            getDate={this.getDisplayFilter.bind(this)}
          />
          <Form type={'Egresos'} getFormData={this.formData.bind(this)} user={userData} />
          <HistoricTable
            type={'Egresos'}
            ref={table => {
              this.HistoricTable = table
            }}
            cols={this.colTable}
            rows={this.state.rowToShow}
            detailRows={this.state.rowtoDetail}
            deleteRow={this.deleteRow.bind(this)}
            navigateToImage={this.navigateToImage.bind(this)}
          />
          <ImageViewer data={this.state.uriImage} />

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
  }
})
