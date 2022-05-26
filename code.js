//i think i cut and pasted everything from this function... its all gone...

//NOTES:
// If you're reading this, hello! Thank you for looking at the code I really appreciate it.
//
// Every line of code here was written by me, and it shows.
// I'm just gonna apologize in advance, a LOT of comments here are out of date. This code 
// has gone through SO many massive changes... Not to mention that a lot of the comments    //-are out of date? i left this comment unfinished... fitting
// are just sorta ramblings that make sense to me? yeah like half the comments are just me
// writing about my feelings rather than anything else.
// This all started as a person passion project/ learning experience, but I'm pretty sure I'm
// gonna  be turning it in as my final project.
//
// But let it be clear I'm making this project for me and myself.

//TO DO:
// uh make chance of fire turning to smoke higher while keeping chance of it duplicating the same?
 // (why did i make them the same chance variable again?)
// make cursor color match currently selected
// if you could figure out velocity that would be the coolest thing of the world
// Ideas: 
 //snow? 
 //tnt?
 //  ...goldfish?
 // redstone.
 //"magic" which has conway game of life physics
  //or you could add an option that gives fire conways game of life physics lmao
 //duplicator
// add option to change background color (air color)
// option to have sponges absorb all always
// remove the fuck words 
// a little trolling
// you could actually optimize any program that switches canvases, i just learned that the active colors are different for each board, so i could be wasting processing power by restating the canvas's rules
// maybe make the chunks 1x1 DONT DO THIS ACTUALLY. THEN WE ARE BACK WHERE WE STARTED.
 //wait but what if thetre was 2 chunk lists and the uh the uah they overlap
//  ok but what if they were 4x4
// keyboard control?
// more colors?
// wtf is going on with water/moss get the checked out
// change the method for getting chunk from a point to compare the current chunk * 5 with the index
// make chunks a 2d array instead of boolean
// you might be able to make draw a little faster by rearranging the elements IDs and grouping the indexs that change colors together and having it be like 'if(board[x][y] > 0 && <4)'
// make moss its own function and make it check for moss before water
 // also a wood function 
  // what?
// make thems little debug squares a part of draw() instead of swap()
// make the motherloop a part of the onevent for start button and a timed for loop on a remixed version
// i dont remember how i made the thing that fills the screen work, but you could probably easily touch up blankBoard to make optimize that little bit
// ok hear me out: chunks of chunks.
// rework moss to be more moss-like
// new paint color button
// seeds. new petal element or just recolored wood.
// !!!try replacing all those math variables with fucking nothing by just getting rid of them

//========================- refrences: -========================
//| 300 pixels wide | 400 pixels tall |
//|  60 pixels wide |  80 pixels tall | 4800 pixels total | each pixel is actually 5x5 pixels hehe |
//|  12 chunks wide |  16 chunks tall |
//| 0 = air | 1 = sand | 2 = water | 3 = wood | 4 = fire | 5 = smoke | 6 = lava | 7 = stone | 
//| 0,0,0,0 | "#FFE0AB"| "#309BE4" | "#6b3a18"| #FFAE39  | "#B9B9B9" | "orange" | "gray"    | 
//| 8 = moss | 9 = dry sponge | 10 = wet sponge  | 11 = paint | 99 = barrier | 
//| "green"  | "#ecf22e"      |  "#b3aa2e"       | random     | "black"      |

// == LIBRARIES ==
//im not using libraries anymore but i wanna keep this comment as a memorial to what once was


//              ~ welcome to spaghetti central ~


//======================- VARIABLES -=======================
//CLOSE ME
//unchanging variables and general startup 


//========================-   UI   -========================


//evil start button be like:



//adds the uh, yknow, the paint
function paintCursor(mouse){
  if(currentlyDrawing==true){
    setActiveCanvas("canvas1");
    //get mouse location
    var mouseX=Math.round((mouse.x-10)/5);
    var mouseY=Math.round((mouse.y-10)/5);
  
    //bit of code that adds the currentElement to the mouse location
    //please dont overwrite barriers
    var left =Math.round(mouseX-(size/2));
    var right = Math.round(mouseX+(size/2))-1;
    var up = Math.round(mouseY-(size/2));
    var down = Math.round(mouseY+(size/2))-1;
    for(var m=left;m<=right;m++){//x
      for(var n=up;n<=down;n++){//y
        if(m > 0 && m<width && n > 0 && n < height){
          if(m != 0 && m != 59 && n != 0 && n != 79 && board[n][m] != currentElement){
            if(fancyCheck && size > 1){
              var speckle = randomNumber(((size*size) / (2 + (1/size) )));//if the current index is equal to speckle, it wont draw
              if(speckle != 0){
                if(!((m==left && n==up) || (m==left && n==down) || (m == right && n==up) || (m == right && n==down)) || size<=3){
                  board[n][m]=currentElement;
                  if(currentElement==99){
                    mask(m,n,"black");
                  } 
                  else {
                    draw(m,n);
                  }
                }
              }
            } 
            else{
              board[n][m]=currentElement;
              if(currentElement==99){
                mask(m,n,"black");
              } 
              else {
                draw(m,n);
              }
            }
          }
        }                         //it just keeps tumbling down, tumbling down, tumbling dooooooown
      }
    }
  }
}

//changes border colors of buttons, makes all buttons dark grey then selected blue and



if(debugMode){showElement("saveButton");}//this line is intentionally placed here, for dev testing, might not be necessary if i ever do some kind of "final build"
//formats the list in an organized/optimized way so the user (by user, I mean me) can easily copy/paste their code

//=the rest of UI is just buttons lol, i really hope there wasnt a way to optimize it
//by default, air is selected


//manages what happens when a button is pressed, not a typo, you get an error if you name it button
//id - element number (ex: 0 = air, 1 = sand, etc) | name - name to be displayed: Ex: "Air" or "Sand". Color - Color of text  

//indexCheck makes sure the left and right buttons are their appropriate colors
function indexCheck(){
  if(index != 0){
    setProperty("leftButton","background-color","#BAE3F2");
  } 
  else {
    setProperty("leftButton","background-color","#B7CFD8");
  }
  if(index != boardSet.length-1){
    setProperty("rightButton","background-color","#BAE3F2");
  } 
  else {
    setProperty("rightButton","background-color","#B7CFD8");
  }
}



//cycles through the text on the info page. only a function because i want the code to run if the user clicks on the text in front of the welcome textbox (because the user is dumb and stupid and idiot)
function infoWelcome(){//bro i messed up this function so bad but it works and it hardly has any affect on anything at all
                        //just realized that i made code that wasnt perfectly optimized and i say "i messed up this function so bad". i think i hold myself in too high of a standard. keep this function here and don't ever optimize it. let this function be a lesson. that i dont need to be perfect. maybe im just good enough the way i am and thats okay
  if(welcomeIndex < welcomeText.length-1){//this code scalable af yo
    welcomeIndex++;
  } 
  else {
    welcomeIndex=1; //index is 1 instead of 0 so i can give away five real life dollars
  }
  setText("warmWelcome",welcomeText[welcomeIndex]);
  hideElement("clickNext");
}


//========================- ENGINE -========================










//determines what color based off value of index, then draws one 5x5 pixel



//========================- MODES -=========================



//========================- BOARDS -========================

//*does a little bow and exits the stage as the crowd goes wild*