// weight a random number based on the length of an object
// the larger the value in proportion to the test group, 
// the more likely it will be rolled
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
