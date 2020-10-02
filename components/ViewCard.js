import React, { Component } from "react";
import { StyleSheet, View, Switch, PointPropType, Block } from "react-native";
import { CardView } from "react-native-credit-card-input";

export default class ViewCard extends React.Component {
    render() {
        return (
            <CardView
                name={this.props.name}
                number={this.props.number}
                expiry={this.props.expiry}
                cvc={this.props.cvc}
                brand={this.props.brand}
            />
        );
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "transparent",
        marginTop: 60,
    },
    label: {
        color: "gray",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "gray",
    },
    inputCointaer: {
        borderBottomWidth: 1,
        borderBottomColor: "white"
    },
    btnIngresar: {
        width: 200,
        height: 33,
        backgroundColor: '#F41F1F',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignSelf: 'center'
    }
});