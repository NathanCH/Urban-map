(function(window, $, L){
    'use strict';

    function Map(config) {
        this.map;
        this.layerSource = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        this.defaultConfig = {
            center: [0, 0],
            zoom: 3
        };
    }

    Map.prototype._newMap = function(id) {
        var id = id || 'map';
        return this.map || new L.map(id);
    }

    Map.prototype._newLayer = function() {
        return new L.TileLayer(this.layerSource);
    }

    Map.prototype._toGeoJson = function(osmData) {
        return osmtogeojson(osmData);
    }

    Map.prototype.create = function(config){
        var layer = this._newLayer();
        var config = config || this.defaultConfig;

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

    Map.prototype.plot = function(data, osm) {
        var osm = osm || false;
        var data = data;

        if(osm) {
            var data = this._toGeoJson(data);
        }

        L.geoJson(data).addTo(this.map);
    }

    window.component = window.component || {};
    window.component.Map = Map;
})(window, jQuery, L);