MOTHERLOOP();

//ALL HAIL THE START BUTTON FOR IT CONTROLS US ALL
function MOTHERLOOP(){//this function is being held together by duct tape 
    console.log("Set up complete! Starting the loop!");
    //code that happens before a full morbius sweep:
    hasAnythingHappened=true;
    setInterval(function(){
        if(!paused && paused!=undefined){
            //code that happens before each chunk
            hasAnythingHappened=false;
            for(y = rows-1; y>=0; y--){//hex the code used to be like "x = height-2" and "              = width-2" but i got ridda that because i think its doing that calculation everxtime? i dunno how bigga difference it makes, but if it saves processing time then its worth it
                for(x = columns-1; x>=0; x--){
                  
                    //checking to see if current space is air and if space has alreadx been updated
                    if(board[x][y] != 'air' && board[x][y] != 'stone' && board[x][y] != 'wood'){//nothing happens at air, wood,stone,or moss (and others if i add them), so might as well skip them
                        if(board[x][y] == 'sand'){
                            sand();
                        } else if(board[x][y] == 'water'){
                            water("water");
                        } else if(board[x][y] == 'fire'){
                            fire();
                        } else if(board[x][y] == 'smoke'){
                            smoke();
                        } else if(board[x][y] == 'lava'){
                            lava();
                        } else if(board[x][y] == "burning"){
                            burning();
                        } else if(board[x][y] == 'moss'){
                            moss();
                        } else if(board[x][y] == 'drysponge'){
                            drySponge();
                        } else if(board[x][y] == 'wetsponge'){
                            wetSponge();
                        } else if(board[x][y] == 'paint'){
                            paint("paint");
                        } else if(board[x][y] == 'border'){
                            REDACTED();
                        } else if(board[x][y] == 'fly'){
                            fly();
                        } else if (board[x][y] == 'deadfly'){
                            deadFly();
                        } else if(board[x][y] == 'magic'){
                            magic();
                        }
                    }
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