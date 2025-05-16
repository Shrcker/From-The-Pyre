import { addEl, removeEl } from "./helpers/addEl.js";

export const makeAxe = (event, stateObj) => {
  event.preventDefault();
  let { woodNumber, stoneNumber } = stateObj;
  const { updateMessageCenter, updateToken } = stateObj;

  if (woodNumber >= 8 && stoneNumber >= 4) {
    woodNumber -= 8;
    stoneNumber -= 4;

    const newStateObj = {
      newWoodNumber: woodNumber,
      newStoneNumber: stoneNumber,
    };

    updateMessageCenter("Should take less time to get wood now.");
    updateToken(newStateObj);
  } else {
    updateMessageCenter(`You don't have enough ${woodNumber < 8 ? "Wood" : "Stone"}`);
  }
};
