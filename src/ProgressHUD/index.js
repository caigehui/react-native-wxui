'use strict';
import Progress from './progress.js';
import { showModelFadeIn } from './HUD';
let showLoading = (message = 'Loading') => Progress.showProgress({message, imgSource: require('./imgs/loading.png'), rotate: true});

let hideLoading = () => Progress.hideProgress();

let showSuccess = (message = 'Success', duration = 1000) => Progress.showProgress({message, imgSource: require('./imgs/success.png'), duration})

let showFail = (message = 'Fail', duration = 1000) => Progress.showProgress({message, imgSource: require('./imgs/fail.png'), duration})

export {
    showLoading,
    hideLoading,
    showSuccess,
    showFail,
    showModelFadeIn,
}