/**
 * Created by zhy on 2017/3/30.
 */
var hljs = require('highlight.js');
// default mode
var markdown = require('markdown-it')({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     true,        // Use '/' to close single tags (<br />).
  breaks:       true,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-markdown',  // CSS language prefix for fenced blocks. Can be
  linkify:      false,        // 自动识别url
  typographer:  true,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code class="' + lang + '">' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
  }
});
// 表情
var emoji = require('markdown-it-emoji');
// 下标
var sub = require('markdown-it-sub')
// 上标
var sup = require('markdown-it-sup')
// <dl/>
var deflist = require('markdown-it-deflist')
// <abbr/>
var abbr = require('markdown-it-abbr')
// footnote
var footnote = require('markdown-it-footnote')
// insert 带有下划线 样式 ++ ++
var insert = require('markdown-it-ins')
// mark
var mark = require('markdown-it-mark')
//
var container = require('markdown-it-container')
markdown.use(emoji)
  .use(sup)
  .use(sub)
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(insert)
  .use(mark)
  .use(container)

export default markdown
