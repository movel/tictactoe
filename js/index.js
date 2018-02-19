"use strict";

// let brown = "#5000FF";

let isX = true;
let isHuman = true;
let play_as = "x";
let humanClass = document.querySelector('.human');
let computerClass = document.querySelector('.computer');
let win = document.querySelector('.win');
let start = true;

let selector, elems, makeActive;
selector = '.item_in';
elems = document.querySelectorAll(selector);

computerClass.className += " border";
document.querySelector('.x').className += " border";

function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function isWinner(player) {
  
 if (
   (elems[0].innerHTML == player && elems[1].innerHTML == player && elems[2].innerHTML == player) ||
   (elems[3].innerHTML == player && elems[4].innerHTML == player && elems[5].innerHTML == player) ||
   (elems[6].innerHTML == player && elems[7].innerHTML == player && elems[8].innerHTML == player) ||
   (elems[0].innerHTML == player && elems[3].innerHTML == player && elems[6].innerHTML == player) ||
   (elems[1].innerHTML == player && elems[4].innerHTML == player && elems[7].innerHTML == player) ||
   (elems[2].innerHTML == player && elems[5].innerHTML == player && elems[8].innerHTML == player) ||
   (elems[0].innerHTML == player && elems[4].innerHTML == player && elems[8].innerHTML == player) ||
   (elems[2].innerHTML == player && elems[4].innerHTML == player && elems[6].innerHTML == player)
 ) {
   return true;
 } else {
   return false;
 }
}

function winner(player) {
  
  if (elems[0].innerHTML == player && elems[1].innerHTML == player && elems[2].innerHTML == player) {
    elems[0].className += " red"; elems[1].className += " red"; elems[2].className += " red";
  }    
  if (elems[3].innerHTML == player && elems[4].innerHTML == player && elems[5].innerHTML == player) {
    elems[3].className += " red"; elems[4].className += " red"; elems[5].className += " red"; 
  }
  if (elems[6].innerHTML == player && elems[7].innerHTML == player && elems[8].innerHTML == player) {
    elems[6].className += " red"; elems[7].className += " red"; elems[8].className += " red";  
  }
  if (elems[0].innerHTML == player && elems[3].innerHTML == player && elems[6].innerHTML == player) {
    elems[0].className += " red"; elems[3].className += " red"; elems[6].className += " red";   
  }
  if (elems[1].innerHTML == player && elems[4].innerHTML == player && elems[7].innerHTML == player) {
    elems[1].className += " red"; elems[4].className += " red"; elems[7].className += " red";   
  }
  if (elems[2].innerHTML == player && elems[5].innerHTML == player && elems[8].innerHTML == player) {
    elems[2].className += " red"; elems[5].className += " red"; elems[8].className += " red";   
  }
  if (elems[0].innerHTML == player && elems[4].innerHTML == player && elems[8].innerHTML == player) {
    elems[0].className += " red"; elems[4].className += " red"; elems[8].className += " red";   
  }
  if (elems[2].innerHTML == player && elems[4].innerHTML == player && elems[6].innerHTML == player) {
    elems[2].className += " red"; elems[4].className += " red"; elems[6].className += " red";    
  }
  
  win.innerHTML = player + " is Winner !";
  win.className = "win red";
  removeListeners();
}

makeActive = function() { 
  this.className = "item_in opacity_off";
  start = false;
  xOrO(this, false);
    
  let id = +this.id;
  
  elems[id].removeEventListener('mousedown', makeActive);
  elems[id].removeEventListener('mouseout', makeOut);
  elems[id].removeEventListener('mouseover', makeOver);
  
  checkWinner();
  
  if(play_as === "o" && !isHuman) isComputer();
}

function checkWinner() {
  let findWinner = false;
  if(isWinner("X")) {
    winner("X");
    findWinner = true;
  }
  if(isWinner("O")) {
    winner("O");
    findWinner = true;
  }
  
  let lngth = 0;
  for(let i = 0; i < elems.length; i++) {
    if(elems[i].innerHTML === "") lngth++;
  }
  
  if(lngth === 0 &&  !findWinner) {
    win.className = "win green";
    win.innerHTML = "Game is Draw"; 
  }
}

function setListeners() {
  for (let i = 0; i < elems.length; i++) {
    if(start) {
      elems[i].addEventListener('mousedown', makeActive);
      elems[i].addEventListener('mouseover', makeOver);
      elems[i].addEventListener('mouseout', makeOut);
    }
  }
}

function removeListeners() {
  for (let i = 0; i < elems.length; i++) {
      elems[i].removeEventListener('mousedown', makeActive);
      elems[i].removeEventListener('mouseover', makeOver);
      elems[i].removeEventListener('mouseout', makeOut);
  }
}

setListeners();

function makeOver() {
  this.className = "item_in opacity_on";
  xOrO(this, true);
}

function makeOut() {
  this.className = "item_in opacity_off";
  this.innerHTML = '';
}
                 
selector = '.oppo';
let oppos = document.querySelectorAll(selector);
for (let i = 0; i < oppos.length; i++) {
  oppos[i].addEventListener('mousedown', makeButtons);
}

selector = '.play';
let plays = document.querySelectorAll(selector);
for (let i = 0; i < plays.length; i++) {
  plays[i].addEventListener('mousedown', makePlayAs);
}

selector = '.button_reset';
let btn_reset = document.querySelectorAll(selector)[0];
btn_reset.addEventListener('mousedown', resetCheck);

function resetCheck() {
  for (let i = 0; i < elems.length; i++) {
    elems[i].innerHTML = '';  
  }
  start = true;
  play_as = "x";
  isX = true;
  win.innerHTML = "Winner is...";
  win.className = "win opacity_on";
  
  setListeners();
  
  if(play_as === "o" && !isHuman) isComputer();
}

function xOrO(elm, mOver) {
  
  console.log("elm: " + elm.id);
  
  if( isX ) { 
    elm.innerHTML = "X";
    if( !mOver ) { isX = false; }
  } else { 
    elm.innerHTML = "O";
    if ( !mOver ) { isX = true; }
  };
  
  
}

function isComputer() {  
  
  let di = elems[ isMinMax() ];
  
  di.className = "item_in opacity_off";
  
  xOrO(di, false);
  
  start = false;
  
  let id = +di.id;
  
  console.log(id + " " + isX);
  
  elems[id].removeEventListener('mousedown', makeActive);
  elems[id].removeEventListener('mouseout', makeOut);
  elems[id].removeEventListener('mouseover', makeOver); 
  
  checkWinner();

};

function makeButtons() {
  if( hasClass(this, 'human')) {
    computerClass.className = "button computer";
    isHuman = true;
  } else {
    humanClass.className = "button human";
    isHuman = false;
  }
  
  this.className += " border"; 
  
  if(play_as === "o" && !isHuman) isComputer();
  resetCheck();
}

function makePlayAs() {
  if( hasClass(this, 'x')) {
    document.querySelector('.o').className = "button o";
    play_as = "x";
    isX = true;
  } else {
    document.querySelector('.x').className = "button x";
    play_as = "o";
    isX = false;
  }
  
  this.className += " border";
}

function isMinMax() {
  // this is the board flattened and filled with some values to easier asses the Artificial Inteligence.
  let origBoard = [];
  
  for(let i=0; i<9; i++) {
    if(elems[i].innerHTML === "") {
      origBoard[i] = i;
    }
    if(elems[i].innerHTML === "X") {
      origBoard[i] = "X";
    }
    if(elems[i].innerHTML === "O") {
      origBoard[i] = "O";
    }
  }
  
  // human
  let huPlayer; // "O"
  // ai
  let aiPlayer; // "X"

  // **************************************  
  if ( play_as === "x" ) {
    huPlayer = "X";
    aiPlayer = "O";
  } else {
    huPlayer = "O";
    aiPlayer = "X";
  }
  
  // ************************************** 
  // keep track of function calls
  let fc = 0;

  // finding the ultimate play on the game that favors the computer
  let bestSpot = minimax(origBoard, aiPlayer);

  //loging the results
  console.log("best_index: " + bestSpot.index);
  // console.log("function calls: " + fc);

  return(bestSpot.index);
  
  // the main minimax function
  function minimax(newBoard, player){

    //keep track of function calls;
    fc++;

    //available spots
    let availSpots = emptyIndexies(newBoard);

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (winning(newBoard, huPlayer)){
       return {score:-10};
    }
    else if (winning(newBoard, aiPlayer)){
      return {score:10};
    }
    else if (availSpots.length === 0){
      return {score:0};
    }

  // an array to collect all the objects
    let moves = [];

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      let move = {};
      move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == aiPlayer){
        let result = minimax(newBoard, huPlayer);
        move.score = result.score;
      }
      else{
        let result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove;
    if(player === aiPlayer){
      let bestScore = -10000;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{

  // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

  // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }

  // returns the available spots on the board
  function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
  }

  // winning combinations using the board indexies for instace the first win could be 3 xes in a row
  function winning(board, player){
   if (
          (board[0] == player && board[1] == player && board[2] == player) ||
          (board[3] == player && board[4] == player && board[5] == player) ||
          (board[6] == player && board[7] == player && board[8] == player) ||
          (board[0] == player && board[3] == player && board[6] == player) ||
          (board[1] == player && board[4] == player && board[7] == player) ||
          (board[2] == player && board[5] == player && board[8] == player) ||
          (board[0] == player && board[4] == player && board[8] == player) ||
          (board[2] == player && board[4] == player && board[6] == player)
          ) {
          return true;
      } else {
          return false;
      }
  }
}


// if(!isHuman) isComputer();