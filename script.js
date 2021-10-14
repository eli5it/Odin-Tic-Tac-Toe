






 const gameBoard = (function() {
    var _privateBoard = [null, null, null,
                         null, null, null,
                         null, null, null, ]
    // null if the board is not filled
    // true or x   if filled in by x
    // false or y  if filled in by y

    // update board function 
    var updateBoard = function(box) { 
        _privateBoard[box.id] = box.textContent;
        if (checkWinner() != false) {
            displayWinner(checkWinner())
        } else if (getRealLength() == 9) 
            displayWinner("tie")
          else gameController.updateDisplayText()}

    var getRealLength = function() {
        filtered = _privateBoard.filter(Boolean);
        return filtered.length
    }
    function checkWinner() {
        if  (getRealLength() < 5) 
        {return false} 
        else if ((Boolean(_privateBoard[0])) &&
                ((_privateBoard[0] == _privateBoard[1] && _privateBoard[1] == _privateBoard[2]) ||
                (_privateBoard[0] == _privateBoard[3] && _privateBoard[3] == _privateBoard[6]) ||
                (_privateBoard[0] == _privateBoard[4] && _privateBoard[4] == _privateBoard[8])))

                {return _privateBoard[0]}
        
        else if ((Boolean(_privateBoard[2])) &&
                ((_privateBoard[2] == _privateBoard[4] && _privateBoard[4] == _privateBoard[6]) ||
                (_privateBoard[2] == _privateBoard[5] && _privateBoard[5] == _privateBoard[8]) ||
                (_privateBoard[2] == _privateBoard[4] && _privateBoard[4] == _privateBoard[6])))
                {return _privateBoard[2]} 

        else if ((Boolean(_privateBoard[4])) &&
                ((_privateBoard[3] == _privateBoard[4] && _privateBoard[4] == _privateBoard[5]) ||
                (_privateBoard[1] == _privateBoard[4] && _privateBoard[4] == _privateBoard[7])))   
                {return _privateBoard[4]}  
        else if ((Boolean (_privateBoard[6])) && 
                (_privateBoard[6] == _privateBoard[7] && _privateBoard[7] == _privateBoard[8]))
                {return _privateBoard[6]} 
        else {return false}        
    } 
    function displayWinner(result) {
        const display = document.getElementById('display-text');
        if (result == 'tie') 
           {display.textContent= "It's a tie!"
    }   else 
           {display.textContent= `The ${result} player has won!`}
    }

    function resetBoard() {
        _privateBoard = _privateBoard.map(ele => null)
    }
    
    return{updateBoard, getRealLength, resetBoard}

 }())








const playerFactory =  (name, isTurn, icon) => {
    
    return {name, isTurn, icon}
};


let player1 = playerFactory('Player 1', true,  "X"  );
let player2 = playerFactory('Player 2', false, "O"  );

let playerArray = [player1, player2]





const gameController = (function() {
    var findCurrentPlayer = function()  { return playerArray.find(element => element.isTurn == true)}


    var nextTurn = function() {
        player1['isTurn'] = !player1['isTurn'];
        player2['isTurn'] = !player2['isTurn'];
        playerArray= [player1, player2]
    }
    
    var updateDisplayText = function() {
        const display = document.getElementById('display-text');
        currentPlayer = findCurrentPlayer().icon   
        display.textContent = `It is the ${currentPlayer} player's turn`     
    }

    return {findCurrentPlayer, nextTurn, updateDisplayText}
}())




// displayController (module)

const displayController = (function() {
    

    // on click, updates board
    var gameBoxes = document.querySelectorAll(".game-box");
    gameBoxes.forEach(box => box.addEventListener('click',() => {
        if (box.textContent == '') {
            box.textContent= gameController.findCurrentPlayer().icon
            gameController.nextTurn();
            gameBoard.updateBoard(box)
        }
    }));


    gameBoxes.forEach(box => box.addEventListener('mouseover',() => {
        box.classList.add('hover')
    }))

    gameBoxes.forEach(box => box.addEventListener('mouseout',() => {
        box.classList.remove('hover')
    }))

    const resetButton = document.getElementById('reset-button')

    resetButton.addEventListener('click', () => {
        // resets players to defaults
        player1 = playerFactory('Player 1', false,  "X"  );
        player2 = playerFactory('Player 2', true, "O"  );

        // resets internal board representation

        gameBoard.resetBoard();

        // resets display and gameBoxes
        gameBoxes.forEach(box => box.textContent= '') ;

        gameController.updateDisplayText();


    })

    }())





gameController.updateDisplayText();