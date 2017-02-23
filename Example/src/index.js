'use strict';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import ComponentList from './componentsList.js'
import Button from './button';
import Form from './form';
import ListView from './listView';
import FilterBar from './filterBar';
import LoadingPlaceholder from './loadingPlaceholder';
import SearchBar from './searchBar';
import PopMenuBox  from './popMenuBox';
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
                    <Scene key="filterBar" title="FilterBar" component={FilterBar}/>
                    <Scene key="loadingPlaceholder" title="LoadingPlaceholder" component={LoadingPlaceholder}/>
                    <Scene key="searchBar" title="SearchBar" component={SearchBar}/>
                    <Scene key="popMenuBox" title="PopMenuBox" component={PopMenuBox}/>
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