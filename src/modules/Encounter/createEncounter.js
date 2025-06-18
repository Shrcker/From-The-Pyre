import { parseHTML } from "../helpers/parseHTML.js";

export function createEncounter(encObj) {
  if (typeof encObj.name !== "string" || typeof encObj.text !== "string") {
    console.error("createEncounter was given an invalid argument for its name or text.");
    return;
  } else if (typeof encObj.rarity !== "number") {
    console.error("createEncounter can only be executed when given a value from RarityTable");
    return;
  }

  return {
    name: encObj.name, 
    text: encObj.text,
    rarity: encObj.rarity,
    encHTML () {
      const newEnc = parseHTML(`
        <div class="enc-modal">
          <div class="modal-content">
            <h4>${this.name}</h4>
            <p>${this.text}</p>
            <button class="enc-btn">Understood</button>
          </div>
        </div>
      `);
      const encBtn = newEnc.querySelector("button.enc-btn");
      encBtn.addEventListener("click", this.removeFromDOM);
      return newEnc;
    },
    addToDOM () {
      const thisEnc = this.encHTML();
      const mainContext = document.getElementById("main");

      mainContext.append(thisEnc);
    },
    removeFromDOM () {
      const thisEnc = document.querySelectorAll(".enc-modal");

      if (thisEnc.length > 1)
        console.warn("WARNING: Event overlap! Double check where you're calling for new events.");
    
      thisEnc.forEach((element) => element.remove());
    },
  } 
}
