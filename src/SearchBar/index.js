'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    TextInput,
} from 'react-native';
import * as Util from '../Util';
const styles = StyleSheet.create({
    searchInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Util.WIDTH - Util.WIDTH / 5,
        height: 28,
        marginLeft: 15,
        alignSelf: 'center',
        backgroundColor: 'rgb(240,240,240)',
        borderRadius: 4
    },
    searchIcon: {
        marginLeft: 10,
        width: 15,
        height: 15
    },
    searchInput: {
        marginTop: 1,
        marginLeft: 5,
        width: Util.WIDTH - (Util.WIDTH / 5) - 28,
        height: 40,
        fontSize: 13,
        color: 'black',
        alignSelf: 'center'
    },
    fullSearchContainer: {
        width: Util.WIDTH,
        height: 35,
        backgroundColor: 'rgb(240,240,240)',
        borderBottomWidth: Util.ONE_PIXEL,
        borderBottomColor: 'rgb(230,230,230)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullSearchInput: {
        width: Util.WIDTH - 10,
        height: 25,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 4,
        borderWidth: Util.ONE_PIXEL,
        borderColor: 'rgb(230,230,230)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchIconCenter: {
        width: 12,
        height: 12,
        marginRight: 7,
    },
    text: {
        fontSize: 13,
        color: 'rgb(170,170,170)',

    }
})

export default class SearchBar extends Component {

    static propTypes = {
        fullWidth: PropTypes.bool,
        autoFocus: PropTypes.bool,
        onPress: PropTypes.func,
        editable: PropTypes.bool
    }

    static defaultProps = {
        fullWidth: false,
        autoFocus: false,
        editable: true
    }

    _onPress = () => {
        if (this.props.editable) {
            this.searchInput.focus();
        } else {
            this.props.onPress && this.props.onPress()
        }
    }

    componentDidMount() {

        this.props.autoFocus && setTimeout(() => {
            this.searchInput && this.searchInput.focus();
        }, 400)
    }

    componentWillUnmount() {
        this.searchInput && this.searchInput.blur();
    }

    render() {
        return this.props.fullWidth
            ?
            (
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={styles.fullSearchContainer}>
                        <View style={styles.fullSearchInput}>
                            <Image source={require('./search.png') } style={styles.searchIconCenter} resizeMode="contain"/>
                            <Text style={styles.text}>搜索</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
            :
            (
                <TouchableWithoutFeedback onPress={this._onPress}>
                    <View style={[styles.searchInputView]}>
                        <Image resizeMode="contain"
                            source={require('./search.png') }
                            style={[styles.searchIcon]}/>
                        {this.props.editable
                            ? <TextInput ref={searchInput => this.searchInput = searchInput}
                                style={[styles.searchInput]}
                                selectionColor={'rgb(35,151,246)'}
                                clearButtonMode="always"
                                returnKeyType="search"
                                underlineColorAndroid="transparent"
                                placeholderTextColor="rgb(200,200,200)"
                                {...this.props}
                                autoFocus={false}/>
                            : <Text style={{ color: "rgb(200,200,200)", fontSize: 13, marginLeft: 5 }} numberOfLines={1}>{this.props.placeholder}</Text>
                        }
                    </View>
                </TouchableWithoutFeedback>
            )

    }
}