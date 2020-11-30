/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T01:23:38+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: toolbar_left_click.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-08-10T12:43:22+08:00
 * @License: MIT
 * @Copyright: 2017
 */

function $toolbar_left_undo_click($vm) {
    if ($vm.d_history_index > 0) {
        $vm.d_history_index--
    }
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
    $vm.$nextTick(() => {
        // 光标操作
        let start = $vm.textarea_selectionEnds[$vm.d_history_index];
        $vm.getTextareaDom().selectionStart = start
        $vm.getTextareaDom().selectionEnd = start
    })
    $vm.getTextareaDom().focus()
}
// redo
function $toolbar_left_redo_click($vm) {
    if ($vm.d_history_index < $vm.d_history.length - 1) {
        $vm.d_history_index++
    }
    $vm.$nextTick(() => {
        let start = $vm.textarea_selectionEnds[$vm.d_history_index];
        $vm.getTextareaDom().selectionStart = start
        $vm.getTextareaDom().selectionEnd = start
    })
    $vm.getTextareaDom().focus()
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
}
function $toolbar_left_trash_click($vm) {
    $vm.d_value = ''
    $vm.getTextareaDom().focus()
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
}
function $toolbar_left_save_click($vm) {
    $vm.save($vm.d_value, $vm.d_render)
}
// ol
function $toolbar_left_ol_click($vm) {
    $vm.insertOl()
}
// ul
function $toolbar_left_ul_click($vm) {
    $vm.insertUl()
}
function $toolbar_left_remove_line_click($vm) {
    $vm.removeLine()
}
// 直接添加链接
export const toolbar_left_addlink = (type, text, link, $vm) => {
    let insert_text = {
        prefix: type === 'link' ? `[${text}](` : `![${text}](`,
        subfix: ')',
        str: link
    };
    $vm.insertText($vm.getTextareaDom(), insert_text);
}
export const toolbar_left_click = (_type, $vm) => {
     var _param_of_insert_text = {
         'bold': {
             prefix: '**',
             subfix: '**',
             str: $vm.d_words.tl_bold
         },
         'italic': {
             prefix: '*',
             subfix: '*',
             str: $vm.d_words.tl_italic
         },
         'header': {
             prefix: '# ',
             subfix: '',
             str: $vm.d_words.tl_header
         },
         'header1': {
             prefix: '# ',
             subfix: '',
             str: $vm.d_words.tl_header_one
         },
         'header2': {
             prefix: '## ',
             subfix: '',
             str: $vm.d_words.tl_header_two
         },
         'header3': {
             prefix: '### ',
             subfix: '',
             str: $vm.d_words.tl_header_three
         },
         'header4': {
             prefix: '#### ',
             subfix: '',
             str: $vm.d_words.tl_header_four
         },
         'header5': {
             prefix: '##### ',
             subfix: '',
             str: $vm.d_words.tl_header_five
         },
         'header6': {
             prefix: '###### ',
             subfix: '',
             str: $vm.d_words.tl_header_six
         },
         'underline': {
             prefix: '++',
             subfix: '++',
             str: $vm.d_words.tl_underline
         },
         'strikethrough': {
             prefix: '~~',
             subfix: '~~',
             str: $vm.d_words.tl_strikethrough
         },
         'mark': {
             prefix: '==',
             subfix: '==',
             str: $vm.d_words.tl_mark
         },
         'superscript': {
             prefix: '^',
             subfix: '^',
             str: $vm.d_words.tl_superscript
         },
         'subscript': {
             prefix: '~',
             subfix: '~',
             str: $vm.d_words.tl_subscript
         },
         'quote': {
             prefix: '> ',
             subfix: '',
             str: $vm.d_words.tl_quote
         },
         'link': {
             prefix: '[](',
             subfix: ')',
             str: $vm.d_words.tl_link
         },
         'imagelink': {
             prefix: '![](',
             subfix: ')',
             str: $vm.d_words.tl_image
         },
         'code': {
             prefix: '```\n',
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
           str: $vm.d_words.tl_aligncenter
         },
         'alignright': {
           prefix: '::: hljs-right\n\n',
           subfix: '\n\n:::\n',
           str: $vm.d_words.tl_alignright
         },
         'alignleft': {
           prefix: '::: hljs-left\n\n',
           subfix: '\n\n:::\n',
           str: $vm.d_words.tl_alignleft
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
         'save': $toolbar_left_save_click,
         'ol': $toolbar_left_ol_click,
         'ul': $toolbar_left_ul_click,
         'removeLine': $toolbar_left_remove_line_click
     };
     if (_other_left_click.hasOwnProperty(_type)) {
         _other_left_click[_type]($vm);
     }
 }
