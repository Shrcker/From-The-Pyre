import { parseHTML } from './helpers/parseHTML.js';
import { makeAxe } from './toolFuncs.js';

const createToolBtn = (toolName, resourceArr, func) => {
  return {
    toolName: toolName,
    resourceArr: resourceArr,
    func: func,
    wasShown: false,
    wasMade: false,
    toolHTML () {
      const newToolBtn = parseHTML(`
        <button id="get-${toolName.toLowerCase()}" class="action" title="${this.resourceArr.map((obj) => `${obj.cost} ${obj.resource}`).join(", ")}">
          Create ${toolName}
        </button>
      `);
      newToolBtn.addEventListener("click", func);
      return newToolBtn;
    },
  }
};

export const createAxeBtn = (state) => {
  return createToolBtn("Axe", [{ resource: "wood", cost: 8 }, { resource: "stone", cost: 4 }], (e) => makeAxe(e, state));
};
