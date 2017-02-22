'use strict';

import { showComponentHUD, hideComponentHUD } from './ComponentsHUD.js'
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

/**
 * 展示FilterView
 */
const showFilterView = (filter, condition, onHide) => {
    let realHeight = 45 * condition.length;
    let config = {
        width: WIDTH,
        height: realHeight,
        showingType: 'fadeIn',
        hidingType: 'fadeOut',
        enableCancel: true,
        maskOpacity: 0.5,
        adjustNavigation: false,
        inDuration: 1,
        outDuration: 2000,
        condition: condition,
        onHide: onHide
    }
    showComponentHUD(filter, config);
}

/**
 * 淡入Model
 */
const showModelFadeIn = (component) => {

    let config = {
        width: WIDTH,
        height: HEIGHT,
        showingType: 'fadeIn',
        hidingType: 'fadeOut',
        enableCancel: false,
        maskOpacity: 0,
        adjustNavigation: false,
        inDuration: 400,
        outDuration: 400
    }
    showComponentHUD(component, config);
}


export {
    showFilterView,
    showModelFadeIn,
    showComponentHUD,
    hideComponentHUD,
};

