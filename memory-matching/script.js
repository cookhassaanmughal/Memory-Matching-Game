$(document).ready(function () {
    let symbols = ["⚽","🏀","🏏","🎾","🏐","🏓","🥊","🏸"];
    let cards = symbols.concat(symbols);
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    function shuffle(array)
     {
        for (let i = array.length - 1; i > 0; i--) 
        {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    function createBoard() 
    {
        $('.gameBoard').empty();
        shuffle(cards);

        cards.forEach(function (symbol) {
            let card = $('<div class="card"></div>');
            card.data('symbol', symbol);
            $('.gameBoard').append(card);
        });
    }
    function flipCard() 
    {
        if (lockBoard) return;
        if ($(this).hasClass('flipped')) return;

        $(this).addClass('flipped');
        $(this).text($(this).data('symbol'));

        if (!firstCard) 
        {
            firstCard = $(this);
            return;
        }

        secondCard = $(this);
        lockBoard = true;
        moves++;
        $('#moves').text(moves);

        checkMatch();
    }

    function checkMatch() 
    {
        if (firstCard.data('symbol') === secondCard.data('symbol')) {
            firstCard.addClass('matched');
            secondCard.addClass('matched');
            resetTurn();
        } 
        else 
        {
            setTimeout(function () 
            {
                firstCard.removeClass('flipped').text('');
                secondCard.removeClass('flipped').text('');
                resetTurn();
            }, 1000);
        }
    }

    function resetTurn()
     {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    $('#restart').click(function () 
    {
        moves = 0;
        $('#moves').text(moves);
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        createBoard();
    });

    $('.gameBoard').on('click', '.card', flipCard);

    createBoard();
});