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
    <p class="prompt">
        <span class="name">${playerName}</span>, the aliens have launched their attack! Click the button to fight
        back!👽
    </p>
    <img src="./images/alien-ship.png" alt="spaceship">
    <button id="attack-btn">Attack</button>
  `;
  document.body.append(newDiv);
}

// function showAlert() {
//   // Create the dialog box
//   var dialog = document.createElement('div');
//   dialog.classList.add('dialog');

//   // Add the message
//   var message = document.createElement('p');
//   message.textContent = "The aliens have invaded! What do you want to do?";
//   dialog.appendChild(message);

//   // Add the buttons
//   var fightButton = document.createElement('button');
//   fightButton.textContent = "Fight Back";
//   fightButton.addEventListener('click', fightBack);
//   dialog.appendChild(fightButton);

//   var runButton = document.createElement('button');
//   runButton.textContent = "Run Away";
//   runButton.addEventListener('click', runAway);
//   dialog.appendChild(runButton);

//   // Add the dialog box to the document
//   document.body.appendChild(dialog);
// }

// function fightBack() {
//   alert("You fought back against the aliens!");
//   closeDialog();
// }

// function runAway() {
//   alert("You ran away from the aliens!");
//   closeDialog();
// }

// function closeDialog() {
//   var dialog = document.querySelector('.dialog');
//   dialog.parentNode.removeChild(dialog);
// }

// there should be an i win function
const myVictory = () => {
  //i survive if number generated is higher than 0.5
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

// class Ship {
//   constructor() {

//   }
// }
