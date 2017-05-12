'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';
export default class LoadingPlaceholder extends Component {

    componentDidMount() {
        this._initializeRotationAnimation();
    }

    rotationAnim = new Animated.Value(0);

    state = {
        scale: new Animated.Value(0)
    }

    _initializeRotationAnimation() {
        this.rotationAnim.setValue(0);
        Animated.timing(this.rotationAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
        }).start(() => {
            this._initializeRotationAnimation();
        });
    }

    show(end) {
        Animated.spring(
            this.state.scale,
            { toValue: 1 },
        ).start(end);
    }

    hide(end) {
        Animated.spring(
            this.state.scale,
            { toValue: 0 },
        ).start(end);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Animated.Image source={require('./loading.png')} style={[styles.loadingStyle, {
                    transform: [{
                        rotate: this.rotationAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })
                    }, {
                        scale: this.state.scale
                    }]
                }]} />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        width: 50,
        height: 50
    },
    loadingStyle: {
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        width: 40,
        height: 40,
    }
});