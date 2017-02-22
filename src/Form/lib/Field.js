'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    PixelRatio
} from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const ONE_PIXEL = 1/PixelRatio.get();
const defaultRowHeight = 50;

export default class Field extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, { height: this.props.height ? this.props.height : defaultRowHeight }]}>
                <View style={this.props.firstRow ? styles.seperator : styles.insetSeperator}/>
                <View style={styles.fieldContainer}>
                    {this.props.children}
                </View>
                {this.props.lastRow ? <View style={styles.seperator}/> : null}
            </View>
        )
    }
}

Field.propTypes = {
    firstRow: PropTypes.bool,
    lastRow: PropTypes.bool
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: WIDTH,
        backgroundColor: 'white'
    },
    fieldContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    seperator: {
        backgroundColor: 'rgb(224,224,224)',
        height: ONE_PIXEL
    },
    insetSeperator: {
        backgroundColor: 'rgb(224,224,224)',
        height: ONE_PIXEL,
        marginLeft: 20
    },
});