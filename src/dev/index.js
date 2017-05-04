/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-04T23:26:08+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: index.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-05-05T00:31:38+08:00
 * @License: MIT
 * @Copyright: 2017
 */

import Vue from 'vue';
var editor = require('./app.vue');
var sMd = require('../index.js');

// use
Vue.use(sMd);
var app = new Vue({
    el: '#main',
    render: h => h(editor)
});
