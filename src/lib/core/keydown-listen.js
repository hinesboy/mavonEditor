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
                        if ($vm.$refs.vNoteDivEdit ) {
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
                    $vm.$toolbar_right_subfield_click()
                    break;
                }
                case 121: {
                    // F10 全屏
                    e.preventDefault()
                    $vm.$toolbar_right_fullscreen_click()
                    break;
                }
                case 122: {
                    // F11 阅读
                    e.preventDefault()
                    $vm.$toolbar_right_read_click()
                    break;
                }
                case 119: {
                    // F12 标题导航
                    e.preventDefault()
                    $vm.$toolbar_right_navigation_click()
                    break;
                }
            }
        } else if (e.ctrlKey && !e.altKey && !e.shiftKey) {
            // ctrl +
            switch (e.keyCode) {
                case 66: {
                    // B
                    e.preventDefault()
                    $vm.$toolbar_left_bold_click()
                    break;
                }
                case 73: {
                    // I
                    e.preventDefault()
                    $vm.$toolbar_left_italic_click()
                    break;
                }
                case 72: {
                    // H
                    e.preventDefault()
                    $vm.$toolbar_left_header_click()
                    break;
                }
                case 85: {
                    // U
                    e.preventDefault()
                    $vm.$toolbar_left_underline_click()
                    break;
                }
                case 68: {
                    // D
                    e.preventDefault()
                    $vm.$toolbar_left_strikethrough_click()
                    break;
                }
                case 77: {
                    // M
                    e.preventDefault()
                    $vm.$toolbar_left_mark_click()
                    break;
                }
                case 81: {
                    // Q
                    e.preventDefault()
                    $vm.$toolbar_left_quote_click()
                    break;
                }
                case 79: {
                    // O
                    e.preventDefault()
                    $vm.$toolbar_left_ol_click()
                    break;
                }
                case 76: {
                    // L
                    e.preventDefault()
                    $vm.$toolbar_left_link_click()
                    break;
                }
                case 83: {
                    // S
                    e.preventDefault()
                    $vm.$toolbar_left_save_click()
                    break;
                }
                case 90: {
                    // Z
                    e.preventDefault()
                    $vm.$toolbar_left_undo_click()
                    break;
                }
                case 89: {
                    // Y
                    e.preventDefault()
                    $vm.$toolbar_left_redo_click()
                    break;
                }
                case 8: {
                    // delete
                    e.preventDefault()
                    $vm.$toolbar_left_trash_click()
                    break;
                }
            }
        } else if (e.ctrlKey && e.altKey && !e.shiftKey) {
            // ctrl + alt +
            switch (e.keyCode) {
                case 83: {
                    // S
                    e.preventDefault()
                    $vm.$toolbar_left_superscript_click()
                    break;
                }
                case 85: {
                    // U
                    e.preventDefault()
                    $vm.$toolbar_left_ul_click()
                    break;
                }
                case 76: {
                    // C
                    e.preventDefault()
                    $vm.$toolbar_left_imagelink_click()
                    break;
                }
                case 67: {
                    // L
                    e.preventDefault()
                    $vm.$toolbar_left_code_click()
                    break;
                }
                case 84: {
                    // T
                    e.preventDefault()
                    $vm.$toolbar_left_table_click()
                    break;
                }
            }
        } else if (e.ctrlKey && e.shiftKey && !e.altKey) {
            // ctrl + shift
            switch (e.keyCode) {
                case 83: {
                    // S
                    e.preventDefault()
                    $vm.$toolbar_left_subscript_click()
                    break;
                }
            }
        }
    }
}
