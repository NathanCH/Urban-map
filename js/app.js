(function($){
    'use strict';

    function Urbn() {
        this.config = new app.Config();
        this.map = new app.Map(this.config);

        this.dropdown = new component.Dropdown();
    }

    $(document).ready(function(){
        new Urbn();
    });

})(jQuery);