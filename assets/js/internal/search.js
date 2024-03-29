/*
 * http://jekyll.tips/tutorials/search/
 */
jQuery(function() {
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    window.idx = lunr(function() {
        this.field('id');
        this.field('title', {
            boost: 10
        });
        this.field('author');
        this.field('category');
    });

    // Download the data from the JSON file we generated
    window.data = jQuery.getJSON('/search_data.json');

    // Wait for the data to load and add it to lunr
    window.data.then(function(loaded_data) {
        jQuery.each(loaded_data, function(index, value) {
            window.idx.add(
                jQuery.extend({
                    "id": index
                }, value)
            );
        });
    });

    // Event when the form is submitted
    jQuery("#site_search").submit(function(event) {
        event.preventDefault();
        var query = jQuery("#search_box").val(); // Get the value for the text field
        var results = window.idx.search(query); // Get lunr to perform a search
        display_search_results(results); // Hand the results off to be displayed

        jQuery('.ui.modal').modal('show'); // FIX: CEREBRUM
    });

    function display_search_results(results) {
        var search_results = jQuery("#search_results");

        // Wait for data to load
        window.data.then(function(loaded_data) {

            // Are there any results?
            if (results.length) {
                search_results.empty(); // Clear any old results

                // Iterate over the results
                results.forEach(function(result) {
                    var item = loaded_data[result.ref];

                    // Build a snippet of HTML for this result
                    var appendString = '<li><a href="' + item.url + '">' + item.title + '</a></li>';

                    // Add it to the results
                    search_results.append(appendString);
                });
            } else {
                search_results.html('<li>Nenhum resultado encontrado</li>');
            }
        });
    }
});
