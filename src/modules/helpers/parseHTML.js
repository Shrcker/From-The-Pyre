// function to parse string into html, used to save space in other parts of code
export function parseHTML(input) {
  const parser = new DOMParser();
  return parser.parseFromString(input, 'text/html').body.firstChild;
}

