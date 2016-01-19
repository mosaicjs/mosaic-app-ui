import React from 'react';
import { Data, DataSet } from 'mosaic-dataset';
import { MapView, TilesInfo, registerAdapters } from 'mosaic-ui-map';
import 'mosaic-ui-map/styles';
 
export default class Map extends React.Component {
    constructor(...params){
        super(...params);
        this.model = this.props.app.model;
        const adapters = this.props.app.adapters;

        // TODO: externalize it
        this._layers = new DataSet({
            adapters
        });
        this._updateTiles({
            tilesUrl : this.props.tilesUrl || 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        });
        registerAdapters(adapters);
        
        this._onMapMove = MapView.debounce(this._onMapMove.bind(this), 50);
        this._onStateUpdate = MapView.debounce(this._onStateUpdate.bind(this), 50); 
        this._onMapBackgroundChange = this._onMapBackgroundChange.bind(this);
        
        this._mapView = new MapView({
            className : 'map',
            selectedItems : this.model.openItems,
            dataSet : this._layers,
            maxZoom: 18,
            onMoveEnd : this._onMapMove
        });
    }
    componentDidMount(){
        const app = this.props.app;
        app.addListener('state', this._onStateUpdate);
        app.addListener('change-map-background', this._onMapBackgroundChange);
    }
    componentWillUnmount(){
        const app = this.props.app;
        app.removeListener('state', this._onStateUpdate);
        app.removeListener('change-map-background', this._onMapBackgroundChange);
    }
    
    _updateTiles(options){
        var layers = [];
        const tilesUrl = options.tilesUrl;
        if (tilesUrl){
            const adapters = this.props.app.adapters;
            const tiles = new TilesInfo({
                adapters,
                data : {
                    properties : { tilesUrl }
                }
            });
            layers.push(tiles);
        }
        layers.push(this.model.searchIndex);
        this._layers.items = layers;
    }
    
    render(){
        let viewportInfo;
        if (this.props.viewport) {
            viewportInfo = {
                topLeft : this.props.viewport[0],
                bottomRight : this.props.viewport[1],
                focusPosition : []
            };
        }
        const mapParams = {
            key : (this.props.key || 'map'),
            viewportInfo,
        };
        const app = this.props.app;
        const mapState = app.state.map || { center : [0, 0] };
// if (mapState.updateId !== this._updateId) {
            mapParams.center = mapState.center;
            mapParams.zoom = mapState.zoom;
// }
        const map = this._mapView.renderView(mapParams);
        return map;
    }
    
    _onMapBackgroundChange(intent){
        intent.resolve(this._updateTiles(intent.params));
    }
    _onStateUpdate(intent) {
        const that = this;
        const app = that.props.app;
        intent.then(function(){
            if (app.state.map.updateId !== that._updateId) {
            }
        });
    }
    _onMapMove(ev) {
        return ;
        
        const app = this.props.app;
        const zoom = ev.zoom;
        let center = (ev.center ? [ev.center.lng, ev.center.lat] : [0, 0]); 
        center = center.map(function(val){
            val = Number(val).toFixed(5);
            return Number.parseFloat(val);
        });
        this._updateId = (this._updateId || 0) + 1; 
        app.setState({
            map : {
                updateId : this._updateId,
                zoom,
                center
            }
        });
    }
    
}

