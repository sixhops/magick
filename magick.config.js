angular.
  module('magickApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {

      console.log("in the config");


      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<p><card-list></card-list></p>'
        }).
        when('/:cardId', {
          template: 'slash and card id'
        }).
        otherwise('/');
    }
  ]);