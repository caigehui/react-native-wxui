'use strict';
import FilterView from './filterView';
import * as HUD from '../ProgressHUD/HUD/'
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    PixelRatio,
    TouchableWithoutFeedback,
    Animated,
    LayoutAnimation
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ONE_PIXEL = 1 / PixelRatio.get()
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 40,
        width: WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: ONE_PIXEL,
        borderBottomColor: 'rgb(224,224,224)'
    },
    item: {
        borderLeftWidth: ONE_PIXEL,
        borderLeftColor: 'rgb(224,224,224)',
        height: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class FilterBar extends Component {

    static propTypes = {
        conditions: PropTypes.array.isRequired,
        onFilterChange: PropTypes.func,
    }

    static defaultProps = {
        conditions: []
    }

    constructor(props) {
        super(props);
        let filters = [];
        props.conditions.map(condition => {
            filters.push(0);
        });
        this.state = {
            filters,
            choosenFilterIndex: -1,
        }
    }

    _onPressFilter = (index) => {
        const { filters, choosenFilterIndex } = this.state;
        if (index === choosenFilterIndex) {
            this.setState({ choosenFilterIndex: -1 });
            HUD.hideComponentHUD();
        } else {
            this.setState({ choosenFilterIndex: index });
            HUD.hideComponentHUD().then(() => {
                HUD.showFilterView(
                    <FilterView imageSource={this.props.conditions[index].imageSource}
                        imageSelectedSource={this.props.conditions[index].imageSelectedSource}
                        condition={this.props.conditions[index].options}
                        selectedIndex={filters[index]}
                        onSelect={(secondIndex) => {
                            let newFilters = this.state.filters;
                            if (newFilters[index] === secondIndex) return;
                            newFilters[index] = secondIndex;
                            this.setState({ choosenFilterIndex: -1, filters: newFilters })
                            HUD.hideComponentHUD();
                            this.props.onFilterChange && this.props.onFilterChange(newFilters)
                        }} />,
                    this.props.conditions[index].options,
                    () => {
                        this.setState({ choosenFilterIndex: -1 });
                        HUD.hideComponentHUD()
                    })
            }).catch((err) => {
                console.warn(err)
            });
        }
    }

    render() {
        const { filters, choosenFilterIndex } = this.state;
        const { conditions } = this.props
        let itemWidth = WIDTH / conditions.length;
        return (
            <View style={styles.container}>
                {
                    conditions.map((condition, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => this._onPressFilter(index)}>
                            <View style={[styles.item, { width: itemWidth }, index === 0 ? { borderLeftWidth: 0 } : null]}>
                                <Text style={[styles.filterText, { color: choosenFilterIndex === index ? "#ed6765" : '#828282' }]}>{condition.options[filters[index]]}</Text>
                                <Image source={choosenFilterIndex === index ? require("./caret-up.png") : require("./caret-down.png")} size={10} style={{ marginLeft: 5, width: 10, height: 5 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </View>
        )
    }

}