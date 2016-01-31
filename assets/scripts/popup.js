var Popup = function() {
    'use strict';

    var _monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

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
        
        ko.applyBindings( new VideoModel(), document.getElementById( 'video-player' ) );
    };

    var handleCommentSection = function() {
        function Comment( data ) {
            this.image = data.image;
            this.name = data.name;
            this.date = data.date;
            this.description = data.desc;
        }

        function CommentModel() {
            var self = this;
            self.reply = ko.observable("");
            self.comments = ko.observableArray([]);

            // Init a single comment
            self.comments([
                new Comment({
                    image: 'assets/img/user.png',
                    name: 'Stoyan Daskaloff',
                    date: 'March 7, 2013 AT 7:30 PM',
                    desc: 'Sed quis diam egestas, egtestas mauris in, dapibus eros. Duis nisi nulla, accumsan eu libero sit amet, faucibus ornare nisi. Phasellus cursus dolor ante, at placerat est tincidunt vel. In ullamcorper pulvinar est id congue. Pellentesque scelerisque ante vel justo varius, non aliquet est eleifend. Aliquam erat volutpat. Curabitur blandit, lorem eget tincidunt scelerisque, mauris felis pellentesque dolor, et adipiscing nisi ipsum eget est.'
                }),
            ]);

            self.addComment = function() {
                if ( self.reply() !== '' ) {
                    var today = new Date(),
                        formatedDate = today.getDay() + ' ' +
                                       _monthNames[ today.getMonth() ] + ', ' +
                                       today.getFullYear() + ' at ' +
                                       today.getHours() + ':' +
                                       today.getMinutes();

                    self.comments.push(
                        new Comment({
                            image: 'http://placehold.it/75x75',
                            name: 'Anonymous',
                            date: formatedDate,
                            desc: self.reply()
                        })
                    );

                    self.reply('');
                };
            };
        };

        ko.applyBindings( new CommentModel(), document.getElementById( 'comment-section' ) );
    };

    /**
     * Get url for iframe embed
     * @param   String  normalURL  Full youtube video URL
     * @return  String             Returns formatted URL.
     *                             If normalURL is not youtube link
     *                             will return just the normalURL.
     */
    var getEmbeddedURL = function( normalURL ) {
        var videoId = getParameterFromStringByName( normalURL, 'v' ),
            normalURL = 'https://www.youtube.com/embed/';

        return videoId ? normalURL + videoId : videoId;
    };

    /**
     * Find parameter from url string
     * @param   String  str   URL-like string
     * @param   String  name  Query var from the URL-like string
     * @return  String        The value from the query var. Empty string if not found
     */
    var getParameterFromStringByName = function( str, name ) {
        name = name.replace( /[\[]/, "\\[" ).replace( /[\]]/, "\\]" );
        var regex = new RegExp( "[\\?&]" + name + "=([^&#]*)" ),
            results = regex.exec( str );
        return results === null ? "" : decodeURIComponent( results[1].replace( /\+/g, " " ) );
    };

    return {

        /** kickstart the page */
        init: function() {
            // initialize video bind and embed
            handleVideoEmbed();

            // initialize comment template section
            handleCommentSection();
        },

        /** public functions and helper methods */
    };
}();
