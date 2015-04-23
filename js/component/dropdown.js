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
            var $thisMenu = $(this).find(self.menu);
            $(self.menu).not($thisMenu).hide();
            $thisMenu.toggle();
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