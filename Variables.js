const ratio = 20;//increase this number to make there be more elements and visa versa

const widthRatio = 16;
const heightRatio = 9;

const columns = widthRatio*ratio;//Math.round(canvasWidth/5);
const rows = heightRatio*ratio;//Math.round(canvasHeight/5);

const cellSize=Math.round((screen.availWidth * 11/10)/columns*(heightRatio/widthRatio));//*(3/7);
const chunkSize=5;

const canvasWidth = columns*cellSize;
const canvasHeight = rows*cellSize;

const elements = 11; //the number of elements, change this if you add more elements

const delay = 10; //ms between each uh frame

var currentElement='burning';

//index/chunk rendering jarble

var chunks = [];
var falseChunks=[]; //evil chunks be like:
var trueChunks=[]; //evil false chunks be like:
var chunkQueue=[];
for(var i = 0;i < rows/chunkSize; i++){
  var trueTempChunk=[];
  var falseTempChunk=[];
  for(var j = 0; j<columns/chunkSize; j++){
    trueTempChunk.push(true);
    falseTempChunk.push(false);
  }
  trueChunks.push(trueTempChunk);
  falseChunks.push(falseTempChunk);//why did i do appendItem instead of just making it equal to?????? eh if it works it works
} //yea i just put that whole command in one line so what (this used to be funny but then i decided putting it on one line was a shitty idea)

chunkQueue = falseChunks;
chunks = trueChunks;
var chunkX = Math.round(columns/cellSize); //if you edit the size fix these
var chunkY = Math.round(rows/cellSize);
const chunkScaleX = chunkX * cellSize; //chunkScales are the chunks "real" values, they make math faster.
const chunkScaleY = chunkY * cellSize;
var hasAnythingHappened=true;
var chunkUpdated=true;
var x = 0;
var y = 0;

//user augmented variables
//index should be here but quite frankly i do not know where that little rascal went to
var cursorSize=5; //size of cursor (wow)
var debugMode = false;
var rainCheck = false;
var corruption = false;
var fancyCheck = false;
var currentlyDrawing=false;
var elementIndex = 0; //for the different rows of elements.
const paintOver = true; //whether or not you can paint over non-air cells

//texts

var infoText = [ //UPDATE AS YOU ADD MORE ELEMENTS, the program SHOULD scale as you add more descriptions
  "Air does nothing.", //air
  "Sand will always try to fall directly below it, if it can't, then it will try to fall to its sides.", //sand
  "Water will always try to fall directly below it, if it can't then it will randomly move left or right. Furthermore, water will put out fires (producing smoke), cool lava (producing stone) and be overtaken by mosss", //water
  "Wood doesn't move. It can be destroyed by fire and lava", //wood
  "Fire will move to a random direction. Fire always has a chance to spread to nearby air spaces, or it may also turn to smoke. Fire is extinguished by water, and it may spread to wood and mosss.", //fire
  "Smoke is created by fire when it is extinguished. Smoke will rise and eventually disappear.", //smoke
  "Lava moves slower than other elements. Lava will melt through wood and mosss. When lava makes contact with water, it will make stone", //lava
  "Stone is produced when water and lava make contact. It is indestructable.", //stone
  "moss spreads through water and can be burned by fire.", //moss
  "Dry Sponge can absorb nearby water, after which it may turn into a wet sponge. Sorry the header's hard to read.", //dry sponge
  "placeholder sponge text",//"Wet sponges can be dried by fire or lava. Wet Sponges are produced when Dry sponges touch water.", //wet sponge
  "paint text",
  "The four walls that keep us enclosed. Acting as shackles, restraining us from the freedoms of having a bigger canvas", //barrier
];
var welcomeText = [//uses index btw
  "if youre reading this, text me 'bubbled eggs' and i will give you five dollars no cap",//im only doing this for one person. get it while its hot.
  "Welcome to the Falling Sand Simulator! Essentially this program is meant to simulate different particles, each with their own properties and physics.",
  "btw if you find any bugs / have any suggestions PLEASE hmu. i am so thirsty for new ideas for elements/ modes.",
  "Somewhere in November of 2021, I decided I wanted to make a falling sand simulator, not really knowing what kind of a daunting task that would be. Ever since then I would find myself working on this program nearly every day.",
  "This program was inspired by similar classic 'falling sand' type games. With the exception of Noita, it's pretty rare to see people talking about falling sand, which adds to the reason I love it so much.",
  "If you tried the program already I'm sure you've noticed some things. If you want it to go faster, you're just going to need to use less particles :/",
  "Feel free to look at the code! It's not good by any means, but I wrote every line myself so I'm proud of it nonetheless.",
  "bro this text is so bad lmao im gonna change it all soon",
  "i want to edit these text messages to include a super in depth on how the code works, but i havent done that yet. ill remove this message when this happens",
  "ok these messages are going to loop around now",
];
var welcomeIndex=1; 

//flowers
// x = skip/empty | 8 = moss | "r" = red, "w" = white, "y" = yellow
//petals are recolored wood 
var flower1=[
  ["x","y","x"],
  ["y","w","y"],
  ["x","y","x"],
  ["x","m","x"],
  ["x","m","m"],
  ["m","m","x"],
  ["x","m,","x"]
  ];

var check = true; //not deleting check, i want it to wallow in shame