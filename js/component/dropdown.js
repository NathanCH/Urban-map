(function(window, $){
    'use strict';

    function Dropdown() {
        this.toggle = '.dropdown';
        this.menu = '.dropdown-menu';

        this.bindEvents();
    }

    Dropdown.prototype.bindEvents = function() {
        var self = this;

        $(self.toggle).on('click', function(e){
            $(this).find(self.menu).toggle();
            return false;
        });

        $(self.menu).on('click', function(e){
            e.stopPropagation();
        });

        $(document).on('click', function(){
            $(self.menu).hide();
        });
        $(window).on('resize', function(){
            $(self.menu).hide();
        });
    }

    window.component = window.component || {};
    window.component.Dropdown = Dropdown;
})(window, jQuery);