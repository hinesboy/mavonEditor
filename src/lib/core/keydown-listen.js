/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T00:31:20+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: keydown-listen.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-05-06T17:31:06+08:00
 * @License: MIT
 * @Copyright: 2017
 */

/**
 * Created by zhy on 2017/4/24.
 */
export const keydownListen = ($vm , markdown) => {
    document.onkeydown = function (e) {
        // 注册监听键盘事件
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            // one key
            switch (e.keyCode) {
                case 9: {
                    // tab 单栏模式
                    if (!$vm.s_subField) {
                        e.preventDefault()
                        if ($vm.$refs.vNoteDivEdit) {
                            let value = markdown.render($vm.d_value)
                            if (value !== null && value !== '') {
                                $vm.$refs.vNoteDivEdit.innerHTML = value
                                let sel = window.getSelection();
                                let range = sel.getRangeAt(0);
                                range = range.cloneRange();
                                range.setStartAfter($vm.$refs.vNoteDivEdit.lastChild)
                                range.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(range);
                            }
                        }
                    }
                    break;
                }
                case 120: {
                    // F9 单栏模式
                    e.preventDefault()
                    $vm.toolbar_right_click('subfield')
                    break;
                }
                case 121: {
                    // F10 全屏
                    e.preventDefault()
                    $vm.toolbar_right_click('fullscreen')
                    break;
                }
                case 122: {
                    // F11 阅读
                    e.preventDefault()
                    $vm.toolbar_right_click('read')
                    break;
                }
                case 119: {
                    // F12 标题导航
                    e.preventDefault()
                    $vm.toolbar_right_click('navigation')
                    break;
                }
            }
        } else if (e.ctrlKey && !e.altKey && !e.shiftKey) {
            // ctrl +
            switch (e.keyCode) {
                case 66: {
                    // B
                    e.preventDefault()
                    $vm.toolbar_left_click('bold')
                    break;
                }
                case 73: {
                    // I
                    e.preventDefault()
                    $vm.toolbar_left_click('italic')
                    break;
                }
                case 72: {
                    // H
                    e.preventDefault()
                    $vm.toolbar_left_click('header')
                    break;
                }
                case 85: {
                    // U
                    e.preventDefault()
                    $vm.toolbar_left_click('underline')
                    break;
                }
                case 68: {
                    // D
                    e.preventDefault()
                    $vm.toolbar_left_click('strikethrough')
                    break;
                }
                case 77: {
                    // M
                    e.preventDefault()
                    $vm.toolbar_left_click('mark')
                    break;
                }
                case 81: {
                    // Q
                    e.preventDefault()
                    $vm.toolbar_left_click('quote')
                    break;
                }
                case 79: {
                    // O
                    e.preventDefault()
                    $vm.toolbar_left_click('ol')
                    break;
                }
                case 76: {
                    // L
                    e.preventDefault()
                    $vm.toolbar_left_click('link')
                    break;
                }
                case 83: {
                    // S
                    e.preventDefault()
                    $vm.toolbar_left_click('save')
                    break;
                }
                case 90: {
                    // Z
                    e.preventDefault()
                    $vm.toolbar_left_click('undo')
                    break;
                }
                case 89: {
                    // Y
                    e.preventDefault()
                    $vm.toolbar_left_click('redo')
                    break;
                }
                case 8: {
                    // delete
                    e.preventDefault()
                    $vm.toolbar_left_click('trash')
                    break;
                }
            }
        } else if (e.ctrlKey && e.altKey && !e.shiftKey) {
            // ctrl + alt +
            switch (e.keyCode) {
                case 83: {
                    // S
                    e.preventDefault()
                    $vm.toolbar_left_click('superscript')
                    break;
                }
                case 85: {
                    // U
                    e.preventDefault()
                    $vm.toolbar_left_click('ul')
                    break;
                }
                case 76: {
                    // C
                    e.preventDefault()
                    $vm.toolbar_left_click('imagelink')
                    break;
                }
                case 67: {
                    // L
                    e.preventDefault()
                    $vm.toolbar_left_click('code')
                    break;
                }
                case 84: {
                    // T
                    e.preventDefault()
                    $vm.toolbar_left_click('table')
                    break;
                }
            }
        } else if (e.ctrlKey && e.shiftKey && !e.altKey) {
            // ctrl + shift
            switch (e.keyCode) {
                case 83: {
                    // S
                    e.preventDefault()
                    $vm.toolbar_left_click('subscript')
                    break;
                }
            }
        }
    }
}
