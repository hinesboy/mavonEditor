/**
 * @Author: HuaChao Chen <chc>
 * @Date:   2017-06-14T23:04:34+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: extra-function.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-12-19T17:46:48+08:00
 * @License: MIT
 * @Copyright: 2017
 */

/**
 * Created by zhy on 2017/4/24.
 */
/**
 * textarea 插入内容
 */
export const insertTextAtCaret = (obj, {prefix, subfix, str}, $vm) => {
    obj.focus()
    if (document.selection) {
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        if (startPos === endPos) {
            // 直接插入
            obj.value = tmpStr.substring(0, startPos) + prefix + str + subfix + tmpStr.substring(endPos, tmpStr.length);
            obj.selectionStart = startPos + prefix.length;
            obj.selectionEnd = startPos + (str.length + prefix.length);
        } else {
            // 存在选中区域
            if (tmpStr.substring(startPos - prefix.length, startPos) === prefix && tmpStr.substring(endPos, endPos + subfix.length) === subfix) {
                // 取消
                obj.value = tmpStr.substring(0, startPos - prefix.length) + tmpStr.substring(startPos, endPos) + tmpStr.substring(endPos + subfix.length, tmpStr.length);
                obj.selectionStart = startPos - prefix.length;
                obj.selectionEnd = endPos - prefix.length;
            } else {
                // 确定
                obj.value = tmpStr.substring(0, startPos) + prefix + tmpStr.substring(startPos, endPos) + subfix + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = startPos + prefix.length;
                obj.selectionEnd = startPos + (endPos - startPos + prefix.length);
            }
        }
    } else {
        alert('else')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus()
}
// 插入tab
export const insertTab = ($vm) => {
    let obj = $vm.getTextareaDom();
    if (document.selection) {
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + '    ' + tmpStr.substring(endPos, tmpStr.length);
        obj.selectionStart = obj.selectionEnd = startPos + 4;
    } else {
        alert('else')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus();
}
/**
 * 生成导航目录
 */
export const getNavigation = ($vm , full) => {
    let navigationContent;

    navigationContent = $vm.$refs.navigationContent

    navigationContent.innerHTML = $vm.d_render
    let nodes = navigationContent.children
    if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
            judageH(nodes[i] , i , nodes)
        }
    }
    function judageH(node , i , nodes) {
        let reg = /^H[1-6]{1}$/;
        if (!reg.exec(node.tagName)) {
            node.style.display = 'none'
        } else {
            node.onclick = function () {
                let vShowContent = $vm.$refs.vShowContent;
                let vNoteEdit = $vm.$refs.vNoteEdit;
                if ($vm.s_subfield) {
                    // 双栏
                    if ($vm.s_preview_switch) {
                        // 编辑预览
                        vNoteEdit.scrollTop = vShowContent.children[i].offsetTop * (vNoteEdit.scrollHeight - vNoteEdit.offsetHeight) / (vShowContent.scrollHeight - vShowContent.offsetHeight);
                    } else {
                        // todo 编辑
                    }
                } else {
                    // 单栏
                    if ($vm.s_preview_switch) {
                        // 预览
                        vShowContent.scrollTop = vShowContent.children[i].offsetTop;
                    } else {
                        // todo 编辑
                    }
                }
            }
        }
    }
}

/**
 * 滚动条联动
 */
export const scrollLink = ($event, $vm) => {
    let element = $event.srcElement ? $event.srcElement : $event.target
    let ratio = element.scrollTop / (element.scrollHeight - element.offsetHeight)
    if ($vm.edit_scroll_height >= 0 && element.scrollHeight !== $vm.edit_scroll_height && (element.scrollHeight - element.offsetHeight - element.scrollTop <= 30)) {
        // star 内容变化 导致 高度增加  且滚动条距离底部小于25px  自动滚动到底部
        $vm.$refs.vNoteEdit.scrollTop = element.scrollHeight - element.offsetHeight
        ratio = 1
    }
    $vm.edit_scroll_height = element.scrollHeight
    // end ----
    if ($vm.$refs.vShowContent.scrollHeight > $vm.$refs.vShowContent.offsetHeight) {
        $vm.$refs.vShowContent.scrollTop = ($vm.$refs.vShowContent.scrollHeight - $vm.$refs.vShowContent.offsetHeight) * ratio
    }
}
/**
 * 监听浏览器fullscreen
 * @param $vm
 */
export const fullscreenchange = ($vm) => {
    // 阅读模式 全屏监听事件
    $vm.$el.addEventListener('fullscreenchange', function (e) {
        $vm.$toolbar_right_read_change_status()
    }, false);
    $vm.$el.addEventListener('mozfullscreenchange', function (e) {
        $vm.$toolbar_right_read_change_status()
    }, false);
    $vm.$el.addEventListener('webkitfullscreenchange', function (e) {
        $vm.$toolbar_right_read_change_status()
    }, false);
    $vm.$el.addEventListener('msfullscreenchange', function (e) {
        $vm.$toolbar_right_read_change_status()
    }, false);
}

/**
 * 监听浏览器onresize
 * @param $vm
 */
export const windowResize = ($vm) => {
    function sizeToStatus() {
        if ($vm.$el.clientWidth > 768) {
            // > 768
            $vm.s_subfield = $vm.subfield;
        }
        else {
            // <  768
            $vm.s_subfield = false;
        }
    }

    sizeToStatus();
    window.addEventListener('resize', sizeToStatus);
}

export function loadScript(src, callback) {
    if (!(typeof callback === 'function')) {
        callback = function() {};
    }
    var check = document.querySelectorAll("script[src='" + src + "']");
    if (check.length > 0) {
        check[0].addEventListener('load', function() {
            callback();
        });
        callback();
        return;
    }
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState === 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(script);
}

// <link href="https://cdn.bootcss.com/highlight.js/9.12.0/styles/agate.min.css" rel="stylesheet">
export function loadLink(src, callback) {
    if (!(typeof callback === 'function')) {
        callback = function() {};
    }
    var check = document.querySelectorAll("link[href='" + src + "']");
    if (check.length > 0) {
        callback();
        return;
    }
    var link = document.createElement('link');
    var head = document.getElementsByTagName('head')[0];
    link.rel = 'stylesheet';
    link.href = src;
    if (link.addEventListener) {
        link.addEventListener('load', function () {
            callback();
        }, false);
    } else if (link.attachEvent) {
        link.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState === 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(link);
}

export const ImagePreviewListener = ($vm) => {
    // vShowContent
    $vm.$refs.vShowContent.addEventListener('click', function (event) {
        event = event ? event : window.event;
        let ele = event.srcElement ? event.srcElement : event.target;
        if (ele.tagName === 'IMG') {
            if ($vm.imageClick) {
                // 覆盖图片点击事件
                $vm.imageClick(ele);
            } else {
                $vm.d_preview_imgsrc = ele.src;
            }
        }
    })
}
