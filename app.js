//use window.prompt to get info from user
//use buttons in the browser, console.log, window.alert

function meetPlayer() {
  document.createElement("div");

  const playerName = prompt("Please enter your name cadet:");
}

const gameStartBtn = document.getElementById("game-start-btn");
gameStartBtn.addEventListener("click", invasion);

function invasion() {
  alert(
    "The aliens have launched their attack! Click the button to fight back!👽"
  );
}

function startGame() {
  gameStartBtn.style.display = "none";
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
