(function(window, $){
    'use strict';

    function  Controller() {
        this.map = new component.Map();
        this.bindEvents();
    }

    Controller.prototype.bindEvents = function() {
        var self = this;

        $('[data-event="map-new"]').on('click', function(e) {
            self.newMap();
        });

        $('[data-event="map-delete"]').on('click', function() {
            self.deleteMap();
        });
    }

    Controller.prototype.newMap = function() {
        var self = this;
        self.map.create({
            center: [49.27, -123.12],
            zoom: 12
        });

        self.getData(function(data){
            self.map.plot(data.osm, true);
        });
    }

    Controller.prototype.deleteMap = function() {
        this.map.delete();
    }

    Controller.prototype.getData = function(callback) {
        $.getJSON('js/data/mock-tunnel-results.json', callback);
    }

    window.app = window.app || {};
    window.app.Controller = Controller;
})(window, jQuery);