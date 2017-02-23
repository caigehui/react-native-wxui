'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import { LoadingPlaceholder, Util } from 'react-native-wxui';
export default class extends Component {

    render() {
        return (
            <View style={styles.container}>
                <LoadingPlaceholder/>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})