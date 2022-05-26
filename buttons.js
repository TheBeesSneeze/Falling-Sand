function buton(id,name,color){ //its so much easier to have the buttons just update the main AND info screen im sorry but im lazy
    if(currentElement==id){
      fillBoard(id);
      return;
    }
    console.log(name);
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
  }

//changes the color of all the buttons
  function deselectAll(){
    var buttons = document.getElementsByTagName('BUTTON');
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
      board[a][b]=element;
    }
  }
  board=border(board);
  display();
}