import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class HistoricTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: props.cols,
      tableData: props.rows
    }
  }

  render() {
    return stackTable(this.state);
  }

}

function stackTable(state) {
  return (
    <View style={styles.table} >
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
  table: {
    backgroundColor: '#0B1F35',
    width: 320,
    flex: 1,
    padding: 15,
    marginTop: 30,
    borderRadius: 20,
    marginBottom: 100,
    marginLeft: 10,
    height: 200
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
