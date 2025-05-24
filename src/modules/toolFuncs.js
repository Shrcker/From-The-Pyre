export function makeAxe(event, gameState) {
  event.preventDefault();
  let { woodNumber, stoneNumber } = gameState;
  const { updateMessageCenter, updateToken } = gameState;

  if (woodNumber >= 8 && stoneNumber >= 4) {
    woodNumber -= 8;
    stoneNumber -= 4;

    const newGameState = {
      newWoodNumber: woodNumber,
      newStoneNumber: stoneNumber,
    };

    updateMessageCenter("Should take less time to get wood now.");
    updateToken(newGameState);
  } else {
    updateMessageCenter(`You don't have enough ${woodNumber < 8 ? "Wood" : "Stone"}`);
  }
}
