'use strict';
import GiftedListView from './GiftedListView';
import LoadingPlaceholder from '../LoadingPlaceholder';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    PixelRatio,
    Platform,
    Text,
    ListView,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import * as Util from '../Util';
export default class MyListView extends Component {

    static propTypes = {
        fetchData: PropTypes.func,
        renderRow: PropTypes.func,
        pagination: PropTypes.bool,
        refreshable: PropTypes.bool,
        showLoadingPlaceholder: PropTypes.bool,
        height: PropTypes.number
    }

    static defaultProps = {
        pagination: true,
        refreshable: true,
        showLoadingPlaceholder: true,
    }


    state = {
        firstLoad: true,
        useFirstRows: this.props.showLoadingPlaceholder,
        firstRows: [],
        pageNo: 0,
        allLoaded: false

    }

    componentDidMount() {
        /**
         * 在显示loadingPlaceholder时加载第一页的数据
         */
        this.props.showLoadingPlaceholder && this.props.fetchData(1, (firstRows, options) => {
            //加载成功后将firstLoad设置为false
            this.setState({
                firstLoad: false,
                firstRows: firstRows,
                allLoaded: options ? options.allLoaded : false
            });
        }, {firstLoad: true});
    }

    /***
     * 重新展示ListView
     */
    reloadListView = () => {
        this.refs.listView._onRefresh();
    }


    _onFetch = (page = 1, callback, options) => {
        /**
         * 当Refresh的时候将pageNo归零
         */
        if (this.state.pageNo >= 1 && page === 1) {
            this.setState({ pageNo: 0 });
        }

        //直接使用存好的rows,rows成员的类型必须是object
        if (this.state.useFirstRows && page === 1) {
            callback(this.state.firstRows, {
                allLoaded: this.state.allLoaded
            });
            this.setState({ useFirstRows: false });
        } else {
            this.props.fetchData(page, callback, options);
        }
    }



    _onEndReached = () => {
        if(!this.props.pagination) return
        /**
         * 判断是否重复上拉
         */
        if (this.state.pageNo === this.refs.listView._getPage()) {
            this.setState({ pageNo: 0 });
            return null;
        } else {
            this.setState({ pageNo: this.refs.listView._getPage() });
            this.refs.listView._onPaginate()
        }
    }

    _renderPaginationFetchigView = () => {
        return (
            <View style={styles.container}>
                <View style={styles.pagination}>
                    <View style={styles.line}/>
                    <Text style={styles.text}>正在加载更多...</Text>
                    <View style={styles.line}/>
                </View>
            </View>
        )
    }

    _renderPaginationAllLoadedView = () => {
        return (
            <View style={styles.container}>
                <View style={styles.pagination}>
                    <View style={styles.line}/>
                    <Text style={styles.text}>没有更多了</Text>
                    <View style={styles.line}/>
                </View>
            </View>
        )
    }

    _renderPaginationWaitingView = () => {
        return (
            <View style={styles.container}>
                <View style={styles.pagination}>
                    <View style={styles.line}/>
                    <Text style={styles.text}>上拉加载更多</Text>
                    <View style={styles.line}/>
                </View>
            </View>
        )
    }

    _renderEmptyView = (refreshCallback) => {
        return (
            <View style={styles.pagination}>
                <Text style={styles.text}>暂时没有数据</Text>
                <TouchableOpacity underlayColor='#c8c7cc'
                    onPress={refreshCallback}>
                    <Text style={styles.text}>↻</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return this.state.firstLoad && this.state.useFirstRows ?
            (
                <View style={styles.loading}>
                    <LoadingPlaceholder style={{ marginTop: -50 }}/>
                </View>
            )
            : (
                <GiftedListView {...this.props}
                    ref="listView"
                    rowView={this.props.renderRow}
                    onFetch={this._onFetch}
                    pagination={this.props.pagination}
                    refreshable={this.props.refreshable}
                    onEndReached={this._onEndReached}
                    refreshableColors={['#3b79f0']}
                    emptyView={this._renderEmptyView }
                    paginationFetchingView={this._renderPaginationFetchigView}
                    paginationAllLoadedView={this._renderPaginationAllLoadedView}
                    paginationWaitingView={this._renderPaginationWaitingView}
                    onEndReachedThreshold={Platform.OS === 'ios' ? -50 : 10}
                    />
            )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: Util.WIDTH,
    },
    loading: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pagination: {
        height: 50,
        width: Util.WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    line: {
        backgroundColor: 'rgb(210,210,210)',
        height: Util.ONE_PIXEL,
        width: Util.WIDTH / 3
    },
    text: {
        color: '#a0a0a0',
        fontSize: 12
    }
});