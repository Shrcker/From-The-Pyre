export function addEl(obj = undefined, parent) {
  let newEl = obj;
  
  if (obj.toolHTML) {
    obj.wasShown = true;
    newEl = obj.toolHTML();
  } 

  return parent.appendChild(newEl);
}

export function removeEl(obj, parent) {
  let targetEl = obj;

  if (obj.toolHTML) {
    obj.wasMade = true;
    targetEl = obj.toolHTML();
  }

  return parent.removeChild(targetEl);
}
