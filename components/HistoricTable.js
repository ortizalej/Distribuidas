import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class HistoricTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Fecha', 'Cantidad', 'Tipo', 'Fuente'],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ]
    }
  }

  render() {
    return ingresosTable(this.state);
  }

}

function ingresosTable(state) {
  return (
    <View style={styles.container} >
      <ScrollView vertical={true}>

        <Table >
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.headText} />
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
            <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>
      </ScrollView>

    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B1F35',
    width: 320,
    flex: 1,
    padding: 15,
    marginTop: 30,
    borderRadius: 20,
  },
  head: {
    height: 40,
    backgroundColor: '#0B1F35',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  wrapper: {
    flexDirection: 'row',
    borderRadius: 8
  },
  title: {
    flex: 1
  },
  row: {
    height: 28,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  text: {
    textAlign: 'center',
    color: 'white'
  },
  headText: {
    textAlign: 'center',
    color: 'gray'
  }
});
