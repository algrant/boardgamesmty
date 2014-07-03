'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', '$http', 'PlayerData', function($scope, $http, PlayerData) {

    $scope.players = [  {name:"Caro", id:"dae4", selected:true}, 
                        {name:"Alejandro", id:"Spump", selected:true}, 
                        {name:"Julio", id:"jrescan", selected:true}, 
                        {name:"Rodrigo", id:"Akaitora", selected:true}, 
                        {name:"Talamantes", id:"talas", selected:true}, 
                        {name:"Carlos", id:"carloswar", selected:true}, 
                        {name:"Humberto", id:"humbertogzz", selected:true}, 
                        {name:"Karlo", id:"belaqcua", selected:true}, 
                        {name:"Rene Flores", id:"InvasorOdin", selected:true}  ]

    $scope.selectedPlayers = function(){
      var selectedPlayers = [];
      angular.forEach($scope.players, function(player, index){
        if (player.selected){
          selectedPlayers.push(player.name) ;
        }
      })
      return selectedPlayers;
    }

    $scope.games = {}

    $scope.sortorder = 'posRank';

    $scope.getGames = function(){
      var tempArray = [];
      angular.forEach($scope.games, function(game, gameName){
        tempArray.push(game);
      })
      return tempArray
    }

    $scope.gameStats = function(){
      var gam = 0;
      var exp = 0;
      angular.forEach($scope.games, function(game, gameName){
        if(game.isExpansion){
          exp += 1;
        }else{
          gam += 1;
        }
        
      })      
      return "Games: " + gam + ", Expansions: " + exp;
    }

    var addGame = function(player, games) {
        for (var j = 0; j < games.length; j++){
              if (games[j].owned){
                if (games[j].name in $scope.games){
                 $scope.games[games[j].name].owners.push(player)
              }else{
                 games[j].owners = [player];
                 games[j].posRank = games[j].rank > 0 ? games[j].rank : 1000000;

                 $scope.games[games[j].name] = games[j];
              }            
            }
        }

    }

    angular.forEach($scope.players, function(player, name){
        (function( id, name ) {
            $http.get('http://bgg-json.azurewebsites.net/collection/' + id).success(
              function(data){
                addGame(name, data); }
              );
          })( player.id, player.name );
    })

    $scope.gamesStats = function(){
      var totalGames = 0, totalExpansions = 0;
      angularjs.forEach($scope.games,function(game,name){
        if (game.isExpansion){
          totalExpansions += 1;
        }else{
          totalGames +=1;
        }
      })
      console.log("Games " + totalGames + ", Expansions " + totalExpansions);
      return "Games " + totalGames + ", Expansions " + totalExpansions;
    }

  }])
