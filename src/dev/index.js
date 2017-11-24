/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-04T23:26:08+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: index.js
 * @Last modified by:   chc
 * @Last modified time: 2017-06-12T16:08:03+08:00
 * @License: MIT
 * @Copyright: 2017
 */

import Vue from 'vue';
var editor = require('./app.vue');
var sMd = require('../index.js');
// var sMd = require('../../dist/mavon-editor.js')
// use
Vue.use(sMd);

var app = new Vue({
    el: '#main',
    render: h => h(editor)
});
