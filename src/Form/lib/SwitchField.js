'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Switch
} from 'react-native';
import Field from './Field';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const iconViewWidth = 35;
const labelViewWidth = 80;
const fontSize = 14;

export default class SwitchField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: props.initValue ? props.initValue : true 
        }
    }


    render() {
        return (

            <Field {...this.props} height={this.props.multiline ? mutiRowHeight : this.props.height} >
                {
                    this.props.iconLeft
                        ? (
                            <View style={styles.iconView}>
                                {this.props.iconLeft}
                            </View>
                        )
                        : <View style={{ width: 20 }}>

                        </View>
                }

                <View style={styles.labelView}>
                    {
                        this.props.label
                            ? (
                                <Text style={this.props.labelStyle ? this.props.labelStyle : styles.label}
                                    onPress={this._onFieldPress}>
                                    {this.props.label}
                                </Text>
                            )
                            : null
                    }
                </View>
                <Switch
                    style={styles.switch}
                    {...this.props}
                    onValueChange={(value) => {
                        this.setState({ toggle: value }) 
                        this.props.onChange && this.props.onChange(value)
                    }}
                    value={this.state.toggle} />
            </Field>
        )

    }
}

SwitchField.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    iconLeft: PropTypes.element,
    multiline: PropTypes.bool,
    labelStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    valueType: PropTypes.oneOf(['bool'])
}

SwitchField.defaultProps = {
    valueType: 'bool'
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
        flex: 1
    },
    label: {
        color: 'black',
        fontSize: fontSize,
        alignSelf: 'center',
    },
    switch: {
        width: 80
    }
});
