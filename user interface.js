var clicking = false;
var wasClicking = clicking; //for when the users mouse leaves the canvas but then comes bacl
var mouseX = 0;
var mouseY = 0;
var offset = 1;

// c-c-c-CALLBACK!

//     V
can.onclick = function clickEvent(e) {
    clicking = !clicking;
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

setInterval(function(){
    mouse();
},delay/2);

function mouse(){
    if(clicking){
        var size = Math.floor(cursorSize/2);
        for(var a=mouseX-size;a<=mouseX+size;a++){
            for(var b=mouseY-size; b<=mouseY+size; b++){
                if(withinBounds(a,b)){
                    if((board[a][b]=='air' || paintOver) && Math.random() > 0.1){
                        //bugs life
                        if(currentElement=="bugs"){
                            if(randomNumber(Math.pow(size,6))==1){ //bugs cubed
                                if(Math.random() > 0.5){
                                    board[a][b]='fly';
                                }
                            }
                        }
                        else {
                            board[a][b]=currentElement;
                        }
                        draw(a,b);
                    }
                }
            }
        }
    }
}