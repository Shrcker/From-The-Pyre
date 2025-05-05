const timeCounter = document.getElementById("time-counter");
const woodBtn = document.getElementById("get-wood");
const stoneBtn = document.getElementById("get-stone");
const fuelBtn = document.getElementById("add-fuel");
const stoneCounter = document.getElementById("stone-counter");
const woodCounter = document.getElementById("wood-counter");
const pyreCounter = document.getElementById("pyre-counter");
const axeBtn = document.getElementById("get-axe");
const counterList = document.getElementById("counter-list");
const actionList = document.getElementById("action-list");

// Consider tracking these lets in defined objects
let timeNumber = 12;
let woodNumber = 0;
let stoneNumber = 0;
let fuelNumber = 0;
let isAxeMade = false;
let wasAxeBtnShown = false;

// Maybe track progress such as this in an object later in dev
let timeSincePyre = 0;
let pyreNotifState = 0;


const updateGame = () => {
  
  pyreCounter.innerHTML = `Fuel for the Pyre: ${fuelNumber}`;

  if (woodNumber >= 6 && !wasAxeBtnShown) {
    const newAxeBtn = document.createElement("button");
    newAxeBtn.innerHTML = "Create Axe (8 wood, 4 stone)";
    newAxeBtn.id = "get-axe";
    newAxeBtn.classList.add("button");
    newAxeBtn.addEventListener("click", makeAxe);

    actionList.appendChild(newAxeBtn);
    wasAxeBtnShown = true;
  }

  const pyreNotifMsg = [
    `You grow restless. Hands shake from an absent burn.`, 
    `The Pyre is not big enough; you have not grown the Pyre...`,
    `It lurks behind the eyes...`
    ];

  if (pyreNotifState === 0 && timeSincePyre >= 24) {
    updateMessageCenter(pyreNotifMsg[pyreNotifState]);
    pyreNotifState++;

  } else if (pyreNotifState === 1 && timeSincePyre >= 72) {
    updateMessageCenter(pyreNotifMsg[pyreNotifState]);
    pyreNotifState++;

  } else if (pyreNotifState === 2 && timeSincePyre >= 96) {
    updateMessageCenter(pyreNotifMsg[pyreNotifState]);
    pyreNotifState++;

  } else {
    updateMessageCenter();
  };

}

// Instances of updateTime will take a boolean to decide if the triggering function is the
// "Add fuel to the pyre" action
const updateTime = (amount, isFuelAct) => {
  timeNumber -= amount;
  // If the action updating time is the pyre "Add Fuel" action (true), then reset timeSincePyre and notif state to 0
  // Otherwise, add passed hours to timeSincePyre.
  timeSincePyre = isFuelAct ? 0 : timeSincePyre + amount;
  if (isFuelAct) {pyreNotifState = 0};

  if (timeNumber > 0) {
    timeCounter.innerHTML = `Time: ${timeNumber}`;
  } else {
    timeNumber = 12;
    timeCounter.innerHTML = `A New Day Begins...<br>Time: ${timeNumber}`;
  }

  updateGame();
}

const updateMessageCenter = (message) => {
  const messageCenter = document.getElementById("message-center");
  const newMessage = document.createElement("p");

  // Update resource counts here
  woodCounter.innerHTML = `Wood: ${woodNumber}`;
  stoneCounter.innerHTML = `Stone: ${stoneNumber}`;
  
  if (message) {
    newMessage.innerHTML = message;
    messageCenter.appendChild(newMessage);

  } else if (!messageCenter.firstChild) {
    return;

  } else {
    messageCenter.removeChild(messageCenter.firstChild);
  }

}

const addWood = (event) => {
  event.preventDefault();

  let timeToWood = isAxeMade ? 2 : 4;
  woodCounter.innerHTML = `Wood: ${woodNumber++}`;

  updateTime(timeToWood, false);
}

const addStone = (event) => {
  event.preventDefault();

  let timeToStone = 3;
  stoneCounter.innerHTML = `Stone: ${stoneNumber++}`;

  updateTime(timeToStone, false);
}

const makeAxe = (event) => {
  event.preventDefault();

  if (woodNumber >= 8 && stoneNumber >= 4) {
    woodNumber -= 8;
    stoneNumber -= 4;
    isAxeMade = true;
    actionList.removeChild(actionList.lastElementChild);

    updateMessageCenter("Should take less time to get wood now.");

    // change wood button tooltip to reflect change
    woodBtn.title = "2 hours";

  } else {
    updateMessageCenter(`You don't have enough ${woodNumber < 8 ? "Wood" : "Stone"}`);
  }
}

const addFuel = (event) => {
  event.preventDefault();

  let timeToFuel = 1;

  if (woodNumber >= 10) {
    woodNumber -= 10;
    fuelNumber += 10;
    updateTime(timeToFuel, true);
  } else {
    updateMessageCenter(`You don't have enough tinder.<br>The Pyre looms...`);
    return;
  }

  switch (fuelNumber) {
    case 10:
      updateMessageCenter(`Starting with a bundle of wood in a square formation, 
        the pyre starts small, but may soon overtake the sky.`);
      break;
    case 60: 
      updateMessageCenter(`The pyre grows taller, your stomach burns bright at the thought.`);
      break;
    case 120:
      updateMessageCenter(`Logs arranged in squares dominate the clearing. It dominates your
        sight whenever you look up from the ground. It is perfect, yet now you must surround it
        with a wall of stone, so that the logs may burn without destroying the forest around you.`);
      break;
  }
}

updateGame();

woodBtn.addEventListener("click", addWood);
stoneBtn.addEventListener("click", addStone);
fuelBtn.addEventListener("click", addFuel);
