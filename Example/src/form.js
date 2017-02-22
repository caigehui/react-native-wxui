'use strict';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native'
import {
    Form
} from 'react-native-wxui'


export default class extends Component {

    _handleChange = (formData, fieldRef) => {
        console.log('FormData: ', formData);
        console.log(fieldRef + ' has changed');
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Form.Form onFieldChange={this._handleChange}>
                    <Form.Separator label="Separator" />
                    <Form.InputField label="InputField" ref="InputField1"
                        placeholder="placeholder"
                        iconLeft={
                            <Image source={require('./icon.png')} style={styles.iconLeft} />
                        }
                    />
                    <Form.InputField label="InputField" ref="InputField2"
                        placeholder="placeholder" />
                    <Form.Separator label="Separator" />
                    <Form.LinkField
                        label="LinkField"
                        onPress={() => {
                            console.log('LinkField pressed!')
                        }} />
                    <Form.LinkField
                        label="LinkField"
                        onPress={() => {
                            console.log('LinkField pressed!')
                        }}
                        iconLeft={
                            <Image source={require('./icon.png')} style={styles.iconLeft} />
                        }
                        iconRight={<Image source={require('./right-arrow.png')} style={styles.iconRight} />} />
                    <Form.LinkField
                        label="LinkField"
                        onPress={() => {
                            console.log('LinkField pressed!')
                        }}
                        iconRight={<Image source={require('./right-arrow.png')} style={styles.iconRight} />} />
                    <Form.LinkField
                        label="LinkField"
                        onPress={() => {
                            console.log('LinkField pressed!')
                        }}
                        text="text"
                        iconRight={<Image source={require('./right-arrow.png')} style={styles.iconRight} />} />
                    <Form.Separator label="Separator" />
                    <Form.TimePickerField label="TimePickerField" ref="TimePickerField" />
                    <Form.TimePickerField label="TimePickerField" ref="TimePickerField2"
                        iconRight={<Image source={require('./right-arrow.png')} style={styles.iconRight} />} />
                    <Form.TimePickerField label="TimePickerField" ref="TimePickerField3"
                        iconRight={<Image source={require('./right-arrow.png')} style={styles.iconRight} />}
                        iconLeft={
                            <Image source={require('./icon.png')} style={styles.iconLeft} />
                        } />
                    <Form.Separator label="Separator" />
                    <Form.SwitchField label="SwitchField" ref="SwitchField" />
                    <Form.SwitchField label="SwitchField" ref="SwitchField"
                        iconLeft={
                            <Image source={require('./icon.png')} style={styles.iconLeft} />} />
                    <Form.Separator />
                    <Form.Separator />
                </Form.Form>
            </ScrollView>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f7f4',
        flex: 1,
        marginTop: 64
    },
    iconLeft: {
        width: 20,
        height: 20,
    },
    iconRight: {
        width: 15,
        height: 10,
    }
})