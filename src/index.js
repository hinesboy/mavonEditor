/**
 * Created by zhy on 2017/4/1.
 */
'use strict';

/**
 * mavonEditor
 * @author hinesboy
 */
const mavonEditorFa = require('./mavon-editor-fa.vue');
const VueMavonEditor = {
    markdownIt: mavonEditorFa.mixins[0].data().markdownIt,
    mavonEditor: mavonEditorFa,
    LeftToolbar: require('./components/md-toolbar-left'),
    RightToolbar: require('./components/md-toolbar-right'),
    install: function(Vue) {
        Vue.component('mavon-editor-fa', mavonEditorFa);
    }
};

module.exports = VueMavonEditor;
