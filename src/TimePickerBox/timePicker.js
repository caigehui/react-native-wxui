'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Picker,
    PickerIOS,
    Animated,
    Platform
} from 'react-native';
import moment from 'moment';
import Calendar from '../Calendar';
import * as Util from '../Util';
let MyPicker = Util.isIOS ? PickerIOS : Picker;
let Item = MyPicker.Item;

export default class TimePicker extends Component {


    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment().format(),
            selectedTime: this.props.selectedDateTime.isValid && this.props.selectedDateTime.isValid() ? this.props.selectedDateTime.format('hh:mm') : '无',
            hour: this.props.selectedDateTime.isValid && this.props.selectedDateTime.isValid() ? `${parseInt(this.props.selectedDateTime.format('hh')) + 0 * 24}` : `${parseInt(moment().format('hh')) + 0 * 24}`,
            minute: this.props.selectedDateTime.isValid && this.props.selectedDateTime.isValid() ? `${parseInt(this.props.selectedDateTime.format('mm')) + 0 * 60}` : `${parseInt(moment().format('mm')) + 0 * 60}`,
            dateFadeAnim: new Animated.Value(1),
            timeFadeAnim: new Animated.Value(0),
            w: this.props.w,
            h: this.props.h,
            dateMode: true
        }
        //创建时间数组
        let hours = [];
        let minutes = [];
        for (let i = 0; i < 24; i++) {
            hours.push(i);
        }
        for (let i = 0; i < 60; i++) {
            minutes.push(i);
        }
        this.hours = hours;
        this.minutes = minutes;
    }
    static propTypes = {
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        timeRequired: PropTypes.bool,
        selectedDateTime: PropTypes.any,

    }

    static defaultProps = {
        timeRequired: true,
        selectedDateTime: moment().format()
    }

    onCancel = () => {
        this.props.onCancel && this.props.onCancel();
    }

    onConfirm = () => {
        this.props.onConfirm && this.props.onConfirm(moment(this.state.selectedDate).format('YYYY-MM-DD'), this.state.selectedTime !== '无' ? this.state.selectedTime : '');
    }

    switchModeToTime = () => {
        if (this.state.dateMode && !this.loading) {
            this.loading = true;
            //切换到日期模式
            Animated.timing(this.state.dateFadeAnim, {
                toValue: 0,
                duration: 100
            }).start(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                this.setState({
                    h: 220,
                    dateMode: false
                });
                this.timer = setTimeout(() => {
                    Animated.timing(this.state.timeFadeAnim, {
                        toValue: 1,
                        duration: 100
                    }).start(() => {
                        this.loading = false
                    })
                }, 400)
            });

        }
    }

    switchModeToDate = () => {
        if (!this.state.dateMode && !this.loading) {
            this.loading = true;
            Animated.timing(this.state.timeFadeAnim, {
                toValue: 0,
                duration: 100
            }).start(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                this.setState({
                    h: this.props.h,
                    dateMode: true
                });
                this.timer = setTimeout(() => {
                    Animated.timing(this.state.dateFadeAnim, {
                        toValue: 1,
                        duration: 100
                    }).start(() => {
                        this.loading = false;
                    })
                }, 200)

            });
        }
    }

    renderTimeField() {
        return this.props.timeRequired ? (
            <TouchableHighlight style={styles.timeRow} onPress={this.switchModeToTime} underlayColor="rgb(224,224,224)">
                <View style={{
                    flex: 1, flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image style={styles.clock} source={require('./imgs/clock.png')} />
                    <Text style={styles.label}>时间</Text>
                    <Text style={styles.time}>{this.state.selectedTime}</Text>
                    <Image style={styles.angle} source={require('./imgs/right.png')} />
                </View>
            </TouchableHighlight>
        ) : null;
    }

    renderControls(cancelCallback, confirmCallback) {
        return (
            <View style={styles.controlView}>
                <TouchableHighlight style={styles.cancelTouchable} underlayColor="rgb(228,228,228)" onPress={cancelCallback}>
                    <Text style={styles.cancel}>取消</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.confirmTouchable} underlayColor="rgb(228,228,228)" onPress={confirmCallback}>
                    <Text style={styles.confirm}>确定</Text>
                </TouchableHighlight>
            </View>
        )
    }

    renderOpacitySides() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={{
                    width: this.props.w,
                    height: this.props.h - this.state.h,
                }} />
            </TouchableWithoutFeedback>
        )
    }

    /**
     * 渲染日期选择
     */
    renderDateView() {

        return (
            <Animated.View style={[{ opacity: this.state.dateFadeAnim, height: this.state.dateMode ? this.props.h : 0, },]}>
                <Calendar style={{ marginTop: 5 }} tintColor={this.props.tintColor}
                    ref="calendar"
                    onDateSelect={(date) => this.setState({ selectedDate: date })}
                    fullWidth={false}
                    selectedDate={this.props.selectedDateTime.isValid && this.props.selectedDateTime.isValid() ? this.props.selectedDateTime.format('YYYY-MM-DD') : moment().format()}
                />
                {this.props.timeRequired ? (<View style={styles.sep1} />) : null}
                {this.renderTimeField()}
                <View style={styles.sep2} />
                {this.renderControls(this.onCancel, this.onConfirm)}
            </Animated.View>
        );
    }

    /**
     * 渲染时间选择
     */
    renderTimeView() {
        return (
            <Animated.View style={[{
                opacity: this.state.timeFadeAnim,
                height: this.state.dateMode ? 0 : 220,
                width: this.props.w,
                marginTop: this.state.dateMode ? 500 : 0
            },]}>
                <View style={[styles.pickerView, { height: 180, justifyContent: 'center' }]}>
                    <MyPicker mode="dropdown" style={[{ flex: 1, width: 60 }, Platform.OS === 'android' ? { alignSelf: 'center' } : { marginTop: -20, }]}
                        itemStyle={[styles.itemStyle, this.props.tintColor ? { color: this.props.tintColor } : null]}
                        selectedValue={this.state.hour}
                        onValueChange={(hour) => this.setState({ hour })}>
                        {this.hours.map(hour => {
                            return <Item key={"hour" + hour} label={hour % 24 < 10 ? '0' + `${hour % 24}` : `${hour % 24}`} value={`${hour}`} />
                        })}
                    </MyPicker>
                    <Text style={[styles.colon, this.props.tintColor ? { color: this.props.tintColor } : null]}>: </Text>
                    <MyPicker mode="dropdown" style={[{ flex: 1, width: 60 }, Platform.OS === 'android' ? { alignSelf: 'center' } : { marginTop: -20, }]}
                        itemStyle={[styles.itemStyle, this.props.tintColor ? { color: this.props.tintColor } : null]}
                        selectedValue={this.state.minute}
                        onValueChange={(minute) => this.setState({ minute })}>
                        {this.minutes.map(minute => {
                            return <Item key={"minute" + minute} label={minute % 60 < 10 ? '0' + `${minute % 60}` : `${minute % 60}`} value={`${minute}`} />
                        })}
                    </MyPicker>
                </View>
                <View style={styles.sep2} />
                {this.renderControls(() => {
                    this.switchModeToDate();
                }, () => {
                    this.setState({
                        selectedTime: (this.state.hour % 24 < 10 ? '0' + `${this.state.hour % 24}` : `${this.state.hour % 24}`) + ':' + (this.state.minute % 60 < 10 ? '0' + `${this.state.minute % 60}` : `${this.state.minute % 60}`)
                    });
                    this.switchModeToDate();
                })}
            </Animated.View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderOpacitySides()}
                <View style={[styles.animatedContainer, {
                    width: this.state.w,
                    height: this.state.h,
                }]}>
                    {this.renderDateView()}
                    {this.renderTimeView()}
                </View>
                {this.renderOpacitySides()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    animatedContainer: {
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#f7f7f7'
    },
    sep1: {
        height: Util.ONE_PIXEL,
        backgroundColor: 'rgb(224,224,224)',
        bottom: 70,
        position: 'absolute',
        left: 0,
        right: 0
    },
    sep2: {
        height: Util.ONE_PIXEL,
        backgroundColor: 'rgb(224,224,224)',
        bottom: 35,
        position: 'absolute',
        left: 0,
        right: 0
    },
    timeRow: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 35,
        position: 'absolute',
        left: 0,
        right: 0
    },
    clock: {
        marginLeft: 10,
        width: 20,
        height: 20
    },
    angle: {
        width: 20,
        height: 20
    },
    label: {
        marginLeft: 10,
        fontSize: 12,
        color: 'gray',
        flex: 1
    },
    time: {
        fontSize: 12,
        color: 'black',
        width: 80,
        textAlign: 'right',
        marginRight: 20
    },
    controlView: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        position: 'absolute',
        left: 0,
        right: 0
    },
    cancel: {
        color: 'rgb(35,151,246)',
        textAlign: 'center',
    },
    cancelTouchable: {
        width: Util.WIDTH * 2 / 5,
        height: 35,
        borderRightWidth: Util.ONE_PIXEL,
        borderRightColor: 'rgb(224,224,224)',
        justifyContent: 'center'
    },
    confirm: {
        textAlign: 'center',
        color: 'rgb(35,151,246)',
    },
    confirmTouchable: {
        width: Util.WIDTH * 2 / 5,
        height: 35,
        justifyContent: 'center'
    },
    btn: {
        alignSelf: 'center',
        fontSize: 14,
        color: 'rgb(106,133,222)',
        textAlign: 'center'
    },
    pickerView: {
        flexDirection: 'row',
    },
    itemStyle: {
        fontSize: 25,
        color: 'rgb(106,133,222)'
    },
    colon: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: -5,
        width: 5,
        color: 'rgb(106,133,222)'
    }
})