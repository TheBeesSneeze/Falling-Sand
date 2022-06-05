var can = document.getElementById("canvas");
var cur = document.getElementById("cursor");

can.width=canvasWidth;
cur.width=canvasWidth;
can.height=canvasHeight;
cur.height=canvasHeight;


//pauseButton.style.left = (108 * canvasWidth / screen.availWidth) + "%"; <dont use this (i think)

let settingsGap = (canvasWidth *1.09) + "px";

//i can say with certainty that i am doing this the hard way, but i dont know the easy way ¯\_(ツ)_/¯
document.getElementById("pause").style.left = settingsGap;
document.getElementById("brushButton").style.left = settingsGap;
document.getElementById("fillButton").style.left = (canvasWidth *1.14) + "px";;


setActiveCanvas('cursor');
setFillColor(highlightColor);
setStrokeColor('rgb(0,0,0,0');

setActiveCanvas("canvas");
setStrokeWidth(3);
setStrokeColor(rgb(0,0,0,0));

setStrokeColor(rgb(0,0,0,0));//i wonder if this line is even needed 
//its not but im keeping it anyways

var board=blankList();
//var newBoard=board;   //an ancient relic.

//returns a blank list full of air, it also has a border
function blankList(){//call this at the beggining of each function, it creates a list thats only zeros
    var temp=[];
  for(var x = 0; x<columns; x++){
    var newRow=[];
    for(var y = 0; y<rows; y++){
      newRow.push('air');
    }
    temp.push(newRow);
  }
  temp = border(temp);
  return temp;
}//could probably be reworked to make a new board? when I get to that?

//creates barriers all around a board
function border(iHardlyKnower){//creates the border around the whole thing
                //iHardlyKnower is the base list
  var borderList=iHardlyKnower;
  for(var y=0; y<rows; y++){
    borderList[0][y]='border';
    borderList[columns-1][y]='border';
  }
  for(var x=0; x<columns; x++){
    borderList[x][0]='border';
    borderList[x][rows-1]='border';
  }
  return(borderList);
}

//keep display() at the bottom please. edit: i forgot why i needed to keep it at the bottom. edit 2: i still dont remember why, anyways, how are you doin? edit 3: hey thanks man, i was having a weird day but i'm feeling really good now, wbu edit 4. why the heck is display at the bottom surely it couldnt matter *that* much
//"for reasons I do not remember, display() needs to be declared last"

