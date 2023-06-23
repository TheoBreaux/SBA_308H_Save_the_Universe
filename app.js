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
//grab spaceship image
let spaceshipImage;
//collect player name globally
let playerName;
//declare variabe to store UI response messages to player
let responseMessage;
//declare variabe to store UI attack messages to player
let attackMessage;
//declare variable to store attack button
let attackBtn;

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
  <div class="stats">
  <p id="spaceship-name"><span class="name">Ship Name: </span>${UssAssembly.name}</p>
  <p id="hull-value"><span class="name">Hull: </span>${UssAssembly.hull}</p>
  </div>
  <p id="challenge-text">
      <span id="player-name" class="name">
        ${playerName}</span><span id="response-message" class="prompt">, the aliens have launched their attack! Click your response to their attack below!👽
      </span>
      <span id="attack-message" class="prompt">
      </span>
  </p>
  <img id="spaceship-image" src="./images/alien-ship${alienShipId}.png" alt="spaceship">
  <div id="response">
  <button id="attack-btn">ATTACK!</button>
  <button id="retreat-btn">RETREAT!</button>
  </div>
`;
  document.body.append(newDiv);

  //grab spaceship name display for UI
  const spaceshipName = document.getElementById("spaceship-name");
  //grab hull value
  const hullValue = document.getElementById("hull-value");
  //grab spaceship image
  spaceshipImage = document.getElementById("spaceship-image");
  // grab response message element
  responseMessage = document.getElementById("response-message");
  //grab attack message element
  attackMessage = document.getElementById("attack-message");
  //grab attack button  image to add event listener
  attackBtn = document.getElementById("attack-btn");
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
      responseMessage.innerText = "You hit the alien ship!";
      console.log("You hit the alien ship!");

      if (target.hull > 0) {
        attackMessage.innerText = `The alien ship has ${target.hull}, remaining hull.`;
        console.log(`The alien ship has ${target.hull}, remaining hull.`);
        target.attack(this);
      } else {
        attackMessage.innerText = "You destroyed the alien ship!";
        console.log("You destroyed the alien ship!");
      }
    } else {
      attackMessage.innerText = "Your attack missed";
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
      responseMessage.inner = "You've been hit by the alien ship!";
      console.log("You've been hit by the alien ship!");

      if (target.hull > 0) {
        responseMessage.inner = `You have ${target.hull}, remaining hull.`;
        console.log(`You have ${target.hull}, remaining hull.`);
      } else {
        responseMessage.inner = "You have been destroyed by the alien ship!";
        console.log("You have been destroyed by the alien ship!");
      }
    } else {
      responseMessage.inner = "The alien ship missed you!";
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
  //styling
  document.getElementById("challenge-text").style.display = "flex";
  document.getElementById("challenge-text").style.flexDirection = "column";
  //create six Alienship instances with loop for this round
  for (let i = 0; i < 6; i++) {
    // push randomly created AlienShips to array
    alienShips.push(new AlienShip());
  }
  //remove event listener from attack button
  attackBtn.removeEventListener("click", playGame);
  // call function to attack alien ship, 0 is the first alien ship in the array
  attackAliens(0);
  attackBtn.addEventListener("click", attackAliens);
}

function retreatBattle() {
  retreatBtnPressed = true;
  document.getElementById("player-name").style.display = "none";
  responseMessage.innerText = "You retreated! Game Over";
  attackBtn.disabled = true;
}

function attackAliens(index) {
  //spaceship image trembles
  spaceshipImage.classList.add("attacked");
  //declare variable of first ship in array to battle
  const currentAlienShip = alienShips[index];

  document.getElementById("player-name").style.display = "none";

  // i attack the first alien ship, 0 is the first alien ship in the array
  UssAssembly.attack(currentAlienShip);
  //update attack button being pressed to true
  attackBtnPressed = true;

  // responseMessage.innerText = `Attacking alien ship with hull, ${currentAlienShip.hull}`;
  if (currentAlienShip.hull <= 0) {
    alienShips.shift();
  }

  //   if (alienShips.length > 0) {
  //     responseMessage.innerText =
  //       "Alien ship has been destroyed. Attack again or retreat?";

  //     attackBtnPressed = false;
  //     if (attackBtnPressed) {
  //       attackAliens(index);
  //     } else if (retreatBtnPressed) {
  //       responseMessage.innerText = "You retreated! Game Over";
  //     }
  //   } else {
  //     responseMessage.innerText = "Congratulations! You've won this battle";
  //   }
  // } else {
  //   responseMessage.innerText = "You have been hit. Attack again or retreat?";

  //   attackBtnPressed = false;

  //   if (attackBtnPressed) {
  //     attackAliens(index);
  //   } else if (retreatBtnPressed) {
  //     responseMessage.innerText = "You retreated! Game Over";
  //   }
  // }
}
