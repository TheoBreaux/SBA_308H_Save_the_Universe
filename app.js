//grab intial graphics div
const gameStartGraphics = document.getElementById("game-start-setup");
//grab game kick alien butt button
const kickAlienButtBtn = document.getElementById("kick-alien-butt-btn");
//grab start game button
const startGameBtn = document.getElementById("start-game-btn");
//grab meet player prompt
const meetPlayerPrompt = document.getElementById("meet-player-prompt");
//add event listener to kick alien butt button
kickAlienButtBtn.addEventListener("click", invasion);
//add event listener to start game button
startGameBtn.addEventListener("click", startGame);
//grab player name input
const playerNameInput = document.getElementById("player-name-input");
//collect player name globally
let playerName;
//declare variabe to store UI response messages to player
let responseMessage;

//removes initial graphics and gets player name
function invasion() {
  gameStartGraphics.style.display = "none";
  meetPlayerPrompt.style.display = "flex";
}

function startGame() {
  if (playerNameInput.value !== "") {
    playerName = playerNameInput.value;
  } else {
    playerName = "Player";
  }
  meetPlayerPrompt.style.display = "none";
  const alienShipId = Math.floor(Math.random() * 6);
  const newDiv = document.createElement("div");
  newDiv.classList.add("attack-begins");
  newDiv.innerHTML = `
  <p id="challenge-text">
      <span id="player-name" class="name">${playerName}</span> <span id="response-message" class="prompt">, the aliens have launched their attack! Click your response to their attack below!👽</span>
  </p>
  <img id="spaceship-image" src="./images/alien-ship${alienShipId}.png" alt="spaceship">
  <div id="response">
  <button id="attack-btn">ATTACK!</button>
  <button id="retreat-btn">RETREAT!</button>
  </div>
`;
  document.body.append(newDiv);

  // grab response message element
  responseMessage = document.getElementById("response-message");

  //grab attack button  image to add event listener
  const attackBtn = document.getElementById("attack-btn");
  //grab retreat button
  const retreatBtn = document.getElementById("retreat-btn");
  // add eventlistener to response buttons
  attackBtn.addEventListener("click", playGame);
  retreatBtn.addEventListener("click", retreatBattle);
}

//create ship class
class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  attack(target) {
    if (Math.random() < this.accuracy) {
      target.hull -= this.firepower;
      console.log("You hit the alien ship!");

      if (target.hull > 0) {
        console.log(`The alien ship has ${target.hull}, remaining hull.`);
        target.attack(this);
      } else {
        console.log("You destroyed the alien ship!");
      }
    } else {
      console.log("Your attack missed");
      target.attack(this);
    }
  }
}

//create my MyShip class
class MyShip extends Ship {
  constructor(hull, firepower, accuracy, name) {
    super(hull, firepower, accuracy);
    this.name = name;
  }
}

// create AlienShip class
class AlienShip extends Ship {
  constructor() {
    //store generated random values for ship properties (hull, firepower, accuracy)
    const hull = Math.floor(Math.random() * 4) + 3;
    const firepower = Math.floor(Math.random() * 3) + 2;
    const accuracy = parseFloat((Math.random() * 0.2 + 0.6).toFixed(1));
    super(hull, firepower, accuracy);
  }
  attack(target) {
    if (Math.random() < this.accuracy) {
      target.hull -= this.firepower;
      console.log("You've been hit by the alien ship!");

      if (target.hull > 0) {
        console.log(`You have ${target.hull}, remaining hull.`);
      } else {
        console.log("You have been destroyed by the alien ship!");
      }
    } else {
      console.log("The alien ship missed you!");
      target.attack(this);
    }
  }
}

//create array to store alien ship objects
const alienShips = [];
//create my Myship instance for this battle round
const UssAssembly = new MyShip(20, 5, 0.7, "USS Assembly");
//track if attack button has been pressed
let attackBtnPressed = false;
//track if retreat button has been presssed
let retreatBtnPressed = false;

// create function to run battles
function playGame() {
  //create six Alienship instances with loop for this round
  for (let i = 0; i < 6; i++) {
    // push randomly created AlienShips to array
    alienShips.push(new AlienShip());
  }
  // call function to attack alien ship, 0 is the first alien ship in the array
  attackAliens(0);
}

function retreatBattle() {
  retreatBtnPressed = true;
  document.getElementById("player-name").style.display = "none";
  responseMessage.innerText = "You retreated! Game Over";
}

function attackAliens(index) {
  const currentAlienShip = alienShips[index];
  document.getElementById("player-name").style.display = "none";
  responseMessage.innerText = `Attacking alien ship with hull!, ${currentAlienShip.hull}`;
  // i attack the first alien ship, 0 is the first alien ship in the array
  UssAssembly.attack(currentAlienShip);
  //update attack button being pressed to true
  attackBtnPressed = true;

  if (currentAlienShip.hull <= 0) {
    alienShips.shift();

    if (alienShips.length > 0) {
      responseMessage.innerText =
        "Alien ship has been destroyed. Attack again or retreat?";

      attackBtnPressed = false;
      if (attackBtnPressed) {
        attackAliens(index);
      } else if (retreatBtnPressed) {
        responseMessage.innerText = "You retreated! Game Over";
      }
    } else {
      responseMessage.innerText = "Congratulations! You've won this battle";
    }
  } else {
    responseMessage.innerText = "You have been hit. Attack again or retreat?";

    attackBtnPressed = false;

    if (attackBtnPressed) {
      attackAliens(index);
    } else if (retreatBtnPressed) {
      responseMessage.innerText = "You retreated! Game Over";
    }
  }
}
