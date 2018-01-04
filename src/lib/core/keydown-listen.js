/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T00:31:20+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: keydown-listen.js
 * @Last modified by:   chenhuachao
 * @Last modified time: 2017-12-04T00:03:33+08:00
 * @License: MIT
 * @Copyright: 2017
 */

/**
 * Created by zhy on 2017/4/24.
 */
const KEY_CODE = {
    F8: 118,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    B: 66,
    I: 73,
    H: 72,
    U: 85,
    D: 68,
    M:77 ,
    Q: 81,
    O: 79,
    L: 76,
    S: 83,
    Z: 90,
    Y: 89,
    C: 76,
    T: 84,
    DELETE: 8,
    TAB: 9,
    ENTER: 13
};
export const keydownListen = ($vm) => {
    $vm.$el.addEventListener('keydown', function (e) {
        // 注册监听键盘事件
        if (!(e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
            // one key
            switch (e.keyCode) {
                case KEY_CODE.F8: {
                    // F8 导航
                    if ($vm.toolbars.navigation) {
                        e.preventDefault()
                        $vm.toolbar_right_click('navigation')
                    }
                    break;
                }
                case KEY_CODE.F9: {
                    // F9 预览模式
                    if ($vm.toolbars.preview) {
                        e.preventDefault()
                        $vm.toolbar_right_click('preview')
                    }
                    break;
                }
                case KEY_CODE.F10: {
                    // F10 全屏
                    if ($vm.toolbars.fullscreen) {
                        e.preventDefault()
                        $vm.toolbar_right_click('fullscreen')
                    }
                    break;
                }
                case KEY_CODE.F11: {
                    // F11 阅读
                    if ($vm.toolbars.readmodel) {
                        e.preventDefault()
                        $vm.toolbar_right_click('read')
                    }
                    break;
                }
                case KEY_CODE.F12: {
                    // F12 单双栏切花
                    if ($vm.toolbars.subfield) {
                        e.preventDefault()
                        $vm.toolbar_right_click('subfield')
                    }
                    break;
                }
                case KEY_CODE.TAB: {
                    // TAB
                    if (!$vm.$refs.toolbar_left.s_img_link_open) {
                        e.preventDefault()
                        $vm.insertTab();
                    }
                    break;
                }
                case KEY_CODE.ENTER: {
                // enter
                if ($vm.$refs.toolbar_left.s_img_link_open) {
                    e.preventDefault()
                    $vm.$refs.toolbar_left.$imgLinkAdd();
                }
                break;
            }
            }
        } else if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
            // ctrl +
            switch (e.keyCode) {
                case KEY_CODE.B: {
                    // B
                    e.preventDefault()
                    $vm.toolbar_left_click('bold')
                    break;
                }
                case KEY_CODE.I: {
                    // I
                    e.preventDefault()
                    $vm.toolbar_left_click('italic')
                    break;
                }
                case KEY_CODE.H: {
                    // H
                    e.preventDefault()
                    $vm.toolbar_left_click('header')
                    break;
                }
                case KEY_CODE.U: {
                    // U
                    e.preventDefault()
                    $vm.toolbar_left_click('underline')
                    break;
                }
                case KEY_CODE.D: {
                    // D
                    e.preventDefault()
                    $vm.toolbar_left_click('strikethrough')
                    break;
                }
                case KEY_CODE.M: {
                    // M
                    e.preventDefault()
                    $vm.toolbar_left_click('mark')
                    break;
                }
                case KEY_CODE.Q: {
                    // Q
                    e.preventDefault()
                    $vm.toolbar_left_click('quote')
                    break;
                }
                case KEY_CODE.O: {
                    // O
                    e.preventDefault()
                    $vm.toolbar_left_click('ol')
                    break;
                }
                case KEY_CODE.L: {
                    // L
                    e.preventDefault()
                    $vm.toolbar_left_click('link')
                    break;
                }
                case KEY_CODE.S: {
                    // S
                    e.preventDefault()
                    $vm.toolbar_left_click('save')
                    break;
                }
                case KEY_CODE.Z: {
                    // Z
                    e.preventDefault()
                    $vm.toolbar_left_click('undo')
                    break;
                }
                case KEY_CODE.Y: {
                    // Y
                    e.preventDefault()
                    $vm.toolbar_left_click('redo')
                    break;
                }
                case KEY_CODE.DELETE: {
                    // delete
                    e.preventDefault()
                    $vm.toolbar_left_click('trash')
                    break;
                }
            }
        } else if ((e.ctrlKey || e.metaKey) && e.altKey && !e.shiftKey) {
            // ctrl + alt +
            switch (e.keyCode) {
                case KEY_CODE.S: {
                    // S
                    e.preventDefault()
                    $vm.toolbar_left_click('superscript')
                    break;
                }
                case KEY_CODE.U: {
                    // U
                    e.preventDefault()
                    $vm.toolbar_left_click('ul')
                    break;
                }
                case KEY_CODE.C: {
                    // C
                    e.preventDefault()
                    $vm.toolbar_left_click('imagelink')
                    break;
                }
                case KEY_CODE.L: {
                    // L
                    e.preventDefault()
                    $vm.toolbar_left_click('code')
                    break;
                }
                case KEY_CODE.T: {
                    // T
                    e.preventDefault()
                    $vm.toolbar_left_click('table')
                    break;
                }
            }
        } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey) {
            // ctrl + shift
            switch (e.keyCode) {
                case KEY_CODE.S: {
                    // S
                    e.preventDefault()
                    $vm.toolbar_left_click('subscript')
                    break;
                }
            }
        }
    });
}
