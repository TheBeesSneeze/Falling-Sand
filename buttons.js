//fill is if the board should be filled if the same element is selected twice (true by default)
function buton(id,name,color,fill){ //its so much easier to have the buttons just update the main AND info screen im sorry but im lazy
    prevElement = currentElement;
    if(fill == undefined){
      fill = true;
    }  
    

    clicking=false;
    wasClicking=false;
    currentlyDrawing=false;
    
    currentElement=id;
    deselectAll();
    var button = document.getElementById(id);
    button.style.borderColor="#BAE3F2";

    setText('label',name);
    setProperty('label','background-color',color);
    
    if(id=='paint'){
      paintColor=randomColor(paintTransparency);
      setProperty("paint","background-color",paintColor);
      setProperty("label","background-color",paintColor);
    }

    if(mode == "eyeDropper"){
        
        //currentElement=id;
        modeSelect("brush");
    }

  }

//changes the color of all the buttons
  function deselectAll(){
    var buttons = document.getElementsByClassName("elementButton")
  
    for(var i=0;i<buttons.length;i++){
      buttons[i].style.borderColor="#272727";
      //setProperty(buttons[i].id,"border-color","#272727");
    }
  }

//fills the board with one color, uses border function to create a border around it all
//element (integer) - the elements index number
function fillBoard(element){
  for(var a=0;a<columns;a++){
    for(var b=0;b<rows;b++){
      if(board[a][b]!="na" && board[a][b]!="border"){
        board[a][b]=element;
      }
    }
  }
  display();
}

function pause(){
  paused = !paused;
  
  if(paused){
    setText("pause","PLAY");
  }
  else {
    setText("pause","PAUSE");
  }
  
}

function modeSelect(m,user){//user is if the mode selection is done by the user (false by default)
  if(user==undefined){
    user=false;
  }
  //change they both border colors to deselected
  document.getElementById('brushButton').style.borderColor='black';
  document.getElementById('fillButton').style.borderColor='black';
  document.getElementById("eyeDropperButton").style.borderColor="black";

  //its the little things :)
  wasClicking = false;

  //if the user selects the same mode twice
  if(mode == m){
    mode = "none";
    return;
  }
  if(mode == "eyeDropper" && user && (m=="brush" || m=="fill")){
    currentElement=prevElement;
    deselectAll();
    buton(currentElement,currentElement.toUpperCase,colors[currentElement]);
    updateLabel();
  }

  mode = m;

  if(mode != "void"){
    document.getElementById(m+'Button').style.borderColor='#BAE3F2';
  }
}