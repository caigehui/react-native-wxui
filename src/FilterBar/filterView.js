'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    PixelRatio,
    TouchableHighlight,
    Animated,
    LayoutAnimation
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ONE_PIXEL = 1 / PixelRatio.get()
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    item: {
        borderBottomColor: 'rgb(224,224,224)',
        borderBottomWidth: ONE_PIXEL,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },
    icon: {
        width: 18,
        height: 18,
        alignSelf: 'center',
        marginLeft: 25,
        marginRight: 10
    },
    tick: {
        marginRight: 15,
        width: 18,
        height: 18,
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        flex: 1
    },
})

export default class FilterView extends Component {

    static propTypes = {
        condition: PropTypes.array,
        selectedIndex: PropTypes.number,
        imageSource: PropTypes.any,
        imageSelectedSource: PropTypes.any,
        onSelect: PropTypes.func
    };

    static defaultProps = {
        condition: [],
        selectedIndex: 0
    }

    state = {
        selectedIndex: this.props.selectedIndex,
        height: ONE_PIXEL,
        itemHeight: ONE_PIXEL,
        
    }


    componentDidMount() {
        const { condition } = this.props;
        setTimeout(() => {
            LayoutAnimation.spring();
            this.setState({
                height: condition.length * 45,
                itemHeight: 45
            })
        }, 20)

    }

    render() {
        const { condition, imageSource, imageSelectedSource } = this.props;
        const { selectedIndex, height, itemHeight } = this.state;
        return (
            <Animated.View style={[styles.container, { height }]}>
                {
                    condition.map((option, index) => (
                        <TouchableHighlight key={index} onPress={() => { this.props.onSelect && this.props.onSelect(index) }} underlayColor="#ccc" >
                            <Animated.View style={[styles.item, { height: itemHeight }]}>
                                <Image source={selectedIndex === index ? imageSelectedSource : imageSource} style={styles.icon} />
                                <Text style={[styles.text, { color: selectedIndex === index ? '#ed6765' : '#828282' }]}>{option}</Text>
                                {selectedIndex === index ? <Image source={require('./check.png')} style={styles.tick} /> : null}
                            </Animated.View>
                        </TouchableHighlight>
                    ))
                }
            </Animated.View>
        )

    }
}