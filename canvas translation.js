var activeCanvas="canvas";
var strokeWidth=1;
var strokeColor="white";
var fillColor="black";

setActiveCanvas("canvas");

//""sets"" the active canvas to whatever is passed through canvas. in actuality, it just stores the activeCanvas to the id
function setActiveCanvas(canvas){
    activeCanvas=canvas;
}

//javascripts built in rectangle function is called rect, so youre going to need to replace all instances of 'rect()' with 'rectangle' sorry.
function rectangle(x,y,width,height){
    var c = document.getElementById(activeCanvas);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = String(strokeWidth);
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.rect(x, y, width, height);
    ctx.fillRect(x,y,width,height);
    ctx.fill();
    ctx.stroke();
}

//wid doesnt necessarily need to be an integer, you can use 'px' or 'in' if you want (NOT TESTED. MIGHT NOT WORK)
function setStrokeWidth(wid){
    strokeWidth=wid;
}

function setStrokeColor(color){
    strokeColor=color;
}

function setFillColor(color){
    fillColor = color;
}