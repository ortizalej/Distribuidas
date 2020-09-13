import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Modal, TouchableHighlight } from 'react-native';
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
  constructor(props) {
    super(props);
    this.state = {
      defaultDate: props.defaultDate,
      defaultCoin: props.defaultCoin, 
      defaultBudget: props.defaultBudget,
      disabled: props.disabled
    }
  }  
  updateState(value) {
    console.log(value)
    this.setState(
      {
        defaultBudget : value 
      }
    )
  }
  render() {
    return (
      <Block center >
        <View style={styles.buttonStyle}>
          <TouchableHighlight onPress={() => this.visible = true} disabled={this.state.disabled}>
            <LinearGradient colors={['#FF004E', '#FF9040']} style={styles.linearGradient} start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }} >
              <Text
                style={styles.dateText}>
                {this.state.defaultDate}
              </Text>
              <Label
                style={styles.budgetText}>
                {this.state.defaultCoin} {this.state.defaultBudget}
              </Label>
            </LinearGradient>
          </TouchableHighlight>
        </View>
      </Block>

    );
  }

}

const styles = StyleSheet.create({

  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 69,
    width: 270,
    marginTop: 30
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
