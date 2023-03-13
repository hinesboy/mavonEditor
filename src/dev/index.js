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

import { createApp, h } from 'vue';
import demo from './demo.vue';
import sMd from '../index'

createApp({
    render: () => h(demo)
}).use(sMd).mount('#main');
