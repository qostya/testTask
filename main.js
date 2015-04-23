(function (data) {
    'use strict';
    var CardsApp = {};

    CardsApp.refreshViewCards = function (arg) {
        arg = arg || data;
        var cardsHolder = document.getElementById('cards-holder');
        cardsHolder.innerHTML = '';
        for ( var i = 0; arg.length > i; i++ ) {
            var card = document.createElement('li');
            card.className += 'card card-' + arg[i].type;
            if ( i === arg.length - 1 && arg.length != 1 ) {// добавление сдвига вправо, если карточек больше 1
                card.className += ' card-first';
            }
            cardsHolder.appendChild( card );
        }
    };

    CardsApp.hoverCards = function () {
        var cardsHolder = document.getElementById('cards-holder');
        var cards = document.querySelector('.cards');
        var cardClasses = cards.className;

        cardsHolder.onmouseenter = function () {
            cards.className += ' cards-disable-hover';
        };
        cardsHolder.onmouseleave = function () {
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
        this.historyApi.add();
    };

    CardsApp.removeCard = function () {
        if( data.length > 0 ) {
            var cardsLength = data.length;
            data.splice(cardsLength - 1, 1);
            this.historyApi.add();
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
    };

    CardsApp.historyApi = {
        add: function () {
            if ( window.history ) {
                history.pushState(data, null)
            }
        },
        detectChanges: function() {
            window.addEventListener('popstate', function(e) {
                data = e.state; // берем массив из истории и кладем его во вью
                CardsApp.refreshViewCards(data);
            });
        }
    };

    CardsApp.editCards();
    CardsApp.refreshViewCards();
    CardsApp.hoverCards();
    CardsApp.historyApi.add();
    CardsApp.historyApi.detectChanges();
}(cards));