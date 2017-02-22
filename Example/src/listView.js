'use strict';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import {
    ListView,
    Util
} from 'react-native-wxui'


export default class extends Component {

    _onFetch = (page = 1, callback, options) => {
        setTimeout(() => {
            let data = [];
            for (var i = 0; i < 10; i++) {
                data.push('title' + (Math.random()*100).toFixed(0));
            }
            callback(data, {
                allLoaded: true,
            })
        }, 2000)
    }

    _renderRow = (rowData, sectionID, rowID, highlightRow) => {
        return (
            <View style={styles.rowContainer}>
                <Text style={{marginLeft: 15}}>{rowData}</Text>
            </View>
        )
    }

    render() {
        return (
            <ListView
                ref={listView => this.listView = listView}
                renderRow={this._renderRow}
                fetchData={this._onFetch}
                pagination={true}
                refreshable={true}
                autoLoad={true} 
                style={styles.container}/>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f7f4',
        flex: 1,
        marginTop: 64
    },
    rowContainer: {
        height: 45,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomWidth: Util.ONE_PIXEL,
        borderBottomColor: 'rgb(224,224,224)',
    }
})