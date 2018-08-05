function MtInitMap() {
    "use strict";
    jQuery('.mt-map').each(function(){
        "use strict";
        var mtMap = jQuery(this);
        var mapId = mtMap.attr('id');
        var mapZoom = mtMap.data('zoom');
        var address = mtMap.data('address');
        var point = mtMap.data('point');
        var centerLatLng = null;
        var mapOptions = {
            scrollwheel: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: true,
            disableDefaultUI: true,
            center: centerLatLng,
            zoom: mapZoom,
            backgroundColor: "#282f39",
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            // light
            // styles: [{ "featureType": "administrative", "elementType": "geometry", "stylers": [{ "saturation": "2"}, { "visibility": "simplified"}]}, { "featureType": "administrative", "elementType": "labels", "stylers": [{ "saturation": "-28"}, { "lightness": "-10"}, { "visibility": "on"}]}, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444"}]}, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2"}]}, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "saturation": "-1"}, { "lightness": "-12"}]}, { "featureType": "landscape.natural", "elementType": "labels.text", "stylers": [{ "lightness": "-31"}]}, { "featureType": "landscape.natural", "elementType": "labels.text.fill", "stylers": [{ "lightness": "-74"}]}, { "featureType": "landscape.natural", "elementType": "labels.text.stroke", "stylers": [{ "lightness": "65"}]}, { "featureType": "landscape.natural.landcover", "elementType": "geometry", "stylers": [{ "lightness": "-15"}]}, { "featureType": "landscape.natural.landcover", "elementType": "geometry.fill", "stylers": [{ "lightness": "0"}]}, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off"}]}, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100}, { "lightness": 45}]}, { "featureType": "road", "elementType": "geometry", "stylers": [{ "visibility": "on"}, { "saturation": "0"}, { "lightness": "-9"}]}, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "lightness": "-14"}]}, { "featureType": "road", "elementType": "labels", "stylers": [{ "lightness": "-35"}, { "gamma": "1"}, { "weight": "1.39"}]}, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "lightness": "-19"}]}, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "lightness": "46"}]}, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified"}]}, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "lightness": "-13"}, { "weight": "1.23"}, { "invert_lightness": true}, { "visibility": "simplified"}, { "hue": "#ff0000"}]}, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off"}]}, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off"}]}, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#adadad"}, { "visibility": "on"}]}]

            // https://snazzymaps.com/style/119/mapbox-clean
            //styles: [{ "featureType": "water", "stylers": [{ "saturation": 43}, { "lightness": -11}, { "hue": "#0088ff"}]}, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000"}, { "saturation": -100}, { "lightness": 99}]}, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080"}, { "lightness": 54}]}, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9"}]}, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1"}]}, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676"}]}, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff"}]}, { "featureType": "poi", "stylers": [{ "visibility": "on"}]}, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on"}, { "color": "#EBE5E0"}]}, { "featureType": "poi.park", "stylers": [{ "visibility": "on"}]}, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on"}]}]

            // https://snazzymaps.com/style/4183/mostly-grayscale
            //styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on"}, { "lightness": 33}]}, { "featureType": "administrative", "elementType": "labels", "stylers": [{ "saturation": "-100"}]}, { "featureType": "administrative", "elementType": "labels.text", "stylers": [{ "gamma": "0.75"}]}, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "lightness": "-37"}]}, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f9f9f9"}]}, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "saturation": "-100"}, { "lightness": "40"}, { "visibility": "off"}]}, { "featureType": "landscape.natural", "elementType": "labels.text.fill", "stylers": [{ "saturation": "-100"}, { "lightness": "-37"}]}, { "featureType": "landscape.natural", "elementType": "labels.text.stroke", "stylers": [{ "saturation": "-100"}, { "lightness": "100"}, { "weight": "2"}]}, { "featureType": "landscape.natural", "elementType": "labels.icon", "stylers": [{ "saturation": "-100"}]}, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "saturation": "-100"}, { "lightness": "80"}]}, { "featureType": "poi", "elementType": "labels", "stylers": [{ "saturation": "-100"}, { "lightness": "0"}]}, { "featureType": "poi.attraction", "elementType": "geometry", "stylers": [{ "lightness": "-4"}, { "saturation": "-100"}]}, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#c5dac6"}, { "visibility": "on"}, { "saturation": "-95"}, { "lightness": "62"}]}, { "featureType": "poi.park", "elementType": "labels", "stylers": [{ "visibility": "on"}, { "lightness": 20}]}, { "featureType": "road", "elementType": "all", "stylers": [{ "lightness": 20}]}, { "featureType": "road", "elementType": "labels", "stylers": [{ "saturation": "-100"}, { "gamma": "1.00"}]}, { "featureType": "road", "elementType": "labels.text", "stylers": [{ "gamma": "0.50"}]}, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "saturation": "-100"}, { "gamma": "0.50"}]}, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#c5c6c6"}, { "saturation": "-100"}]}, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "lightness": "-13"}]}, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "lightness": "0"}, { "gamma": "1.09"}]}, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#e4d7c6"}, { "saturation": "-100"}, { "lightness": "47"}]}, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "lightness": "-12"}]}, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "saturation": "-100"}]}, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#fbfaf7"}, { "lightness": "77"}]}, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "lightness": "-5"}, { "saturation": "-100"}]}, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "saturation": "-100"}, { "lightness": "-15"}]}, { "featureType": "transit.station.airport", "elementType": "geometry", "stylers": [{ "lightness": "47"}, { "saturation": "-100"}]}, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on"}, { "color": "#acbcc9"}]}, { "featureType": "water", "elementType": "geometry", "stylers": [{ "saturation": "53"}]}, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "lightness": "-42"}, { "saturation": "17"}]}, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "lightness": "61"}]}]

            // https://snazzymaps.com/style/83/muted-blue
            styles: [{ "featureType": "all", "stylers": [{ "saturation": 0}, { "hue": "#e7ecf0"}]}, { "featureType": "road", "stylers": [{ "saturation": -70}]}, { "featureType": "transit", "stylers": [{ "visibility": "off"}]}, { "featureType": "poi", "stylers": [{ "visibility": "off"}]}, { "featureType": "water", "stylers": [{ "visibility": "simplified"}, { "saturation": -60}]}]

            // dark
            //styles: [{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#222933"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#2d343e"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#2d343e"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#282f39"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#2d343e"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#2d343e"}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#ff0000"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#222933"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#222933"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#222933"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#5f6670"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#222933"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#5f6670"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#222933"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#5f6670"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#252c36"}]}]
        };
        var geocoder = new google.maps.Geocoder();
        var map = new google.maps.Map(document.getElementById(mapId), mapOptions);

        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        map.setCenter(results[0].geometry.location);

                        var infowindow = new google.maps.InfoWindow({
                            content: '' + address + '',
                            size: new google.maps.Size(150, 50)
                        });

                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: address,
                            icon: point
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });

                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
    });
}