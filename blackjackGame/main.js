var $ = jQuery,
    dealerHand = [],
    playerHand = [],
    deck = [],
    playerTurn =false,
    hold = false,
    busted = false;

function loadDeck(){
    deck = [
        ['A',1,2,3,4,5,6,7,8,9,10,'J','Q','K'],
        ['A',1,2,3,4,5,6,7,8,9,10,'J','Q','K'],
        ['A',1,2,3,4,5,6,7,8,9,10,'J','Q','K'],
        ['A',1,2,3,4,5,6,7,8,9,10,'J','Q','K']
    ];
}

function checkHand(hand){
    var total = 0;

    for(var i = 0; i < hand.length; i++){
        switch (hand[i]){
            case '1':case '2':case '3':case '4':
            case '5':case '6':case '7':case '8':
            case '9':case '10':
                total += parseInt(hand[i]) ;
                
                break;
            case 'J': case 'Q':case 'K':
                total +=10;
                break;
            case 'A':
                if(total + 11 > 21){
                    total+= 1 
                } else {
                    total+= 11 
                }
        }
    }
    
    if((hand[0] == 'A'|| hand[1] == 'A') && total >21){
        total -=10
    }
    
    if(total > 21){
        busted = true;
    }
    
    return total;
}
function dealCard(){
    var suit = Math.floor((Math.random() * deck.length));
    
    if(deck[suit].length == 0){
        deck.splice(suit, 0);
        suit = Math.floor((Math.random() * deck.length));
    }
    var card = Math.floor((Math.random() * deck[suit].length));
    var cardDealt = deck[suit].splice(card,1).join('');
        
        if(playerTurn){
            playerHand.push(cardDealt)
            $('.handPlayer').append('<p>' + cardDealt +'</p>');
        } else {
            dealerHand.push(cardDealt)
            $('.handDealer').append('<p>' + cardDealt +'</p>');
        }
        
}
function checkTurn(){
    if(playerTurn){
        checkHand(playerHand);
        if(busted == true){
            $('#winner').html('Dealer');
            $('.hit').addClass('disabled');
            $('.hold').addClass('disabled');
        }
    } else {
        while(checkHand(dealerHand) < 16){
            dealCard();
        }
        busted = true;
        
        if(checkHand(playerHand) > checkHand(dealerHand)){
             $('#winner').html('Player');
        }
        if(checkHand(playerHand) == checkHand(dealerHand)){
            $('#winner').html('Draw');
        }
        if(checkHand(playerHand) < checkHand(dealerHand) && checkHand(dealerHand)<=21){
            $('#winner').html('Dealer');
        } else{
            $('#winner').html('Player');
        }
        
    }
}

function firstDeal(){
    dealCard();
    dealCard();
    playerTurn = true;
    dealCard();
    dealCard();
}


function startGame(){
    dealerHand = [];
    playerHand = [];
    deck = [];
    playerTurn =false;
    hold = false;
    busted = false;
    
    $('.handDealer').html('');
    $('.handPlayer').html('');
    
    $('.hit').removeClass('disabled');
    $('.hold').removeClass('disabled');
    $('#winner').html('');
    
    loadDeck();
    firstDeal();
   
}


startGame();


$(document).ready(function(){
    $('.startGame').click(function() {
        startGame();
    });
    
    
    $('.hit').click(function(){
        if(!busted){
            dealCard();
            checkTurn();
        }
        
    });
    
    $('.hold').click(function(){
        playerTurn = false;
        $('.hit').addClass('disabled');
        $('.hold').addClass('disabled');
        checkTurn();
    });
    
});