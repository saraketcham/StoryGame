
// --------------------------------------------------
// SCENES
// Create a variable for the current location
// Create an object that holds the repeatable text for each location
// --------------------------------------------------
let currentScene = "entrance";

const scenes = {
  backyard: {
    title: "Location: Backyard",
    interviewee: "Interviewee:Grandma",
    text: "Text: well what I remember happening is that Darcie went inside to play with her pretend kitchen, I heard her neighbor mention he was really hungry, and the dog ran around really quickly",
    choices: [
      {
        text: "Ask about the dog",
        // add an action here related to inventory
        nextScene: "kitchen"
      },
         {
        text: "Ask about the neighbor",
        // add an action here related to inventory
        nextScene: "front door"
      }
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "The hallway is dark and silent.",
    choices: [
      {
        text: "Return outside",
        // add an action here related to health
        nextScene: "entrance"
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
// Create an object that holds the repeatable text for each location
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
// Create a variable for health
// Display current health
// Create a function to update health 
// --------------------------------------------------
let health = 100;

const healthDisplay = document.querySelector("#health-display");

function updateHealth(amount) {
  // Change the health variable.

  // Update the number shown on the page.

  // Check whether health has reached zero.


}

// --------------------------------------------------
// INVENTORY
// Create a variable for inventory
// Display current inverntory
// Create a function to update inventory 
// --------------------------------------------------
let inventory = [];
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// OPEN A DOOR
// Create a function that checks if the inventory contains on item and if so shows the win condition scene.
// --------------------------------------------------
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("laboratory");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

