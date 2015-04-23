(function (data) {
    'use strict';
    var CardsApp = {};

    CardsApp.refreshViewCards = function (arg) {
        arg = arg || data; // аргумент используется в основном history api для передачи актуального состояния массива
        var cardsHolder = document.getElementById('cards-holder'),
            cardsSafer = document.createDocumentFragment(); // для кэша html карточек
        cardsHolder.innerHTML = ''; // удаляем старые карточки при обновлении массива
        for ( var i = 0; arg.length > i; i++ ) {
            var card = document.createElement('li'); // добавляем элемент списка для карточки
            card.className += 'card card-' + arg[i].type;
            if ( i === arg.length - 1 && arg.length != 1 ) { // добавление сдвига вправо для последней карточки, если их больше 1
                card.className += ' card-first';
            }
            cardsSafer.appendChild(card); // кэшируем для лучшего рендеринга
        }

        cardsHolder.appendChild( cardsSafer ); // вставляем кэш с элементами
        console.log('Boom');
    };

    CardsApp.hoverCards = function () {
        var cardsHolder = document.getElementById('cards-holder'),
            cards = document.querySelector('.cards'),
            cardClasses = cards.className; // кэшируем список классов

        cardsHolder.onmouseenter = function () {       // если наводишь на дочерний элемент блока .cards - .cards-holder,
            cards.className += ' cards-disable-hover'; // то родительскому (cards) добавляется класс (cards-disable-hover),
        };                                             // что меняет цвет его бэкграунда

        cardsHolder.onmouseleave = function () {
            cards.className = cardClasses;
        };

    };

    CardsApp.addCard = function (type) {
        type = type || 'narrow'; // если не задан тип карты, ставим по-умолчанию узкую
        data.push(
            {
                type: type
            }
        );
    };

    CardsApp.removeCard = function () {
        if ( data.length > 0 ) { // чтобы не пыталось удалить из пустого массива
            var cardsLength = data.length;
            data.splice(cardsLength - 1, 1);
        }
    };

    CardsApp.editCards = function () {
        var cards = document.querySelector('.cards');
        cards.addEventListener("click", function(e) {
            if ( e.shiftKey ) { // ловим нажатые кнопки
                if ( e.altKey ) {
                    CardsApp.addCard('wide');
                } else {
                    CardsApp.addCard('narrow'); // если только шифт
                }
            } else {
                CardsApp.removeCard(); // если только клик
            }

            CardsApp.refreshViewCards(); // после каждого изменения обновляем вьюху
            CardsApp.historyApi.add();   // и добавляем это изменение в хистори апи
        });
    };

    CardsApp.historyApi = {
        add: function () {
            if ( window.history ) { // если поддерживается
                history.pushState(data, null); // сохраняем в метод state актуальный массив
            }
        },
        detectChanges: function() {
            window.addEventListener('popstate', function(e) { // ловим нажатия стрелок истории, передаем в аргумент данные перехода
                data = e.state; // обновляем массив данными из истории
                CardsApp.refreshViewCards(data); // используем его во вью
            });
        }
    };

    CardsApp.editCards();
    CardsApp.refreshViewCards();
    CardsApp.hoverCards();
    CardsApp.historyApi.add();
    CardsApp.historyApi.detectChanges();
}(cards));