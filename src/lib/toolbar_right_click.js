/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T01:39:47+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: toolbar_right_click.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-05-06T17:23:45+08:00
 * @License: MIT
 * @Copyright: 2017
 */

function $toolbar_right_html_click($vm) {
    $vm.s_html_code = !$vm.s_html_code
    if ($vm.htmlcode) {
        $vm.htmlcode($vm.s_html_code, $vm.d_value)
    }
}

function $toolbar_right_help_click($vm) {
    $vm.s_help = !$vm.s_help
    if ($vm.helptoggle) {
        $vm.helptoggle($vm.s_help, $vm.d_value)
    }
}
// todo 导航
function $toolbar_right_read_click($vm) {
    let element = $vm.$refs.vReadModel
    // 单栏编辑
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function $toolbar_right_subfield_click($vm) {
    $vm.s_subField = !$vm.s_subField
    $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
    if ($vm.subfieldtoggle) {
        $vm.subfieldtoggle($vm.s_subField, $vm.d_value)
    }
}

function $toolbar_right_phone_click($vm) {
    $vm.s_screen_phone_toggle = !$vm.s_screen_phone_toggle
}

function $toolbar_right_fullscreen_click($vm) {
    $vm.s_fullScreen = !$vm.s_fullScreen
    if ($vm.fullscreen) {
        $vm.fullscreen($vm.s_fullScreen, $vm.d_value)
    }
}

function $toolbar_right_navigation_click($vm) {
    $vm.s_navigation = !$vm.s_navigation
    if ($vm.navigationtoggle) {
        $vm.navigationtoggle($vm.s_navigation, $vm.d_value)
    }
    if ($vm.s_navigation) {
        // 绘制标题导航
        $vm.getNavigation($vm, false)
    }
}

function $toolbar_right_navigationfull_click($vm) {
    $vm.s_navigation_full = false
}

export const toolbar_right_click = (_type, $vm) => {
    var _other_right_click = {
        'help': $toolbar_right_help_click,
        'html': $toolbar_right_html_click,
        'read': $toolbar_right_read_click,
        'subfield': $toolbar_right_subfield_click,
        'phone': $toolbar_right_phone_click,
        'fullscreen': $toolbar_right_fullscreen_click,
        'navigation': $toolbar_right_navigation_click,
        'navigationfull': $toolbar_right_navigationfull_click
    }
    if (_other_right_click.hasOwnProperty(_type)) {
        _other_right_click[_type]($vm);
    }
}
