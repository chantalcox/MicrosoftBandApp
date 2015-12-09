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
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              
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