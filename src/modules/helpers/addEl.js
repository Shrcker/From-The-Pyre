export function addEl(obj = undefined, parent) {
  obj.wasShown = true;
  return parent.appendChild(obj.toolHTML());
}

export function removeEl(obj, parent) {
  obj.wasMade = true;
  return parent.removeChild(obj.toolHTML());
}
