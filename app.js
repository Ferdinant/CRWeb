Ext.Loader.setPath({  
	'Ext': 'sdk/src/',
    'CRWeb': 'app'
});
var baseUrlVar ='http://cr.xeago.eu';
var googleAjaxApiVar ='https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=';
var twitterUrlVar =(googleAjaxApiVar+'http://feeds.feedburner.com/IprojvTwitter');
var newsUrlVar =googleAjaxApiVar+baseUrlVar+'/category/feed/Website.aspx';

Ext.application({

    name: 'CRWeb',
	baseUrl: baseUrlVar, // 'http://cr.xeago.eu/',
	twitterUrl :twitterUrlVar, //'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=http://feeds.feedburner.com/IprojvTwitter'
	newsUrl : newsUrlVar, //https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=http://cr.xeago.eu/category/feed/Website.aspx
	
	controllers:['NewsController','Tweets','PlayerController'],
	
    requires: [
        'Ext.MessageBox','Ext.Audio','Ext.Img','Ext.Button'
		
    ],

    views: ['Main','News','Tweets','Home','SponsorPage','Player','RecentSongs', 'Info'],
	stores: ['Tweets','SponsorStore'],
	twitterSearch: 'Carnaval Radio',
	
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        //// Initialize the main view
		var mainPanel = Ext.create('CRWeb.view.Main');
		Ext.Viewport.add(mainPanel);
        
		
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
	
});
