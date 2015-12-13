var poly;

var cities = [
              {
                  city : 'City: Ittoqqortoormiit',
                  desc : 'Beginning of the expedition of Microsoft',
                  lat : 70.20,
                  long :  -23
              },
               {
                  city : 'City: Kangerlussuaq',
                  desc : 'End of the expedition of Microsoft',
                  lat : 67,
                  long :  -50.8
              },

              {
                  city : 'City: Kangerlussuaq',
                  desc : 'End of the expedition of Microsoft',
                  lat : 60,
                  long :  -45.8
              }
              
          ];


          //Angular App Module and Controller
          var sampleApp = angular.module('mapsApp', []);
          sampleApp.controller('MapCtrl', function ($scope) {
          //We center the map in Greenland
              var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(69,-26),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              };

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
               poly = new google.maps.Polyline(polyOptions);
                poly.setMap(map);
              $scope.markers = [];
              var path = poly.getPath();
     
              var latlngbounds = new google.maps.LatLngBounds( );
              
              var infoWindow = new google.maps.InfoWindow();

              for ( var i = 0; i < PitStops.length; i++ ) {
            new google.maps.Marker( {
                position: cities[ i ].latlng,
                map: map,
                title: cities[ i ].name
            } );

            path.push(PitStops[ i ].latlng);
            latlngbounds.extend( PitStops[ i ].latlng );
        }


        map.fitBounds( latlngbounds );

    }

    google.maps.event.addDomListener( window, 'load', initialize );

              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.city
                  });
                  marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
              
              for (i = 0; i < cities.length; i++){
                  createMarker(cities[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }



          });