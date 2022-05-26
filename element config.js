const elementList={
    air: {
      colors:["white"],
    },
    border: {
      colors:["black"],
    },
    sand: {
      colors:["#ffe0ab","#f3ce93","#ffe0ab","#dab984"],
    },
    water: {
      colors: ["#309BE4","#109CFC","#45B3FF","#2999E6","#5FBEFF"],
    },
    wood: {
      colors: ["#453B3B","#4E403E","#564540","#5F4B43","#675045","#705548"],
    },
    fire: {
      colors:["#ff9933","#ffa94d","#ffc266","#FF9800","#FBB741","#ed7700"],
    },
    burning: {
      colors:["#801100",'#801100',"#B62203","#D73502","#FF9800","#FBB741","#ed7700"],//shoutouts firescheme dot com for this one
    },
    smoke: {
      colors:["#999999","#808080","#b3b3b3","#999999","#cfcbc8","#878686","#696969"],
    },
    stone:{
      colors:['gray'],
    },
    moss: {
      colors:["green","#355E3B","#22872f","#36753e","#155911"],
    },
    drysponge: {
      colors:["#e0e649","#ecf22e","#bde327","#d5e887","#fcf521"],
    },
    wetsponge: {
      colors:["#bdb65b","#b3aa2e","#cfc211"],
    },
    lava: {
      colors:["#B62203","orange"],
    },
    paint: {
      colors:['red'],
    },
    fly: {
      colors:['#333333','#565656','#CFCFCF'],
    },
    deadfly: {
      colors:['#333333','#565656','#CFCFCF'],
    },
    magic: {
      colors:['magenta'],
    },
  }


//if thirstySponges is true, dry  sponges will never become wet
const thirstySponges=false;
var drippySpongeCheck = false; //DONT MESS WITH DRIPPY SPONGE CHECK WHATEVER YOU DO

const burningToFireChance=125;
const fireToSmokeChance=75;
const smokeToAirChance=90;
const wetSpongeChance=10; //when dry sponge absorbs water, there is a 1 in wetSpongeChance that the dry sponge will become wet
const wetSpongeDripChance=50;

const spongeRadius = 2; //how many spaces in each direction a sponge will try to dry water

const dangerousMagic = true; //based on a glitch from when i was making magic

// everything from this point onwards is colors

//list contains every color an element can be, the variables to the right are the amount of colors minus 1, they reduce the amount of calculations for the computer
const airColor="white";

const colors=["black","black","black","black","black","black","black","#4e0a5e","#4e0a5e","#320d3b","#320d3b","#110314","#110314","#25012e","#25012e","#311e36","#311e36",
"#607d6e","#612420" //the wacky ones
]; const colorss = colors.length-1; //sorry i didnt know what else to call it

const paintTransparency=0.2;
var paintColor="red";

//returns random 
function randomColor(a){
    if(a==undefined){
        a=1;
    }
    let r = randomNumber(25,240); 
    let g = randomNumber(25,240); 
    let b = randomNumber(25,240); 
    //nightmare nightmare nightmare nightmare nightmare
    return(rgb(r,g,b,a));
  }