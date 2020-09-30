import React, { useState } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  TouchableHighlight
} from 'react-native'
import { Block } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { Item, Label, Text, Picker } from 'native-base'

export default class DisplayMount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultDate: 'Anual',
      defaultCoin: props.defaultCoin,
      defaultPesos: props.defaultPesos,
      defaultDolares: props.defaultDolares
    }
  }
  updateState (valuePesos, valueDolares) {
    this.setState({
      defaultPesos: valuePesos,
      defaultDolares: valueDolares
    })
  }

  getDate (value) {
    this.setState({
      defaultDate: value
    })
    this.props.getDate(value)
  }

  render () {
    return (
      <Block center>
        <View style={styles.buttonStyle}>
          <LinearGradient
            colors={['#FF004E', '#FF9040']}
            style={styles.linearGradient}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.dateText}>{this.state.defaultDate}</Text>
            <Label style={styles.budgetText}>
              ARS {this.state.defaultPesos}
            </Label>

            <Label style={styles.budgetTextDollar}>
              USD {this.state.defaultDolares}
            </Label>
          </LinearGradient>
          <Item>
            <Picker
              textStyle={styles.picker}
              selectedValue={this.state.defaultDate}
              onValueChange={this.getDate.bind(this)}
            >
              <Picker.Item label='Mensual' value='Mensual' color='#697A8C' />
              <Picker.Item
                label='Semestral'
                value='Semestral'
                color='#697A8C'
              />
              <Picker.Item label='Anual' value='Anual' color='#697A8C' />
            </Picker>
          </Item>
        </View>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 80,
    width: 270,
    marginTop: 30
  },
  dateText: {
    backgroundColor: 'transparent',
    fontSize: 8,
    color: '#fff'
  },
  budgetText: {
    backgroundColor: 'transparent',
    fontSize: 25,
    color: '#fff'
  },
  budgetTextDollar: {
    backgroundColor: 'transparent',
    fontSize: 25,
    color: '#fff',
    borderTopColor: 'black',
    borderTopWidth: 1
  },
  picker: {
    color: '#697A8C',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
