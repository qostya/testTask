(function (data) {
    'use strict';
    var CardsApp = {};

    CardsApp.cardsHolder = document.getElementById('cards-holder');

    CardsApp.cards = data;

    CardsApp.refreshViewCards = function () {
        CardsApp.cardsHolder.innerHTML = '';

        for ( var i = 0; CardsApp.cards.length > i; i++ ) {
            var card = document.createElement('li');
            var cardText = document.createTextNode( this.cards[i].type );
            card.appendChild( cardText );
            card.className += 'card card-' + this.cards[i].type;

            if ( i === this.cards.length - 1 && this.cards.length != 1 ) {// добавление сдвига вправо, если карточек больше 1
                card.className += ' card-first';
            }
            this.cardsHolder.appendChild( card );
        }
    };

    CardsApp.hoverCards = function () {
        var cards = document.querySelector('.cards');
        var cardClasses = cards.className;

        this.cardsHolder.onmouseenter = function () {
            cards.className += ' cards-disable-hover';
        };
        this.cardsHolder.onmouseleave = function () {
            cards.className = cardClasses;
        };

    };

    CardsApp.addCard = function (type) {
        type = type || 'narrow';

        this.cards.push(
            {
                type: type
            }
        );
        this.refreshViewCards();
    };

    CardsApp.removeCard = function () {
        var cardsLength = CardsApp.cards.length;
        if ( cardsLength >= 0 ) {
            this.cards.splice(cardsLength - 1, 1);
            this.refreshViewCards();
        }
    };

    CardsApp.editCards = function () {
        var cards = document.querySelector('.cards');
        cards.addEventListener("click", function(e) {
            e = e || window.event;
            if( e.shiftKey ) {
                if ( e.altKey ) {
                    CardsApp.addCard('wide');
                    return;
                }

                CardsApp.addCard('narrow');
            } else {
                CardsApp.removeCard();
            }
        }, false);
    };

    CardsApp.editCards();
    CardsApp.refreshViewCards();
    CardsApp.removeCard();
    CardsApp.hoverCards();
}(cards));