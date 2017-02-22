'use strict'
import HUD from './HUD.js'
import RootSiblings from 'react-native-root-siblings';

let componentView = null;
let componentViewCopy = null;
let timer = null;
let timerCopy = null;
let remove = false;
let removeCopy = false;
let hud = null;
let hudCopy = null;
let node = null;
let nodeCopy = null;

/**
 * configuration
 * @width: number
 * @height: number
 * @showingType: string 进入的动画类型
 * @hidingType: string 退出的动画类型
 * @enableCancel: bool 是否允许点击Mask区域隐藏HUD
 * @maskOpacity: number mask的透明度
 * @adjustNavigation: mask层是否不遮挡NavigationBar
 * @inDuration: number 进入的动画时间
 * @outDuration: number 退出的动画时间
 * @options: array ActionSheet的选项
 * @menu: array 右上角菜单的选项
 * @condition: array 条件筛选 
 * @onHide: func 消失
 */
export function showComponentHUD(component, configuration) {
    
    hud = (
        <HUD component={component}
            width={configuration.width}
            height={configuration.height}
            showingType={configuration.showingType}
            hidingType={configuration.hidingType}
            getNode={(n) => { node = n } }
            onHide={configuration.onHide ? configuration.onHide : hideComponentHUD}
            enableCancel={configuration.enableCancel}
            maskOpacity={configuration.maskOpacity}
            adjustNavigation={configuration.adjustNavigation}
            inDuration={configuration.inDuration}
            outDuration={configuration.outDuration}
            options={configuration.options}
            menu={configuration.menu}
            condition={configuration.condition}
            top={configuration.top}/>
    );
    if (componentView) {
        componentView.update(hud);
    } else {
        componentView = new RootSiblings(hud);
    }

    
}




export function showComponentHUDCopy(component, configuration) {
    hudCopy = (
        <HUD component={component}
            width={configuration.width}
            height={configuration.height}
            showingType={configuration.showingType}
            hidingType={configuration.hidingType}
            getNode={(n) => { nodeCopy = n } }
            onHide={configuration.onHide ? configuration.onHide : hideComponentHUDCopy}
            enableCancel={configuration.enableCancel}
            maskOpacity={configuration.maskOpacity}
            adjustNavigation={configuration.adjustNavigation}
            inDuration={configuration.inDuration}
            outDuration={configuration.outDuration}
            options={configuration.options}
            menu={configuration.menu}
            condition={configuration.condition}
            top={configuration.top}/>
    );

    if (componentViewCopy) {
        componentViewCopy.update(hudCopy);
    } else {
        componentViewCopy = new RootSiblings(hudCopy);
    }
}

/***
 * 隐藏HUD
 */
export function hideComponentHUD() {

    return new Promise((resolve, reject) => {
        if (!componentView) {
            resolve();
        }
        node.hide().then(() => {
            if (componentView) {
                componentView.destroy();
                componentView = null;
            }
            resolve();
        })

    })

}
export function hideComponentHUDCopy() {

    return new Promise((resolve, reject) => {
        if (!componentViewCopy) {
            resolve();
        }
        nodeCopy.hide().then(() => {
            if (componentViewCopy) {
                componentViewCopy.destroy();
                componentViewCopy = null;
            }
            resolve();
        })

    })

}