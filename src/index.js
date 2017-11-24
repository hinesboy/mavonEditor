/**
 * Created by zhy on 2017/4/1.
 */
'use strict';

/**
 * mavonEditor
 * @author hinesboy
 */

const mavonEditor = require('./mavon-editor.vue');
const markdown = require('./lib/core/markdown');
const VueMavonEditor = {
    markdown: markdown,
    mavonEditorIt: mavonEditor,
    install: function(Vue) {
        Vue.component('mavon-editor', mavonEditor);
    },
};

module.exports = VueMavonEditor;