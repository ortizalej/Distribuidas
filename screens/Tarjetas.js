import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import CarrouselCard from '../components/CarrouselCard';
import Display from '../components/DisplayMount'
const { width, height } = Dimensions.get('screen');

export default class Tarjetas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselItems: [
                {
                    name: "Item 1",
                    number: '12313123123',
                    cvc: '123',
                    brand: "visa",
                },
                {
                    name: "Item 1",
                    number: '12313123123',
                    cvc: '123',
                    brand: "visa",
                },
                {
                    name: "Item 1",
                    number: '12313123123',
                    cvc: '123',
                    brand: "visa",
                }
            ]
        }
    }
    defaultDate = 'Mensual'
    defaultBudget = '2400'
    defaultCoin = '$'
    render() {
        return (
            <Block style={styles.tarjetas}>
                <CarrouselCard items={this.state.carouselItems} />
                <Display style={styles.display}
                    defaultBudget={this.defaultBudget}
                    defaultCoin={this.defaultCoin}
                    defaultDate={this.defaultDate}
                />

            </Block>
        );
    }
}
const styles = StyleSheet.create({
    tarjetas: {
        width: width,
        height: height,
        backgroundColor: "#071019",
        alignContent: 'center'
    },
});

