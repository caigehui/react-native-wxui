'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import Field from './Field';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const iconViewWidth = 35;
const labelViewWidth = 80;
const fontSize = 13;
export default class LinkField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            textColor: 'gray'
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.text != this.props.text) {
            this.setState({
                text: nextProps.text,
                textColor: 'gray'
            });
            this.props.onChange && this.props.onChange(nextProps.text);
        }
    }


    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor="rgb(228,228,228)" >
                <View>
                    {this.props.centerMode ?
                        <Field height={this.props.height} {...this.props}>
                            <Text style={styles.centerLabel}>{this.props.label}</Text>
                        </Field>
                        :
                        <Field height={this.props.height} {...this.props}>



                            {
                                this.props.iconLeft
                                    ? <View style={styles.iconView}>
                                        {this.props.iconLeft}
                                    </View>
                                    : <View style={{ width: 20 }}>

                                    </View>
                            }
                            <View style={this.props.text ? styles.labelView : styles.fullWidthLabelView}>
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
                            {
                                this.props.text ? <View style={styles.textView}>
                                    <Text style={[styles.text, { color: this.state.textColor }, this.props.textStyle]}>
                                        {this.state.text}
                                    </Text>
                                </View>
                                    : null
                            }

                            {
                                this.props.iconRight
                                    ? <View style={[styles.iconView, { marginLeft: this.props.iconLeft?0:this.props.text?iconViewWidth/2 - 5:iconViewWidth/2 + 5 }]}>
                                        {this.props.iconRight}
                                    </View>
                                    : null
                            }

                        </Field>
                    }
                </View>
            </TouchableHighlight>

        );
    }
}

LinkField.propTypes = {
    label: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    iconLeft: PropTypes.element,
    iconRight: PropTypes.element,
    onPress: PropTypes.func,
    labelStyle: PropTypes.object,
    textStyle: PropTypes.object,
    valueType: PropTypes.oneOf(['string']),
    centerMode: PropTypes.bool
}

LinkField.defaultProps = {
    valueType: 'string'
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
    fullWidthLabelView: {
        width: WIDTH - 2 * iconViewWidth - 10,
        flexDirection: 'row',
    },
    label: {
        color: 'black',
        fontSize: fontSize,
        alignSelf: 'center',
    },
    textView: {
        marginLeft: 10,
        width: WIDTH - 2 * iconViewWidth - labelViewWidth - 10,
        flexDirection: 'row',
    },
    text: {
        fontSize: fontSize,
        alignSelf: 'center',
    },
    centerLabel: {
        fontSize: fontSize,
        textAlign: 'center',
        width: WIDTH
    }
});