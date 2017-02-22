'use strict'
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
} from 'react-native';
import { RefreshControl } from 'react-native';
import MyRefreshControl from '../RefreshControl'
function MergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      if (obj2[p].constructor == Object) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}


export default class GiftedListView extends Component {

  static defaultProps = {
    customStyles: {},
    initialListSize: 10,
    firstLoader: false,
    pagination: true,
    refreshable: true,
    refreshableColors: undefined,
    refreshableProgressBackgroundColor: undefined,
    refreshableSize: undefined,
    refreshableTitle: undefined,
    refreshableTintColor: undefined,
    renderRefreshControl: null,
    headerView: null,
    sectionHeaderView: null,
    scrollEnabled: true,
    withSections: false,
    onFetch(page, callback, options) { callback([]); },
    paginationFetchingView: null,
    paginationAllLoadedView: null,
    paginationWaitingView: null,
    emptyView: null,
    renderSeparator: null,
  }

  static propTypes = {
    customStyles: React.PropTypes.object,
    initialListSize: React.PropTypes.number,
    firstLoader: React.PropTypes.bool,
    pagination: React.PropTypes.bool,
    refreshable: React.PropTypes.bool,
    refreshableColors: React.PropTypes.array,
    refreshableProgressBackgroundColor: React.PropTypes.string,
    refreshableSize: React.PropTypes.string,
    refreshableTitle: React.PropTypes.string,
    refreshableTintColor: React.PropTypes.string,
    renderRefreshControl: React.PropTypes.func,
    headerView: React.PropTypes.func,
    sectionHeaderView: React.PropTypes.func,
    scrollEnabled: React.PropTypes.bool,
    withSections: React.PropTypes.bool,
    onFetch: React.PropTypes.func,

    paginationFetchingView: React.PropTypes.func,
    paginationAllLoadedView: React.PropTypes.func,
    paginationWaitingView: React.PropTypes.func,
    emptyView: React.PropTypes.func,
    renderSeparator: React.PropTypes.func,
  }

  defaultStyles = {
    separator: {
      height: 1,
      backgroundColor: '#CCC'
    },
    actionsLabel: {
      fontSize: 20,
    },
    paginationView: {
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    defaultView: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    defaultViewTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 15,
    },
  }
  _setPage = (page) => { this._page = page; }
  _getPage = () => { return this._page; }
  _setRows = (rows) => { this._rows = rows; }
  _getRows = () => { return this._rows; }


  paginationFetchingView = () => {
    if (this.props.paginationFetchingView) {
      return this.props.paginationFetchingView();
    }

    return (
      <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
      </View>
    );
  }
  paginationAllLoadedView = () => {
    if (this.props.paginationAllLoadedView) {
      return this.props.paginationAllLoadedView();
    }

    return (
      <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
        <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
          ~
        </Text>
      </View>
    );
  }
  paginationWaitingView = (paginateCallback) => {
    if (this.props.paginationWaitingView) {
      return this.props.paginationWaitingView(paginateCallback);
    }

    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}
        >
        <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
          Load more
        </Text>
      </TouchableHighlight>
    );
  }

  headerView = () => {
    if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView) {
      return null;
    }
    return this.props.headerView();
  }

  emptyView = (refreshCallback) => {
    if (this.props.emptyView) {
      return this.props.emptyView(refreshCallback);
    }

    return (
      <View style={[this.defaultStyles.defaultView, this.props.customStyles.defaultView]}>
        <Text style={[this.defaultStyles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
          Sorry, there is no content to display
        </Text>

        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderSeparator = () => {
    if (this.props.renderSeparator) {
      return this.props.renderSeparator();
    }

    return (
      <View style={[this.defaultStyles.separator, this.props.customStyles.separator]} />
    );
  }

  state = (() => {
    this._setPage(1);
    this._setRows([]);

    if (this.props.withSections === true) {
      const ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
      });
      return {
        dataSource: ds.cloneWithRowsAndSections(this._getRows()),
        isRefreshing: false,
        paginationStatus: 'firstLoad',
      };
    } else {
      const ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows(this._getRows()),
        isRefreshing: false,
        paginationStatus: 'firstLoad',
      };
    }
  })()

  componentDidMount() {
    this.mounted = true;
    this.props.onFetch(this._getPage(), this._postRefresh, {firstLoad: true});
  }

  setNativeProps(props) {
    this.refs.listview.setNativeProps(props);
  }

  _refresh = () => {
    this._onRefresh({external: true});
  }

  _onRefresh = (options = {}) => {
    if (this.mounted) {
      this.setState({
        isRefreshing: true,
      });
      this._setPage(1);
      this.props.onFetch(this._getPage(), this._postRefresh, options);
    }
  }

  _postRefresh = (rows = [], options = {}) => {
    if (this.mounted) {
      this.endRefresh && this.endRefresh();
      this.manual = false
      this._updateRows(rows, options);
    }
  }

  _onPaginate = () => {
    if(this.state.paginationStatus==='allLoaded'){
      return null
    }else {
      this.setState({
        paginationStatus: 'fetching',
      });
      this.props.onFetch(this._getPage() + 1, this._postPaginate, {});
    }
  }

  _postPaginate = (rows = [], options = {}) => {
    this._setPage(this._getPage() + 1);
    var mergedRows = null;
    if (this.props.withSections === true) {
      mergedRows = MergeRecursive(this._getRows(), rows);
    } else {
      mergedRows = this._getRows().concat(rows);
    }
    this._updateRows(mergedRows, options);
  }

  _updateRows = (rows = [], options = {}) => {
    if (rows !== null) {
      this._setRows(rows);
      if (this.props.withSections === true) {
        const ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
      });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
          isRefreshing: false,
          paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
        });
      } else {
        const ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          dataSource: ds.cloneWithRows(rows),
          isRefreshing: false,
          paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
        });
      }
    } else {
      this.setState({
        isRefreshing: false,
        paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
      });
    }
  }

  _renderPaginationView = () => {
    if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)) {
      return this.paginationFetchingView();
    } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && (this.props.withSections === true || this._getRows().length > 0)) {
      return this.paginationWaitingView(this._onPaginate);
    } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
      return this.paginationAllLoadedView();
    } else if (this._getRows().length === 0) {
      return this.emptyView(this._onRefresh);
    } else {
      return null;
    }
  }

  renderRefreshControl = () => {
    if(Platform.OS === 'ios') return null;
    if (this.props.renderRefreshControl) {
      return this.props.renderRefreshControl({ onRefresh: this._onRefresh });
    }
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={this.state.isRefreshing}
        colors={this.props.refreshableColors}
        progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
        progressViewOffset={30}
        size={this.props.refreshableSize}
        tintColor={this.props.refreshableTintColor}
        title={this.props.refreshableTitle}
      />
    );
  }

  renderIOSRefresher = (props) => {
    return <MyRefreshControl {...props}
              onRefresh={(endRefresh)=>{
                this.endRefresh = endRefresh;
                this._onRefresh({});
                this.manual = true
            }}
            onRefreshAuto={
              (endRefresh)=>{
                if(this.manual) return
                this.endRefresh = endRefresh;
            }}
            refreshing={this.state.isRefreshing}/>
  }

  render() {
    return this.props.refreshable === true?
     (
      <ListView
        keyboardDismissMode="on-drag"
        ref="listview"
        onEndReached={this.props.onEndReached}
        renderScrollComponent={this.renderIOSRefresher}
        dataSource={this.state.dataSource}
        renderRow={this.props.rowView}
        renderSectionHeader={this.props.sectionHeaderView}
        renderHeader={this.headerView}
        renderFooter={this._renderPaginationView}
        renderSeparator={this.renderSeparator}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={this.props.scrollEnabled}
        canCancelContentTouches={true}
        refreshControl={this.renderRefreshControl()}
        {...this.props}

        style={this.props.style}
      />
    )
    : (
       <ListView
        keyboardDismissMode="on-drag"
        ref="listview"
        onEndReached={this.props.onEndReached}
        dataSource={this.state.dataSource}
        renderRow={this.props.rowView}
        renderSectionHeader={this.props.sectionHeaderView}
        renderHeader={this.headerView}
        renderFooter={this._renderPaginationView}
        renderSeparator={this.renderSeparator}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={this.props.scrollEnabled}
        canCancelContentTouches={true}
        {...this.props}

        style={this.props.style}
        />
    )
  }

}
