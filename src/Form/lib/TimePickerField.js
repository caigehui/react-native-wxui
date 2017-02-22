'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Field from './Field';
import { showTimePickerBox } from '../../TimePickerBox';
import * as Util from '../../Util';
import moment from 'moment';
const iconViewWidth = 35;
const labelViewWidth = 100;
const fontSize = 13;

export default class TimePickerField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text || 'select time',
            textColor: 'rgb(206,206,211)'
        }
    }

    static propTypes = {
        label: PropTypes.string,
        text: PropTypes.string,
        iconLeft: PropTypes.element,
        iconRight: PropTypes.element,
        labelStyle: PropTypes.object,
        textStyle: PropTypes.object,
        valueType: PropTypes.oneOf(['string']),
        tintColor: PropTypes.string
    }

    static defaultProps = {
        valueType: 'string'
    }


    showTimePicker() {
        showTimePickerBox(
            moment(this.state.text, 'YYYY-MM-DD hh:mm'),
            (date, time) => {

                this.setState({
                    text: date + ' ' + time,
                })
                this.props.onChange && this.props.onChange(this.state.text);
            })
    }

    render() {
        return (
            <TouchableOpacity onPress={this.showTimePicker.bind(this)} >
                <View>
                    <Field height={this.props.height} {...this.props}>
                        {
                            this.props.iconLeft
                                ? <View style={styles.iconView}>
                                    {this.props.iconLeft}
                                </View>
                                : <View style={{ width: 20 }}>

                                </View>
                        }
                        <View style={styles.labelView}>
                            {
                                this.props.label
                                    ? (
                                        <Text style={this.props.labelStyle ? this.props.labelStyle : styles.label}>
                                            {this.props.label}
                                        </Text>
                                    )
                                    : null
                            }
                        </View>
                        <View style={styles.textView}>
                            <Text style={[this.props.textStyle ? this.props.textStyle : styles.text, { color: this.state.textColor }]}>
                                {this.state.text}
                            </Text>
                        </View>
                        {
                            this.props.iconRight
                                ? <View style={[styles.iconView, { marginLeft: this.props.iconLeft ? -iconViewWidth / 2 - 5 : 0 }]}>
                                    {this.props.iconRight}
                                </View>
                                : null
                        }
                    </Field>
                </View>
            </TouchableOpacity>

        );
    }
}



const styles = StyleSheet.create({
    iconView: {
        width: iconViewWidth,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8
    },
    labelView: {

        width: labelViewWidth,
        flexDirection: 'row',
    },
    label: {
        color: 'black',
        fontSize: fontSize,
        alignSelf: 'center'
    },
    textView: {
        marginLeft: 10,
        width: Util.WIDTH - 2 * iconViewWidth - labelViewWidth,
        flexDirection: 'row',
    },
    text: {
        color: 'gray',
        fontSize: fontSize,
        alignSelf: 'center',
    }
});