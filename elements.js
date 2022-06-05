
//===!different particle functions should just take [nothing at all]==

const sandPassThrough =  ['air','water','fire','smoke','paint','fly','deadfly'];
//if cell below sand is in sandPassThrough, they will swap. if it cant fall, it'll try to fall to its sides (down left/right)
function sand(){
    //if random number is 1, the sand wont fall, to create a more random lookin effect.
    if(randomNumber(100)!=1){
      if (passThrough(board[x][y+1],sandPassThrough)){
        if(passThrough(board[x][y+2],sandPassThrough)){
          swap(x,y,x,y+2);
          return;
        }
        swap(x,y,x,y+1);
        return;
      }

      //left
      if (passThrough(board[x-1][y+1],sandPassThrough) && passThrough(board[x-1][y],sandPassThrough)){
          swap(x,y,x-1, y+1);
          return;
      } 
      //right
      if (passThrough(board[x+1][y+1],sandPassThrough) && passThrough(board[x+1][y],sandPassThrough)){
          swap(x,y,x+1,y+1);
          return;
      }
      
    }
    //else{
    //  hasAnythingHappened=true;
    //}
}
  
//('water')if space below water is air/smoke. if sides are empty, water disperses (random directangleions? hopefully?). if water runs into fire, extinguish it.
function water(element){
    rng=randomNumber(100);
    if(rng!=0){
      var left = board[x-1][y];
      var right = board[x+1][y];
      var down = board[x][y+1];
      if(left=='moss' && rng > 55 && element=='water'){      //THIS BETTER BE A TEMPORARY FIX ISTFG
        board[x][y]='moss';
        draw(x,y);
        return;
      }
      //moves down if air or smoke
      if(passThrough(down,['air','smoke','fly','deadfly'])){
        if(passThrough(board[x-1][y+1],['air','smoke']) && randomNumber(10)==1){
          swap(x,y,x-1,y+1);
        }
        if(y+2<rows){//moves down 2 spaces if it can
          if(passThrough(board[x][y+2],['air','smoke','fly','deadfly']) || (element=="paint" && board[x][y+2] == 'water')){
           swap(x,y,x,y+2);
           return;
          }
        }
        swap(x,y,x,y+1);
        return;
      }
      
      //moves right, then  moves left (pretty random tho)
      //if statements are pretty similar. function time?
      //rights:
      if(passThrough(right,['air','smoke','fly','deadfly']) || (element=="paint" && right == 'water') ){
        if(rng>55){//chance water wont go to the right
          if(passThrough(board[x+2][y],['air','smoke','fly','deadfly']) && element != "paint"){
            swap(x,y,x+2,y);
            return;
          }
          else{
            swap(x,y,x+1,y);
            return;
          }
        }
      } 
      else if(passThrough(left,['air','smoke','fly','deadfly']) || (element=="paint" && left == 'water')){
        //lefts
        if(passThrough(board[x-2][y],['air','smoke','fly','deadfly'])&& element != "paint"){
          if(passThrough(board[x-3][y],['air','smoke','fly','deadfly'])&& element != "paint"){
            swap(x,y,x-3,y);
            return;
          }
          swap(x,y,x-2,y);
          return;
        }
        swap(x,y,x-1,y);
        return;
      }
    //this runs if nothing happens because of rng
    } else {
      hasAnythingHappened=true;
    }
}
  
  //if wood is next to fire, wood will convert to fire | fire will move to a random directangleion if it can
function fire(){
    //checks spaces left,rigt,up,down
    fireCheck(x-1,y    ,1);
    fireCheck(x+1,y    ,1);
    fireCheck(x  ,y-1  ,0);
    fireCheck(x  ,y+1  ,2);
    
    var randySpread = randomNumber(fireToSmokeChance);
    //code that can only run if there are air spaces near fire
    var fireX = randomNumber(-1,2);
    var fireY = randomNumber(-1,1);

    if(board[x+fireX][y+fireY] == 'air'){
      if(randySpread > 3){ //swap with air
        swap(x, y, x+fireX, y+fireY);
        return;
      } 
      else if(randySpread == 'air'){ //sets air ablaze
        board[x+fireX][y+fireY]='fire';
        draw(x+fireX,y+fireY);
        return;
      } else {//turns into smoke if randySpread is 1 or 2 or 3
        board[x][y] = 'smoke';
        draw(x,y);
        return;
      }
    }
    //fire will still maybe turn to smoke
    else if(randySpread < 2){
      board[x][y] = 'smoke';
      draw(x,y);
      return;
    }
    //fire will be masked if it cant move, so it looks animated
    else if(Math.random() > 0.95){
      draw(x,y);
    }
}
//part of fire, it checks nearby spaces for water or wood. and marks any empty/smoke areas nearby. j and i are x and y values. chance is the uh chance that fire will move in that directangleion (to prevent sliding in one directangleion)
function fireCheck(a,b){//tempIndex is the spot currently being checked. j and i are x and y values for spot being checked
    //extinguish if wawa
    if(board[a][b] == 'water'){
      board[x][y] = 'smoke';
      draw(x,y);
      return;
    }                            //chance of fire spreading to wood or moss
    var pyroRandy = randomNumber(6);
    //if pyroRandy is 1, ignite that wood
    if(passThrough(board[a][b],['wood','moss']) && pyroRandy==1){
      board[a][b]='burning';
      draw(a,b);
      //chunkQueue[getChunk(i)][getChunk(j)] = true; //optimize?
    } 
}

//big fire (secret element!! tell no one!)
function burning(){
  fireCheck(x-1,y);
  fireCheck(x+1,y);
  fireCheck(x,y-1);
  fireCheck(x,y+1);

  //might create fire above who knows
  if(board[x][y+1]=='air' && Math.Random >0.9){
    board[x][y+1]='fire';
    draw(x+1);
  }

  if(randomNumber(burningToFireChance)==1){
    board[x][y]='fire';
    draw(x,y+1);
    return;
  }
  //draw again
  if(Math.random() >0.95){ // surprised i can make the chance of reanimation this low and it still looks good
      draw(x,y);
  }
}

  //appends air spaces above (-1, 0, 1, respectively) to smokeSpots[] (assuming those spots are eligible) and will choose one of them to go too.
function smoke(){
    rng=randomNumber(smokeToAirChance);
    //turns to air
    if(rng == 0){
      board[x][y]='air';
      draw(x,y);
      return;
    }
    //moves up in the world, yknow?
    var smokeX = randomNumber(x-1,x+2);
    var smokeY = randomNumber(y-1,y+1);
    if(withinBounds(smokeX,smokeY)){
      if(passThrough(board[smokeX][smokeY],['air','fire','paint',])){
        swap(x,y,smokeX,smokeY);
      }
    }
    
    //if it cant do anything else, redraw the smoke, to make it look animated
    //mask(x,y,smokeColor[randomNumber(smokeColor.length)]);
}
  
  //lava will first fall, it will burn through wood if it can,if it is touching water it will turn to stone, if it is touching wood it will turn to fire
  function lava(){
    //checks adjacent spots for water, moss, and/or wood, responds accordingly (up,down,left,right)
    lavaCheck(x,y+1);
    lavaCheck(x,y-1);
    lavaCheck(x+1,y);
    lavaCheck(x-1,y);
    
    //checks the spot below
    var randy = randomNumber(3);//this is the chance of lava moving, feel free to change.
                            //chance lava will move to its sides if it cant go down, feel free to change
    var randySides = randomNumber(3);
    //lava falls through air, smoke, fire
    if(randy > 0){
      if(passThrough(board[x][y+1],['air','fire','smoke'])) {
        swap(x,y,x,y+1);
        return;
      } 
      else if(passThrough(board[x][y+1],['sand','sponge'])){//its melting the elements here
        board[x][y+1]='air';
        swap(x,y,x,y+1);
      }
      //slide to the left *boom* 
      else if(randySides == 0){
        if(passThrough(board[x-1][y],['air','fire','smoke'])){//left
          swap(x,y,x-1,y);
          return;
        }
        if(passThrough(board[x-1][y],['sand'])){
          board[x-1][y]='smoke';
          draw(x,y);
        }
      }
      //slide to the right 
      else if(passThrough(board[x+1][y],['air','fire','smoke'])){
        swap(x,y, x+1,y);
        return;
      }
      else if(passThrough(board[x+1][y],['sand'])){
        board[x-1][y]='smoke';
        draw(x,y);
      }
    }
  }
  function lavaCheck(a,b){
    //turn paint to smoke
    if(board[a][b]=='paint'){
      board[a][b]='smoke';
      draw(a,b);
      return;
    }
    else if(passThrough(board[a][b],['wood','moss'])) {//if its wood or moss, the WOOD/MOSS turns to fire
      board[a][b]='fire';
      draw(a,b);
    }
    //checks for water, both lava AND water turns to stone or smoke
    if(board[a][b]=='water'){
      if(Math.random() > 0.7){ //30% chance lava turns to stone, otherwise it smoke
        board[x][y]='stone';
        board[a][b]="stone";
      }
      else {
        board[x][y]='smoke';
        board[a][b]='smoke';
      }
      draw(x,y);
      return;
    } 
    
  }
  
  //Moss checks nearby spaces for water or fire or lava(REMOVE THE PART OF FIRE THAT CHECKS FOR MOSS)
function moss(){
    if(mossCheck(x,y+1)){//down
      return;
    } else if(mossCheck(x,y-1)){//up
      return;
    } else if(mossCheck(x+1,y)){//right
      return;
    } else if(mossCheck(x-1,y)){//left
      return;
    } 
  }
function mossCheck(a,b){
    if(passThrough(board[a][b],['fire','lava'])){//lava or fire
      rng = randomNumber(10);//the chance of fire spreading to plandt
      if(rng == 0 || board[a][b] == 'lava'){
        board[x][y] = 'fire';
        draw(x,y);
        return true;
      }
    } 
    else if (board[a][b] == 'water'){
      rng = randomNumber(5); //chance of water turning to moss
      if(rng == 1){
        board[a][b] = 'moss';
        draw(a,b);
      }
    }
    return false; //god dang i am so good at at programming
  }
  
//maybe move sponge to be a part of water, actually
// if adjacent spaces are water, remove water and turn dry sponge into wet sponge
function drySponge(){
    var spongeCheck = false;

    if(Math.random() >= 0.5){
      for(var a=x-spongeRadius;a<=x+spongeRadius; a++){
      for(var b=y-spongeRadius; b<=y+spongeRadius; b++){
        if(withinBounds(a,b)){
          if(board[a][b]=='water'){
            board[a][b]='air';
            draw(a,b);

            if(!thirstySponges){
              board[x][y]='wetsponge';
              draw(x,y);
            }
            
            spongeCheck=true;
          }
        }
      }
    }
    }
    
    
    //checks for lava above
    if(board[x][y-1] == 'lava'){
      board[x][y]='smoke';
      draw(x,y);
    }
}

//might swap with dry sponges. if nearby fire/lava, turn to dry sponge
function wetSponge(){
  //check for fire/lava
  if(wetSpongeCheck(x,y+1) || wetSpongeCheck(x,y-1) || wetSpongeCheck(x+1,y) || wetSpongeCheck(x-1,y)){
    return;
  }
  //ayo sponge wit da driiiiiip
  //sponge drips water and dries
  if(randomNumber(wetSpongeDripChance) == 1){//chance of sponge straight drippin OR 
    //creates lil water droppleeeet
    if(board[x][y+1]=='air'){
      board[x][y]='drysponge';
      board[x][y+1]='water';
      draw(x,y);
      draw(x,y+1);//it needs to draw the new water because it might be in a different chunk
      return;
    } 
    //swaps with dry sponge below
    else if(board[x][y+1]=='drysponge'){
      swap(x,y,x,y+1);
    }
  }                      //mmmm this spaghetti is delicious
}
function wetSpongeCheck(a,b){
    if(passThrough(board[a][b],["fire","burning","lava"])){//lava or fire
      console.log('dry');
      board[x][y] = 'drysponge';
      draw(x,y);
      return true;
    }
    return false;
}

//paint steals code from water, spreads paint joy
function paint(){
    //dissapates if water above or below
    if(board[x][y-1] == 'water'){
      if(randomNumber(15)==0){
        board[x][y]='water';
        draw(x,y);
        return;
      }
    }
    else if(board[x][y+1] == 'water'){//whats happening here. why didnt i document this.
      if(randomNumber(15)==0){
        board[x][y]='water';
        draw(x,y);
        return;
      }
    }
    
    paintCheck(x+1,y);
    paintCheck(x-1,y);
    paintCheck(x,y+1);
    paintCheck(x,y-1);
    
    water("paint");//"lol" "lmao"
}
function paintCheck(a,b){
    if(board[a][b] != 'air' && board[a][b] != 'paint' && board[a][b] != 'water'){
      mask(a,b,paintColor);//the only use of mask
    }
}
// [REDACTED]
function REDACTED(){
    if(x>0 && x<columns-1 && y>0 && y<rows-1){ // if its not on the border
      rng = randomNumber(15);
      var spotX = randomNumber(-1,2);
      var spotY = randomNumber(-1,2);
      spotX = x + spotX;
      spotY = y + spotY;
      
      if(rng == 0){
        draw(x,y); //become darkness
      }
      if(board[spotX][spotY] != 'border' && board[spotX][spotY] != "na"){
        board[spotX][spotY] = 'border';
        mask(spotX,spotY,colors[randomNumber(0,colors.length)]);
        //chunkQueue[chunkX][chunk]=true;
      }
    }
}

var isTheFlyAlive;
//bugs bugs bugs bugs bugs bugs b-b-b-bugs
function fly(){
  isTheFlyAlive = true;
  //KILL KILL KILL KILL
  flyCheck(x-1,y);
  flyCheck(x+1,y);
  flyCheck(x,y-1);
  flyCheck(x,y+1);
  if(isTheFlyAlive){//is it still there?
    //move
    var flySpotX = randomNumber(x-1,x+2);
    var flySpotY = randomNumber(y-1,y+2);

    
    if (withinBounds(flySpotX,flySpotY)){
      if(passThrough(board[flySpotX][flySpotY],['air','smoke'])){
        swap(x,y,flySpotX,flySpotY);
        return;
      } 
    }
    draw(x,y);
  }
}
//funny name
function flyCheck(a,b){
  if(isTheFlyAlive){
    //BURN BURN BURN BURN
    if(passThrough(board[a][b],['fire','burning','lava'])){
      board[x][y]='smoke';
      isTheFlyAlive = false;
      return;
    }
    //DROWN DROWN DROWN
    else if(board[x][y] == 'fly'){//if it is alive (dead flys cant drown)
      if(passThrough(board[a][b],['water','paint'])){
        board[x][y]='deadfly';
        isTheFlyAlive = false;
        return;
      }
    }
  }
}

//REST IN PEACE. SIX FEED UNDER.
function deadFly(){
  //BURN BURN BURN BURN
  flyCheck(x-1,y);
  flyCheck(x+1,y);
  flyCheck(x,y-1);
  flyCheck(x,y+1);

  //move down
  if(passThrough(board[x][y+1],['air','smoke'])){
    swap(x,y,x,y+1);
    return;
  }
  //move up. it should have the effect like its floating on water
  if(passThrough(board[x][y-1], ['water','paint']) && Math.random() < 0.2){
    swap(x,y,x,y-1);
    return;
  }
}

//literally conways game of life lol. btw air counts as a dead cell. literally any other cell is considered alive.
function magic(){
  var neighbors = getNeighbors(x,y);// [alive, dead]

  //first, check surrounding air elements to see if they should be alive (cells might be checked twice, thats okay)
  if(neighbors[1] > 0){//effishenchy (skip on checking air elements if there is no air )
    for(var a=x-1;a<=x+1;a++){
      for(var b=y-1;b<=y+1;b++){
        if(withinBounds(a,b) && !(x==a && y==b)){
          if(board[a][b]=='air'){
            deadCells(a,b);
          }
        }
      }
    }
  }

  //a cell will live on if it has 2 or 3 neighbors
  if(neighbors[0] != 2 && neighbors[0] != 3){
    queue.push([x,y,'air']);
  }
}
//returns a list containing qty of alive neighbors[ index 0 ] and the qty of dead neighbors [index 1], with a and b being the center
function getNeighbors(a,b){
  var dead=0;
  var alive=0;
  for(var i=a-1;i<=a+1;i++){
    for(var j=b-1;j<=b+1;j++){
      if(withinBounds(i,j) && !(i==a && j==b)){
        if(board[i][j] == 'air' || board[i][j] == 'dead'){
          dead++;
        }
        else{
          alive++;
        }
      }
    }
  }
  return([alive,dead]);
}
//a dead cell with exactly 3 neighbors will come to life
function deadCells(a,b){
  var neighbors=getNeighbors(a,b);
  
  if(neighbors[0]==3){
    if(!dangerousMagic){
      board[a][b]="dead";
    }
    queue.push([a,b,'magic']);
  }
}