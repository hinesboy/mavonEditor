/**
 * @Author: HuaChao Chen <chc>
 * @Date:   2017-05-03T00:31:20+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: to-markdown.js
 * @Last modified by:   chc
 * @Last modified time: 2017-06-12T20:42:27+08:00
 * @License: MIT
 * @Copyright: 2017
 */

/**
 * Created by zhy on 2017/4/9.
 */
var toMarkdown = require('to-markdown');
//
const coverterP = {
  filter: 'P',
  replacement: function (content) {
    return '\n' + content
  }
}
const coverterp = {
  filter: 'p',
  replacement: function (content) {
    return '\n' + content
  }
}
const coverterDiv = {
  filter: 'DIV',
  replacement: function (content) {
    return '\n' + content
  }
}
const coverterdiv = {
  filter: 'div',
  replacement: function (content) {
    return '\n' + content
  }
}
// 解析代码块
const coverterCode = {
  filter: 'pre',
  replacement: function (content) {
    let objE = document.createElement('div');
    objE.innerHTML = content;
    let codes = objE.getElementsByTagName('code')
    if (codes !== null && codes.length > 0) {
      let code = codes[0]
      let codeType = code.getAttribute('class') === null ? '' : code.getAttribute('class')
      let codeContent = code.innerText
      return '\n```' + codeType + '\n' + codeContent + '\n```\n';
    }
    return '\n```\n' + content + '\n```\n';
  }
}
// 解析表格
const coverterTable = {
  filter: 'table',
  replacement: function (content) {
    let table = document.createElement('table');
    table.innerHTML = content;
    let dom = '\n';
    let tableMark = '';
    let thead = table.getElementsByTagName('thead')[0];
    let thead_tr = thead.getElementsByTagName('tr')[0];
    let thead_th = thead_tr.getElementsByTagName('th')
    for (let i = 0; i < thead_th.length; i++) {
      dom += '| ' + thead_th[i].innerText + ' '
      let text_align = thead_th[i].style.textAlign
      if (text_align === 'left') {
        tableMark += '| :- '
      } else if (text_align === 'center') {
        tableMark += '| :-: '
      } else if (text_align === 'right') {
        tableMark += '| -: '
      } else {
        tableMark += '| - '
      }
      if (i === thead_th.length - 1) {
        dom += '|\n' + tableMark + ' |\n'
      }
    }
    let tbody
    if (table.getElementsByTagName('tbody')) {
      tbody = table.getElementsByTagName('tbody')[0];
      let tbody_tr = tbody.getElementsByTagName('tr')
      if (tbody_tr.length > 0) {
        for (let i = 0; i < tbody_tr.length; i++) {
          let tbody_td = tbody_tr[i].getElementsByTagName('td')
          for (let j = 0; j < tbody_td.length; j++) {
            dom += '| ' + tbody_td[j].innerText + ' ';
            if (j === tbody_td.length - 1) {
              dom += '|\n';
            }
          }
        }
      }
    }
    return dom
  }
}
// 上角标
const coverterSup = {
  filter: 'sup',
  replacement: function (content) {
    return '^' + content + '^';
  }
}
// 下角标
const coverterSub = {
  filter: 'sub',
  replacement: function (content) {
    return '~' + content + '~';
  }
}
// 下划线
const coverterUnderline = {
  filter: 'ins',
  replacement: function (content) {
    return '++' + content + '++';
  }
}
// 中画线
const coverterStrikethrough = {
  filter: 's',
  replacement: function (content) {
    return '~~' + content + '~~';
  }
}
// 标记
const coverterMark = {
  filter: 'mark',
  replacement: function (content) {
    return '==' + content + '==';
  }
}
// 图片
const converterImg = {
    filter: 'img',
    replacement: function(content, tag) {
        var rel = tag.getAttribute('rel');
        var alt = tag.getAttribute('alt');
        if (rel && alt) {
            return '![' + alt + ']' + '(' + rel + ')'
        }
        else {
            var src = tag.getAttribute('src');
            return '![' + alt + ']' + '(' + src + ')'
        }
    }
}
var tomarkdown = function (str) {
  return toMarkdown(str, {
    converters: [
      coverterCode,
      coverterTable,
      coverterSup,
      coverterSub,
      coverterUnderline,
      coverterStrikethrough,
      coverterMark,
      coverterP,
      coverterp,
      coverterDiv,
      coverterdiv,
      converterImg
    ]
  });
}
export default tomarkdown
