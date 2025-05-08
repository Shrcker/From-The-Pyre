import { createAxeBtn } from "./modules/toolBtn.js";
import { addEl, removeEl } from "./modules/helpers/addEl.js";

const timeCounter = document.getElementById("time-counter");
const woodBtn = document.getElementById("get-wood");
const stoneBtn = document.getElementById("get-stone");
const fuelBtn = document.getElementById("add-fuel");
const stoneCounter = document.getElementById("stone-counter");
const woodCounter = document.getElementById("wood-counter");
const pyreCounter = document.getElementById("pyre-counter");
const axeBtnEl = document.getElementById("get-axe");
const counterList = document.getElementById("counter-list");
const actionList = document.getElementById("action-list");

const gameState = {
  timeLeft: 12,
  woodNumber: 0,
  stoneNumber: 0,
  fuelNumber: 0,
  timeSincePyre: 0,
  pyreNotifState: 0,
  updateGame() {
    pyreCounter.innerHTML = `Fuel for the Pyre: ${this.fuelNumber}`;
    console.log(axeBtn);

    gameState.updateToken();

    const pyreNotifMsg = [
      `You grow restless. Hands shake from an absent burn.`,
      `The Pyre is not big enough; you have not grown the Pyre...`,
      `It lurks behind the eyes...`,
    ];

    if (gameState.pyreNotifState === 0 && gameState.timeSincePyre >= 24) {
      gameState.updateMessageCenter(pyreNotifMsg[gameState.pyreNotifState]);
      gameState.pyreNotifState++;
    } else if (gameState.pyreNotifState === 1 && gameState.timeSincePyre >= 72) {
      gameState.updateMessageCenter(pyreNotifMsg[gameState.pyreNotifState]);
      gameState.pyreNotifState++;
    } else if (gameState.pyreNotifState === 2 && gameState.timeSincePyre >= 96) {
      gameState.updateMessageCenter(pyreNotifMsg[gameState.pyreNotifState]);
      gameState.pyreNotifState++;
    } else {
      gameState.updateMessageCenter();
    }

    // Should change this if chain into its own function since having to add it for every tool would be a bother
    if (axeBtn.wasMade) {
      removeEl(axeBtn, actionList);
      return;
    }

    if (axeBtn.wasShown) {
      return;
    }

    if (gameState.woodNumber >= 6) {
      addEl(axeBtn, actionList);
      console.log("hi");
    }
  },
  updateMessageCenter(message) {
    const messageCenter = document.getElementById("message-center");
    const newMessage = document.createElement("p");

    if (message) {
      newMessage.innerHTML = message;
      messageCenter.appendChild(newMessage);
    } else if (!messageCenter.firstChild) {
      return;
    } else {
      messageCenter.removeChild(messageCenter.firstChild);
    }
  },
  updateToken(updateObj = undefined) {
    if (updateObj) {
      gameState.woodNumber = updateObj.newWoodNumber;
      gameState.stoneNumber = updateObj.newStoneNumber;
    }
    woodCounter.innerHTML = `Wood: ${gameState.woodNumber}`;
    stoneCounter.innerHTML = `Stone: ${gameState.stoneNumber}`;
  },
  updateTime(amount, isFuelAct) {
    // Instances of updateTime will take a boolean to decide if the triggering function is the
    // "Add fuel to the pyre" action
    this.timeLeft -= amount;
    // If the action updating time is the pyre "Add Fuel" action (true), then reset gameState.timeSincePyre and notif state to 0
    // Otherwise, add passed hours to gameState.timeSincePyre.
    gameState.timeSincePyre = isFuelAct ? 0 : gameState.timeSincePyre + amount;
    if (isFuelAct) {
      gameState.pyreNotifState = 0;
    }

    if (this.timeLeft > 0) {
      timeCounter.innerHTML = `Time: ${this.timeLeft}`;
    } else {
      this.timeLeft = 12;
      timeCounter.innerHTML = `A New Day Begins...<br>Time: ${this.timeLeft}`;
    }

    this.updateGame();
  },
  addWood(event) {
    event.preventDefault();

    gameState.woodNumber++;
    let timeToWood = axeBtn.wasMade ? 2 : 4;

    gameState.updateTime(timeToWood, false);
    gameState.updateToken();
  },
  addStone(event) {
    event.preventDefault();

    gameState.stoneNumber++;
    let timeToStone = 3;

    gameState.updateTime(timeToStone, false);
    gameState.updateToken();
  },
  addFuel(event) {
    event.preventDefault();

    let timeToFuel = 1;

    if (gameState.woodNumber >= 10) {
      gameState.woodNumber -= 10;
      gameState.fuelNumber += 10;
      gameState.updateTime(timeToFuel, true);
    } else {
      gameState.updateMessageCenter(`You don't have enough tinder.<br>The Pyre looms...`);
      return;
    }

    const fuelMsg = [
      `Starting with a bundle of wood in a square formation, 
      the pyre starts small, but may soon overtake the sky.`,
      `The pyre grows taller, your stomach burns bright at the thought.`,
      `Logs arranged in squares dominate the clearing. It dominates your
      sight whenever you look up from the ground. It is perfect, yet now you must surround it
      with a wall of stone, so that the logs may burn without destroying the forest around you.`,
    ];

    switch (gameState.fuelNumber) {
      case 10:
        gameState.updateMessageCenter(fuelMsg[0]);
        break;
      case 60:
        gameState.updateMessageCenter(fuelMsg[1]);
        break;
      case 120:
        gameState.updateMessageCenter(fuelMsg[2]);
        break;
    }
  },
};

const axeBtn = createAxeBtn(gameState);

gameState.updateGame();

woodBtn.addEventListener("click", gameState.addWood);
stoneBtn.addEventListener("click", gameState.addStone);
fuelBtn.addEventListener("click", gameState.addFuel);
