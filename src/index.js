/**
 * Created by zhy on 2017/4/1.
 */
'use strict';

/**
 * mavonEditor
 * @author hinesboy
 */
const MavonEditor = require('./mavon-editor.vue');
const { defaultMarkdownIt } = require('./lib/mixins/markdown');
const VueMavonEditor = {
    markdownIt: mavonEditor.mixins[0].data().markdownIt,
    MavonEditor,
    defaultMarkdownIt,
    install: function(Vue) {
        Vue.component('mavon-editor', mavonEditor);
    }
};

module.exports = VueMavonEditor;
