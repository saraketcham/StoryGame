
// --------------------------------------------------
// SCENES
// Create a variable for the current location
// Create an object that holds the repeatable text for each location
// --------------------------------------------------
let currentScene = "dayOne";

const scenes = {
  dayOne: {
    title: "Day One: The Laboratory",

    text: `
      You are working in the laboratory, preparing your mice specimen for a test run simulating landing on the planet of Mars. One or two mice quietly climb out of the box, but you don’t mind too much, Miles will be able to catch them, anyways he is both emotional support cat and also spare mouse hunter. You grab the pipette, and prepare the solution that will help feed the mice for their journey to the surface of Mars. Suddenly, the lights go out.  The ship sounds slowly all turn off in the rooms around you. There are small guide lights illuminating the doorways and hallways. Where should you do?
    `,

  

    image: "images/lab.jpeg",

    alt: "Picture of a laboratory",

 choices: [
      {
        text: "Go to the cafeteria",
        nextScene: "cafeteria"
      },
      {
        text: "Go to the engine room",
        nextScene: "engineRoom"
      },
     
    ]
  },

  cafeteria: {
    title: "The cafeteria",

    text: `
      As you go into the room, you are distracted by the smell of cupcakes that you left baking in the oven.   -YAAAARGGHHH- you jump back in surprise, cat scratches down your leg. You accidentally stepped on Miles as he laid in the cafeteria entry. Ouch
    `,

    image: "images/cafeteria.jpeg",

    alt: "Picture of a cat scratching a person",

    onEnter: function () {
      updateHealth(-10);
    },

 choices: [
      {
        text: "Go to the closet ",
        nextScene: "closet"
      },
      {
        text: "Go to the control room",
        nextScene: "controlRoom"
      },
       {
        text: "Go to the lab",
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
        text: "Go to the cafeteria ",
        nextScene: "cafeteria"
      },
      {
        text: "Go to the engine room",
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
        text: "Go to the laboratory", 
        nextScene: "laboratory"
      },
      {
        text: "Go to the control room",
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


    image: "images/controlRoom.jpeg",

    alt: "Picture of an engine room",

 choices: [
      {
        text: "Turn the power on",
        action: function () {
          if (powerOn) {
            showMessage("The power is already on.");
            return;
          }

          togglePower();
        }
      },
      {
        text: "Turn the power off",
        action: function () {
          if (!powerOn) {
            showMessage("The power is already off.");
            return;
          }

          togglePower();
        }
      },
      {
        text: "Go to the laboratory", 
        nextScene: "laboratory"
      },
      {
        text: "Go to the camera room",
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
        text: "Go to the closet", 
        nextScene: "closet"
      },
      {
        text: "Go to the control room",
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
   
        text: "Go to the cafeteria", 
        nextScene: "cafeteria"
      },
      {
     
        text: "Go to the camera room",
        nextScene: "cameraRoom"
      },
     
    ]
  },

};


// --------------------------------------------------
// UPDATE SCNES
// Create a function that updates the scene, inserting the title, text, choices, makes each choice a button
// --------------------------------------------------

const sceneTitle = document.querySelector("#scene-title");
const sceneText = document.querySelector("#scene-text");
const choicesContainer = document.querySelector("#choices-container");
const intervieweeName = document.querySelector("#interviewee-name");
const sceneImage = document.querySelector("#scene-image");


function updateScene(sceneName) {

  currentScene = sceneName;

  const scene = scenes[sceneName];

  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  intervieweeName.textContent = scene.interviewee;
  sceneImage.src = scene.image || "";
  sceneImage.alt = scene.alt || "";

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

