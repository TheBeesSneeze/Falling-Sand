
MOTHERLOOP();
//ALL HAIL THE START BUTTON FOR IT CONTROLS US ALL
function MOTHERLOOP(){//this function is being held together by duct tape 
    console.log("Set up complete! Starting the loop!");
    //code that happens before a full morbius sweep:
    hasAnythingHappened=true;
    setInterval(function(){

        if(debugMode){
            setActiveCanvas("cursor");
            setFillColor("rgb(250,250,0,0.3)");
            clearCanvas();
            setActiveCanvas("canvas");
        }

        if(!paused && paused!=undefined){
            for(chunkY=chunkRows-1;chunkY>=0;chunkY--){
                for(chunkX=chunkColumns-1;chunkX>=0;chunkX--){

                    

                    hasAnythingHappened=false;
                    //console.log(chunks);
                    if(chunks[chunkX][chunkY]){

                        if(debugMode){
                            setActiveCanvas("cursor");
                            rectangle(chunkX*chunkSize*cellSize,chunkY*chunkSize*cellSize,chunkSize*cellSize,chunkSize*cellSize);
                            setActiveCanvas("canvas");
                        }

                        for(y = ((chunkY+1)*chunkSize)-1; y>=(chunkY*chunkSize); y--){
                            for(x = ((chunkX+1)*chunkSize)-1; x>=(chunkX*chunkSize); x--){

                                var e = board[x][y];
                                //checking to see if current space is air and if space has alreadx been updated
                                if(e != 'air' && e != 'stone' && e != 'wood'){//nothing happens at air, wood,stone,or moss (and others if i add them), so might as well skip them
                                    if(e == 'sand'){
                                        sand();
                                    } else if(e == 'water'){
                                        water("water");
                                    } else if(e == 'fire'){
                                        fire();
                                        hasAnythingHappened=true;
                                    } else if(e == 'smoke'){
                                        smoke();
                                        hasAnythingHappened=true;
                                    } else if(e == 'lava'){
                                        lava();
                                    } else if(e == "burning"){
                                        burning();
                                    } else if(e == 'moss'){
                                        moss();
                                    } else if(e == 'drysponge'){
                                        drySponge();
                                    } else if(e == 'wetsponge'){
                                        wetSponge();
                                    } else if(e == 'paint'){
                                        paint("paint");
                                    } else if(e == 'border'){
                                        REDACTED();
                                    } else if(e == 'fly'){
                                        fly();
                                    } else if (e == 'deadfly'){
                                        deadFly();
                                    } else if (e == "chorus"){
                                        hasAnythingHappened=true;
                                        chorus();
                                    } else if (e == 'magic'){
                                        if(!heavyElements){
                                            magic();
                                        }
                                    } else if(e=="bugs"){
                                        bugs();
                                    }
                                }

                                if(heavyElements){//hopefully this isnt too taxing lol
                                    if(!passThrough(e,["air","border"])){
                                        var i = 1;
                                        while(board[x][y+i]=="air" && i<=5){//it tries to push the element 5 spaces down bc thats just what smoke needs ig
                                            swap(x,y+i-1,x,y+i); //kinda inefficient but who cares
                                            i++;
                                        }
                                        
                                    }
                                }
                            }
            
                    }
                }  
                chunks[chunkX][chunkY]=hasAnythingHappened;
            }
        }
        if(queue.length > 0){
            updateQueue();
        }
    }
    }, delay);
}

//goes through queue and updates board accordingly. resets queue after
function updateQueue(){
    for(var i=0; i<queue.length; i++){
        var a = queue[i][0];
        var b = queue[i][1];
        var element = queue[i][2];
        board[a][b]=element;
        draw(a,b);
    }
    queue=[];
}