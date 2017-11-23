/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-06-16T21:01:47+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: highlight.js
 * @Last modified by:   chc
 * @Last modified time: 2017-11-23T17:22:52+08:00
 * @License: MIT
 * @Copyright: 2017
 */

// import hljs from 'highlight.js-async-webpack'
import hljsLangs from './hljs/lang.hljs.js'
import {
    loadScript
} from './extra-function.js'
function highLightCode(str, callback) {
    var hljs = window.hljs;
    if (!hljs) {
        console.warn('hljs parsing file is missing. mavon-editor will autoload https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js');
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js', function() {
            _highLightCode(str, callback);
        });
    } else {
        _highLightCode(str, callback);
    }
}
function _highLightCode(str, callback) {
    var dom = document.createElement('div');
    var hljs = window.hljs;
    dom.innerHTML = str;
    var pre_code = dom.querySelectorAll('pre > div.hljs > code');
    if (pre_code && hljs) {
        var flag = 0;
        var cnt = 0;
        var i = 0;
        var deal = 0;
        var not_include_lang = {}; // these lang parse file need to be include.
        for (i = 0; i < pre_code.length; i++) {
            var lang = pre_code[i].className.toLowerCase();
            if (lang.length > 0) {
                cnt = cnt + 1;
                // if this lang parse file missing
                if (!hljs.getLanguage(lang) && hljsLangs[lang]) {
                    not_include_lang[lang] = 1;
                }
            }
        }
        // we need to include these lang parse file manually
        var need_langs = [];
        for (var key in not_include_lang) {
            if (not_include_lang.hasOwnProperty(key)) {
                need_langs.push(key);
            }
        }
        for (i = 0; i < need_langs.length; i++) {
            var script = document.createElement('script');
            var url = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/' + need_langs[i] + '.min.js';
            loadScript(url, function() {
                deal = deal + 1;
                if (deal === need_langs.length) {
                    for (var i = 0; i < pre_code.length; i++) {
                        var lang = pre_code[i].className;
                        // if lang is valid.
                        if (lang.length > 0 && hljs.getLanguage(lang)) {
                            hljs.highlightBlock(pre_code[i])
                        }
                    }
                    callback(dom.innerHTML);
                }
            });
        }
        if (need_langs.length === 0) {
            for (i = 0; i < pre_code.length; i++) {
                 lang = pre_code[i].className;
                // if lang is valid.
                if (lang.length > 0 && hljs.getLanguage(lang)) {
                    hljs.highlightBlock(pre_code[i])
                }
            }
            callback(dom.innerHTML);
        }
    } else {
        callback(dom.innerHTML);
    }
}
export default highLightCode;
