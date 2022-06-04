//returns the chunk index
//num is x or y
//returns num value converted to chunk value 
function getChunk(num){  return((num-(num%chunkSize))/chunkSize);  } //yes this function is one line of code, so what, eat my shorts


//swaps list[bb][aa] and list [d][c] 
//updates adjacent chunks current index is on the edge of a chunk
//the most important function in the whole program, handle with care.
function swap(a,b,c,d){
    if(withinBounds(a,b)&&withinBounds(c,d)){
      //a and b are x and y values for value 1, c and d are x and y for the value 2
      //checking board lets us not really have to worry about whether or not im appending something to the right something, its a nice failsafe
      
      var temp = board[a][b];
      board[a][b] = board[c][d];
      board[c][d] = temp;

      draw(a,b);
      draw(c,d);
    }
    if(false && debugMode){ //insiders scoop: i had no need for this bit i just thought it would be cool
      setActiveCanvas("debugCanvas");
      rectangle(a*5,b*5, 5,5);
      rectangle(c*5,d*5, 5,5);
      setActiveCanvas("canvas1");
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