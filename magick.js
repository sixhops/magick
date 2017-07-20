// prolly don't even need this class
function Card(c) {
  this.name = c.name; // string
  this.manaCost = c.manaCost; // string
  this.cmc = c.cmc; // converted mana cost, integer
  this.colors = c.colors; // array of color strings
  this.colorIdentity = c.colorIdentity; // capital letter signifying color, array, same as colors
  this.type = c.type; // card type, string
  this.types = c.types; // array of card types
  this.rarity = c.rarity; // string
  this.set = c.set; // acronym code, string
  this.setName = c.setName; // string
  this.text = c.text; // string, card text
  this.flavor = c.flavor; // string
  this.artist = c.artist; // string
  this.number = c.number; // string, card number printed on card, can contain alpha
  this.power = c.power; // CREATURES ONLY, string
  this.toughness = c.toughness; // CREATURES ONLY, string
  this.layout = c.layout; // string
  this.multiverseid = c.multiverseid; // integer
  this.imageUrl = c.imageUrl; // string
  this.rulings = c.rulings; // array of ruling objects {date, text} (strings)
  this.foreignNames = c.foreignNames; // array of foreign name objects
  this.printings = c.printings; // array of set acronyms
  this.originalText = c.originalText; // string, original text for some reason
  this.originalType = c.originalType; // string
  this.legalities = c.legalities; // array of formats and the legal status of the card in those formats
  this.id = c.id; // unique card id string
}
function Deck(cards) {
  this.cards = cards;
}
Deck.prototype.orderCardsByName = function() {
  this.cards.sort(function(a, b) {
    return a.name - b.name;
  });
};
Deck.prototype.orderCardsByCmc = function() {
  this.cards.sort(function(a, b) {
    return a.cmc - b.cmc;
  });
};
Deck.prototype.getCardById = function(id) {
  for (let i = 0; i < this.cards.length; i++) {
    if (this.cards[i].id == id) {
      return this.cards[i];
    }
  }
};


angular.module('magick', []);

  angular.module('magick').controller('MagickController', ['$http', '$scope', function($http, $scope) {
    // Get set names to populate a combo box
    // Exclude type: "promo"
    $scope.availableSets = [];
    $scope.selectedSet = ""; // this should be the code, not the full name
    $scope.currentDeck = null;

    var setReq = {
      url: 'https://api.magicthegathering.io/v1/sets',
      method: 'GET'
    };
    $http(setReq).then(function success(res) {
      //console.log(res.data.sets[0]);
      $scope.availableSets = res.data.sets.filter(function(s) {
        return s.type != "promo";
      });
    });

    // On combo box change, get cards in selected set
    $scope.changeSelectedSet = function() {
      var cardReq = {
        url: 'https://api.magicthegathering.io/v1/cards?set=' + $scope.selectedSet,
        method: 'GET'
      };
      $http(cardReq).then(function success(res) {
        $scope.currentDeck = res.data.cards
      });
    }

  }]); // close MagickController

  // Apparently the name of a component must start with a lower case letter.
  // If you use UpperCase you will break AngularJS.
  angular.module('magick').component('magicCard', {
    template: "<div><img ng-src='{{card.imageUrl}}'></div>",
    bindings: {
      card: '<'
    }
  });
