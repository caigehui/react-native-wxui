'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import * as Animatable from 'react-native-animatable';
import * as Util from '../Util';
import TimePicker from './timePicker';

export function showTimePickerBox(selectedDateTime, onConfirm, onCancel) {
    TimePickerBox.showTimePickerBox(selectedDateTime, onConfirm, onCancel);
}


const styles = StyleSheet.create({
    maskView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: Util.WIDTH * 4 / 5,
        height: Util.isIOS ? 354 : 359
    }
})
class TimePickerBox extends Component {

    static componentView = null;
    static instance = null;
    static showTimePickerBox = (selectedDateTime, onConfirm, onCancel) => {
        let hud = (
            <TimePickerBox selectedDateTime={selectedDateTime} onConfirm={onConfirm} onCancel={onCancel} getInstance={(i) => {
                TimePickerBox.instance = i;
            }} />
        )
        if (TimePickerBox.componentView) {
            TimePickerBox.componentView.update(hud)
        } else {
            TimePickerBox.componentView = new RootSiblings(hud);
        }
    }

    static hideTimePickerBox = () => {
        if (!TimePickerBox.instance) return;
        return new Promise((resolve, reject) => {
            TimePickerBox.instance._hide().then(() => {
                if (TimePickerBox.componentView) {
                    TimePickerBox.componentView.destroy();
                    TimePickerBox.componentView = null;
                    TimePickerBox.instance = null;
                }
                resolve();
            })
        })
    }

    static propTypes = {
        options: PropTypes.object,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func
    }

    state = {
        maskAnimationType: 'fadeIn',
        maskAnimationDuration: 200,
        componentAnimationType: 'bounceIn',
        componentAnimationDuration: 500,
    }

    _hide = () => new Promise((resolve, reject) => {
        this.setState({
            maskAnimationType: 'fadeOut',
            maskAnimationDuration: 200,
            componentAnimationType: 'bounceOut'
        });
        this.resolve = resolve;
    })

    componentDidMount() {
        this.props.getInstance && this.props.getInstance(this);
    }

    render() {
        let { options } = this.props;
        let { maskAnimationType, maskAnimationDuration, componentAnimationType, componentAnimationDuration } = this.state;
        return (
            <Animatable.View style={styles.maskView} animation={maskAnimationType} easing="linear" duration={maskAnimationDuration}>
                <Animatable.View animation={componentAnimationType} easing="linear" duration={componentAnimationDuration} onAnimationEnd={() => {
                    if (maskAnimationType === 'fadeOut') this.resolve();
                }}>
                    <View style={styles.container}>
                        <TimePicker tintColor={'rgb(35,151,246)'}
                            onConfirm={(date, time) => {
                                TimePickerBox.hideTimePickerBox().then(() => {
                                    this.props.onConfirm && this.props.onConfirm(date, time);
                                })
                            }}
                            onCancel={() => {
                                TimePickerBox.hideTimePickerBox().then(() => {
                                    this.props.onCancel && this.props.onCancel();
                                })
                            }}
                            selectedDateTime={this.props.selectedDateTime}
                            w={Util.WIDTH * 4 / 5}
                            h={Util.isIOS ? 354 : 359} />
                    </View>
                </Animatable.View>
            </Animatable.View>
        )
    }
}