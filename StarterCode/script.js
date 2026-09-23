
// --------------------------------------------------
// SCENES
// Create a variable for the current location
// Create an object that holds the repeatable text for each location
// --------------------------------------------------
let currentScene = "backyard";

const scenes = {
  backyard: {
    title: "Location: Backyard",
    interviewee: "Interviewee:Grandma",
    text: "Text: well what I remember happening is that Darcie went inside to play with her pretend kitchen, I heard her neighbor mention he was really hungry, and the dog ran around really quickly",
    choices: [
      {
        text: "Ask about the dog",
        // add an action here related to inventory
        nextScene: "entrance"
      },
         {
        text: "Ask about the neighbor",
        // add an action here related to inventory
        nextScene: "hallway"
      }
    ]
  },

  entrance: {
    title: "Location: Entrance",
    interviewee: "Interviewee:Neighbor",
    text: "well what I remember...",
    choices: [
      {
        text: "Ask about the dog",
        // add an action here related to inventory
        nextScene: "backyard"
      },
         {
        text: "Ask about the neighbor",
        // add an action here related to inventory
        nextScene: "hallway"
      }
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "The hallway is dark and silent.",
    choices: [
      {
        text: "backyard",
        // add an action here related to health
        nextScene: "lockedDoor"
      }
    ]
  },

   lockedDoor: {
    title: "The Locked Door",
    text: "The door handle doesn't move.",
    choices: [
      {
        text: "Try to open it",
        // add an action here related to opening the door
        nextScene: "entrance"
      }
    ]
  }
};

// --------------------------------------------------
// UPDATE SCNES
// Create a function that updates the scene, inserting the title, text, choices, makes each choice a button
// --------------------------------------------------

const sceneTitle = document.querySelector("#scene-title");
const sceneText = document.querySelector("#scene-text");
const choicesContainer = document.querySelector("#choices-container");
const intervieweeName = document.querySelector("#interviewee-name");


function updateScene(sceneName) {

  currentScene = sceneName;

  const scene = scenes[sceneName];

  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  intervieweeName.textContent = scene.interviewee;

  choicesContainer.innerHTML = "";

  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.querySelector("#health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

updateHealth(0);

// --------------------------------------------------
// INVENTORY
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inverntory
const inventoryDisplay = document.querySelector("#inventory-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// OPEN A DOOR
// --------------------------------------------------

// Create a function that checks if the inventory contains on item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("laboratory");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

