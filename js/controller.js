(function(window, $){
    'use strict';

    function  Controller() {
        this.map = new component.Map();
        this.bindEvents();
    }

    Controller.prototype.bindEvents = function() {
        var self = this;

        $('[data-event="map-create"]').on('click', function(e) {
            self.createMap();
        });

        $('[data-event="map-delete"]').on('click', function() {
            self.deleteMap();
        });

        $('[data-event="map-plot"]').on('click', function() {
            var src = $(this).data('src');
            self.plotData(src);
        });

        $('[data-event="map-toggle"]').on('click', function() {
            var type = $(this).data('type');
            self.toggleDisplay(type);
        });
    }

    Controller.prototype.toggleDisplay = function(type){
        console.log(type);
    }

    Controller.prototype.plotData = function(src) {
        var self = this;
        self.getData(src, function(data){
            self.map.plot(data, 'osm');
        });
    }

    Controller.prototype.createMap = function() {
        var self = this;
        self.map.create({
            center: [49.6, -122.3],
            zoom: 8
        });
    }

    Controller.prototype.deleteMap = function() {
        this.map.delete();
    }

    Controller.prototype.getData = function(data, callback) {
        $.getJSON('js/data/'+data, callback);
    }

    window.app = window.app || {};
    window.app.Controller = Controller;
})(window, jQuery);