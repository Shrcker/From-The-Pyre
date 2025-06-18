export function weightedRandNum(obj) {
  let sum = 0;

  for (const [key, value] of Object.entries(obj)) 
    sum += value;

  let randomNum = Math.floor(Math.random() * sum);

  for (const [key, value] of Object.entries(obj)) {
    randomNum -= value;
    if (randomNum <= 0) {
      return { rarity: key, value: value };
    }
  }
}
