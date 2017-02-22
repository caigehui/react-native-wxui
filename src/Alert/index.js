'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TextInput
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import * as Animatable from 'react-native-animatable';
import * as Util from '../Util';
export function showAlert(options, onConfirm, onCancel) {
    Alert.showAlert(options, onConfirm, onCancel);
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
        width: Util.WIDTH * 2 / 3,
        height: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 6,
    },
    messageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        marginTop: 10,
        height: Util.ONE_PIXEL,
        width: Util.WIDTH * 2 / 3,
        backgroundColor: 'rgb(224,224,224)',
    },
    controlView: {
        height: 40,
        width: Util.WIDTH * 2 / 3,
        borderTopWidth: Util.ONE_PIXEL,
        borderTopColor: 'rgb(224,224,224)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginTop: 15,
        color: 'black',
        fontSize: 16,
        width: Util.WIDTH * 2 / 3 - 60,
        borderBottomWidth: Util.ONE_PIXEL,
        borderBottomColor: 'rgb(224,224,224)',
        textAlign: 'center'
    },
    message: {
        flex: 1,
        marginTop: 15,
        fontSize: 14,
        color: 'rgb(70,70,70)',
        width: Util.WIDTH * 2 / 3 - 60,
        textAlign: 'center'
    },
    cancel: {
        color: 'rgb(35,151,246)',
        textAlign: 'center',
    },
    cancelTouchable: {
        width: Util.WIDTH / 3,
        height: 40,
        borderRightWidth: Util.ONE_PIXEL,
        borderRightColor: 'rgb(224,224,224)',
        justifyContent: 'center'
    },
    confirm: {
        textAlign: 'center',
        color: 'rgb(35,151,246)',
    },
    confirmTouchable: {
        width: Util.WIDTH / 3,
        height: 40,
        justifyContent: 'center'
    }
})
class Alert extends Component {

    static componentView = null;
    static instance = null;
    static showAlert = (options, onConfirm, onCancel) => {
        let hud = (
            <Alert options={options} onConfirm={onConfirm} onCancel={onCancel} getInstance={(i) => {
                Alert.instance = i;
            }} />
        )
        if (Alert.componentView) {
            Alert.componentView.update(hud)
        } else {
            Alert.componentView = new RootSiblings(hud);
        }
    }

    static hideAlert = () => {
        if (!Alert.instance) return;
        return new Promise((resolve, reject) => {
            Alert.instance._hide().then(() => {
                if (Alert.componentView) {
                    Alert.componentView.destroy();
                    Alert.componentView = null;
                    Alert.instance = null;
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


    _onCancel = () => {
        Alert.hideAlert().then(() => {
            this.props.onCancel && this.props.onCancel();
        })
    }

    _onConfirm = () => {
        Alert.hideAlert().then(() => {
            this.props.onConfirm && this.props.onConfirm();
        })
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
                        <View style={styles.messageView}>
                            <Text style={styles.title}>{options.title}</Text>
                            <View style={styles.border} />
                            <Text style={styles.message}>{options.message}</Text>
                        </View>
                        <View style={styles.controlView}>
                            <TouchableHighlight style={styles.cancelTouchable} underlayColor="rgb(228,228,228)" onPress={this._onCancel}>
                                <Text style={styles.cancel}>{options.cancelTitle || 'cancel'}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.confirmTouchable} underlayColor="rgb(228,228,228)" onPress={this._onConfirm}>
                                <Text style={styles.confirm}>{options.confirmTitle || 'confirm'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Animatable.View>
            </Animatable.View>
        )
    }
}
