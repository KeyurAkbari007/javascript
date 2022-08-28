var game = document.getElementById("game");
let forStart = document.querySelector(".forStart");
let score_display =document.getElementById('score_display');
let count_display = document.getElementById('counter');
var interval;
var both = 0;
let counter = 0;
let score =0;
var currentBlocks = [];
let flagStart = false;
let audio = new Audio();
audio.src = "Gopi.mp3";
let audio1 = new Audio();
audio1.src = "crodh.mp3";
let flagScore=true;

function moveLeft() {
  if (flagStart) {
    var left = parseInt(
      window.getComputedStyle(character).getPropertyValue("left")
    );
    // console.log(left)
    if (left > 0) {
      character.style.left = left - 2 + "px";
    }
  } else {
    forStart.setAttribute("id", "forStart");
    forStart.classList.remove("forStart");
    score_display.setAttribute("class","score_display")
  }
}
function moveRight() {
  if (flagStart) {
    var left = parseInt(
      window.getComputedStyle(character).getPropertyValue("left")
    );
    if (left < 380) {
      character.style.left = left + 2 + "px";
    }
  } else {
    forStart.setAttribute("id", "forStart");
    forStart.classList.remove("forStart");
    score_display.setAttribute("class","score_display");
  }
}
document.addEventListener("keydown", (event) => {
  if (both == 0) {
    both++;
    if (event.key === "ArrowLeft") {
      interval = setInterval(moveLeft, 1);
    }
    if (event.key === "ArrowRight") {
      interval = setInterval(moveRight, 1);
    }
  }
});
document.addEventListener("keyup", (event) => {
  clearInterval(interval);
  both = 0;
});
let flag = true;
let startBtn = document.getElementById("divbtn");
function start() {
  audio.play();
  score_display.setAttribute("class","score_display")
  character = document.getElementById("character");
  forStart.classList.add("forStart");
  forStart.setAttribute("id", "");
  flagStart = true;
  startBtn.classList.add("hide");
  // startBtn.disabled=true;
  blocks = setInterval(menu, 1);
}
function menu() {
  var blockLast = document.getElementById("block" + (counter - 1));
  var holeLast = document.getElementById("hole" + (counter - 1));
  if (counter > 0) {
    var blockLastTop = parseInt(
      window.getComputedStyle(blockLast).getPropertyValue("top")
    );
    var holeLastTop = parseInt(
      window.getComputedStyle(holeLast).getPropertyValue("top")
    );
  }
  // console.log('block'+blockLastTop)
  // console.log('hole'+holeLastTop)
  if (blockLastTop < 400 || counter == 0) {
    var block = document.createElement("div");
    var hole = document.createElement("div");
    // console.log(block);


    block.setAttribute("class", "block");
    hole.setAttribute("class", "hole");
    block.setAttribute("id", "block" + counter);
    hole.setAttribute("id", "hole" + counter);
    block.style.top = blockLastTop + 100 + "px";
    hole.style.top = holeLastTop + 100 + "px";
    var random = Math.floor(Math.random() * 360);
    hole.style.left = random + "px";
    game.appendChild(block);
    game.appendChild(hole);
    currentBlocks.push(counter);
    counter++;
    

  }
  var characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  // console.log(characterTop)
  var characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  // console.log(characterLeft);
  var drop = 0;
  if (characterTop <= 0) {
    
    score_display.classList.remove("score_display");
    score_display.setAttribute("class","score_display2")
    
    

    clear();

    audio1.play();
  }
  for (var i = 0; i < currentBlocks.length; i++) {
    let current = currentBlocks[i];
    let iblock = document.getElementById("block" + current);
    let ihole = document.getElementById("hole" + current);
    let iblockTop = parseFloat(
      window.getComputedStyle(iblock).getPropertyValue("top")
    );
    let iholeLeft = parseFloat(
      window.getComputedStyle(ihole).getPropertyValue("left")
    );
    // if(count>=20)
    // {
    //   iblock.style.top = iblockTop - 1 + "px";
    //   ihole.style.top = iblockTop - 1 + "px";
    // }
    if (counter - 9 > 10) {
      iblock.style.top = iblockTop - 0.8 + "px";
      ihole.style.top = iblockTop - 0.8 + "px";
    } else if(counter - 9 > 15) {
      iblock.style.top = iblockTop - 1 + "px";
      ihole.style.top = iblockTop - 1 + "px";
    }
    else if(counter - 9 > 20) {
      iblock.style.top = iblockTop - 1.3 + "px";
      ihole.style.top = iblockTop - 1.3 + "px";
    }
    else if(counter - 9 > 40) {
      iblock.style.top = iblockTop - 1.6 + "px";
      ihole.style.top = iblockTop - 1.6 + "px";
    }
    else{
      iblock.style.top = iblockTop - 0.5 + "px";
      ihole.style.top = iblockTop - 0.5 + "px";
    }

    if (iblockTop < -20) {
      currentBlocks.shift();
      iblock.remove();
      ihole.remove();
    }
    if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
      drop++;
      
      
      if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
        drop = 0;
        if(flagScore){
          score++;
          count_display.innerHTML=score;
          flagScore=false
        }
      }
      else if(){
        flagScore=true;
      }
    }
  }
  if (drop == 0) {
    if (characterTop < 480) {
      score++;
      count_display.innerHTML=parseInt(score);
      character.style.top = characterTop + 2 + "px";
    }
  } else if (counter - 9 > 5) {
    character.style.top = characterTop - 2 + "px";
  } else {
    character.style.top = characterTop - 0.5 + "px";
  }
}
// let flag_start=0;
function clear() {
  // startrepeat();
  //   both = 0;
  //  counter = 0;
  //  currentBlocks = [];
  // startBtn.disabled=false;

  clearInterval(blocks);
  startBtn.classList.remove("hide");
  game.innerHTML = "";
  game.innerHTML = `<div id="character"></div>`;
  flagStart = false;

  audio.pause();

  // console.log(character)
  // character.style.top=400+"px";
  // character.style.left=190+"px";

  game = document.getElementById("game");
  // console.log(character);

  // console.log(counter - 9);
  both = 0;
  counter = 0;
  drop = -1;
  currentBlocks = [];

  // location.reload();
}
// function startrepeat() {

// }
