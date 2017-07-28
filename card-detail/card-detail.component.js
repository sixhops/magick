angular.module('cardDetail')
  .component('cardDetail', {
    templateUrl: 'card-detail/card-detail.template.html',
    controller: ['$http', '$routeParams', function($http, $routeParams) {
      var self = this;
      self.cardId = $routeParams.id;


      var cardReq = {
        url: 'https://api.magicthegathering.io/v1/cards/' + self.cardId,
        method: 'GET'
      };
      $http(cardReq).then(function success(res) {
        self.card = res.data.card;
      });

    }]
  });