angular.
  module('magickApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {

      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<card-list></card-list>'
        }).
        when('/cards/:id', {
          template: '<card-detail></card-detail>'
        }).
        otherwise('/');
    }
  ]);