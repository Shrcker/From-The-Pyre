export function parseHTML(input) {
  const parser = new DOMParser();
  return parser.parseFromString(input, 'text/html').body.firstChild;
}

