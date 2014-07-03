'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/info', {templateUrl: 'partials/splashScreen.html', controller: 'MyCtrl1'});
  $routeProvider.otherwise({redirectTo: '/info'});
  $httpProvider.defaults.useXDomain = true;                
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
