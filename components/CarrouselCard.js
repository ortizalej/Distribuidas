import React, { Component } from "react";
import { StyleSheet, View, Switch, SafeAreaView, Dimensions } from "react-native";
import { Container, Content, Form} from "native-base";
import { LineChart } from "react-native-chart-kit";
import Carousel from 'react-native-snap-carousel';
import ViewCard from '../components/ViewCard';
import BankCard from '../components/BankAccountCard'
import { ScrollView } from "react-native";

const { width, height } = Dimensions.get('screen');
const chartConfig = {
    backgroundColor: '#071019',
    backgroundGradientFrom: '#071019',
    backgroundGradientTo: '#071019',
    fillShadowGradient: 'white',
    fillShadowGradientOpacity: 20,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
};

export default class CarrouselCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: this.props.items,
            type: this.props.type
        }
    }

    updateState(value) {
        this.setState(
          {
            carouselItems: value
          }
        ) 
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
                <BankCard
                    bankName={item.bankName}
                    titularName={item.titularName}
                    CBU={item.CBU}
                />
            </View>
        )
    }
    _renderItemInver({ item, index }) {
        return (
            <View>
                <LineChart
                    data={item}
                    width={300}
                    height={290}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </View>
        )
    }

    render() {
        return (
            <View center style={styles.container}>
                <Carousel
                    ref={(c) => { this.carousel = c; }}
                    data={this.state.carouselItems}
                    layout={'default'} 
                    renderItem={
                        this.state.type === 'Card' ?
                            this._renderItemCard : this.state.type === 'Bank' ?
                                this._renderItemBank : this._renderItemInver
                    }
                    sliderWidth={300}
                    itemWidth={300}
                    onSnapToItem={this.props.filterData}
                    
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