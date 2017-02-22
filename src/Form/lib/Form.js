'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';


export default class Form extends Component {
    constructor(props) {
        super(props);
        this.values = {};
        this._onFieldChange = this._onFieldChange.bind(this);
    }
    _onFieldChange(fieldRef, value) {
        this.values[fieldRef] = value;
        this.props.onFieldChange && this.props.onFieldChange(this.values, fieldRef);
    }

    render() {
        let wrappedChildren = [];
        let firstRow = true;
        let lastRow = false;
        React.Children.map(this.props.children, (child, i) => {

            if (i === 0) {
                firstRow = true;
            } else if (this.props.children[i - 1] && this.props.children[i - 1].props && this.props.children[i - 1].props.type === 'Separator') {
                firstRow = true;
            } else {
                firstRow = false;
            }
            if (this.props.children.length === i + 1) {
                lastRow = true;
            } else if (this.props.children[i + 1] && this.props.children[i + 1].props && this.props.children[i + 1].props.type === 'Separator') {
                lastRow = true;
            } else {
                lastRow = false;
            }

            if (child && child.ref) {
                if (child.props.valueType === 'string') {
                    this.values[child.ref] = '';
                } else if (child.props.valueType === 'number') {
                    this.values[child.ref] = 0;
                } else if (child.props.valueType === 'array') {
                    this.values[child.ref] = [];
                } else if (child.props.valueType === 'object') {
                    this.values[child.ref] = {};
                } else if (child.props.valueType === 'bool') {
                    this.values[child.ref] = true
                }
            }
            wrappedChildren.push(React.cloneElement(child, {
                key: child.type + i,
                fieldRef: child.ref,
                ref: child.ref,
                onChange: this._onFieldChange.bind(this, child.ref),
                firstRow: child.props.firstRow?child.props.firstRow:firstRow,
                lastRow: child.props.lastRow?child.props.lastRow:lastRow
            }
            ));
        }, this);
        this.props.onFieldChange && this.props.onFieldChange(this.values, null);
        return (
            <View style={[styles.form, this.props.style]}>
                {wrappedChildren}
            </View>
        );
    }
}

Form.propTypes = {
    onChange: PropTypes.func
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center'
    }
});