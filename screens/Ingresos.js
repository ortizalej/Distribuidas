import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import Display from '../components/DisplayMount';
import Form from '../components/Formulario';
const { width } = Dimensions.get('screen');
export default class Ingresos extends React.Component {

  render() {
    return (
      <Block center flex style={styles.ingresos}>
        <Display />
        <Form type={'Ingresos'} />
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  ingresos: {
    width: width,
    backgroundColor: "#071019"
  }
});

