import { FilterXSS } from 'xss';

let xssHandler;

function mavoneditor_sanitizer(state) {
  if (!xssHandler) {
    return;
  }
  sanitizer(state.tokens, ['inline', 'html_block']);
}

function sanitizer(tokens, types) {
  let originContent, children;
  for (let i = 0; i < tokens.length; i++) {
    if (types.indexOf(tokens[i].type) !== -1) {
      originContent = tokens[i].content;
      children = tokens[i].children;
      tokens[i].content = xssHandler.process(originContent);
      if (children && children.length && originContent !== tokens[i].content) {
        sanitizer(children, ['html_inline']);
      }
    }
  }
}

export default function (md, xssOptions) {
  if (md.options.html) {
    xssHandler = new FilterXSS(xssOptions);
    md.core.ruler.push('mavoneditor_sanitizer', mavoneditor_sanitizer);
  }
}
