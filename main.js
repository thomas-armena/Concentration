var gridSize = 4;
var lineBreak = document.createElement('br');
var cardsFlipped = 0;
var cardSpace = document.getElementById('cardSpace');
var prevRow = -1;
var prevCol = -1;
var tries = 0;
var matches = 0;

//Create a 2D array to store card position
var card = new Array(gridSize);
for (var i = 0; i < gridSize; i++) {
  card[i] = new Array(gridSize);
}

//Store information inside card
/*
0 stores node
1 stores if the card is flipped
2 stores if the card has been matched
3 stores which the number
*/
for(var i = 0; i < gridSize; i++){
  for(var j = 0; j < gridSize; j++){
    card[i][j] = new Array(4);
  }
}

//generate a random set of cards
var numberOfCards = gridSize*gridSize;
randomCard = new Array(numberOfCards);

//set the deck
for(var i = 0; i < numberOfCards/2; i ++){
  randomCard[2*i] = i+2;
  randomCard[2*i+1] = i+2;
}

//shuffle the deck
for (i = randomCard.length - 1; i > 0; i -= 1) {
  j = Math.floor(Math.random() * (i + 1));
  temp = randomCard[i];
  randomCard[i] = randomCard[j];
  randomCard[j] = temp;
}

//distribute the deck
for(var column = 0; column < gridSize; column ++){
  for(var row = 0; row < gridSize; row ++){
    card[row][column][2] = false;
    card[row][column][3] = randomCard[column*gridSize+row];

  }
}

//generate nodes of all the cards
var div = new Array(gridSize);

for(var column = 0; column < gridSize; column ++){
  div[column] = document.createElement('div');
  cardSpace.appendChild(div[column]);

  for(var row = 0; row < gridSize; row ++){
    card[row][column][0] = document.createElement('img');
    card[row][column][0].setAttribute('src','./images/img_back.jpg');
    card[row][column][0].setAttribute('class','card');
    card[row][column][0].setAttribute('row',row);
    card[row][column][0].setAttribute('column',column);
    card[row][column][0].addEventListener('click',revealCard);
    div[column].appendChild(card[row][column][0]);

  }
  cardSpace.appendChild(lineBreak);
}

//update score
var score = document.getElementById('score');
score.innerHTML = "Number of tries: "+tries;

function revealCard(){
  var row = this.attributes['row'].value;
  var column = this.attributes['column'].value;
  if ((card[row][column][2] == false) && !(row == prevRow && column == prevCol)){
    if (cardsFlipped === 2){
      tries ++;
      score.innerHTML = "Number of tries: "+tries;
      cardsFlipped = 0;
      prevRow = -1;
      prevCol = -1;
      for(var c = 0; c < gridSize; c ++){
        for(var r = 0; r < gridSize; r ++){
          if (card[r][c][2] == false){
            card[r][c][0].setAttribute('src','./images/img_back.jpg');
          }
        }
      }
    }
    this.attributes['src'].value = './images/'+card[row][column][3]+'_of_diamonds.png';
    //if the cards match, make them stay
    if (prevRow >= 0){
      if (card[row][column][3] === card[prevRow][prevCol][3] || 0){
        card[row][column][2] = true;
        card[prevRow][prevCol][2] = true;
        matches ++;
        if (matches == numberOfCards/2){
          alert("You win!")
        }
      }
    }
    prevRow = row;
    prevCol = column
    cardsFlipped++;
  }
}
