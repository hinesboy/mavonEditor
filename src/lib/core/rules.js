export const HEADER_FLAG = ' _MD-HEADER_ ';
export const IMAGE_FLAG = ['_MD-HEADER_', true];
const IMAGE_FLAG_STR = `${IMAGE_FLAG[0]}="${IMAGE_FLAG[1]}" `;

export function headRule(defaultTocHeadRule) {
  return function (tokens, index) {
    let code = defaultTocHeadRule(tokens, index);
    var label = tokens[index + 1];
    if (label.type === 'inline') {
      return code.replace('<a', `<a${HEADER_FLAG}`);
    }
    return code;
  };
}

export function imageRule(defaultImageRule) {
  return function (tokens, idx, options, env, self) {
    var token = tokens[idx];
    token.attrs.push(IMAGE_FLAG);
    return defaultImageRule(tokens, idx, options, env, self);
  };
}

export function skipRule(tag, html) {
  if (tag === 'a' && html.indexOf(HEADER_FLAG) !== -1) {
    return html.replace(HEADER_FLAG, '');
  }

  if (tag === 'img' && html.indexOf(IMAGE_FLAG_STR) !== -1) {
    return html.replace(IMAGE_FLAG_STR, '');
  }

  return html;
}
