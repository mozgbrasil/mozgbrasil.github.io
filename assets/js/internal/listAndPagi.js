jQuery('document').ready(function() {
    generatePagi();

    jQuery('#filterList li').click(function(e) {
        var show = jQuery(this).data('show');

        jQuery('.showcase:visible')
            .removeClass('current')
            .addClass('hide');
        jQuery('.showcase').filter('[data-show=' + show + ']')
            .removeClass('hide')
            .addClass('current');

        jQuery('#filterList li.current').removeClass('current');
        jQuery('#filterList li[data-show=' + show + ']').addClass('current');

        generatePagi();

    });

    function generatePagi() {
        var dataSource = jQuery.makeArray(jQuery('.showcase.current article'));
        if(!dataSource.length) {
            return false;
        }

        jQuery('.showcase.current #paginator').pagination({
            dataSource: dataSource,
            pageSize: 7,
            callback: function(data, pagination) {
                jQuery(dataSource).hide();
                jQuery(data).show();
            }
        });

    }

});