import { parseHTML } from '../helpers/parseHTML.js';

function createToolBtn(name, resourceArr) {
  return {
    name: name,
    resourceArr: resourceArr,
    wasShown: false,
    wasMade: false,
    onclick: new Event(name.toLowerCase()),
    toolHTML () {
      const newToolBtn = parseHTML(`
        <button id="get-${name.toLowerCase()}" class="action" title="${this.resourceArr.map((obj) => `${obj.cost} ${obj.resource}`).join(", ")}">
          Create ${name}
        </button>
      `);
      newToolBtn.addEventListener("click", (event) => {
        document.dispatchEvent(this.onclick);
      });
      return newToolBtn;
    },
  }
};

export function createAxeBtn() {
  return createToolBtn("Axe", [{ resource: "wood", cost: 8 }, { resource: "stone", cost: 4 }]);
};
