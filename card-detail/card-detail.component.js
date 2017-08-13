angular.module('cardDetail')
  .component('cardDetail', {
    templateUrl: 'card-detail/card-detail.template.html',
    controller: ['$http', function($http) {
      var self = this;

      self.$onChanges = function(changes) {
        console.log("$onChanges fired");
        console.log(changes.cardId.currentValue);
        self.cardId = changes.cardId.currentValue;

        var cardReq = {
          url: 'https://api.magicthegathering.io/v1/cards/' + self.cardId,
          method: 'GET'
        };
        $http(cardReq).then(function success(res) {
          self.card = res.data.card;
        });
      };

    }],
    bindings: {
      cardId: '<'
    }
  });