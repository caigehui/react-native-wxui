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
    TouchableWithoutFeedback
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ONE_PIXEL = 1 / PixelRatio.get()
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(30,30,30)',
        alignItems: 'center',
        borderRadius: 2
    },
    triangle: {
        position: 'absolute',
        backgroundColor: 'rgb(30,30,30)',
        transform: [{ rotate: '45deg' }],
        width: 12,
        height: 12
    },
    buttonView: {
        height: 35,
        borderBottomWidth: ONE_PIXEL,
        borderBottomColor: 'rgb(120,120,120)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center'
    }
})

export default class PopMenu extends Component {

    static propTypes = {
        menu: PropTypes.object.isRequired,
        onPress: PropTypes.func,
        w: PropTypes.number,
        h: PropTypes.number
    }

    _onPress = (index) => {
        this.props.onPress && this.props.onPress(index);
    }

    render() {
        const { menu, onPress, w, h } = this.props;
        return (
            <View style={{ width: w, height: h }}>
                <View style={[styles.triangle, { left: w - 30, top: 3 }]}/>
                <View style={[styles.container, { width: w, height: h - 10, marginTop: 7 }]}>
                    {
                        menu.buttons.map((button, index) =>
                            <TouchableWithoutFeedback key={index} onPress={() => this._onPress(index) }>
                                <View style={[styles.buttonView, { width: w - 15 }, index === menu.buttons.length - 1 ? { borderBottomWidth: 0 } : null]}>
                                    <Image source={button.imageSource} style={{ marginLeft: 8, width: 16, height: 16, alignSelf: 'center' }}/>
                                    <Text style={[styles.text, { width: w - 48 }]}>{button.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }
                </View>
            </View>
        )
    }
}