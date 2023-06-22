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

  const newDiv = document.createElement("div");
  newDiv.classList.add("attack-begins");
  newDiv.innerHTML = `
  <p class="challenge-text">
      <span class="name">${playerName}</span>, <span class="prompt">the aliens have launched their attack! Click the ship to attack back!👽</span>
  </p>
  <img id="spaceship-image" src="./images/alien-ship1.png" alt="spaceship">
`;
  document.body.append(newDiv);

  //grab spaceship image to add event listener
  const spaceshipImage = document.getElementById("spaceship-image");

  // add eventlistener to spaceship Image
  spaceshipImage.addEventListener("click");
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

// create function to run battles
function playGame() {
  //create six Alienship instances with loop for this round
  for (let i = 0; i < 6; i++) {
    // push randomly created AlienShips to array
    alienShips.push(new AlienShip());
  }
  console.log("Alien ships have started attacking! Get them!");
  // call function to attack alien ship, 0 is the first alien ship in the array
  attackAliens(0);
}

function attackAliens(index) {
  const currentAlienShip = alienShips[index];
  console.log("Attacking alien ship with hull", currentAlienShip.hull);
  // i attack the first alien ship, 0 is the first alien ship in the array
  UssAssembly.attack(currentAlienShip);

  if (currentAlienShip.hull <= 0) {
    alienShips.shift();

    if (alienShips.length > 0) {
      let retreat = prompt(
        "Alien ship has been destroyed. Attack again or retreat? (attack/retreat)"
      );
      if (retreat.toLowerCase() === "attack") {
        attackAliens(index);
      } else {
        console.log("You retreated! Game Over");
      }
    } else {
      console.log("Congratulations! You've won this battle");
    }
  } else {
    let retreat = prompt(
      "You have been hit. Attack again or retreat? (attack/retreat)"
    );
    if (retreat.toLowerCase() === "attack") {
      attackAliens(index);
    } else {
      console.log("You retreated. Game Over");
    }
  }
}

// playGame();
