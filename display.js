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

    if(false){
    chunkQueue[getChunk(a)][getChunk(b)]=true;
    
    
    
    //gets chunks of nearby
    if(board[a][b]!=0){
    //this math is messy... could probably optimize this somewhere...
      if((a%5) > 2 && chunkX != 11){//right 
        chunkQueue[chunkX+1][chunkY] = true;
      } 
      else if ((a%5) < 2 && chunkX != 0){
        chunkQueue[chunkX-1][chunkY] = true;
      }
      if((b%5) > 2 && chunkY != 15){ //down
        chunkQueue[chunkX][chunkY+1] = true;
      } 
      else if ((b%5)<2 && chunkY != 0){//up
        chunkQueue[chunkX][chunkY-1] = true;
      }
    }
    }
  }


//display is to display the whole board. only call this function once (unless changing boards).
function display(){
  setActiveCanvas("canvas");
  for(var x = 0; x<columns; x++){
    for(var y = 0; y<rows; y++){
      draw(x,y);
    }
  }
}

//like draw except the color is predefined. use when you want to change the color of an element without changing the element itself
function mask(a,b,color){
  setFillColor(color);
  rectangle(a*cellSize,b*cellSize,cellSize,cellSize);
  hasAnythingHappened=true;
} 

display();
