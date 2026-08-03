// --------------------------------------------------
// 1. GAME STATE
// These variables remember what has happened.
// --------------------------------------------------

let health = 100;
let inventory = [];
let currentScene = "frontGate";
let gameOver = false;


// --------------------------------------------------
// 2. PAGE ELEMENTS
// These variables connect JavaScript to the HTML.
// --------------------------------------------------

const playerNameDisplay = document.querySelector("#player-name");
const healthDisplay = document.querySelector("#health-display");
const locationDisplay = document.querySelector("#location-display");
const inventoryDisplay = document.querySelector("#inventory-display");

const sceneTitle = document.querySelector("#scene-title");
const sceneText = document.querySelector("#scene-text");
const sceneImage = document.querySelector("#scene-image");
const choicesContainer = document.querySelector("#choices-container");

const messageDisplay = document.querySelector("#message-display");
const notesList = document.querySelector("#notes-list");
const restartButton = document.querySelector("#restart-button");


// --------------------------------------------------
// 3. STORY DATA
// Each scene contains its text and possible choices.
// --------------------------------------------------

const scenes = {
  frontGate: {
    title: "Front Gate",

    text: `
      The iron gate creaks in the wind. Ahead, the front door of
      Blackwood Manor hangs partly open. A narrow path also leads
      around the side of the house.
    `,

    image: "images/mansion.png",

    alt: "Blackwood Manor during a storm",

    choices: [
      {
        text: "Enter through the front door",
        nextScene: "entranceHall"
      },
      {
        text: "Follow the path to the garden",
        nextScene: "garden"
      }
    ]
  },

  entranceHall: {
    title: "Entrance Hall",

    text: `
      Dust covers the floor. A staircase leads upward, and a dark
      hallway stretches toward the kitchen. Scratches on the floor
      suggest that something heavy was dragged toward the stairs.
    `,

    image: "images/mansion.png",

    alt: "A dark entrance hall inside the manor",

    choices: [
      {
        text: "Investigate the staircase",
        nextScene: "staircase"
      },
      {
        text: "Search the kitchen",
        nextScene: "kitchen"
      },
      {
        text: "Return to the front gate",
        nextScene: "frontGate"
      }
    ]
  },

  garden: {
    title: "Overgrown Garden",

    text: `
      The garden has become a maze of weeds. Near a broken statue,
      something metallic shines beneath a pile of leaves.
    `,

    image: "images/mansion.png",

    alt: "An overgrown garden beside the manor",

    choices: [
      {
        text: "Search beneath the leaves",
        action: pickUpKey,
        nextScene: "gardenAfterKey"
      },
      {
        text: "Climb through a broken window",
        action: function () {
          updateHealth(-25);
        },
        nextScene: "kitchen"
      },
      {
        text: "Return to the front gate",
        nextScene: "frontGate"
      }
    ]
  },

  gardenAfterKey: {
    title: "Overgrown Garden",

    text: `
      You find a small brass key engraved with the letter B.
      It may open something inside the manor.
    `,

    image: "images/mansion.png",

    alt: "A brass key found in an overgrown garden",

    choices: [
      {
        text: "Enter the manor",
        nextScene: "entranceHall"
      }
    ]
  },

  kitchen: {
    title: "Abandoned Kitchen",

    text: `
      Rusted cookware hangs above a long counter. A cabinet door
      swings open and closed. Behind it, you hear a faint scratching sound.
    `,

    image: "images/mansion.png",

    alt: "An abandoned kitchen with old cabinets",

    choices: [
      {
        text: "Open the cabinet",
        action: function () {
          updateHealth(-15);
          addCaseNote("A frightened animal was trapped inside the cabinet.");
        },
        nextScene: "kitchenAfterCabinet"
      },
      {
        text: "Search the desk",
        action: function () {
          addCaseNote(
            "A note says: 'The truth is sealed inside the laboratory.'"
          );
        },
        nextScene: "kitchenAfterDesk"
      },
      {
        text: "Return to the entrance hall",
        nextScene: "entranceHall"
      }
    ]
  },

  kitchenAfterCabinet: {
    title: "Abandoned Kitchen",

    text: `
      A frightened raccoon leaps from the cabinet and scratches your arm.
      You lose 15 health, but the animal escapes through the window.
    `,

    image: "images/mansion.png",

    alt: "An open cabinet in an abandoned kitchen",

    choices: [
      {
        text: "Search the desk",
        nextScene: "kitchenAfterDesk"
      },
      {
        text: "Return to the entrance hall",
        nextScene: "entranceHall"
      }
    ]
  },

  kitchenAfterDesk: {
    title: "Abandoned Kitchen",

    text: `
      Inside the desk, you find Dr. Blackwood's final note:
      "The truth is sealed inside the laboratory."
    `,

    image: "images/mansion.png",

    alt: "An old handwritten note on a kitchen desk",

    choices: [
      {
        text: "Return to the entrance hall",
        nextScene: "entranceHall"
      }
    ]
  },

  staircase: {
    title: "Broken Staircase",

    text: `
      Halfway upstairs, a rotten step collapses beneath you.
      You catch the railing, but injure your leg.
    `,

    image: "images/mansion.png",

    alt: "A damaged staircase inside the manor",

    onEnter: function () {
      updateHealth(-20);
    },

    choices: [
      {
        text: "Continue upstairs",
        nextScene: "laboratoryDoor"
      },
      {
        text: "Return to the entrance hall",
        nextScene: "entranceHall"
      }
    ]
  },

  laboratoryDoor: {
    title: "Locked Laboratory",

    text: `
      At the end of the upstairs corridor stands a steel door.
      Its lock contains a small brass keyhole.
    `,

    image: "images/mansion.png",

    alt: "A locked steel laboratory door",

    choices: [
      {
        text: "Try to unlock the laboratory",
        action: unlockDoor
      },
      {
        text: "Return downstairs",
        nextScene: "entranceHall"
      }
    ]
  },

  laboratory: {
    title: "The Hidden Laboratory",

    text: `
      The brass key turns. Inside, you find Dr. Blackwood's unfinished
      machine and a recorded confession. He did not disappear—he staged
      the mystery after realizing that his invention was too dangerous.
      You have solved the case.
    `,

    image: "images/mansion.png",

    alt: "A secret laboratory filled with scientific equipment",

    choices: [
      {
        text: "Finish the game",
        action: winGame
      }
    ]
  },

  ending: {
    title: "Case Closed",

    text: `
      You leave Blackwood Manor with the evidence. The mystery that
      remained unsolved for ten years has finally been explained.
    `,

    image: "images/mansion.png",

    alt: "Blackwood Manor at sunrise",

    choices: [
      {
        text: "Play again",
        action: restartGame
      }
    ]
  },

  lose: {
    title: "Investigation Failed",

    text: `
      Your injuries are too serious to continue. You escape the manor,
      but the laboratory remains locked and the mystery remains unsolved.
    `,

    image: "images/mansion.png",

    alt: "Blackwood Manor disappearing into the fog",

    choices: [
      {
        text: "Try again",
        action: restartGame
      }
    ]
  }
};


// --------------------------------------------------
// 4. UPDATE SCENE
// Displays the active scene on the page.
// --------------------------------------------------

function updateScene(sceneName) {
  if (gameOver) {
    return;
  }

  currentScene = sceneName;

  const scene = scenes[sceneName];

  if (!scene) {
    console.error(`Scene "${sceneName}" does not exist.`);
    return;
  }

  clearMessage();

  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text.trim();
  sceneImage.src = scene.image;
  sceneImage.alt = scene.alt;
  locationDisplay.textContent = scene.title;

  choicesContainer.innerHTML = "";

  if (scene.onEnter) {
    scene.onEnter();

    if (gameOver) {
      return;
    }
  }

  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("choice-button");
    button.textContent = choice.text;

    button.addEventListener("click", function () {
      handleChoice(choice);
    });

    choicesContainer.appendChild(button);
  });
}


// --------------------------------------------------
// 5. HANDLE CHOICE
// Runs a choice's action and/or changes scenes.
// --------------------------------------------------

function handleChoice(choice) {
  if (gameOver) {
    return;
  }

  if (choice.action) {
    choice.action();
  }

  if (choice.nextScene && !gameOver) {
    updateScene(choice.nextScene);
  }
}


// --------------------------------------------------
// 6. UPDATE HEALTH
// Adds or subtracts health.
// --------------------------------------------------

function updateHealth(amount) {
  health = health + amount;

  if (health > 100) {
    health = 100;
  }

  if (health < 0) {
    health = 0;
  }

  healthDisplay.textContent = health;

  if (amount < 0) {
    showMessage(`You lost ${Math.abs(amount)} health.`);
  }

  if (health <= 0) {
    gameOver = true;
    showEnding("lose");
  }
}


// --------------------------------------------------
// 7. PICK UP ITEM
// Adds the brass key to the inventory.
// --------------------------------------------------

function pickUpItem(itemName) {
  const alreadyHasItem = inventory.includes(itemName);

  if (alreadyHasItem) {
    showMessage(`You already have the ${itemName}.`);
    return;
  }

  inventory.push(itemName);
  updateInventoryDisplay();
  showMessage(`You picked up the ${itemName}.`);
}


function pickUpKey() {
  pickUpItem("brass key");
  addCaseNote("Found a brass key marked with the letter B.");
}


// --------------------------------------------------
// 8. UNLOCK DOOR
// Checks the player's inventory.
// --------------------------------------------------

function unlockDoor() {
  const hasKey = inventory.includes("brass key");

  if (hasKey) {
    showMessage("The brass key fits the lock.");
    updateScene("laboratory");
  } else {
    showMessage(
      "The laboratory is locked. You need to search for a key."
    );
  }
}


// --------------------------------------------------
// 9. SUPPORTING FUNCTIONS
// These functions update smaller parts of the page.
// --------------------------------------------------

function updateInventoryDisplay() {
  if (inventory.length === 0) {
    inventoryDisplay.textContent = "Empty";
  } else {
    inventoryDisplay.textContent = inventory.join(", ");
  }
}


function addCaseNote(note) {
  const noteAlreadyExists = Array.from(notesList.children).some(
    function (listItem) {
      return listItem.textContent === note;
    }
  );

  if (!noteAlreadyExists) {
    const listItem = document.createElement("li");
    listItem.textContent = note;
    notesList.appendChild(listItem);
  }
}


function showMessage(message) {
  messageDisplay.textContent = message;
}


function clearMessage() {
  messageDisplay.textContent = "";
}


function winGame() {
  gameOver = true;
  showEnding("ending");
}


function showEnding(sceneName) {
  const scene = scenes[sceneName];

  currentScene = sceneName;

  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text.trim();
  sceneImage.src = scene.image;
  sceneImage.alt = scene.alt;
  locationDisplay.textContent = scene.title;

  choicesContainer.innerHTML = "";

  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("choice-button");
    button.textContent = choice.text;

    button.addEventListener("click", function () {
      choice.action();
    });

    choicesContainer.appendChild(button);
  });
}


// --------------------------------------------------
// 10. RESTART GAME
// Returns all state variables to their original values.
// --------------------------------------------------

function restartGame() {
  health = 100;
  inventory = [];
  currentScene = "frontGate";
  gameOver = false;

  healthDisplay.textContent = health;
  updateInventoryDisplay();

  notesList.innerHTML = `
    <li>Dr. Blackwood disappeared ten years ago.</li>
    <li>The laboratory door was never opened.</li>
  `;

  updateScene("frontGate");
}


// --------------------------------------------------
// 11. READ THE PROFILE FORM
// Uses information passed from index.html.
// --------------------------------------------------

function loadPlayerProfile() {
  const parameters = new URLSearchParams(window.location.search);
  const detectiveName = parameters.get("detectiveName");

  if (detectiveName) {
    playerNameDisplay.textContent = detectiveName;
  }
}


// --------------------------------------------------
// 12. START THE GAME
// --------------------------------------------------

restartButton.addEventListener("click", restartGame);

loadPlayerProfile();
updateInventoryDisplay();
updateScene(currentScene);