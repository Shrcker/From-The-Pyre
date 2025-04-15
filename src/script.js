const timeCounter = document.getElementById("time-counter");
const chopBtn = document.getElementById("chop-wood");
const gatherBtn = document.getElementById("gather-stone");
const stoneCounter = document.getElementById("stone-counter");
const woodCounter = document.getElementById("wood-counter");

let timeNumber = 12;
let woodNumber = 1;
let stoneNumber = 1;

const setupGame = () => {
  timeCounter.innerHTML = `Time: ${timeNumber}`;
}

const updateTime = (amount) => {
  timeNumber -= amount;
  if (timeNumber > 0) {
    timeCounter.innerHTML = `Time: ${timeNumber}`;
  } else {
    timeNumber = 12;
    timeCounter.innerHTML = `A New Day Begins...<br>Time: ${timeNumber}`;
  }
}

const addWood = (event) => {
  event.preventDefault();

  let timeToWood = 4;
  woodCounter.innerHTML = `Wood: ${woodNumber++}`;

  updateTime(timeToWood);
}

const addStone = (event) => {
  event.preventDefault();

  let timeToStone = 3;
  stoneCounter.innerHTML = `Stone: ${stoneNumber++}`;

  updateTime(timeToStone);
}

setupGame();

chopBtn.addEventListener("click", addWood);
gatherBtn.addEventListener("click", addStone);
