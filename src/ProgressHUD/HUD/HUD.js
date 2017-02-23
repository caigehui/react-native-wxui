'use strict';
import * as Animatable from 'react-native-animatable';
import React, { Component, PropTypes } from 'react';
import { hideComponentHUD } from './ComponentsHUD'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Platform,
    BackAndroid
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import * as Util from '../../Util'

const styles = StyleSheet.create({
    maskView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    adjustNavigation: {
        top: Platform.OS === 'ios' ? 64 : 54
    },
    adjustFilter: {
        top: Platform.OS === 'ios' ? 104 : 94
    },
    componentAdjustNavigation: {
        marginTop: Platform.OS === 'ios' ? -64 : -54,
    },
    touchable: {
        position: 'absolute',
        left: 0,
        top: Platform.OS === 'ios' ? 104 : 94,
        right: 0,
        bottom: 0,
    },
    touchableTop: {
        position: 'absolute',
        left: 0,
        bottom: Platform.OS === 'ios' ? 104 : 94,
        right: 0,
        top: 0,
    },
    container: {
        position: 'absolute',
    },
})
class HUD extends Component {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        component: PropTypes.element.isRequired,
        onHide: PropTypes.func,
        getNode: PropTypes.func.isRequired,
        showingType: PropTypes.string.isRequired,
        hidingType: PropTypes.string.isRequired,
        enableCancel: PropTypes.bool,
        maskOpacity: PropTypes.number,
        adjustNavigation: PropTypes.bool,
        inDuration: PropTypes.number,
        outDuration: PropTypes.number,
        options: PropTypes.object,
        menu: PropTypes.object,
        condition: PropTypes.array
    }

    static defaultProps = {
        width: WIDTH * 4 / 5,
        height: 359,
        showingType: 'bounceIn',
        hidingType: 'bounceOut',
        maskOpacity: 0.5,
        enableCancel: true,
        adjustNavigation: false,
        inDuration: 1,
        outDuration: 1,
        position: 'center'
    }

    componentDidMount() {
        this.props.getNode(this)

    }

    componentWillUnmount() {
        this.unmount = true;
    }

    state = {
        maskAnimationType: 'fadeIn',
        maskDuration: 100,
        componentAnimationType: this.props.showingType,
        componentDuration: this.props.inDuration
    }

    hide = () => {
        if (this.unmount) return;
        this.setState({
            maskAnimationType: 'fadeOut',
            maskDuration: 200,
            componentAnimationType: this.props.hidingType,
            componentDuration: this.props.outDuration
        })
        return new Promise((resolve, reject) => {
            this.resolve = resolve
        })
    }

    onFadeOut = () => {
        this.resolve && this.resolve();
    }

    render() {

        const { maskAnimationType, componentAnimationType, maskDuration, componentDuration } = this.state;
        const { width, height, component, onHide, maskOpacity, adjustNavigation, enableCancel, options, position, menu, condition, top } = this.props;

        let componentViewStyle = [styles.container, { left: (WIDTH - width) / 2, top: (HEIGHT - height) / 2, width: width, height: height }, adjustNavigation && styles.componentAdjustNavigation];

        /**
         * 条件判断特殊Model，ActionSheet PopMenu, FilterView
         */
        if (options) {
            componentViewStyle = [styles.container, { left: (WIDTH - width) / 2, bottom: 0, width: width, height: height }, adjustNavigation && styles.componentAdjustNavigation];
        } else if (menu) {
            componentViewStyle = [styles.container, { right: 5, top: Platform.OS === 'ios' ? 69 : 59, width: width, height: height }, adjustNavigation && styles.componentAdjustNavigation];
        } else if (condition) {
            componentViewStyle = [styles.container, { left: 0, top: 0, width: width, height: height }, adjustNavigation && styles.componentAdjustNavigation, condition ? styles.adjustFilter : null];
        } else if (top) {
            componentViewStyle = [styles.container, { left: (WIDTH - width) / 2, top, width: width, height: height }, adjustNavigation && styles.componentAdjustNavigation];
        }

        return (
            <Animatable.View animation={maskAnimationType} easing="linear" duration={maskDuration} onAnimationEnd={this.onFadeOut} style={[styles.maskView, adjustNavigation && styles.adjustNavigation,]}>
                <TouchableWithoutFeedback onPress={() => enableCancel ? onHide(this) : {}}>
                    <View style={[styles.touchable, { backgroundColor: 'rgba(0,0,0,' + maskOpacity + ')' }]}></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => enableCancel ? onHide(this) : {}}>
                    <View style={[styles.touchableTop, !condition? { backgroundColor: 'rgba(0,0,0,' + maskOpacity + ')' }:null]}></View>
                </TouchableWithoutFeedback>
                <Animatable.View easing="ease-out" animation={componentAnimationType} duration={componentDuration} style={componentViewStyle}>
                    {
                        React.cloneElement(component, {
                            w: width,
                            h: height
                        })

                    }
                </Animatable.View>
            </Animatable.View>
        );
    }

}
export default HUD;