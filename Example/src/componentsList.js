'use strict';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native'
import {
    Util,
    Form,
    showActionSheet,
    showAlert,
    showDialog,
    ProgressHUD,
    showTimePickerBox
} from 'react-native-wxui'
import { Actions } from 'react-native-router-flux';

export default class extends Component {

    _showActionSheet = () => showActionSheet({
        buttons: ['option1', 'option2', 'Cancel'],
        highlightedIndex: 0, //set index to -1 for none highligeted
        message: 'message here'
    }, (index) => {
        console.log('index ' + index + ' pressed');
    })

    _showAlert = () => showAlert({
        title: 'title here',
        message: 'message here'
    }, () => {
        console.log('confirmed')
    }, () => {
        console.log('canceled')
    })

    _showDialog = () => showDialog({
        title: 'title here',
        message: 'message here'
    }, (text) => {
        console.log('confirmed: ' + text)
    }, () => {
        console.log('canceled')
    })

    _showLoading = () => {
        ProgressHUD.showLoading('Loading');
        setTimeout(ProgressHUD.hideLoading, 1000);
    }

    _showSuccess = () => {
        ProgressHUD.showSuccess('Success');
    }

    _showFail = () => {
        ProgressHUD.showFail('Fail');
    }

    _showTimePickerBox = () => {
        showTimePickerBox('', (date, time) => {
            console.log(date, time)
        }, () => {
            console.log('timePickerBox canceled')
        })
    }

    popOutComponents = [
        { label: 'ActionSheet', onPress: this._showActionSheet },
        { label: 'Alert', onPress: this._showAlert },
        { label: 'Dialog', onPress: this._showDialog },
        { label: 'Loading', onPress: this._showLoading },
        { label: 'Success', onPress: this._showSuccess },
        { label: 'Fail', onPress: this._showFail },
        { label: 'TimePickerBox', onPress: this._showTimePickerBox }
    ]

    commonComponents = [
        { label: 'Button', onPress: Actions.button },
        { label: 'Form', onPress: Actions.form },
        { label: 'ListView', onPress: Actions.listView },
        { label: 'FilterBar', onPress: Actions.filterBar },
        { label: 'LoadingPlaceholder', onPress: Actions.loadingPlaceholder },
        { label: 'SearchBar', onPress: Actions.searchBar },
        { label: 'PopMenuBox', onPress: Actions.popMenuBox },
    ]

    _renderForm = () => {
        let formItems = [];
        formItems.push(<Form.Separator key="sep1" label="Pop-Out Components" />)
        this.popOutComponents.map((option) => {
            formItems.push(<Form.LinkField key={option.label} label={option.label}
                onPress={option.onPress} />)
        })

        formItems.push(<Form.Separator key="sep2" label="Common Components" />)
        this.commonComponents.map((option) => {
            formItems.push(<Form.LinkField key={option.label} label={option.label}
                onPress={option.onPress} 
                iconRight={<Image source={require('./right-arrow.png')} style={styles.iconRight}/>}/>)
        })

        return formItems;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Form.Form>
                    {this._renderForm()}
                </Form.Form>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f7f4',
        flex: 1,
        marginTop: Util.isIOS? 64:54
    },
    iconRight: {
        width: 15,
        height: 10,
        marginLeft: 60
    }
})