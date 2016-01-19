import React from 'react';
import { DataSet } from 'mosaic-dataset';
import { ListView,  ListPaginationView } from 'mosaic-ui-list';
import 'mosaic-ui-list/styles';
import { AutocompleteBox } from 'mosaic-ui-autocomplete';
import 'mosaic-ui-autocomplete/styles';

import Map from './Map';
import AppScreenLabels from './AppScreenLabels';
import './AppScreenView.less';

export default class AppScreenView extends React.Component {
    get messages(){
        return this.props.app.getMessages('AppScreenLabels', AppScreenLabels);
    }
    constructor(...params){
        super(...params);
        this.app = this.props.app;
        this.state = this._newState({ openList : true });

        this._onUpdate = this._onUpdate.bind(this);
        this._onWindowResize = this._onWindowResize.bind(this);
        this._onToggleSearchResultList = this._onToggleSearchResultList.bind(this);
        
        const model = this.app.model;
        const adapters = this.app.adapters;
        model.searchIndex.options.cluster = true;
        
        this._paginationView = new ListPaginationView({
            dependencies : [model.paginatedDataSet],
            dataSet : model.paginatedDataSet,
        });

        this._listView = model.dataSet.getAdapter(ListView, {
            dependencies : [model.paginatedDataSet, model.openItems],
            openItems : model.openItems, 
            dataSet : model.paginatedDataSet
        });
    }
    
    componentWillMount(){
        this._mounted = true;
        const app = this.props.app;
        const searchIndex = app.model.searchIndex;
        searchIndex.addListener('update', this._onUpdate);
        app.addListener('state', this._onUpdate);
        window.addEventListener('resize', this._onWindowResize);        
    }
    componentDidMount(){
        this._updateMainAreaSize();
        this._updateSearchResultsHeight();
    }
    componentDidUpdate(){
        this._updateSearchResultsHeight();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._onWindowResize);        
        this._mounted = false;
        const app = this.props.app;
        const searchIndex = app.model.searchIndex;
        searchIndex.removeListener('update', this._onUpdate);
        app.removeListener('state', this._onUpdate);
    }
    
    _updateMainAreaSize(){
        const main = this.refs.main;
        if (!main)
            return ;
        const size = this.windowSize;
        main.style.height = size.height + 'px';
    }
    _updateSearchResultsHeight(){
        if (!this.shouldUpdateSearchResultsHeight)
            return ;
        const searchListContainer = this.refs['search-results-container'];
        if (!searchListContainer)
            return ;
        const searchBoxContainer = this.refs['search-box-container'];
        const footerContainer = this.refs['footer-container'];
        const searchBoxRect = searchBoxContainer.getBoundingClientRect();
        const windowHeight = this.windowSize.height;
        const footerContainerHeight = footerContainer.offsetHeight;
        const searchListHeight = windowHeight
            - searchBoxRect.bottom
            - footerContainerHeight
            - 1;
        searchListContainer.style.height = searchListHeight + 'px';
    }
    _onWindowResize(){
        this._updateMainAreaSize();
        this._updateSearchResultsHeight();
    }
    _onUpdate(intent){
        const that = this;
        intent.then(function(){
            that._enqueueStateChanges();
        });
    }

    _newState(options){
        options = options || {};
        const state = this.state || {};
        const result = {};
        for (let key in state){
            result[key] = state[key];
        }
        for (let key in options){
            result[key] = options[key];
        }
        return result;
    }

    _renderSearchResultsList(){
        if (!this.state.openList)
            return ;
        const app = this.props.app;
        const searchIndex = app.model.searchIndex;
        const size = searchIndex.length;
        if (!size)
            return ;
        return (
            <div className="search-results-container" ref="search-results-container">
                {this._paginationView.renderView()}
                {this._listView.renderView()}
                {this._paginationView.renderView()}
            </div>
        );
    }
    
    _renderSearchBox(){
        return (
            <div className="search-box-container" ref="search-box-container">
                {this._renderSearchInput()}
                {this._renderSearchResultsTitle()}
            </div>
        ); 
    }
    _renderSearchInput(){
        const searchCriteria = this.app.model.searchCriteria;
        const suggest = function(...params){
            return this.app.model.suggest(...params);
        }.bind(this);
        return (
            <div className="search-input-container">
                <AutocompleteBox 
                    key="organizations"
                    search={suggest}
                    selected={searchCriteria}
                    selectOptions={this.messages.selectOptions}
                />
            </div>
        );
    }
    _onToggleSearchResultList(){
        this._enqueueStateChanges({
            openList : !this.state.openList
        });
    }
    
    _enqueueStateChanges(options) {
        if (!this._nextState) {
            this._nextState = this._newState(options);
            setTimeout(function(){
                this.setState(this._nextState, function(){
                    delete this._nextState;
                }.bind(this));
            }.bind(this), 10);
        } else {
            for (let key in options) {
                this._nextState[key] = options[key]; 
            }
        }
    }
    
    _renderSearchResultsTitle(){
        const app = this.props.app;
        const searchIndex = app.model.searchIndex;
        const size = searchIndex.length;
        const caretIcon = this.state.openList
            ? "glyphicon glyphicon-menu-down"
            : "glyphicon glyphicon-menu-right"
        const title = this.messages.resultsTitle(searchIndex.length);
        return (
            <div className="search-results-title">
                <a href="#" onClick={this._onToggleSearchResultList} className="navbar-text navbar-right">
                    <i className={caretIcon}></i>
                </a>
                <h3><a href="#" onClick={this._onToggleSearchResultList}>
                    {title}
                </a></h3>
            </div>
        );
    }
    _renderSearchPanel(){
        return (
            <div className="search-container">
                {this._renderSearchBox()}
                {this._renderSearchResultsList()}
            </div>
        );
    }
    // -----------------------------------------------------------------------
    // Layouts    
    _renderMobileLayout(){
        this.shouldUpdateSearchResultsHeight = false;
        return (
            <div key="main" className="main">
                {this._renderHeader()}
                {this._renderMap()}
                {this._renderSearchPanel()}
                {this._renderFooter()}
            </div>
        );
    }
    _renderTabletLayout(){
        this.shouldUpdateSearchResultsHeight = true;
        return (
            <div key="main" className="main">
                {this._renderHeader()}
                {this._renderMap()}
                {this._renderSearchPanel()}
                {this._renderFooter()}
            </div>
        );
    }
    _renderDesktopLayout(){
        this.shouldUpdateSearchResultsHeight = true;
        return (
                <div key="main" className="main">
                    {this._renderHeader()}
                    {this._renderMap()}
                    {this._renderSearchPanel()}
                    {this._renderFooter()}
                </div>
            );
    }
    _renderEmbedLayout(){
        this.shouldUpdateSearchResultsHeight = true;
        return (
            <div key="main" className="main">
                {this._renderHeader()}
                {this._renderMap()}
                {this._renderSearchPanel()}
                {this._renderFooter()}
            </div>
        );
    }
    

    // -----------------------------------------------------------------------
    render(){
        const app = this.props.app;
        const mode = app.mode;
        if (mode === 'mobile') {
            return (
                <div key="main" ref="main" className="main-container mode-mobile">
                    {this._renderMobileLayout()}
                </div>
            );
        } else if (mode === 'tablet') {
            return (
                <div key="main" ref="main" className="main-container mode-tablet">
                    {this._renderTabletLayout()}
                </div>
            );
        } else if (mode === 'desktop') {
            return (
                <div key="main" ref="main" className="main-container mode-desktop">
                    {this._renderDesktopLayout()}
                </div>
            );
        } else {
            return (
                <div key="main" ref="main" className="main-container mode-embed">
                    {this._renderEmbedLayout()}
                </div>
            );
        }
    }
    
    _renderMap(){
        const windowSize = this.windowSize;
        const viewport = [[0, 0], [windowSize.height, windowSize.width * 3 / 4]];
        const app = this.props.app;
        if (app.panel !== undefined && app.mode === 'desktop') {
            viewport[0][1] += Math.round(viewport[1][1] * 1 / 3);
        }
        
        return (
        	<Map key="map" app={app} viewport={viewport} ref="map" />
        );
    }

    _renderHeader(){
        const options = this.props.layout || {};
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        {options.title}
                    </div>
                    {options.navigation}
                </div>
            </nav>
        );
    }
    
    _renderFooter(){
        const options = this.props.layout || {};
    	return (
            <div className="footer-container" ref="footer-container">
                {options.footer}
    		</div>
    	);
    }

    get windowSize(){
        var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
        var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
        return { height, width };
    }
    
}
