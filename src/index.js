/**
 * Created by zhy on 2017/4/1.
 */
'use strict';

/**
 * mavonEditor
 * @author hinesboy
 */
const mavonEditor = require('./mavon-editor.vue');
const markdownIt = mavonEditor.mixins[0].data().markdownIt;
const VueMavonEditor = {
    markdownIt,
    mavonEditor: mavonEditor,
    LeftToolbar: require('./components/md-toolbar-left'),
    RightToolbar: require('./components/md-toolbar-right'),
    install: function (Vue, options = {}) {
        if (options.xss !== false) { // 默认开启xss 使用默认配置
            markdownIt.use(require('markdown-it-xss'), {xss: options.xss})
        }
        Vue.component('mavon-editor', mavonEditor);
    }
};

module.exports = VueMavonEditor;
