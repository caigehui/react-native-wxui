'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const sepHeight = 30;
const fontSize = 12;
export default class Separator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, {height: this.props.height}]}>
                {
                    this.props.label
                        ?
                        (
                            <Text style={styles.label}>{this.props.label}</Text>
                        )

                        : null
                }
            </View>
        );
    }
}

Separator.propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['Separator']),
    height: PropTypes.number
}

Separator.defaultProps = {
    type: 'Separator',
    height: sepHeight
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    label: {
        color: 'gray',
        fontSize: fontSize,
        marginLeft: 18,
    }
});