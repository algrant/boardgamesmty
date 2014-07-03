'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  factory('PlayerData', ['$http',function($http){
       return {
           get: function(callback){
                playerId = 'dae4';
                $http.get(
                    'http://www.boardgamegeek.com/xmlapi2/collection/' + playerId + '?own=1',
                    {transformResponse:function(data) {
                      // convert the data to JSON and provide
                      // it to the success function below
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        return json;
                        },
                        withCredentials: true
                    }
                ).
                success(function(data, status) {
                    // send the converted data back
                    // to the callback function
                    callback(data);
                })
           }
       }
    }]);
