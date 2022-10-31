const ratio = 25;//increase this number to make there be more elements and visa versa
                                                          //R-R-RATIO!!!!!!!
const widthRatio = 15;
const heightRatio = 9;

const columns = widthRatio*ratio;//Math.round(canvasWidth/5);
const rows = heightRatio*ratio;//Math.round(canvasHeight/5);

const chunkSize=5;//amt of cells on each side of a chunk
const chunkColumns = columns/chunkSize;
const chunkRows = rows/chunkSize;

const cellSize=Math.round((screen.availWidth * 11/10)/columns*(heightRatio/widthRatio));//*(3/7);

const canvasWidth = columns*cellSize;
const canvasHeight = rows*cellSize;

var paused = false;
var hasAnythingHappened=true;
const delay = 15; //ms between each frame

var prevElement = "air";
var currentElement='air';
const simpleFill = false; //theres two fill types: efficient and simple. simple fill makes diamonds, efficient is messy but fills a lot more. neither of them are really good tbh.

//index/chunk rendering jarble

var queue = []; //queue is a 3d list, at the end of each iteration, the items in queue are updated to board. used for elements where you must be specific and cant just slide acroos.
//formatted like this: [x, y, element]

var hasAnythingHappened=true;
var chunkUpdated=true;
var x = 0;
var y = 0;
var chunkY=0;
var chunkX=0;

//index should be here but quite frankly i do not know where that little rascal went to
var cursorSize=6; //size of cursor (wow)
var mode = 'brush';
const highlightColor="rgb(0,0,0,0.1)";

  //well, these used to be user augmented, heh heh
var corruption = false;
var fancyCheck = false;
var currentlyDrawing=false;
var elementIndex = 0; //for the different rows of elements.
const paintOver = true; //whether or not you can paint over non-air cells
const cleanBrush = false;
const heavyElements = false; //funny secret gravity mode
const pushRows = 3; // the # of rows/cols of elements to be moved when you press an arrow key
const debugMode = false; //Welcome back old friend

var check = true; //not deleting check, i want it to wallow in shame