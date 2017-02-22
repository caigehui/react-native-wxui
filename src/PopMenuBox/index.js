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
import PopMenu from './popMenu.js';

export function showPopMenuBox(menu, onPress) {
    PopMenuBox.showPopMenuBox(menu, onPress);
}


const styles = StyleSheet.create({
    maskView: {
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }
})
class PopMenuBox extends Component {

    static componentView = null;
    static instance = null;
    static showPopMenuBox = (menu, onPress) => {
        let hud = (
            <PopMenuBox menu={menu} onPress={onPress} getInstance={(i) => {
                PopMenuBox.instance = i;
            }} />
        )
        if (PopMenuBox.componentView) {
            PopMenuBox.componentView.update(hud)
        } else {
            PopMenuBox.componentView = new RootSiblings(hud);
        }
    }

    static hidePopMenuBox = () => {
        if (!PopMenuBox.instance) return;
        return new Promise((resolve, reject) => {
            PopMenuBox.instance._hide().then(() => {
                if (PopMenuBox.componentView) {
                    PopMenuBox.componentView.destroy();
                    PopMenuBox.componentView = null;
                    PopMenuBox.instance = null;
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
        maskAnimationType: 'fadeInDown',
        maskAnimationDuration: 100,
        componentAnimationType: 'fadeIn',
        componentAnimationDuration: 500,
    }

    _hide = () => new Promise((resolve, reject) => {
        this.setState({
            maskAnimationType: 'fadeOut',
            maskAnimationDuration: 200,
            componentAnimationType: 'fadeOut'
        });
        this.resolve = resolve;
    })

    componentDidMount() {
        this.props.getInstance && this.props.getInstance(this);
    }

    render() {
        let { menu, onPress } = this.props;
        let { maskAnimationType, maskAnimationDuration, componentAnimationType, componentAnimationDuration } = this.state;
        let realHeight = menu.buttons.length * 35 + 10;
        return (
            <Animatable.View style={styles.maskView} animation={maskAnimationType} easing="linear" duration={maskAnimationDuration}>
                <TouchableWithoutFeedback onPress={PopMenuBox.hidePopMenuBox}>
                    <View style={styles.maskView}></View>
                </TouchableWithoutFeedback>
                <Animatable.View animation={componentAnimationType} easing="linear" duration={componentAnimationDuration} onAnimationEnd={() => {
                    if (maskAnimationType === 'fadeOut') this.resolve();
                }}>
                    <View style={{ right: 5, top: Util.isIOS ? 69 : 59, width: 120, height: realHeight, position: 'absolute' }}>
                        <PopMenu menu={menu} onPress={(index) => {
                            PopMenuBox.hidePopMenuBox().then(() => {
                                onPress(index)
                            })
                        }} w={120} height={realHeight} />
                    </View>
                </Animatable.View>
            </Animatable.View>
        )
    }
}