(function(window, $){
    'use strict';

    function Map(config) {
        this.map;
        this.subscribe();
        this.layerSoure = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        $('[data-event="map-create"]').on('click', function() {
            $.publish('map.create');
        });

        $('[data-event="map-destroy"]').on('click', function() {
            $.publish('map.destroy');
        });
    }

    Map.prototype.subscribe = function() {
        $.subscribe('map.create', this.createMap);
        $.subscribe('map.destroy', this.destroyMap);
    }

    Map.prototype.createMap = function(self) {
        console.log(self);
        if(typeof this.map !== "undefined") {
            $.publish('map.destroy');
        }
        this.map = new L.Map('map');
        this.setLayer();
    }

    Map.prototype.destroyMap = function() {
        this.map.remove();
        this.map = undefined;
    }

    Map.prototype.setLayer = function() {
        var osmUrl = this.layerSoure;
        var osm = new L.TileLayer(osmUrl, {
            minZoom: 0,
            maxZoom: 20,
            maxNativeZoom: 18
        });

        this.map.setView(new L.LatLng(51.3, 0.7),9);
        this.map.addLayer(osm);
    }

    window.app = window.app || {};
    window.app.Map = Map;
})(window, jQuery);