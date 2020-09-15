import React, { Component } from "react";
import { StyleSheet, View, Switch, SafeAreaView } from "react-native";
import {
    Container,
    Content,
    Form,
} from "native-base";
import Carousel from 'react-native-snap-carousel';
import ViewCard from '../components/ViewCard';
export default class CarrouselCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: this.props.items,
            type: this.props.type
        }
    }
    _renderItemCard({ item, index }) {
        return (
            <View>
                <ViewCard
                    name={item.name}
                    number={item.number}
                    expiry={item.expiry}
                    brand={item.brand}
                />
            </View>
        )
    }
    _renderItemBank({ item, index }) {
        return (
            <View>
                <ViewCard
                    name={item.name}
                    number={item.number}
                    cvc={item.cvc}
                    brand={item.brand}
                />
            </View>
        )
    }    

    render() {
        return (
            <View center style={styles.container}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.carouselItems}
                    renderItem={this.state.type === 'Card' ? this._renderItemCard : this._renderItemBank}
                    sliderWidth={300}
                    itemWidth={300}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginLeft: 36
    }
});