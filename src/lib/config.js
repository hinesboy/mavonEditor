/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-06T21:40:39+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: config.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-05-06T22:12:49+08:00
 * @License: MIT
 * @Copyright: 2017
 */

import help_cn from './lang/cn/help_cn.md'
import help_en from './lang/en/help_en.md'
import words_cn from './lang/cn/words_cn.json'
import words_en from './lang/en/words_en.json'
export const CONFIG = {
    'help_cn': help_cn,
    'help_en': help_en,
    'words_cn': words_cn,
    'words_en': words_en,
    'langList': ['en' , 'cn'],
    'toolbars': {
        'bold': true,
        'italic': true,
        'header': true,
        'underline': true,
        'strikethrough': true,
        'mark': true,
        'superscript': true,
        'subscript': true,
        'quote': true,
        'ol': true,
        'ul': true,
        'link': true,
        'imagelink': true,
        'code': true,
        'table': true,
        'undo': true,
        'redo': true,
        'trash': true,
        'save': true,
        'navigation': true,
        'subfield': true,
        'fullscreen': true,
        'readmodel': true,
        'htmlcode': true,
        'help': true
    }
};
