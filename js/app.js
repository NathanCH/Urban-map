(function($){
    'use strict';

    function Urbn() {
        this.config = new app.Config();
        this.controller = new app.Controller();
        this.dropdown = new component.Dropdown();
    }

    $(document).ready(function(){
        new Urbn();
    });

})(jQuery);