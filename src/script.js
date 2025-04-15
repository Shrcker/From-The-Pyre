const chopBtn = document.getElementById("chop-wood");
const gatherBtn = document.getElementById("gather-stone");
const stoneCounter = document.getElementById("stone-counter");
const woodCounter = document.getElementById("wood-counter");

let woodNumber = 1;
let stoneNumber = 1;

const addWood = (event) => {
  event.preventDefault();

  woodCounter.innerHTML = `Wood: ${woodNumber++}`;
}

const addStone = (event) => {
  event.preventDefault();

  stoneCounter.innerHTML = `Stone: ${stoneNumber++}`;
}

chopBtn.addEventListener("click", addWood);
gatherBtn.addEventListener("click", addStone);
