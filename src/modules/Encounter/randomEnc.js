import { encArr } from "./encBuilder.js";
import { weightedRandNum } from "../helpers/weightedRandNum.js";
import { RarityTable } from "../enums/RarityTable.js";

export function randomEnc () {
  const randRarity = weightedRandNum(RarityTable);

  if (randRarity == RarityTable.NOTHING) {
    return undefined;
  }

  const selectedEncArr = encArr.filter((enc) => enc.rarity == randRarity.value);
  const randIndex = Math.floor(Math.random() * selectedEncArr.length);

  return selectedEncArr[randIndex];
}
