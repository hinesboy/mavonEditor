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
export const insertTextAtCaret = (obj, {prefix, subfix, str, type}, $vm) => {
    obj.focus()
    if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
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
            if (tmpStr.substring(startPos - prefix.length, startPos) === prefix && tmpStr.substring(endPos, endPos + subfix.length) === subfix && judgeItalicAndBold(prefix, subfix, tmpStr, startPos, endPos)) {
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
        alert('Error: Browser version is too low')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus()
}
// 处理粗体与斜体冲突问题
function judgeItalicAndBold(prefix, subfix, tmpStr, startPos, endPos) {
    if (prefix === '*' && subfix ===  '*') {
        if (tmpStr.substring(startPos - 2, startPos - 1) === '*' && tmpStr.substring(endPos + 1, endPos + 2) === '*') {
            return false
        }
    }
    return true
}
// 插入有序列表
export const insertOl = ($vm) => {
    let obj = $vm.getTextareaDom();
    if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        if (startPos === endPos) {
            // 直接插入
            obj.value = tmpStr.substring(0, startPos) + '1. ' + tmpStr.substring(endPos, tmpStr.length);
            obj.selectionEnd = obj.selectionStart = startPos + 3;
        } else {
            // 存在选中区域
            let start = startPos
            while (start > 0 && tmpStr.substring(start - 1, start) !== '\n') {
                start--
            }
            let selectStr = tmpStr.substring(start, endPos)
            let selectStrs = selectStr.split('\n')
            for (let i = 0; i < selectStrs.length; i++) {
                selectStrs[i] = (i + 1) + '. ' + selectStrs[i]
            }
            let newSelectStr = selectStrs.join('\n')
            obj.value = tmpStr.substring(0, start) + newSelectStr + tmpStr.substring(endPos, tmpStr.length);
            obj.selectionStart = start
            obj.selectionEnd = endPos + newSelectStr.length - selectStr.length;
        }
    } else {
        alert('Error: Browser version is too low')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus();
}
// 删除行
export const removeLine = ($vm) => {
    let obj = $vm.getTextareaDom();
    if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        // 找到行首、行尾
        let start = startPos
        while (start > 0 && tmpStr.substring(start - 1, start) !== '\n') {
            start--
        }
        let end = endPos
        while (end < tmpStr.length && tmpStr.substring(end, end + 1) !== '\n') {
            end++
        }
        if (end < tmpStr.length) {
            end++
        }
        obj.value = tmpStr.substring(0, start)  + tmpStr.substring(end, tmpStr.length);
        obj.selectionEnd = obj.selectionStart = start === 0 ? 0 : start - 1;
    } else {
        alert('Error: Browser version is too low')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus();
}
// 插入无序列表
export const insertUl = ($vm) => {
    let obj = $vm.getTextareaDom();
    if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        if (startPos === endPos) {
            // 直接插入
            obj.value = tmpStr.substring(0, startPos) + '- ' + tmpStr.substring(endPos, tmpStr.length);
            obj.selectionEnd = obj.selectionStart = startPos + 2;
        } else {
            // 存在选中区域
            let start = startPos
            while (start > 0 && tmpStr.substring(start - 1, start) !== '\n') {
                start--
            }
            let selectStr = tmpStr.substring(start, endPos)
            let newSelectStr = selectStr.replace(/\n/g, '\n- ')
            newSelectStr = '- ' + newSelectStr
            obj.value = tmpStr.substring(0, start) + newSelectStr + tmpStr.substring(endPos, tmpStr.length);
            obj.selectionStart = start
            obj.selectionEnd = endPos + newSelectStr.length - selectStr.length;
        }
    } else {
        alert('Error: Browser version is too low')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus();
}
// 插入tab
export const insertTab = ($vm, tab) => {
    tab = tab ? (new Array(tab)).fill(' ').join('') : '\t'
    let obj = $vm.getTextareaDom();
    if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        let lastLine = tmpStr.substring(0, startPos).split('\n').pop()
        if (lastLine.match(/^\s*[0-9]+\.\s+\S*/)) {
            // 有序列表
            let temp = lastLine.replace(/(\d+)/, 1)
            obj.value = tmpStr.substring(0, startPos - temp.length) + tab + temp + tmpStr.substring(endPos, tmpStr.length);
        } else if (lastLine.match(/^\s*-\s+\S*/)) {
            // 无序列表
            obj.value = tmpStr.substring(0, startPos - lastLine.length) + tab + lastLine + tmpStr.substring(endPos, tmpStr.length);
        } else {
            obj.value = tmpStr.substring(0, startPos) + tab + tmpStr.substring(endPos, tmpStr.length);
        }
        obj.selectionStart = obj.selectionEnd = startPos + tab.length;
    } else {
        alert('Error: Browser version is too low')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus();
}
// shift + tab
export const unInsertTab = ($vm, tab) => {
    let regTab = new RegExp(tab ? `\\s{${tab}}` : '\t')
    console.log(`regTab:`, regTab)
    let obj = $vm.getTextareaDom();
    if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        let lastLine = tmpStr.substring(0, startPos).split('\n').pop()
        if (lastLine.search(regTab) >= 0) {
            // 替换最后一个制表符为空
            obj.value = tmpStr.substring(0, startPos - lastLine.length) +  lastLine.replace(regTab, '') + tmpStr.substring(endPos, tmpStr.length);
            obj.selectionStart = obj.selectionEnd = startPos - (tab || 1);
        }
    } else {
        alert('Error: Browser version is too low')
        // obj.value += str;
    }
    // 触发change事件
    $vm.d_value = obj.value
    obj.focus();
}
// 插入enter
export const insertEnter = ($vm, event) => {
    let obj = $vm.getTextareaDom()
    if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        // 获取光标前最后一行字符串
        let lastLine = tmpStr.substring(0, startPos).split('\n').pop()
        let matchListNeedChangeLine = lastLine.match(/^\s*(?:[0-9]+\.|-)\s+\S+/)
        if (matchListNeedChangeLine) {
            // 需要自动产生下一个列表项
            event.preventDefault()
            // eg: [1.  test] 仅获取[1. ]
            let subfix = matchListNeedChangeLine.shift().match(/^\s*(?:[0-9]+\.|-)\s/).shift()
            if (subfix.search(/-/) >= 0) {
                // 无序列表
                obj.value = tmpStr.substring(0, startPos) + '\n' + subfix + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = obj.selectionEnd = startPos + subfix.length + 1
            } else {
                // 有序列表
                let temp = subfix.replace(/(\d+)/, parseInt(subfix) + 1)
                obj.value = tmpStr.substring(0, startPos) + '\n' + temp + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = obj.selectionEnd = startPos + temp.length + 1
            }
        } else {
            let matchListNeedRemoveLine = lastLine.match(/^\s*(?:[0-9]+\.|-)\s+$/)
            if (matchListNeedRemoveLine) {
                // 需要跳出列表
                event.preventDefault()
                let preLength = matchListNeedRemoveLine.shift().length
                obj.value = tmpStr.substring(0, startPos - preLength) + '\n' + tmpStr.substring(endPos, tmpStr.length);
                obj.selectionStart = obj.selectionEnd = startPos - preLength
                // TODO 检测是否存在嵌套列表，自动生成上一级
            }
        }
    } else {
        alert('Error: Browser version is too low')
    }
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
export function loadLink(src, callback, id) {
    if (!(typeof callback === 'function')) {
        callback = function() {};
    }
    var check = document.querySelectorAll("link[href='" + src + "']");
    if (check.length > 0) {
        callback();
        return;
    }

    if(id){
        var styles = document.querySelectorAll("link#" + id);
        if(styles.length){
            styles[0].href = src;
            return;
        }
    }

    var link = document.createElement('link');
    var head = document.getElementsByTagName('head')[0];
    link.rel = 'stylesheet';
    link.href = src;
    id && (link['id'] = id);
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
            if ($vm.imageClick != null) {
                // 覆盖图片点击事件
                $vm.imageClick(ele);
            } else {
                $vm.d_preview_imgsrc = ele.src;
            }
        }
    })
}
