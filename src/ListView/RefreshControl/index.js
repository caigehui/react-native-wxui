'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    PanResponder,
    Platform,
    Dimensions,
    LayoutAnimation
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const WINDOWWIDTH = Dimensions.get('window').width;

const Android = Platform.OS === 'ios' ? false : true

const styles = StyleSheet.create({
    refreshContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 0,
        width: WINDOWWIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        width: 20,
        height: 20
    }
})

export default class RefreshControl extends Component {

    static propTypes = {
        onRefresh: PropTypes.func,
        refreshing: PropTypes.bool,
        draggingOffset: PropTypes.number.isRequired
    }

    static defaultProps = {
        draggingOffset: 70
    }

    constructor(props) {

        super(props);

        this.state = {
            refreshing: false,
            shouldRefreshing: false,
            indicatorAngle: '0deg'
        }

        this.dragging = false
    }




    componentWillReceiveProps(nextProps) {
        if (nextProps.refreshing) {
            if (!this.state.refreshing) {
                this.scrollView.scrollTo({ x: 0, y: -this.props.draggingOffset, animated: true })
                this.setState({ refreshing: true });
                this.props.onRefreshAuto && this.props.onRefreshAuto(this.endRefresh)
            }
        }
    }

    onScroll = (e) => {
        const { draggingOffset } = this.props;
        let y = e.nativeEvent.contentOffset.y;
        if (this.dragging) {
            if (y < 0) {
                let angle = y * (360 / (-draggingOffset)) + 'deg';
                this.setState({
                    shouldRefreshing: y <= -draggingOffset ? true : false,
                    indicatorAngle: angle
                })
            }
        }
        this.props.onScroll && this.props.onScroll(e)
    }

    onScrollEndDrag = () => {
        const { draggingOffset } = this.props;
        this.dragging = false;
        if (this.state.shouldRefreshing && !this.state.refreshing) {
            this.scrollView.scrollTo({ x: 0, y: -draggingOffset, animated: true })
            this.setState({ refreshing: true,shouldRefreshing: false });
            this.props.onRefresh && this.props.onRefresh(this.endRefresh)
        }

        this.props.onScrollEndDrag && this.props.onScrollEndDrag();
    }

    onScrollBeginDrag = () => {
        this.dragging = true;
        this.props.onScrollBeginDrag && this.props.onScrollBeginDrag();
    }


    endRefresh = () => {
        this.setState({ refreshing: false });
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true })
    }

    renderRefreshViewIOS = () => {
        const { draggingOffset } = this.props;
        let indicatorAngle = { transform: [{ rotate: this.state.indicatorAngle }] };
        return (
            <View style={[styles.refreshContainer, { top: -draggingOffset + 1, height: draggingOffset }]}>
                <Animatable.Image source={require('./loading.png') }
                    style={[styles.indicator, indicatorAngle]}
                    duration={500}
                    resizeMode="contain"
                    animation={this.state.refreshing ? 'rotate' : null}
                    iterationCount="infinite"
                    easing="linear"/>
            </View>
        )
    }

    render() {
        return <ScrollView
            {...this.props}
            ref={(scrollView) => this.scrollView = scrollView}
            scrollEventThrottle={16}
            onScrollEndDrag={() => this.onScrollEndDrag() }
            onScrollBeginDrag={() => this.onScrollBeginDrag() }
            onScroll={this.onScroll }
            >
            {this.props.children}
            {this.renderRefreshViewIOS() }
        </ScrollView>
    }
}