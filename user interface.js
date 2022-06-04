var clicking = false;
var wasClicking = clicking; //for when the users mouse leaves the canvas but then comes bacl
var mouseX = 0;
var mouseY = 0;
var prevMouseX = 0;
var prevMouseY = 0;
var offset = 1;

//fillWith will replace fillElement
var fillWith = 'air';
var fillElement = 'air'; 
var wasPaused = paused;

// c-c-c-CALLBACK!

var fillCount=0;
var prevFillCount=0;

//     V
can.onclick = function clickEvent(e) {
    if(mode=='brush'){
        clicking = !clicking;
    }
    if(mode == 'fill')
    {
        //set up fill elements
        fillWith = currentElement;
        fillElement = board[mouseX][mouseY];

        //bug fix (get it?)
        if(fillWith == 'bugs'){
            fillWith = 'fly';
        }

        if(fillWith != fillElement){ // just so we aren't wasting anyones time

            fillCount=0;
            prevFillCount=1;

            //the program needs to be paused or it will try to do physics simulations WHILE we're filling and we DO NOT want that.
            wasPaused = paused;
            paused = true;
            setText("pause","FILLING");

            //every 1 sec, it checks if the time is uh. idk how to describe it. idk how it works tbh. it just works
            //ok so the variable fillTime increases every time fill is called, and it is compared to how long the programs been filling already.
            //because, you know, the program can't actually know if its filling or not
            var interval = setInterval(function(){
                
                //console.log(Date.now() - startTime);
                //console.log(fillTime);

                console.log(fillCount);
                console.log(prevFillCount);

                //if(Date.now() - startTime > fillTime ){
                if(fillCount == prevFillCount){
                    console.log("end fill");
                    paused = wasPaused;
                    if(paused){
                       setText("pause","PLAY");
                     }
                     else {
                       setText("pause","PAUSE");
                     }
                     clearInterval(interval);
                }
                prevFillCount = fillCount;
            },1000);

            fill(mouseX,mouseY); //dangerous line of code

        }
    }
    if(mode=="none"){
        board[mouseX][mouseY]="na";
    }
    if(mode=="void"){
        board[mouseX][mouseY]="border";
        draw(mouseX,mouseY);
    }
}

can.onmousemove = function clickEvent(e) {
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - rect.left; //x position within the element.
    mouseY = e.clientY - rect.top;  //y position within the element.

    mouseX=Math.round(mouseX/cellSize);
    mouseY=Math.round(mouseY/cellSize);
}

can.onmouseenter = function clickEvent(){
    clicking = wasClicking;
}

can.onmouseout = function clickEvent(){
    wasClicking = clicking;
    clicking = false;
}

var lastKey=""; //because like, both water and wood start with w you know
//keboard control
document.addEventListener('keydown',function(event){
    var key = event.key;
    console.log(key);
    if(key == " " || key == "escape"){// space bar wait i fogot
        pause();
    }
    else if(key == "["){
        cursorSize--;
        if(cursorSize < 1){
            cursorSize = 1;
        }
    }
    else if(key == "]"){
        cursorSize++;
        if(cursorSize >25){
            cursorSize = 25;
        }
    }
    else if(key == "Tab"){
        console.log(mode);
        if(mode == "fill"){
            modeSelect("brush");
        }
        else if(mode =="brush"){
            modeSelect("fill");
        }
        else if(mode == "none"){
            modeSelect("void");
        }
    }
    //so i was just workin on the keys, you know, nothin special, and i thought, "hm, what if you could positvely destroy the world with the arrow keys"
    //ok from here on out its all elements
    else if(key == 0 || (key =="a" && lastKey!="m")){
        buton('air','AIR','rgb(187, 187, 187)',false);
    }
    else if(key == 1 || (key =="s" && lastKey != "s" && lastKey!="w" && lastKey!="d")){
        buton('sand','SAND','#f3ce93',false);
    }
    else if(key == 2 || (key =="w" && lastKey!="w")){
        buton("water","WATER","#309BE4",false);
    }
    else if(key == 3 || (key == "w" && lastKey =="w") || (key =="o" && lastKey == "w")){
        buton("wood","WOOD","#6b3a18",false);
    }
    else if(key == 4 || (key =="f" && lastKey!="f")){
        buton("fire","FIRE","#FFAE39",false);
    }
    else if(key == 5  || (key =="m" && lastKey == "s") ){
        buton("smoke","SMOKE","#B9B9B9",false);
    }
    else if(key == 6 || (key =="l" && lastKey != "f")){
        buton("lava","LAVA","#B62203",false);
    }
    else if(key == 7 || (key =="t" && lastKey == "s")){
        buton("stone","STONE","gray",false);
    }
    else if(key == 8 || key =="m"){
        buton("moss","MOSS","green",false);
    }
    else if(key == 9 || key =="d"){
        buton("drysponge","DRY SPONGE","#ecf22e",false);
    }
    else if((key =="0" && lastKey != "1") || (lastKey == "w" && (key =="s" || key=="e"))){
        buton("wetsponge","WET SPONGE","#b3aa2e");
    }
    else if((key =="1" && lastKey != "1") || key =="p"){
        buton("paint","PAINT",paintColor);
    }
    else if((key =="2" && lastKey != "1") || (key =="b" && lastKey!="b")){
        buton("bugs","BUGS","#414141");
    }
    else if((key =="3" && lastKey != "1") || (key =="a" && lastKey=="m")){
        buton("magic","MAGIC","magenta");
    }
    //secret elements!! shhh dont tell anyone!!!
    else if((key =="l" && lastKey=="f")){
        buton("fly","FLIES","light gray",false);
    }
    else if((key == "u" && lastKey=="b")){
        buton("burning","BURNING","orange",false);
    }
    lastKey = key;
});

setInterval(function(){
    if(clicking && mode=='brush'){
        mouse(mouseX,mouseY);
    }
},delay/2);

function mouse(mx,my){
    var size = Math.floor(cursorSize/2);
    for(var a=mx-size;a<=mx+size;a++){
        for(var b=my-size; b<=my+size; b++){
            if(withinBounds(a,b)){
                if((board[a][b]=='air' || paintOver) && Math.random() > 0.1){
                    if(board[a][b] != currentElement){ //optimization
                        //bugs life
                        if(currentElement=="bugs"){    
                            if(randomNumber(Math.pow(size,6))==1){ //bugs to the sixth
                                if(Math.random() > 0.5){
                                    board[a][b]='fly';
                                }
                            }
                        }
                        else if(board[a][b] !="na"){
                            board[a][b]=currentElement;
                        }
                        draw(a,b);
                    }
                    
                }
            }
        }            
    }
}



//fill checks the areas all around it and fills accordingly. fill will only check its neighbors if it can fill the cell at a,b.
//at the start of the functio, fill does not know if it is a valid cell or not. it does not even know if it is within bounds. fill will only try to spread if it can draw/is valid however
// a and b are x and y coordinates to start filling the canvas from. be sure to define fillWith and fillElement before hand
function fill(a,b){
    //mr. grant, please dont ask me how this works. i feel like a hypothetical monkey smashing a typewriter
    if(paused){
        //update this cell
        if(simpleFill){
            setTimeout(function(){
                fillCount++;
                if(board[a][b] == fillElement && fillElement!=fillWith && paused){
                    board[a][b] = fillWith;
                    draw(a,b);

                    fill(a,b-1);
                    fill(a+1,b);
                    fill(a,b+1); 
                    fill(a-1,b); 
                }
            },1);
        } else {
                fillCount++;
                if(Math.random() > 0.5)
                {
                    setTimeout(function()
                    {
                        fill2(a,b);
                    }, 1);
                }
                else 
                {
                    fill2(a,b);
                }
            }
    }

    //if it works it works ¯\_(ツ)_/¯ 

} //also shoutouts to https://learnersbucket.com/examples/algorithms/flood-fill-algorithm-in-javascript/ for helping me with some of the philosphies behind this bit (i didn't copy paste)

//because fill will randomly delay some of its checks (intentional), fill needs 2 functions to avoid repeated code :)
function fill2(a,b){ 
    if(withinBounds(a,b)){
        if(board[a][b] == fillElement && fillElement!=fillWith && paused){
            //update this cell
            board[a][b] = fillWith;
            draw(a,b);
    
            //check surroundings
            fill(a,b-1);
            fill(a+1,b);
            fill(a,b+1); 
            fill(a-1,b); 
        }
    } 
}