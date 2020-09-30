import React from 'react'
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native'
import { Button, Block, Text, Input, theme, View } from 'galio-framework'
import Form from '../components/Formulario'
import Carrousel from '../components/CarrouselCard'
import HistoricTable from '../components/HistoricTable'
import { showMessage, hideMessage } from 'react-native-flash-message'
import moment from 'moment'

const { width, height } = Dimensions.get('screen')

export default class Inversiones extends React.Component {
  defaultDate = 'Anual'
  colTable = ['Fecha', 'Cantidad', 'Tipo', '']
  totalSumPesos = 0
  totalSumaDolares = 0
  constructor (props) {
    super(props)
    this.state = {
      rowToShow: [],
      rowtoDetail: [],
      data: undefined,
      dataGraph: new Map()
    }
  }

  getInversionesData (data) {
    AsyncStorage.getItem(data.userName + '-' + data.password).then(value => {
      let userData = JSON.parse(value)
      this.state.data = userData

      if (userData.inversiones.length > 0) {
        let arrayDataDetail = []
        let showData = []
        let graphData = new Map()
        console.log(userData)
        for (let i = 0; i < userData.inversiones.length; i++) {
          arrayDataDetail.push([
            userData.inversiones[i][0],
            userData.inversiones[i][1],
            userData.inversiones[i][2],
            userData.inversiones[i][3],
            userData.inversiones[i][4]
          ])
          showData.push([
            userData.inversiones[i][0],
            userData.inversiones[i][1],
            userData.inversiones[i][2],
            ''
          ])
          this.setState({
            rowToShow: showData,
            rowtoDetail: arrayDataDetail,
            dataGraph: graphData
          })
          if (graphData.has(userData.inversiones[i][2])) {
            let data = graphData.get(userData.inversiones[i][2])

            data.datasets[0].data.push(userData.inversiones[i][1])
            data.labels.push(userData.inversiones[i][0].toString())
            graphData.set(userData.inversiones[i][2], data)
          } else {
            graphData.set(userData.inversiones[i][2], {
              labels: [userData.inversiones[i][0].toString()],
              datasets: [
                {
                  data: [userData.inversiones[i][1]]
                }
              ],
              legend: [userData.inversiones[i][2]] // optional
            })
          }
        }

        for (let i = 0; i < this.state.rowtoDetail.length; i++) {
          if (!this.state.rowtoDetail[i]) {
            continue
          }
          if (this.state.rowtoDetail[i][2] === 'Pesos') {
            totalSumPesos += this.state.rowtoDetail[i][1]
          } else if (this.state.rowtoDetail[i][2] === 'Dolares') {
            totalSumaDolares += this.state.rowtoDetail[i][1]
          }
        }
        let graphToShow = []
        graphData.forEach((values, keys) => {
          graphToShow.push(values)
        })

        this.HistoricTable.updateState(this.state.rowToShow)
        this.Carrousel.updateState(graphToShow)
      }
    })
  }

  deleteInversionData () {
    let itemToDelete = this.state.rowtoDetail[0]
    let items = this.state.data.inversiones

    for (let i = 0; i < items.length; i++) {
      let inversionesItem = items[i]

      if (
        inversionesItem[0] === itemToDelete[0] &&
        inversionesItem[1] === itemToDelete[1] &&
        inversionesItem[2] === itemToDelete[2] &&
        inversionesItem[3] === itemToDelete[3] &&
        inversionesItem[4] === itemToDelete[4] &&
        inversionesItem[5] === itemToDelete[5] &&
        inversionesItem[6] === itemToDelete[6]
      ) {
        items.splice(i, 1)
      }
    }

    this.deleteData(items)
  }

  insertData (arrayData) {
    this.state.data.inversiones.push(arrayData)
    if (this.state.dataGraph.has(arrayData[2])) {
      let data = this.state.dataGraph.get(arrayData[2])

      data.datasets[0].data.push(arrayData[1])
      data.labels.push(arrayData[0].toString())
      this.state.dataGraph.set(arrayData[2], data)
    } else {
      this.state.dataGraph.set(arrayData[2], {
        labels: [arrayData[0].toString()],
        datasets: [
          {
            data: [arrayData[1]]
          }
        ],
        legend: [arrayData[2]] // optional
      })
    }

    let graphToShow = []
    this.state.dataGraph.forEach((values, keys) => {
      graphToShow.push(values)
    })
    this.Carrousel.updateState(graphToShow)

    AsyncStorage.mergeItem(
      this.state.data.seguridad.userName +
        '-' +
        this.state.data.seguridad.password,
      JSON.stringify(this.state.data),
      () => {
        console.log('Inversion Guardada')
      }
    )
    showMessage({
      message: '¡Inversión registrada con éxito!',
      type: 'success'
    })
  }

  deleteData (inversionesItems) {
    this.state.data.inversiones = inversionesItems
    AsyncStorage.mergeItem(
      this.state.data.seguridad.userName +
        '-' +
        this.state.data.seguridad.password,
      JSON.stringify(this.state.data),
      () => {
        console.log('Inversion Eliminada')
      }
    )
    showMessage({
      message: '¡Inversión eliminada con éxito!',
      type: 'success'
    })
  }

  formData (data) {
    console.log(data)
    var now = moment().format('DD-MM-YYYY')
    let arrayDataToShow = [
      now,
      parseInt(
        parseInt(data.cantidad) *
          (1 + (data.interes ? parseInt(data.interes) : 0) / 100)
      ),
      data.tipo,
      ''
    ]
    let arrayData = [
      now,
      parseInt(
        parseInt(data.cantidad) *
          (1 + (data.interes ? parseInt(data.interes) : 0) / 100)
      ),
      data.tipo,
      data.interes,
      data.destino
    ]
    this.insertData(arrayData)
    this.state.rowtoDetail.push(arrayData)
    this.state.rowToShow.push(arrayDataToShow)
    this.HistoricTable.updateState(this.state.rowToShow)
  }

  getDisplayFilter (date) {
    if (this.state.rowtoDetail.length > 0) {
      let filterDataToShow = getMatchedData(date, this.state.rowToShow)
      this.HistoricTable.updateState(filterDataToShow)
    }
  }

  deleteRow (index) {
    this.deleteInversionData()
    this.state.rowtoDetail.splice(index, 1)
    this.state.rowToShow.splice(index, 1)
    this.HistoricTable.updateState(this.state.rowToShow)
  }

  render () {
    let userData = this.props.route.params
    if (!this.state.data) {
      this.getInversionesData(userData)
    }

    return (
      <Block style={styles.inversiones}>
        <ScrollView>
          <Carrousel
            items={this.state.dataGraph}
            type={'Inversiones'}
            ref={carrousel => {
              this.Carrousel = carrousel
            }}
          />
          <Form type={'Inversiones'} getFormData={this.formData.bind(this)} />
          <HistoricTable
            type={'Inversiones'}
            ref={table => {
              this.HistoricTable = table
            }}
            cols={this.colTable}
            rows={this.state.rowToShow}
            detailRows={this.state.rowtoDetail}
            deleteRow={this.deleteRow.bind(this)}
          />
        </ScrollView>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  inversiones: {
    width: width,
    backgroundColor: '#071019',
    height: height
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  titleGraph: {
    backgroundColor: 'transparent',
    fontSize: 20,
    color: '#fff',
    marginLeft: 10
  }
})
