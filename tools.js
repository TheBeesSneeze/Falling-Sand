//returns the chunk index
//num is x or y
//returns num value converted to chunk value 
function getChunk(num){
  return((num-(num%chunkSize))/chunkSize);  
} 

//adds whatever chunk is at xy to the chunkQueue
function updateChunk(x,y){
  if(withinBounds(x,y)){
    chunks[getChunk(x)][getChunk(y)]=true;
  }
}

//swaps list[bb][aa] and list [d][c] 
//updates adjacent chunks current index is on the edge of a chunk
//the most important function in the whole program, handle with care.
function swap(a,b,c,d){
    if(withinBounds(a,b)&&withinBounds(c,d)){
      //a and b are x and y values for value 1, c and d are x and y for the value 2
      //checking board lets us not really have to worry about whether or not im appending something to the right something, its a nice failsafe
      
      if(board[a][b] != board[c][d]){ //MASSIVE CRANIUM
        var temp = board[a][b];
        board[a][b] = board[c][d];
        board[c][d] = temp;
  
        draw(a,b);
        draw(c,d);
      }
  
    }
    
  }

//important function that updates board at index X Y to be element, then draws it. it wont do that tho if X Y is out of bounds or board is already that element, meaning the function is smart
function update(X,Y,element){
  if(withinBounds(X,Y)){
    if(board[X][Y]!=element){
      board[X][Y]=element;
      draw(X,Y);
    }
  }
}

//returns true if [value] is equal to any of the values in [list]
function passThrough(value,list){
  for(var i=0; i<list.length; i++){
    if(value==list[i]){
      return true;
    }
  }
  return false;
}

//checks if x and y are greater than/equal to 0, and less than columns/rows and if the coordinates arent at the border. returns true/false
function withinBounds(a,b){
  if(a>=0 && b>=0 && a<columns && b<rows){
    return(board[a][b] != 'border');
  }
}

//returns an object with x/y indexes. searches random spaces of the board (not the borders tho) for element attempt times, if attempts is blank, the default is eqaual to ratio 
function randomElementSearch(element,attempts){
  if(attempts == undefined){
    attempts = ratio; //r-r-r-RATIO
  }

  for(var i=0;i<attempts;i++){
    var X = randomNumber(1,columns);
    var Y = randomNumber(1,rows);

    if(board[X][Y]==element){
      return {
        x:X,
        y:Y,
      }
    }
  }
}

//returns a duplicate of item.
function copy(item){
  return (JSON.parse(JSON.stringify(item)));
}


// y-y1 = m(x-x1). give the function y,y1,m,x,x1 and leave one of them undefined, the function returns the undefined value
function pointSlope(y,y1,m,x,x1){
  if(y==undefined){
    return( (m*(x-x1))+y1 );
  }
  else if( y1==undefined){
    return( (-1 * m * (x-x1))+y );
  }
  else if (x == undefined){
    return( ( (y-y1)/m ) + x1 );
  }
  else if (x1 == undefined){
    return( (-1* ( (y-y1)/m) )+x );
  }
}

//returns m for m=(y1-y2)/(x1-x2)
function slope(x1,x2,y1,y2){
  return((y1-y2)/(x1-x2));
}

//swaps entire rows in board. also it doesnt displays the rows
function swapRows(y1,y2){
  //see, y is a part of the column, yknow, you cant just swap em out easy like you can the columns, you gotta get IN THERE. the NITTY GRITTY
  for(var i=0; i<board.length; i++){//iterate through length of a row and swap each values one by one

    if(withinBounds(i,y1) && withinBounds(i,y2)){ //when it comes to making resource efficient programs, my intellect knows no bounds

      if(board[i][y1] != board[i][y2]){
        var temp = board[i][y1];
        board[i][y1]=board[i][y2];
        board[i][y2]=temp;
        
      }
    }
  }
  var temp = board;
}

//it doesnt display, only swaps the columns
function swapCols(x1,x2){
  if(withinBounds(x1,10) && withinBounds(x2,10)){
    var temp = board[x1];
    board[x1] = board[x2];
    board[x2] = temp;
  }
  
}

//updates the label, be sure that element is real and valid and all that. if element is undefined, defaults to currentElement;
function updateLabel(element){
  if(element==undefined){
      element=currentElement;
  }
  setText('label',element.toUpperCase());
  setProperty('label','background-color',elementList[element].colors[0]);
}