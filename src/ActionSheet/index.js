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

export function showActionSheet(options, onPress) {
    ActionSheet.showActionSheet(options, onPress);
}
const styles = StyleSheet.create({
    maskView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column-reverse'
    },
    touchable: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        backgroundColor: '#fff',
        width: Util.WIDTH,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    messageView: {
        height: 45,
        width: Util.WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: Util.ONE_PIXEL,
        borderBottomColor: 'rgb(224,224,224)'
    },
    message: {
        textAlign: 'center',
        fontSize: 12,
        alignSelf: 'center',
        color: 'rgb(150,150,150)'
    },
    cancelView: {
        height: 55,
        width: Util.WIDTH
    },
    button: {
        height: 50,
        width: Util.WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: Util.ONE_PIXEL,
        borderBottomColor: 'rgb(224,224,224)'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        alignSelf: 'center',
        color: 'black'
    },
    buttonTextHighlight: {
        textAlign: 'center',
        fontSize: 15,
        alignSelf: 'center',
        color: '#f06163'
    },
    seperator: {
        height: 5,
        width: Util.WIDTH,
        backgroundColor: 'rgb(236,236,236)'
    }
})
class ActionSheet extends Component {

    static componentView = null;
    static instance = null;
    static showActionSheet = (options, onPress) => {
        let hud = (
            <ActionSheet options={options} onPress={onPress} getInstance={(i) => {
                ActionSheet.instance = i;
            }} />
        )
        if (ActionSheet.componentView) {
            ActionSheet.componentView.update(hud)
        } else {
            ActionSheet.componentView = new RootSiblings(hud);
        }
    }

    static hideActionSheet = () => {
        if (!ActionSheet.instance) return;
        return new Promise((resolve, reject) => {
            ActionSheet.instance._hide().then(() => {
                if (ActionSheet.componentView) {
                    ActionSheet.componentView.destroy();
                    ActionSheet.componentView = null;
                    ActionSheet.instance = null;
                }
                resolve();
            })
        })
    }

    static propTypes = {
        options: PropTypes.object,
        onPress: PropTypes.func
    }

    state = {
        maskAnimationType: 'fadeIn',
        maskAnimationDuration: 100,
        componentAnimationType: 'slideInUp',
        componentAnimationDuration: 300
    }

    _onPress = (index) => {
        ActionSheet.hideActionSheet().then(() => {
            this.props.onPress && this.props.onPress(index);
        });
    }

    _hide = () => new Promise((resolve, reject) => {
        this.setState({
            maskAnimationType: 'fadeOut',
            maskAnimationDuration: 200,
            componentAnimationType: 'slideOutDown'
        });
        this.resolve = resolve;
    })

    componentDidMount() {
        this.props.getInstance && this.props.getInstance(this);
    }

    render() {
        let { options, onPress } = this.props;
        let { maskAnimationType, maskAnimationDuration, componentAnimationType, componentAnimationDuration } = this.state;
        let realHeight = options.buttons.length * 50 + (options.message ? 55 : 0) + 5;
        return (
            <Animatable.View style={styles.maskView} animation={maskAnimationType} easing="linear" duration={maskAnimationDuration}>
                <TouchableWithoutFeedback onPress={ActionSheet.hideActionSheet}>
                    <View style={styles.touchable}></View>
                </TouchableWithoutFeedback>
                <Animatable.View animation={componentAnimationType} easing="linear" duration={componentAnimationDuration} onAnimationEnd={() => {
                    if (maskAnimationType === 'fadeOut') this.resolve();
                }}>
                    <View style={[styles.container, { height: realHeight }]} >
                        {
                            options.message ?
                                <View style={styles.messageView}>
                                    <Text style={styles.message}>{options.message}</Text>
                                </View>
                                : null
                        }
                        {

                            options.buttons.map((name, index) => {
                                if (index === (options.buttons.length - 1)) {
                                    return (
                                        <View key={index} style={styles.cancelView}>
                                            <View style={styles.seperator} />
                                            <TouchableHighlight underlayColor="#ccc" onPress={() => this._onPress(index)}>
                                                <View style={styles.button}>
                                                    <Text style={options.highlightedIndex === index ? styles.buttonTextHighlight : styles.buttonText}>{name}</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <TouchableHighlight key={index} underlayColor="#ccc" onPress={() => this._onPress(index)}>
                                            <View style={styles.button}>
                                                <Text style={options.highlightedIndex === index ? styles.buttonTextHighlight : styles.buttonText}>{name}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                }
                            })
                        }
                    </View>
                </Animatable.View>
            </Animatable.View>
        )
    }
}
