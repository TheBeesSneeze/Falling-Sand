//the amount of rain is determined by the size of the cursor
function riskOfRain(){
    if(rainCheck){
      //size of cursor determines how many droplets of rain will be produced
      for(var i = 1; i<=ratio;i++){
        var rainColumn = randomNumber(1,58);
        if(board[rainColumn][i] == 0){
          board[raincolumn][i] = currentElement;
          draw(i,rainColumn);
        }
      }
    }
  }