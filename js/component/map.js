(function(window, $, L){
    'use strict';

    function Map(config) {
        this.map;
        this.layerSource = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }

    Map.prototype.create = function(config){
        var layer = this._newLayer();
        var config = config || {
            center: [0, 0],
            zoom: 3
        };

        this.map = this._newMap();
        this.map.setView(config.center, config.zoom);
        this.map.addLayer(layer);
    }

    Map.prototype.delete = function() {
        if(typeof this.map !== 'undefined') {
            this.map.remove();
            this.map = undefined;
        }
    }

    Map.prototype.render = function(data) {
        L.geoJson(data).addTo(this.map);
    }

    Map.prototype._newMap = function(id) {
        var id = id || 'map';
        return this.map || new L.map(id);
    }

    Map.prototype._newLayer = function() {
        return new L.TileLayer(this.layerSource);
    }

    window.component = window.component || {};
    window.component.Map = Map;
})(window, jQuery, L);