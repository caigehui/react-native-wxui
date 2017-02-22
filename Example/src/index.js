'use strict';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import ComponentList from './componentsList.js'
import Button from './button';
import Form from './form';
import ListView from './listView';
export default class extends Component {
    render() {

        return (
            <Router>
                <Scene
                    key="root"
                    navigationBarStyle={styles.rootNavBar}
                    titleStyle={styles.rootTitle}
                    backButtonImage={require('./left-arrow.png')}>
                    <Scene key="componentList" title="Example" component={ComponentList}/>
                    <Scene key="button" title="Button" component={Button}/>
                    <Scene key="form" title="Form" component={Form}/>
                    <Scene key="listView" title="ListView" component={ListView}/>
                </Scene>
            </Router>
        )

    }
}
const styles = StyleSheet.create({
    rootNavBar: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottomColor: 'rgb(200,200,200)'
    },
    rootTitle: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'normal'
    },
});