'use strict';
import {
  Platform,
  Dimensions,
  PixelRatio,
  UIManager
} from 'react-native';
import React, {
    Component,
    PropTypes
} from 'react';
global.React = React;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export function assert(expr, failDescription) {
  if (!expr) {
    throw new Error(`[react-native-wxui] ${failDescription}`);
  }
}

export const isIOS = Platform.OS === 'ios';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 20;;
export const SCALE = PixelRatio.get();
export const ONE_PIXEL = 1 / SCALE;
export const I6RATIO = Dimensions.get('window').width / 350;