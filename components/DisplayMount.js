import React from 'react';
import { StyleSheet,Dimensions, Text, Button, Alert, View } from 'react-native';
import { Block } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen');

export default class DisplayMount extends React.Component {

  render() {
    return (
      <Block  >
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
            <LinearGradient colors={['#FF004E', '#FF9040']} style={styles.linearGradient} start={{x: 0.0 , y: 0.0}} end={{x: 1, y: 1}} >
              <Text
                style={styles.dateText}>
                Mensual
              </Text>
              <Text
                style={styles.budgetText}>
                $ 2400
          </Text>
            </LinearGradient>
          </TouchableOpacity>
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
    marginTop: 50    
  },
  dateText :{
    backgroundColor: 'transparent',
    fontSize: 8,
    color: '#fff',
  },
  budgetText :{
    backgroundColor: 'transparent',
    fontSize: 34,
    color: '#fff',
  } 

});
