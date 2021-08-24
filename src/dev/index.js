/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-04T23:26:08+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: index.js
 * @Last modified by:   chc
 * @Last modified time: 2017-11-25T12:14:56+08:00
 * @License: MIT
 * @Copyright: 2017
 */

import * as Vue from 'vue';
import editor from './app.vue';
var sMd = require('../index.js');

var app = Vue.createApp(editor).use(sMd).mount('#main');
