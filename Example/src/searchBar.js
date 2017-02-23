'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { SearchBar, Util } from 'react-native-wxui';
export default class extends Component {

    state = {
        text: ''
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchInputContainView}>
                    <SearchBar
                        autoFocus={true}
                        placeholder="placeholder"
                        value={this.state.text}
                        onChange={(event) => {
                            if (this.state.text === event.nativeEvent.text) return;
                            this.setState({ text: event.nativeEvent.text });
                        }} />
                    <TouchableOpacity style={{ alignSelf: 'center' }}>
                        <Text style={styles.cancel} >取消</Text>
                    </TouchableOpacity>
                </View>
                <SearchBar
                    editable={true}
                    fullWidth={true}
                    onPress={() => {
                        console.log('SearchBar Pressed')
                    }} />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64
    },
    searchInputContainView: {
        flexDirection: 'row',
        height: 44,
        width: Util.WIDTH,
        borderColor: 'rgb(224,224,224)',
        borderBottomWidth: Util.ONE_PIXEL
    },
    cancel: {
        fontSize: 15,
        color: 'rgb(35,151,246)',
        textAlign: 'center',
        width: Util.WIDTH / 5 - 15,
        alignSelf: 'center'
    },
})
