'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import { showPopMenuBox, Util } from 'react-native-wxui';
import { Actions } from 'react-native-router-flux';
let buttons = [{
    name: 'item1', imageSource: require('./icon.png'), message: 'message1'
},
{ name: 'item2', imageSource: require('./icon.png'), message: 'message2' },
{
    name: 'item3', imageSource: require('./icon.png'), message: 'message3'
}]
export default class extends Component {

    componentDidMount() {
        Actions.refresh({
            rightTitle: 'popMenu',
            onRight: () => {
                showPopMenuBox({
                    buttons: buttons
                },
                    (index) => {
                        console.log(index);
                    })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})