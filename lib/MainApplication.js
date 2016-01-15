import isMobile from 'ismobilejs';
import { Application } from 'mosaic-app-core';
import { AppModel } from 'mosaic-dataset-facets';
import DataLoader from './DataLoader';
import MainLabels from './MainLabels';
import AppScreen from './ui/AppScreen';
import indexingProgressListener from './ui/indexingProgressListener';

export default class MainApplication extends Application {
    constructor(options){
        options = options || {};
        options.stateFields = ['theme', 'mode', 'locale'];
        super(options);
        this.loader = new DataLoader();
        this._updateScreenMode = this._updateScreenMode.bind(this);
        this._onStateUpdate = this._onStateUpdate.bind(this);
    }
    get defaultState(){
        return this.messages.defaultState;
    }
    get messages(){
        return this.getMessages('MainLabels', MainLabels);
    }
    _loadConfig(){
        if (!this._configPromise){
            const configPath = this.options.configPath || './config.json';
            this._configPromise = this.loader.load(configPath);
        }
        return this._configPromise;
    }
    _newModel(){
        const that = this;
        const criteria = this.options.criteria || [];
        const searchCriteriaTypes = [];
        criteria.forEach(function(c){
            if (c.type) {
                searchCriteriaTypes.push(c.type);
            }
        });
        const options = {
            adapters : that.adapters,
            searchCriteriaTypes,
            // Definition of the type for the text search criteria;
            // It is used by the AppModel
            maxSuggestResults : 10,
        };
        options.TextSearchCriteria = this.options.TextSearchCriteria;
        that.model = new AppModel(options);
        that.addListener('state', function(intent){
            intent.then(function(){
                return that.model.deserializeSearchCriteria(that.state)
                .then(function(){
                    return that.model.deserializeOpenItems(that.state.id);
                });
            });
        });
        
        that.model.searchCriteria.addListener('update', function(intent){
            intent.then(function(){
                const serialized = that.model.serializeSearchCriteria();
                let changed = false;
                const state = that.state;
                Object.keys(serialized).forEach(function(key){
                    if (JSON.stringify(state[key]) !== JSON.stringify(serialized[key])){
                        changed = true;
                    }
                });
                if (changed) {
                    that.setState(serialized);
                }
            });
        });
        that.model.openItems.addListener('update', function(intent){
            intent.then(function(){
                const itemIds = that.model.serializeOpenItems();
                if (!equal(itemIds, that.state.id)) {
                    that.setState({id : itemIds});
                }
            });
        });
        that.model.searchIndex.addListener('indexing', indexingProgressListener(that.messages.loading));
        return that.model;
    }
    _initModel(){
        const that = this;
        return that._loadConfig() //
        .then(function(config) {
            const promises = [];
            const keys = [];
            const criteria = that.options.criteria || [];
            criteria.forEach(function(c){
                const key = c.key;
                const path = config[key];
                if (!!path) {
                    keys.push(key);
                    promises.push(that.loader.load(path));
                }
            });
            return Promise.all(promises).then(function(results){
                const options = {};
                keys.forEach(function(key, pos){
                    options[key] = results[pos];
                });
                that.model = that._newModel();
                return that.model.open(options);
            });
        });
    }
    
    start(){
        const that = this;
        return Promise.resolve().then(function(){
            return that._initModel();
        }).then(function(){
            const options = { ...that.options.screen, app: that };
            const screen = new AppScreen(options);
            that.registerModule('*localPath', screen);
            return that.setState(that.defaultState);
        }).then(function(){
            window.addEventListener('resize', that._updateScreenMode, that);
            that.addListener('state', that._onStateUpdate);
            that._updateScreenMode();
        });
    }
    stop(){
        const that = this;
        window.removeEventListener('resize', that._updateScreenMode);
        that.removeListener('state', that._onStateUpdate);
    }
    
    _updateScreenMode(){
        const that = this;
        const messages = that.messages;
        let mode = that.defaultState.mode || 'desktop';
        if (isMobile.tablet) {
            mode = 'tablet';
        } else if (isMobile.phone) {
            mode = 'tablet';
        } else {
            const size = that.windowSize;
            if (size.width <= messages.screenModes.mobileWidth) {
                mode = 'mobile';
            } else if (size.width <= messages.screenModes.tabletWidth) {
                mode = 'tablet';
            }
        }
        return that.setState({ mode });
    }

    get windowSize(){
        var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
        var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
        return {height, width};
    }

    _onStateUpdate(intent){
        const that = this;
        intent.then(function(){
            
        });
    }

}

function equal(a, b){
    if (!a || !b) return a == b;
    return JSON.stringify(normalize(a)) === JSON.stringify(normalize(b));
}

function normalize(val){
    if (!val) return;
    if (!Array.isArray(val)) { val = [val]; }
    return val;
}



