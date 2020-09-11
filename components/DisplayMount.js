import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Block } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Title,
  Content,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Button,
  Text,
  Picker
} from "native-base";
const { width } = Dimensions.get('screen');

export default class DisplayMount extends React.Component {

  render() {
    return (
      <Block center >
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={() => onPressButton()} disabled={this.props.disabled}>
            <LinearGradient colors={['#FF004E', '#FF9040']} style={styles.linearGradient} start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }} >
              <Text
                style={styles.dateText}>
                {this.props.defaultDate}
              </Text>
              <Text
                style={styles.budgetText}>
                {this.props.defaultCoin} {this.props.defaultBudget}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Block>

    );
  }

}
function onPressButton() {
  return (
    <Item >
      <Picker
        textStyle={{ color: '#697A8C' }}
        placeholder="Tipo"
        placeholderTextColor="#697A8C"
      >
        <Picker.Item label='Efectivo' value='efectivo' color="#697A8C" />
        <Picker.Item label='Transferencia Bancaria' value='transferencia' color="#697A8C" />
      </Picker>
    </Item>
  )
}
const styles = StyleSheet.create({

  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 69,
    width: 270,
    marginTop: 50
  },
  dateText: {
    backgroundColor: 'transparent',
    fontSize: 8,
    color: '#fff',
  },
  budgetText: {
    backgroundColor: 'transparent',
    fontSize: 34,
    color: '#fff',
  }

});