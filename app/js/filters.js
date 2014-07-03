'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('companyFilter', [function () {
    return function (clients, selectedCompany) {
        if (!angular.isUndefined(clients) && !angular.isUndefined(selectedCompany) && selectedCompany.length > 0) {
            var tempClients = [];
            angular.forEach(selectedCompany, function (id) {
                angular.forEach(clients, function (client) {
                    if (angular.equals(client.company.id, id)) {
                        tempClients.push(client);
                    }
                });
            });
            return tempClients;
        } else {
            return clients;
        }
    };
}]).
  filter('playerFilter', [function () {
    return function (games, players) {
      var tempGames = [];
      angular.forEach(games, function(value,gameName){
        var notadded = true;
        angular.forEach(players, function(player, index){

          if ( notadded && player.selected ){
            if (value.owners.indexOf(player.name) > -1){
              tempGames.push(value)
              notadded = false;
            }         
          }
        })
      })

      return tempGames
    };
}]).
  filter('medImage', function() {
    return function(image) {
      return String(image).replace('.jpg', '_md.jpg');
    };
  }).
  filter('ownedFilter', [function () {
    return function (owners, players) {
      var tempOwners = [];
      angular.forEach(owners, function(name, index){
        angular.forEach(players, function(player, index){
          if(player.name == name && player.selected){
            tempOwners.push(name);
          }
        })
      })
      
      return tempOwners
    };
}]);

