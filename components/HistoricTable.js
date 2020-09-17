import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
const { width, height } = Dimensions.get('screen');

export default class HistoricTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: props.cols,
      tableData: props.rows,
      type: props.type,
      detailRows: props.detailRows
    }
  }
  updateState(value) {
    this.setState(
      {
        tableData: value
      }
    )
  }
  deleteRow(index) {
    this.props.deleteRow(index)
  }
  renderText(data, type) {

    switch (type) {
      case 'Ingresos':
        return `
          Fecha: ${data[0] ?? '-'}
          Monto: ${data[1] ?? '-'}
          Moneda: ${data[2] ?? '-'}
          Medio: ${data[3] ?? '-'}
          Fuente: ${data[4] ?? '-'}
          Cuenta: ${data[5] ?? '-'}
          `
      case 'Egresos':
        return `
        Fecha: ${data[0] ?? '-'}
        Monto: ${data[1] ?? '-'}
        Moneda: ${data[2] ?? '-'}
        Medio: ${data[3] ?? '-'}
        Tipo: ${data[4] ?? '-'}
        Tipo de Servicio: ${data[5] ?? '-'}
        Interes: ${data[6] ?? '-'}
        Cuota: ${data[7] ?? '-'}
        Otros: ${data[8] ?? '-'}
        `
      default:
        break;
    }
  }
  _alertIndex(index, data, type) {
    const title = 'Informacion Detallada';
    let message = this.renderText(data[index], type)
    const buttons = [
      { text: 'Cancel', type: 'cancel' },
      { text: 'Borrar', onPress: () => this.deleteRow(index) }
    ];
    Alert.alert(title, message, buttons);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index, this.props.detailRows, this.props.type)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>+</Text>
        </View>
      </TouchableOpacity>
    );
    return (

      <View style={styles.container}>
        <Table borderStyle={{ borderColor: 'transparent' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.headText} />
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
    backgroundColor: '#0B1F35',
    width: 340,
    marginTop: 30,
    borderRadius: 20,
    marginBottom: 150,
    alignSelf: 'center',
    paddingRight: 15,

  },
  head: {
    height: 40,
    backgroundColor: '#0B1F35',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 340,
    borderRadius: 20,

  },

  headText: {
    textAlign: 'center',
    color: 'gray',
    justifyContent: 'center'
  },
  text: {
    margin: 6,
    textAlign: 'center',
    color: 'white'

  },
  row: {
    height: 28,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginRight: 20,
    width: width,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
  },
  btn: {
    width: 18,
    height: 18,
    backgroundColor: '#F41F1F',
    borderRadius: 2,
    alignSelf: 'auto',
    borderRadius: 30,

  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center'
  }
});