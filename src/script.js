const timeCounter = document.getElementById("time-counter");
const woodBtn = document.getElementById("get-wood");
const stoneBtn = document.getElementById("get-stone");
const stoneCounter = document.getElementById("stone-counter");
const woodCounter = document.getElementById("wood-counter");
const axeBtn = document.getElementById("get-axe");
const counterList = document.getElementById("counter-list");
const actionList = document.getElementById("action-list");
const messageCenter = document.getElementById("message-center");

const newMessage = document.createElement("p");

let timeNumber = 12;
let woodNumber = 1;
let stoneNumber = 1;
let isAxeMade = false;
let wasAxeBtnShown = false;

const updateGame = () => {

  if (timeCounter.innerHTML = `A New Day Begins...<br>Time: ${timeNumber}`) {
    timeCounter.innerHTML = `Time: ${timeNumber}`;
  }

  if (woodNumber >= 6 && !wasAxeBtnShown) {
    const newAxeBtn = document.createElement("button");
    newAxeBtn.innerHTML = "Create Axe (8 wood, 4 stone)";
    newAxeBtn.id = "get-axe";
    newAxeBtn.classList.add("button");
    newAxeBtn.addEventListener("click", makeAxe);

    actionList.appendChild(newAxeBtn);
    wasAxeBtnShown = true;
  }

  messageCenter.innerHTML = '';
  newMessage.innerHTML = '';
}

const updateTime = (amount) => {
  timeNumber -= amount;
  if (timeNumber > 0) {
    timeCounter.innerHTML = `Time: ${timeNumber}`;
  } else {
    timeNumber = 12;
    timeCounter.innerHTML = `A New Day Begins...<br>Time: ${timeNumber}`;
  }

  updateGame();
}

const addWood = (event) => {
  event.preventDefault();

  let timeToWood = isAxeMade ? 2 : 5;
  woodCounter.innerHTML = `Wood: ${woodNumber++}`;

  updateTime(timeToWood);
}

const addStone = (event) => {
  event.preventDefault();

  let timeToStone = 3;
  stoneCounter.innerHTML = `Stone: ${stoneNumber++}`;

  updateTime(timeToStone);
}

const makeAxe = (event) => {
  event.preventDefault();

  if (woodNumber >= 8 && stoneNumber >= 4) {
    woodNumber -= 8;
    stoneNumber -= 4;
    isAxeMade = true;
    actionList.removeChild(actionList.lastElementChild);

    newMessage.innerHTML = "Should take less time to get wood now.";
    messageCenter.appendChild(newMessage);

  } else if (woodNumber < 8 || stoneNumber < 4) {
    newMessage.innerHTML = `You don't have enough ${woodNumber < 8 ? "Wood" : "Stone"}`;
    messageCenter.appendChild(newMessage);

  } else {
    newMessage.innerHTML = `You don't have enough materials`;
    messageCenter.appendChild(newMessage);
  }
}

updateGame();

woodBtn.addEventListener("click", addWood);
stoneBtn.addEventListener("click", addStone);
