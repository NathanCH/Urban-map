(function(window, $){
    'use strict';

    function Config() {
        this.appName = 'Urban';
        this.path = '/2015/urban-map/';
    }

    window.app = window.app || {};
    window.app.Config = Config;
})(window, jQuery);