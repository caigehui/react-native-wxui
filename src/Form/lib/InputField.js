'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TextInput
} from 'react-native';
import Field from './Field';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const iconViewWidth = 35;
const labelViewWidth = 100;
const mutiRowHeight = 100;
const fontSize = 13;

export default class InputField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.initValue
        }
        this._onTextInputChange = this._onTextInputChange.bind(this);
        this._onFieldPress = this._onFieldPress.bind(this);
    }

    _onTextInputChange(event) {
        const value = event.nativeEvent.text;
        this.setState({ text: value });
        if (this.props.onChange) this.props.onChange(value);
    }

    _onFieldPress(event) {
        this.refs.inputBox.focus();
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
                                    onPress={this._onFieldPress}
                                    width={150}>
                                    {this.props.label}
                                </Text>
                            )
                            : null
                    }
                </View>
                <TextInput {...this.props}
                    ref="inputBox"
                    style={[this.props.inputStyle ? this.props.inputStyle : styles.textInput, { height: this.props.multiline ? mutiRowHeight - 20 : 40 }]}
                    placeholder={this.props.placeholder ? this.props.placeholder : this.props.label}
                    placeholderTextColor="rgb(206,206,211)"
                    onChange={this._onTextInputChange }
                    value={this.props.editable ? this.state.text : this.props.initValue}
                    multiline={this.props.multiline}
                    numberOfLines={this.props.multiline ? 4 : 1}
                    underlineColorAndroid="transparent"
                    selectionColor="rgb(35,151,246)"
                    clearButtonMode="while-editing"/>
            </Field>
        )

    }
}

InputField.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    iconLeft: PropTypes.element,
    multiline: PropTypes.bool,
    labelStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    valueType: PropTypes.oneOf(['string'])
}

InputField.defaultProps = {
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
    label: {
        color: 'black',
        fontSize: fontSize,
        alignSelf: 'center',
    },
    textInput: {
        color: 'gray',
        fontSize: fontSize,
        alignSelf: 'center',
        width: WIDTH - iconViewWidth - labelViewWidth - 15
    },
});
