'use strict';
import RootSiblings from 'react-native-root-siblings';
import * as Animatable from 'react-native-animatable';
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import * as Util from '../Util';
export default class Progress extends Component {

    static componentView = null;
    static instance = null;

    static showProgress = (config = {}) => {
        return new Promise((resolve, reject) => {
            let hud = (
                <Progress imgSource={config.imgSource} onShow={config.onShow} message={config.message} rotate={config.rotate} getInstance={(i) => {
                    Progress.instance = i;
                }} />
            )
            if (Progress.componentView) {
                Progress.componentView.update(hud)
            } else {
                Progress.componentView = new RootSiblings(hud);
            }
            if (config.duration && config.duration > 0) {
                setTimeout(() => {
                    Progress.hideProgress().then(() => {
                        resolve();
                    });
                }, config.duration);
            }
        });
    }

    static hideProgress = () => {
        if (!Progress.instance) return;
        return new Promise((resolve, reject) => {
            Progress.instance.hide().then(() => {
                if (Progress.componentView) {
                    Progress.componentView.destroy();
                    Progress.componentView = null;
                    Progress.instance = null;
                }
                resolve();
            })
        })

    }

    static propTypes = {
        child: PropTypes.any,
        animationDuration: PropTypes.number,
        rotate: PropTypes.bool,
        getNode: PropTypes.func,
        onShow: PropTypes.func
    }

    static defaultProps = {
        animationDuration: 400
    }

    state = {
        componentAnimationType: 'bounceIn',
        inOrOut: 'in'
    }
    componentDidMount() {
        this.props.getInstance && this.props.getInstance(this);
    }

    hide = () => new Promise((resolve, reject) => {
        this.setState({
            componentAnimationType: 'bounceOut',
            inOrOut: 'out'
        })
        this.promiseOnHide = resolve
    })


    onAnimationEnd = () => {
        if (this.state.inOrOut === 'out') {
            this.promiseOnHide && this.promiseOnHide();
        } else {
            this.props.onShow && this.props.onShow();
        }
    }

    render() {
        let { animationDuration, child, rotate, imgSource, message } = this.props;
        let { componentAnimationType } = this.state;
        return (
            <View style={styles.touchable}>
                <Animatable.View easing="ease-out" animation={componentAnimationType} duration={animationDuration} style={styles.container} onAnimationEnd={this.onAnimationEnd}>

                    <Animatable.Image animation={rotate ? "rotate" : null}
                        iterationCount="infinite"
                        easing="linear"
                        style={styles.iconStyle}
                        source={imgSource} />
                    {
                        message ? <Text style={styles.text} numberOfLines={1}>{message}</Text> : null
                    }
                </Animatable.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        left: Util.WIDTH / 2 - 50,
        top: Util.HEIGHT / 2 - (Util.isIOS ? 114 : 104),
        width: 100,
        height: 100,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.7,
        shadowRadius: 6
    },
    iconStyle: {
        width: 40,
        height: 40
    },
    text: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },
    touchable: {
        position: 'absolute',
        top: Util.isIOS ? 64 : 54,
        left: 0,
        right: 0,
        bottom: 0
    }
})

