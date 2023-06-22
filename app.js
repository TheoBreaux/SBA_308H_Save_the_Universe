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
}

//create my ship
const myShip = {
  name: "USS Assembly",
  hull: 20,
  firepower: 5,
  accuracy: 0.7,
  attackAlien() {
    if (Math.random() < alienShips[0].accuracy) {
      console.log("You have been hit!", this.hull);
      this.hull -= alienShips[0].firepower;
    } else if (alienShips[0].hull < 0) {
      console.log("You win!", this.hull);
      console.log("alien:", alienShips[0].hull);
      alienShips.shift();
    }
    console.log(alienShips);
  },
};

//define function to generate random whole values for alien ship properties
function randomWholeNumberGenerator(min, max) {
  const range = max - min + 1;
  const randomNum = Math.floor(Math.random() * range) + min;
  return randomNum;
}

//define function to generate random float values for alien ship properties
function randomFloatNumberGenerator(min, max) {
  const range = max - min;
  const randomNum = Math.random() * range + min;
  const roundedNum = randomNum.toFixed(1);
  return parseFloat(roundedNum);
}

//create ship class
class Ship {
  constructor(hull, firepower, accuracy, src) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.src = src;
  }
  attack() {}
}

//store alien ship objects in array
const alienShips = [];

// creates the six alien ships and stores in array
function battleShips() {
  //create alien ships
  for (let i = 0; i < 6; i++) {
    const alienShip = new Ship(
      randomWholeNumberGenerator(3, 6),
      randomWholeNumberGenerator(2, 4),
      randomFloatNumberGenerator(0.6, 0.8),
      `./images/alien-ship${i}.png`
    );
    alienShips.push(alienShip);
  }
  return alienShips;
}

console.log(battleShips());

function battle() {
  // i attack first alien ship, if i survive attack again,
  myShip.attackAlien();
}

battle();

// const newDiv = document.createElement("div");
// newDiv.classList.add("attack-begins");
// newDiv.innerHTML = `
//   <p class="challenge-text">
//       <span class="name">${playerName}</span>, <span class="prompt">the aliens have launched their attack! Click the ship to attack back!👽</span>
//   </p>
//   <img id="spaceship-image" src="./images/alien-ship.png" alt="spaceship">
// `;
// document.body.append(newDiv);

// //grab spaceship image to add event listener
// const spaceshipImage = document.getElementById("spaceship-image");

// // add eventlistener to spaceship Image
// spaceshipImage.addEventListener("click", attackSpaceship);

function attackSpaceship() {
  console.log("I FEEL ATACKED!!!");
  //alien ship survival = random number generated greater less than 0.5, alien attacks again
  //else if random number is great than 0.5, i attack the alien ship
  //if i destroy ship (ships score is 0 or less, i win)
}

const myVictory = () => {
  //if i survive, i have an option to attack again or retreat
  //if i retreat the game ends
  //if i destroy all six alien ships I win
  //i lose if i am destroyed
};

// there should be an i lose function
const myDefeat = () => {
  // i die, if number generated is less than 0.5
  //if survuves attacks me again
};
