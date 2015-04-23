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

    Map.prototype.plot = function(data, type) {
        var type = type || false;
        var data = data;

        if(type && type === 'osm') {
            var data = this._toGeoJson(data);
        }

        L.geoJson(data, this.geoJsonSettings).addTo(this.map);
    }

    // Todo: set through callback.
    Map.prototype.geoJsonSettings = {
        style: function(feature) {
            switch(feature.properties.tags.building) {
                case 'residential': return { color: '#35d90e' };
                case 'commercial':  return { color: '#3288d1' };
                case 'apartments':  return { color: '#d21f1f' };
            }
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup('Type: '+feature.properties.tags.building);
        },
        filter: function(feature, layer) {
            return feature.properties.tags.building;
        }
    }
    window.component = window.component || {};
    window.component.Map = Map;
})(window, jQuery, L);