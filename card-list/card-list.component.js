angular.module('cardList')
  .component('cardList', {
    templateUrl: 'card-list/card-list.template.html',
    controller: ['$http', function($http) {

      console.log("in the card-list ctrl");

      var self = this;
      self.orderBy = 'name';
      

      // Get set names to populate the select options box
      self.availableSets = [];
      self.selectedSet = ""; // this should be the code, not the full name
      self.currentDeck = null;

      var setReq = {
        url: 'https://api.magicthegathering.io/v1/sets',
        method: 'GET'
      };
      $http(setReq).then(function success(res) {
        self.availableSets = res.data.sets.filter(function(s) {
          // Exclude type: "promo"
          return s.type != "promo";
        });
        console.log("in the card-list ctrl");
      });
      
      // On combo box change, get cards in selected set
      this.changeSelectedSet = function() {
        var cardReq = {
          url: 'https://api.magicthegathering.io/v1/cards?set=' + self.selectedSet,
          method: 'GET'
        };
        $http(cardReq).then(function success(res) {
          self.currentDeck = res.data.cards;
          console.log("in the card-list ctrl");
        });
      };
    }]
  });