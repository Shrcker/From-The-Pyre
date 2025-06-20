import { createAxeBtn } from "./modules/Tool/toolBtn.js";
import { addEl, removeEl } from "./modules/helpers/addEl.js";
import { CycleState } from "./modules/enums/CycleState.js";
import { RarityTable } from "./modules/enums/RarityTable.js";
import { weightedRandNum } from "./modules/helpers/weightedRandNum.js";
import { randomEnc } from "./modules/Encounter/randomEnc.js";
import { makeAxe } from "./modules/Tool/toolFuncs.js";

const timeCounter = document.getElementById("time-counter");
const woodBtn = document.getElementById("get-wood");
const stoneBtn = document.getElementById("get-stone");
const fuelBtn = document.getElementById("add-fuel");
const stoneCounter = document.getElementById("stone-counter");
const woodCounter = document.getElementById("wood-counter");
const pyreCounter = document.getElementById("pyre-counter");
const axeBtnEl = document.getElementById("get-axe");
const counterList = document.getElementById("counter-list");
const actionList = document.getElementById("day-action-list");
const restBtn = document.getElementById("rest");
const studyBtn = document.getElementById("study");
const messageCenter = document.getElementById("message-center");

const dayBtnArr = document.querySelectorAll(".day");
const nightBtnArr = document.querySelectorAll(".night");

const gameState = {
  timeLeft: 12,
  woodNumber: 0,
  stoneNumber: 0,
  fuelNumber: 0,
  timeSincePyre: 0,
  pyreNotifState: 0,
  studyProg: 0,
  currentCycle: CycleState.DAY,
  updateGame() {
    if (this.currentCycle === CycleState.NIGHT) {
      dayBtnArr.forEach((element) => {
        element.classList.remove("hidden");
      });
      nightBtnArr.forEach((element) => {
        element.classList.add("hidden");
      });

      this.currentCycle = CycleState.DAY;
      return;
    }
    this.updateToken();

    pyreCounter.innerHTML = `Fuel for the Pyre: ${this.fuelNumber}`;

    const pyreNotifMsg = [
      `You grow restless. Hands shake from an absent burn.`,
      `The Pyre is not big enough; you have not grown the Pyre...`,
      `It lurks behind the eyes...`,
    ];

    if (this.pyreNotifState === 0 && this.timeSincePyre >= 24) {
      this.updateMessageCenter(pyreNotifMsg[this.pyreNotifState]);
      this.pyreNotifState++;
    } else if (this.pyreNotifState === 1 && this.timeSincePyre >= 72) {
      this.updateMessageCenter(pyreNotifMsg[this.pyreNotifState]);
      this.pyreNotifState++;
    } else if (this.pyreNotifState === 2 && this.timeSincePyre >= 96) {
      this.updateMessageCenter(pyreNotifMsg[this.pyreNotifState]);
      this.pyreNotifState++;
    } else {
      this.updateMessageCenter();
    }

    // Should change this if chain into its own function since having to add it for every tool would be a bother
    if (axeBtn.wasMade) {
      removeEl(axeBtn, actionList);
      return;
    }

    if (axeBtn.wasShown) {
      return;
    }

    if (this.woodNumber >= 6) {
      addEl(axeBtn, actionList);
    }
  },
  updateNight() {
    this.currentCycle = CycleState.NIGHT;

    dayBtnArr.forEach((element) => {
      element.classList.add("hidden");
    });
    nightBtnArr.forEach((element) => {
      element.classList.remove("hidden");
    });

    this.updateMessageCenter(
      "The sun sets, granting you the grace of lamp light in the cabin.<br>There is time to pass, how shall you spend it?"
    );
  },
  updateMessageCenter(message) {
    const oldMessage = messageCenter.firstChild;
    const newMessage = document.createElement("p");
    newMessage.innerHTML = message;

    if (oldMessage != null) {
      messageCenter.removeChild(oldMessage);
    }
    if (message) {
      messageCenter.appendChild(newMessage);
      return;
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
    if (this.currentCycle === CycleState.NIGHT) {
      this.timeLeft += amount;
      timeCounter.innerHTML = `A New Day Begins...<br>Time: ${this.timeLeft}`;
      return;
    }
    // Instances of updateTime will take a boolean to decide if the triggering function is the
    // "Add fuel to the pyre" action
    this.timeLeft -= amount;
    // If the action updating time is the pyre "Add Fuel" action (true), then reset gameState.timeSincePyre and notif state to 0
    // Otherwise, add passed hours to gameState.timeSincePyre.
    this.timeSincePyre = isFuelAct ? 0 : this.timeSincePyre + amount;
    if (isFuelAct) {
      this.pyreNotifState = 0;
    }
    if (this.timeLeft > 0) {
      timeCounter.innerHTML = `Time: ${this.timeLeft}`;
      this.updateGame();
      return;
    } else {
      this.timeLeft = 12;
      this.updateNight();

      return;
    }
  },
  addWood(event) {
    event.preventDefault();

    gameState.woodNumber++;
    let timeToWood = axeBtn.wasMade ? 2 : 4;

    const encounter = randomEnc();
    if (encounter) encounter.addToDOM();

    gameState.updateToken();
    gameState.updateTime(timeToWood, false);
  },
  addStone(event) {
    event.preventDefault();

    gameState.stoneNumber++;
    let timeToStone = 3;

    const encounter = randomEnc();
    if (encounter) encounter.addToDOM();

    gameState.updateToken();
    gameState.updateTime(timeToStone, false);
  },
  rest(event) {
    event.preventDefault();
    const restBonus = 2;

    const restMessage = `
      lorem ipsum
      `;

    gameState.updateMessageCenter(restMessage);

    gameState.updateTime(restBonus);
    gameState.updateGame();
  },
  study(event) {
    event.preventDefault();
    let studyText = "";

    switch (gameState.studyProg) {
      case 0:
        studyText = `
          lorem ipsum
          `;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }

    gameState.studyProg++;
    gameState.updateMessageCenter(studyText);
    gameState.updateGame();
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

const axeBtn = createAxeBtn();
document.addEventListener(axeBtn.onclick.type, () => {
  axeBtn.wasMade = true;
  makeAxe(gameState);
});

gameState.updateGame();

studyBtn.addEventListener("click", gameState.study);
restBtn.addEventListener("click", gameState.rest);
woodBtn.addEventListener("click", gameState.addWood);
stoneBtn.addEventListener("click", gameState.addStone);
fuelBtn.addEventListener("click", gameState.addFuel);
