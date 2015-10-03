var Popup = function() {

    var handleVideoEmbed = function() {
        function VideoModel() {
            this.normalURL = ko.observable();

            this.embeddedURL = ko.pureComputed({
                read: function () {
                    var urlParams = getEmbeddedURL( this.normalURL() );
                    return urlParams;
                },
                owner: this
            });
        }

        ko.applyBindings( new VideoModel() );
    };

    var getEmbeddedURL = function( normalURL ) {
        var videoId = getParameterFromStringByName( normalURL, 'v' ),
            normalURL = 'https://www.youtube.com/embed/';

        return videoId ? normalURL + videoId : videoId;
    };

    var getParameterFromStringByName = function( str, name ) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(str);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    return {

        /** kickstart the page */
        init: function() {
            // initialize video bind and embed
            handleVideoEmbed();
        },

        /** public functions and helper methods */
    };
}();
