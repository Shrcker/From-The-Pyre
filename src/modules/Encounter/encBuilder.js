import { RarityTable } from "../enums/RarityTable.js";
import { createEncounter } from "./createEncounter.js";

const encounterData = {
  circlingClouds: {
    name: "Circling Clouds",
    text: `lorem ipsum1`,
    rarity: RarityTable.COMMON,
  },
  usedTrap: {
    name: "Used Trap",
    text: `lorem ipsum2`,
    rarity: RarityTable.COMMON,
  },
  berryBush: {
    name: "Berry Bush",
    text: `lorem ipsum3`,
    rarity: RarityTable.COMMON,
  },
  bloodCarcass: {
    name: "Bloodied Carcass",
    text: `lorem ipsum4`,
    rarity: RarityTable.COMMON,
  },
  misCairn: {
    name: "Misplaced Cairn",
    text: `lorem ipsum5`,
    rarity: RarityTable.COMMON,
  },
  glimpsed: {
    name: "Glimpsed",
    text: `lorem ipsum6`,
    rarity: RarityTable.UNCOMMON,
  },
  beast: {
    name: "Beast",
    text: `lorem ipsum7`,
    rarity: RarityTable.UNCOMMON,
  },
  bloomChimney: {
    name: "Blooming Chimney",
    text: `lorem ipsum8`,
    rarity: RarityTable.UNCOMMON,
  },
  anotherPit: {
    name: "Another Pit",
    text: `lorem ipsum9`,
    rarity: RarityTable.RARE,
  },
  derelictContraption: {
    name: "Derelict Contraption",
    text: `lorem ipsum10`,
    rarity: RarityTable.RARE,
  }
}

const enc_CirclingClouds = createEncounter(encounterData.circlingClouds);
const enc_UsedTrap = createEncounter(encounterData.usedTrap);
const enc_BerryBush = createEncounter(encounterData.berryBush);
const enc_BloodiedCarcass = createEncounter(encounterData.bloodCarcass);
const enc_MisplacedCairn = createEncounter(encounterData.misCairn);
const enc_Glimpsed = createEncounter(encounterData.glimpsed);
const enc_Beast = createEncounter(encounterData.beast);
const enc_BloomChimney = createEncounter(encounterData.bloomChimney);
const enc_AnotherPit = createEncounter(encounterData.anotherPit);
const enc_derelictContraption = createEncounter(encounterData.derelictContraption);

export const encArr = [
  enc_CirclingClouds,
  enc_UsedTrap,
  enc_BerryBush,
  enc_BloodiedCarcass,
  enc_MisplacedCairn,
  enc_Glimpsed,
  enc_Beast,
];
