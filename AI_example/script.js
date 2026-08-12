// --------------------------------------------------
// 1. GAME STATE
// These variables remember what has happened.
// --------------------------------------------------

let health = 40;
let inventory = [];
let currentScene = "dayOne";
let powerOn = true;
let openingSceneLocked = true;
let powerTimer;
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


function updateTheme() {
  document.body.classList.remove("dark-mode");
  document.body.classList.remove("light-mode");

  if (powerOn) {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
}


function togglePower() {
  clearTimeout(powerTimer);
  powerTimer = undefined;
  powerOn = !powerOn;

  updateTheme();
  updateScene(currentScene);
}


function endOpeningLock() {
  powerTimer = undefined;
  powerOn = false;
  openingSceneLocked = false;

  updateTheme();
  updateScene(currentScene);
}


// --------------------------------------------------
// 3. STORY DATA
// Each scene contains its text and possible choices.
// --------------------------------------------------

const scenes = {
  dayOne: {
    title: "Day One: The Laboratory",

    lightText: `
      You are working in the laboratory, preparing your mice specimen for a test run simulating landing on the planet of Mars. One or two mice quietly climb out of the box, but you don’t mind too much, Miles will be able to catch them, anyways he is both emotional support cat and also spare mouse hunter. You grab the pipette, and prepare the solution that will help feed the mice for their journey to the surface of Mars. Suddenly, the lights go out.  The ship sounds slowly all turn off in the rooms around you. There are small guide lights illuminating the doorways and hallways. Where should you do?
    `,

    darkText: `
      The laboratory is dark except for the small guide lights near the doorways. You hear mice moving somewhere nearby as you prepare the solution for their journey to Mars. Where do you go to explore?
    `,

    image: "images/lab.jpeg",

    alt: "Picture of a laboratory",

 choices: [
      {
        darkText: "Go right",
        lightText: "Go to the cafeteria",
        nextScene: "cafeteria"
      },
      {
        darkText: "Go down",
        lightText: "Go to the engine room",
        nextScene: "engineRoom"
      },
     
    ]
  },

  cafeteria: {
    title: "The cafeteria",

    text: `
      s you go into the room, you are distracted by the smell of cupcakes that you left baking in the oven.   -YAAAARGGHHH- you jump back in surprise, cat scratches down your leg. You accidentally stepped on Miles as he laid in the cafeteria entry. Ouch
    `,

    image: "images/cafeteria.jpeg",

    alt: "Picture of a cat scratching a person",

    onEnter: function () {
      updateHealth(-10);
    },

 choices: [
      {
        darkText: "Go right",
        lightText: "Go to the closet ",
        nextScene: "closet"
      },
      {
        darkText: "Go down",
        lightText: "Go to the control room",
        nextScene: "controlRoom"
      },
       {
        darkText: "Go left",
        lightText: "Go to the lab",
        nextScene: "laboratory"
      },
     
    ]
  },

  laboratory: {
    title: "The laboratory",

    text: `
      As you go back into the room, you realize that all the mice you had in the box have now escaped. Rats! That’s going to be a lot of work to capture them all!     `,

    image: "images/lab.jpeg",

    alt: "Picture of mice running around the laboratory",

 choices: [
      {
        darkText: "Go right",
        lightText: "Go to the cafeteria ",
        nextScene: "cafeteria"
      },
      {
        darkText: "Go down",
        lightText: "Go to the engine room",
        nextScene: "engineRoom"
      },
     
    ]
  },

  engineRoom: {
    title: "The engine room",

    text: `
      As you go into the room, you hear the motors of the engines going. This is a good sign, this means that the ship is working fine, but the lights and machines have been turned off. `,
    image: "images/engineRoom.jpg",

    alt: "Picture of an engine room",

 choices: [
      {
        darkText: "Go up",
        lightText: "Go to the laboratory", 
        nextScene: "laboratory"
      },
      {
        darkText: "Go right",
        lightText: "Go to the control room",
        nextScene: "controlRoom"
      },
     
    ]
  },

  controlRoom: {
    title: "The control room",

    text: `
      As you go into the room, you see a soft light illuminating a single switch. It says “master switch” and it is currently turned off. What do you do?  (Turn it on or leave it off)
      After the lights are up. As you go into the room, you glance at the master switch. For some reason you are really tempted to flip it again. What do you do? (Turn it off or leave it on)
      `,

    lightText: `
      After the lights are up. As you go into the room, you glance at the master switch. For some reason you are really tempted to flip it again. What do you do?
    `,

    darkText: `
      The control room is almost completely dark. A small guide light shines on the master switch, and the silent console waits in front of you. What do you do?
    `,
    image: "images/controlRoom.jpeg",

    alt: "Picture of an engine room",

 choices: [
      {
        darkText: "Turn the power on",
        lightText: "Turn the power on",
        action: function () {
          if (powerOn) {
            showMessage("The power is already on.");
            return;
          }

          togglePower();
        }
      },
      {
        darkText: "Turn the power off",
        lightText: "Turn the power off",
        action: function () {
          if (!powerOn) {
            showMessage("The power is already off.");
            return;
          }

          togglePower();
        }
      },
      {
        darkText: "Go up",
        lightText: "Go to the laboratory", 
        nextScene: "laboratory"
      },
      {
        darkText: "Go right",
        lightText: "Go to the camera room",
        nextScene: "cameraRoom"
      },
     
    ]
  },

  cameraRoom: {
    title: "The camera room",

    text: `
      As you go into the room, you see black computer monitors. If the ship was working, you could watch the footage and see what happened. Shucks. Better keep going
      `,

    lightText: `
      After the lights are up. As you go into the room, the comforting whir of computers greets you. You flip through the footage of the different rooms. A clip in the control room catches your eye... you see Miles walking across the keyboard. Suddenly, he purrs and rolls onto his back, scratching his back directly on the master switch! Then the footage cuts to black. Miles!! This whole thing was from him? What should you do?
    `,

    image: "images/cameraRoom.png",

    alt: "Picture of an engine room",

    lightChoices: [
      {
        text: "Leave it, it's okay if it happens again.",
        action: function () {
          gameOver = true;
          showEnding("leaveMilesEnding");
        }
      },
      {
        text: "Eject Miles, and take a risk with the isolation.",
        action: function () {
          gameOver = true;
          showEnding("ejectMilesEnding");
        }
      },
      {
        text: "Install a cover for the switch.",
        action: function () {
          gameOver = true;
          showEnding("coverSwitchEnding");
        }
      }
    ],

 choices: [

      {
        darkText: "Go up",
        lightText: "Go to the closet", 
        nextScene: "closet"
      },
      {
        darkText: "Go left",
        lightText: "Go to the control room",
        nextScene: "controlRoom"
      },
     
    ]
  },

  leaveMilesEnding: {
    title: "Ending: Leave Miles",

    text: `
      You decide to just leave it. If this happens again, you know what to do. Besides it was an honest mistake... I mean it was an honest mistake, right...? As you head back to the lab to continue your research, you hear the echoes of a laugh. It sounds vaguely feline.
    `,

    image: "images/spaceship2.png",
    alt: "A dark spaceship hallway",
    choices: []
  },

  ejectMilesEnding: {
    title: "Ending: Eject Miles",

    text: `
      You decide to eject Miles. This can't happen again. Besides, as you think about the issues you've had throughout the mission, you start to notice a pattern. The extra mice on the supply probes. The menu for the food, being all so fish heavy. The communication back home being so spotty, messages with your complaints somehow being deleted from the servers.... Maybe Miles was actually trying to sabotage the mission. Better safe than sorry.
    `,

    image: "images/mars.jpg",
    alt: "A spaceship control panel",
    choices: []
  },

  coverSwitchEnding: {
    title: "Ending: Cover the Switch",

    text: `
      You decide to install a cover. You add a flap that you're pretty sure a cat can't open, just to be safe. You sigh, and head back to the lab. Time to get back to work.
    `,

    image: "images/mars.jpg",
    alt: "A covered control switch",
    choices: []
  },

  lose: {
    title: "Game Over",

    text: `
      Your energy and morale is sapped... with multiple scratches across your whole body, really what is the point? You lay down on the ground to nurse your wounds. Haha, it's almost like Miles is trying to sabotage the mission. Ow, your body hurts all over. Minutes go by, and you start to think more about the scratches.... What if Miles WAS sabotaging the mission? It was a really quick turn around from the "funding issues" to the proposal to include him on the mission.... As you lay on the floor, you go back through all the issues you've had, pre-mission and during the mission.... The extra mice on the supply probes. The menu for the food, being all so fish heavy. The communication back home being so spotty, messages with your complaints somehow being deleted from the servers.... As your vision fades to black, you see a furry silhouette over your body. Is this the end?? Your last thought is sadness, that the Mars expeditions missions will never be funded without your research.
    `,

    image: "images/evilcat.png",
    alt: "A character lying injured on the spaceship floor",
    choices: []
  },

   closet: {
    title: "The closet",

    text: `
You open the closet. You notice that the toilet paper is running low. What?? Uh oh, you wonder what you will do when you run out. Does amazon deliver this far???      `,
    image: "images/mansion.png",

    alt: "Picture of an engine room",

 choices: [

      {
        darkText: "Go left",
        lightText: "Go to the cafeteria", 
        nextScene: "cafeteria"
      },
      {
        darkText: "Go down",
        lightText: "Go to the camera room",
        nextScene: "cameraRoom"
      },
     
    ]
  },

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
  const sceneDescription = powerOn
    ? scene.lightText || scene.text
    : scene.darkText || scene.text;

  sceneText.textContent = sceneDescription.trim();
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

  const availableChoices = powerOn && scene.lightChoices
    ? scene.lightChoices
    : scene.choices;

  if (sceneName === "dayOne" && openingSceneLocked) {
    showMessage("The lights are still on. It's a normal day, or is it?");
    return;
  }

  availableChoices.forEach(function (choice) {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("choice-button");
    button.textContent = powerOn
      ? choice.lightText || choice.text
      : choice.darkText || choice.text;

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

  if (health > 40) {
    health = 40;
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
  health = 40;
  inventory = [];
  currentScene = "dayOne";
  powerOn = true;
  openingSceneLocked = true;
  gameOver = false;

  clearTimeout(powerTimer);

  healthDisplay.textContent = health;
  updateInventoryDisplay();

  notesList.innerHTML = `
    <li>Your mission was funded by NASA's Planetary Exploration Team</li>
    <li>You are trying to get the lab mice to survive various challenges</li>
    <li>This is one of several mishaps already</li>
  `;

  updateScene("dayOne");
  updateTheme();
  powerTimer = setTimeout(endOpeningLock, 10000);
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
updateTheme();
updateScene(currentScene);
powerTimer = setTimeout(endOpeningLock, 10000);