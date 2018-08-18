import hljsLangs from '../core/hljs/lang.hljs.js'
import {
    loadScript
} from '../core/extra-function.js'
var markdown_config = {
    html: true,        // Enable HTML tags in source
    xhtmlOut: true,        // Use '/' to close single tags (<br />).
    breaks: true,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'lang-',  // CSS language prefix for fenced blocks. Can be
    linkify: false,        // 自动识别url
    typographer: true,
    quotes: '“”‘’'
}
var markdown = require('markdown-it')(markdown_config);
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
// taskLists
var taskLists = require('markdown-it-task-lists')
// container
var container = require('markdown-it-container')
//
var toc = require('markdown-it-toc')
// add target="_blank" to all link
var defaultRender = markdown.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};
markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
};
var mihe = require('markdown-it-highlightjs-external');
// math katex
var katex = require('markdown-it-katex-external');
var miip = require('markdown-it-images-preview');
var missLangs = {};
var needLangs = [];
var hljs_opts = {
    hljs: 'auto',
    highlighted: true,
    langCheck: function(lang) {
        if (lang && hljsLangs[lang] && !missLangs[lang]) {
            missLangs[lang] = 1;
            needLangs.push(lang)
        }
    }
};
markdown.use(mihe, hljs_opts)
    .use(emoji)
    .use(sup)
    .use(sub)
    .use(container)
    .use(container, 'hljs-left') /* align left */
    .use(container, 'hljs-center')/* align center */
    .use(container, 'hljs-right')/* align right */
    .use(deflist)
    .use(abbr)
    .use(footnote)
    .use(insert)
    .use(mark)
    .use(container)
    .use(miip)
    .use(katex)
    .use(taskLists)
    .use(toc)

export default {
    data() {
        return {
            markdownIt: markdown
        }
    },
    mounted() {
        var $vm = this;
        hljs_opts.highlighted = this.ishljs;
    },
    methods: {
        $render(src, func) {
            var $vm = this;
            missLangs = {};
            needLangs = [];
            var res = markdown.render(src);
            if (this.ishljs) {
                if (needLangs.length > 0) {
                    $vm.$_render(src, func, res);
                }
            }
            func(res);
        },
        $_render(src, func, res) {
            var $vm = this;
            var deal = 0;
            for (var i = 0; i < needLangs.length; i++) {
                var url = $vm.p_external_link.hljs_lang(needLangs[i]);
                loadScript(url, function() {
                    deal = deal + 1;
                    if (deal === needLangs.length) {
                        res = markdown.render(src);
                        func(res);
                    }
                })
            }
        }
    },
    watch: {
        ishljs: function(val) {
            hljs_opts.highlighted = val;
        }
    }
};
