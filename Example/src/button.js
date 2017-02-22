'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import { Button, Util } from 'react-native-wxui';
export default class extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Button
                    style={styles.button}
                    textStyle={styles.text}>
                    Normal
                </Button>
                <Button
                    style={styles.button}
                    textStyle={styles.text}
                    activeOpacity={0.6}>
                    activeOpacity=0.6
                </Button>
                <Button
                    style={styles.button}
                    textStyle={styles.text}
                    isDisabled={true}>
                    Disabled
                </Button>
                <Button
                    style={styles.button}
                    textStyle={styles.text}
                    isLoading={true}
                    activityIndicatorColor="white">
                    Loading
                </Button>
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
    button: {
        height: 40,
        width: Util.WIDTH - 60,
        alignSelf: 'center',
        backgroundColor: 'rgb(35,151,246)',
        borderRadius: 4,
        borderWidth: 0
    },
    text: {
        fontSize: 18,
        color: 'white'
    }
})