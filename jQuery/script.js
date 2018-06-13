'use strict';

(function($){
    $(function(){
        $('.tab').on('click', function(event){
            var tab = $(event.target);
            var text = tab.next();
            if (!tab.hasClass('active')) {
                $('.active').removeClass('active');
                $('.visible').removeClass('visible');
                tab.addClass('active');
                text.addClass('visible');
            }
        });
    });
})(jQuery);
