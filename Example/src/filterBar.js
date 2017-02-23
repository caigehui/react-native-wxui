'use strict';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import {
    ListView,
    FilterBar,
    Util
} from 'react-native-wxui'
const conditions = [
    { options: ['option1', 'option2', 'option3', 'option4', 'option5'], imageSource: require('./icon.png'), imageSelectedSource: require('./icon.png') },
    { options: ['option1', 'option2', 'option3', 'option4', 'option5'], imageSource: require('./icon.png'), imageSelectedSource: require('./icon.png') },
    { options: ['option1', 'option2', 'option3', 'option4', 'option5'], imageSource: require('./icon.png'), imageSelectedSource: require('./icon.png') }
];

export default class extends Component {

    state = {
        filters: [0, 0, 0]
    }

    _onFetch = (page = 1, callback, options) => {
        setTimeout(() => {
            let data = [];
            for (var i = 0; i < 10; i++) {
                data.push('title' + (Math.random() * 100).toFixed(0));
            }
            callback(data, {
                allLoaded: true,
            })
        }, 2000)
    }

    _renderRow = (rowData, sectionID, rowID, highlightRow) => {
        return (
            <View style={styles.rowContainer}>
                <Text style={{ marginLeft: 15 }}>{rowData}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FilterBar conditions={conditions} onFilterChange={filters => {
                    this.setState({ filters })
                    this.listView.reloadListView();
                }} />
                <ListView
                    ref={listView => this.listView = listView}
                    renderRow={this._renderRow}
                    fetchData={this._onFetch}
                    pagination={true}
                    refreshable={true}
                    autoLoad={true}
                />
            </View>

        )
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f7f4',
        flex: 1,
        marginTop: Util.isIOS? 64:54
    },
    rowContainer: {
        height: 45,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomWidth: Util.ONE_PIXEL,
        borderBottomColor: 'rgb(224,224,224)',
    }
})