// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        var region = null;

        var delegate = new cordova.plugins.locationManager.Delegate();

        var dfd = $.Deferred();

        delegate.didDetermineStateForRegion = function (pluginResult) {
            console.log('state: ' + pluginResult);

            cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                + JSON.stringify(pluginResult));
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
            console.log('didStartMonitoringForRegion:', pluginResult);
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            console.log('range: ' + pluginResult);
        };

        cordova.plugins.locationManager.setDelegate(delegate);

        cordova.plugins.locationManager.requestWhenInUseAuthorization(); 

        dfd.done(function(foo,bar,zoo){
            console.log('1',foo);
            console.log('2',bar);
            console.log('3',zoo);

        }
            // function(response)
            // {
            //     region = new cordova.plugins.locationManager.BeaconRegion('test region', response, null, null);
                
            //     cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
            //     cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            //         .fail(console.error)
            //         .done();
            // }
        );

        dfd.resolve(getUuid());
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function getUuid()
    {
        var form = new FormData();
        form.append("key", "P8990)#a9kDFoa33F3");
        form.append("secret", "modo");
        form.append("lat", "36.121373");
        form.append("lon", "-115.169696");

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://services.sbx.getmo.do/beacon_service/index.php?r=beacon_v1%2Fquery_zone",
          "method": "POST",
          "headers": {
            "cache-control": "no-cache",
            "postman-token": "df2d4917-ef48-950b-4e8e-be0519c251a3"
          },
          "processData": false,
          "contentType": false,
          "mimeType": "multipart/form-data",
          "data": form
        }

        $.ajax(settings).done(function (response) {
            console.log(response);

            this.largeResponse = JSON.parse(response);
            var zone = this.largeResponse.zones[0];

            console.log(zone.zone_proximity_uuid);

            var prox = zone.zone_proximity_uuid;

            var uuid = prox.substring(0,8) + '-' + prox.substring(8,12) + '-' + prox.substring(12,16) + '-' +
    prox.substring(16,20) + '-' + prox.substring(20,32);

            var region = new cordova.plugins.locationManager.BeaconRegion('test region', uuid);

            cordova.plugins.locationManager.startMonitoringForRegion(region)
                .fail(console.error)
                .done();
        });
    }
} )();