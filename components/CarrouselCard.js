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
            carouselItems: this.props.items
        }
    }
    _renderItem({ item, index }) {
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
                    renderItem={this._renderItem}
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
        marginLeft: 30
    }
});