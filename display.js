function draw(a,b){
    var cell = elementList[board[a][b]];
    if(board[a][b] != 'paint'){
      setFillColor(cell.colors[randomNumber(cell.colors.length)]); 
    }
    else {
      setFillColor(paintColor);
    }

    //probably like THE most important line of code in the whole program
    rectangle(a*cellSize, b*cellSize, cellSize, cellSize);

    hasAnythingHappened=true;
    
    updateChunk(a-2,b);
    updateChunk(a+2,b)
    updateChunk(a,b+2)
    updateChunk(a,b-2)
  }



//display is to display the whole board. only call this function once (unless changing boards).
function display(){
  for(var x = 0; x<columns; x++){
    for(var y = 0; y<rows; y++){
      draw(x,y);
    }
  }
}

//like display, only cooler. no, it draws the whole board but only the elements that have different values in board vs altBoard. useful for when youve just updated a lot of the board and need to draw a lot of things at once
function smartDisplay(altBoard){
  for(var x = 0; x<columns; x++){
    for(var y = 0; y<rows; y++){
      if(altBoard[x][y]!=board[x][y]){
        draw(x,y);
        
      }
    }
  }
}

//like draw except the color is predefined. use when you want to change the color of an element without changing the element itself
function mask(a,b,color){
  setFillColor(color);
  rectangle(a*cellSize,b*cellSize,cellSize,cellSize);
  hasAnythingHappened=true;
} 

//why *here*
setActiveCanvas("canvas");
display();
