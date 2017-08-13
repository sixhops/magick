angular.module('cardList')
  .component('cardList', {
    templateUrl: 'card-list/card-list.template.html',
    controller: ['$http', function($http) {

      var self = this;
      self.orderProp = 'name';

      // Get set names to populate the select options box
      self.availableSets = [];
      self.selectedSet = ""; // this should be the code, not the full name
      self.currentDeck = null;

      self.setCardId = function(cardId) {
        self.cardId = cardId;
        console.log(self.cardId);
        self.onCardChange({$event: {cardId: cardId}});
      };

      var setReq = {
        url: 'https://api.magicthegathering.io/v1/sets',
        method: 'GET'
      };
      $http(setReq).then(function success(res) {
        self.availableSets = res.data.sets.filter(function(s) {
          // Exclude type: "promo"
          return s.type != "promo";
        });
      });
      
      // On combo box change, get cards in selected set
      this.changeSelectedSet = function() {
        var cardReq = {
          url: 'https://api.magicthegathering.io/v1/cards?set=' + self.selectedSet,
          method: 'GET'
        };
        $http(cardReq).then(function success(res) {
          self.currentDeck = res.data.cards;
          self.setCardId(res.data.cards[0].id);
        });
      };
    }],
    bindings: {
      cardId: '<',
      onCardChange: '&'
    }
  });