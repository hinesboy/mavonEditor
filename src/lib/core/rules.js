export const HEADER_FLAG = ' _MD-HEADER_ ';

export function headRule(tocHeadRule) {
  return function (tokens, index) {
    let code = tocHeadRule(tokens, index);
    var label = tokens[index + 1];
    if (label.type === 'inline') {
      return code.replace('<a', `<a${HEADER_FLAG}`);
    }
    return code;
  };
}
export function recoverHead(tag, html) {
  if (tag === 'a' && html.indexOf(HEADER_FLAG) !== -1) {
    return html.replace(HEADER_FLAG, '');
  }
  return html;
}