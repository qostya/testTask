(function (data) {
    'use strict';
    var CardsApp = {};

    CardsApp.cardsHolder = document.getElementById('cards-holder');

    CardsApp.cards = data;

    CardsApp.refreshViewCards = function () {
        CardsApp.cardsHolder.innerHTML = '';
        for ( var i = 0; data.length > i; i++ ) {
            var card = document.createElement('li');
            var cardText = document.createTextNode( data[i].type );
            card.appendChild( cardText );
            card.className += 'card card-' + data[i].type;

            if ( i === data.length - 1 && data.length != 1 ) {// добавление сдвига вправо, если карточек больше 1
                card.className += ' card-first';
            }
            this.cardsHolder.appendChild( card );
        }
        console.log('refreshed');
        /*var cardTemplate = document.getElementById('card-template').innerHTML;

        for (var i = 0; data.length > i; i++) {
            data[i].id = i;
        }

        var cardsData = {
            posts: data
        };

        var templateHB = Handlebars.compile( cardTemplate );

        CardsApp.cardsHolder.innerHTML = templateHB(cardsData);

        Handlebars.registerHelper('id_', function(cd) {
        });*/
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
        data.push(
            {
                type: type
            }
        );
        this.refreshViewCards();
    };

    CardsApp.removeCard = function () {
        if( data.length > 0 ) {
            var cardsLength = data.length;
            data.splice(cardsLength - 1, 1);
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
                } else {
                    CardsApp.addCard('narrow');
                }
            } else {
                CardsApp.removeCard();
            }
        }, false);

        CardsApp.refreshViewCards();
        CardsApp.hoverCards();
    };

    CardsApp.editCards();
}(cards));