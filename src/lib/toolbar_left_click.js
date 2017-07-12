/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T01:23:38+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: toolbar_left_click.js
 * @Last modified by:   chc
 * @Last modified time: 2017-06-09T00:10:16+08:00
 * @License: MIT
 * @Copyright: 2017
 */

function $toolbar_left_undo_click($vm) {
    if ($vm.d_history_index > 0) {
        $vm.d_history_index--
    }
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
    if ($vm.s_preview_switch) {
        let start = $vm.getTextareaDom().selectionStart
        let currentLength = $vm.d_value.length
        $vm.$nextTick(() => {
            // 光标操作
            start -= currentLength - $vm.d_value.length
            $vm.getTextareaDom().selectionStart = start
            $vm.getTextareaDom().selectionEnd = start
        })
    }
}
// redo
function $toolbar_left_redo_click($vm) {
    if ($vm.d_history_index < $vm.d_history.length - 1) {
        $vm.d_history_index++
    }
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
}
function $toolbar_left_trash_click($vm) {
    $vm.d_value = ''
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
}
function $toolbar_left_save_click($vm) {
    $vm.save($vm.d_value, $vm.d_render)
}
export const toolbar_left_click = (_type, $vm) => {
     var _param_of_insert_text = {
         'bold': {
             prefix: '**',
             subfix: '**',
             str: '粗体'
         },
         'italic': {
             prefix: '*',
             subfix: '*',
             str: '斜体'
         },
         'header': {
             prefix: '# ',
             subfix: ' #',
             str: '标题'
         },
         'underline': {
             prefix: '++',
             subfix: '++',
             str: '下划线'
         },
         'strikethrough': {
             prefix: '~~',
             subfix: '~~',
             str: '中划线'
         },
         'mark': {
             prefix: '==',
             subfix: '==',
             str: '标记'
         },
         'superscript': {
             prefix: '^',
             subfix: '^',
             str: '上角标'
         },
         'subscript': {
             prefix: '~',
             subfix: '~',
             str: '下角标'
         },
         'quote': {
             prefix: '> ',
             subfix: '',
             str: '引用'
         },
         'ol': {
             prefix: '1. ',
             subfix: '',
             str: '有序列表'
         },
         'ul': {
             prefix: '- ',
             subfix: '',
             str: '无序列表'
         },
         'link': {
             prefix: '[](',
             subfix: ')',
             str: '链接地址'
         },
         'imagelink': {
             prefix: '![](',
             subfix: ')',
             str: '图片链接'
         },
         'code': {
             prefix: '```',
             subfix: '\n\n```\n',
             str: 'language'
         },
         'table': {
             prefix: '',
             subfix: '',
             str: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
         },
         'aligncenter': {
           prefix: '::: hljs-center\n\n',
           subfix: '\n\n:::\n',
           str: '中心'
         },
         'alignright': {
           prefix: '::: hljs-right\n\n',
           subfix: '\n\n:::\n',
           str: '中心'
         },
         'alignleft': {
           prefix: '::: hljs-left\n\n',
           subfix: '\n\n:::\n',
           str: '中心'
         }
     };
     if (_param_of_insert_text.hasOwnProperty(_type)) {
         // 插入对应的内容
         $vm.insertText($vm.getTextareaDom(),
             _param_of_insert_text[_type]);
     }
     var _other_left_click = {
         'undo': $toolbar_left_undo_click,
         'redo': $toolbar_left_redo_click,
         'trash': $toolbar_left_trash_click,
         'save': $toolbar_left_save_click
     };
     if (_other_left_click.hasOwnProperty(_type)) {
         _other_left_click[_type]($vm);
     }
 }
