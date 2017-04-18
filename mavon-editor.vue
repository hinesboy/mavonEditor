<template>
  <div @keydown="$v_markdown_key_listen" :class="{'fullscreen': s_fullScreen}" class="v-note-wrapper markdown-body">
    <!--工具栏-->
    <div class="v-note-op">
      <div class="left">
        <button v-if="toolbars.bold" @click="$toolbar_left_bold_click" class="op-icon fa fa-bold" aria-hidden="true"
                title="粗体 (ctrl+b)"></button>
        <button v-if="toolbars.italic" @click="$toolbar_left_italic_click" class="op-icon fa fa-italic" aria-hidden="true"
                title="斜体 (ctrl+i)"></button>
        <button v-if="toolbars.header" @click="$toolbar_left_header_click" class="op-icon fa fa-header" aria-hidden="true"
                title="标题 (ctrl+h)"></button>
        <span v-if="toolbars.header || toolbars.italic || toolbars.bold" class="op-icon-divider"></span>
        <button v-if="toolbars.underline" @click="$toolbar_left_underline_click" class="op-icon fa fa-underline"
                title="下划线 (ctrl+u)" aria-hidden="true"></button>
        <button v-if="toolbars.strikethrough" @click="$toolbar_left_strikethrough_click" class="op-icon fa fa-strikethrough"
                title="中划线 (ctrl+d)" aria-hidden="true"></button>
        <button v-if="toolbars.mark" @click="$toolbar_left_mark_click" class="op-icon fa fa-thumb-tack" title="标记 (ctrl+m)"
                aria-hidden="true"></button>
        <button v-if="toolbars.superscript" @click="$toolbar_left_superscript_click" class="op-icon fa fa-superscript"
                aria-hidden="true" title="上角标 (ctrl+alt+s)"></button>
        <button v-if="toolbars.subscript" @click="$toolbar_left_subscript_click" class="op-icon fa fa-subscript"
                aria-hidden="true" title="下角标 (ctrl+shift+s)"></button>
        <span
                v-if="toolbars.superscript || toolbars.subscript || toolbars.underline || toolbars.strikethrough || toolbars.mark"
                class="op-icon-divider"></span>
        <button v-if="toolbars.quote" @click="$toolbar_left_quote_click" class="op-icon fa fa-quote-left" aria-hidden="true"
                title="段落引用 (ctrl+q)"></button>
        <button v-if="toolbars.ol" @click="$toolbar_left_ol_click" class="op-icon fa fa-list-ol" aria-hidden="true"
                title="有序列表 (ctrl+o)"></button>
        <button v-if="toolbars.ul" @click="$toolbar_left_ul_click" class="op-icon fa fa-list-ul" aria-hidden="true"
                title="无序列表 (ctrl+alt+u)"></button>
        <span v-if="toolbars.ul || toolbars.ol || toolbars.quote" class="op-icon-divider"></span>
        <button v-if="toolbars.link" @click="$toolbar_left_link_click" class="op-icon fa fa-link" aria-hidden="true"
                title="链接 (ctrl+l)"></button>
        <button v-if="toolbars.imagelink" @click="$toolbar_left_imagelink_click" class="op-icon fa fa-picture-o"
                aria-hidden="true" title="图片链接 (ctrl+alt+l)"></button>
        <button v-if="toolbars.code" @click="$toolbar_left_code_click" class="op-icon fa fa-code" aria-hidden="true"
                title="代码块 (ctrl+alt+c)"></button>
        <button v-if="toolbars.table" @click="$toolbar_left_table_click" class="op-icon fa fa-table" aria-hidden="true"
                title="表格 (ctrl+alt+t)"></button>
      </div>
      <div class="right">
        <button @click="$toolbar_right_phone_click" v-show="s_screen_phone && s_screen_phone_toggle"
                class="op-icon fa fa-eye"
                aria-hidden="true" title="预览 (F9)"></button>
        <button @click="$toolbar_right_phone_click" v-show="s_screen_phone && !s_screen_phone_toggle"
                class="op-icon fa fa-eye-slash selected"
                aria-hidden="true" title="编辑 (F9)"></button>
        <button v-if="toolbars.subfield" @click="$toolbar_right_subfield_click" v-show="s_subField && !s_screen_phone"
                class="op-icon fa fa-window-maximize"
                aria-hidden="true" title="单栏模式 (F9)"></button>
        <button v-if="toolbars.subfield" @click="$toolbar_right_subfield_click" v-show="!s_subField && !s_screen_phone"
                class="op-icon fa fa-columns selected"
                aria-hidden="true" title="双栏模式 (F9)"></button>
        <button v-if="toolbars.fullscreen" @click="$toolbar_right_fullscreen_click" v-show="!s_fullScreen"
                class="op-icon fa fa-arrows-alt"
                title="全屏编辑 (F10)" aria-hidden="true"></button>
        <button v-if="toolbars.fullscreen" @click="$toolbar_right_fullscreen_click" v-show="s_fullScreen"
                class="op-icon fa fa-compress selected"
                title="退出全屏 (F10)" aria-hidden="true"></button>
        <button v-if="toolbars.readmodel && !s_screen_phone" @click="$toolbar_right_read_click" class="op-icon fa fa-eye" aria-hidden="true"
                title="沉浸式阅读 (F11)"></button>
        <span
                v-if="!s_screen_phone && toolbars.help && toolbars.htmlcode && toolbars.readmodel && toolbars.fullscreen && toolbars.subfield"
                class="op-icon-divider"></span>
        <button v-if="toolbars.htmlcode" @click="$toolbar_right_html_click" v-show="!s_html_code" class="op-icon fa fa-code"
                title="查看html文本"
                aria-hidden="true"></button>
        <button v-if="toolbars.htmlcode" @click="$toolbar_right_html_click" v-show="s_html_code"
                class="op-icon fa fa-code selected"
                title="返回markdown文本" aria-hidden="true"></button>
        <button v-if="toolbars.help" @click="$toolbar_right_help_click" class="op-icon fa fa-question-circle"
                style="font-size: 17px;padding: 4px"
                title="markdown语法帮助" aria-hidden="true"></button>
      </div>
    </div>
    <!--编辑展示区域-->
    <div class="v-note-panel">
      <!--编辑区-->
      <div ref="vNoteEdit" @scroll="$v_edit_scroll" class="v-note-edit divarea-wrapper"
           :class="{'scroll-style': s_scrollStyle ,'no-subField': !s_subField && !s_screen_phone , 'phone-edit': s_screen_phone && s_screen_phone_toggle && !s_html_code, 'phone-show': (s_screen_phone && !s_screen_phone_toggle) || (s_screen_phone && s_html_code)}">
        <!-- 单栏模式 html展示 -->
        <div v-show="!s_subField&&s_html_code&&!s_screen_phone" class="content-div">
          {{d_render}}
        </div>
        <!-- 单栏模式 渲染区域-->
        <div ref="vNoteDivEdit" @keydown.enter="$auto_textarea_div_enter" @keyup="$auto_textarea_div_change" spellcheck="false" v-show="!s_subField&&!s_html_code&&!s_screen_phone"
             class="content-div content-div-edit" contenteditable="true">
        </div>
        <div v-show="s_subField||s_screen_phone" class="content-input-wrapper">
          <!-- 双栏 -->
          <v-autoTextarea ref="vNoteTextarea" placeholder="开始编辑..." class="content-input" fontSize="15px"
                          lineHeight="1.5" v-model="d_value"></v-autoTextarea>
        </div>
      </div>
      <!--展示区-->
      <div :class="{'phone-show': (s_screen_phone && !s_screen_phone_toggle) || (s_screen_phone && s_html_code)}" v-show="s_subField||s_screen_phone" class="v-note-show">
        <div ref="vShowContent" v-html="d_render" v-show="!s_html_code"
             :class="{'scroll-style': s_scrollStyle}" class="v-show-content">
        </div>
        <div v-show="s_html_code" :class="{'scroll-style': s_scrollStyle}" class="v-show-content-html">
          {{d_render}}
        </div>
      </div>


    </div>
    <!--帮助文档-->
    <transition name="fade">
      <div @click="$toolbar_right_help_click" class="v-note-help-wrapper" v-if="s_help">
        <div @click.stop.prevent="" class="v-note-help-content">
          <i @click.stop.prevent="$toolbar_right_help_click" class="fa fa-times" aria-hidden="true"></i>
          <div class="scroll-style v-note-help-show" v-html="d_help"></div>
        </div>
      </div>
    </transition>
    <!--阅读模式-->
    <div :class="{'show': s_readmodel}" class="v-note-read-model scroll-style" ref="vReadModel" v-html="d_render">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import markdown from './lib/markdown.js'
    import tomarkdown from './lib/to-markdown.js'
    import {autoTextarea} from 'auto-textarea'
    import {p_ObjectCopy_DEEP} from './lib/util.js'
    const HELP = require('./lib/help.json')
    export default {
        props: {
            // 是否渲染滚动条样式(webkit)
            scrollStyle: {
                type: Boolean,
                default: true
            },
            help: {
                type: String,
                default: null
            },
            // 初始value
            value: {
                type: String,
                default: ''
            },
            // 默认是否分栏 用于记忆用户模式
            subfield: {
                type: Boolean,
                default: true
            },
            // 工具栏
            toolbars: {
                type: Object,
                default() {
                    return {
                        bold: true, // 粗体
                        italic: true,// 斜体
                        header: true,// 标题
                        underline: true,// 下划线
                        strikethrough: true,// 中划线
                        mark: true,// 标记
                        superscript: true,// 上角标
                        subscript: true,// 下角标
                        quote: true,// 引用
                        ol: true,// 有序列表
                        ul: true,// 无序列表
                        link: true,// 链接
                        imagelink: true,// 图片链接
                        code: true,// code
                        table: true,// 表格
                        subfield: true,// 是否需要分栏
                        fullscreen: true,// 全屏编辑
                        readmodel: true,// 沉浸式阅读
                        htmlcode: true,// 展示html源码
                        help: true// 帮助
                    }
                }
            }
        },
        data() {
            return {
                s_autofocus: true,
                s_scrollStyle: (() => {
                    return this.scrollStyle
                })(),// props 是否渲染滚动条样式
                d_value: (() => {
                    return this.value
                })(),// props 文本内容
                d_render: (() => {
                    return markdown.render(this.value);
                })(),// props 文本内容render
                s_subField: (() => {
                    return this.subfield
                })(), // props 是否分栏模式
                s_fullScreen: false,// 全屏编辑标志
                s_html_code: false,// 分栏情况下查看html
                s_help: false,// markdown帮助
                d_help: (() => {
                    if (this.help === null) {
                        return markdown.render(HELP.help)
                    } else {
                        return this.help
                    }
                })(),
                edit_scroll_height: -1,
                s_readmodel: false,
                s_table_enter: false, // 回车事件是否在表格中执行
                s_screen_phone_toggle: true,
                s_screen_phone: false
            };
        },
        created() {
            let $vm = this;
            $vm.watch_screen_size()
            window.onresize = function () {
                // 媒介查询
                $vm.watch_screen_size()
            }
            if (this.$refs.vNoteDivEdit) {
                this.$refs.vNoteDivEdit.innerHTML = markdown.render(this.d_value)
            }
            // 阅读模式 全屏监听事件
            document.addEventListener('fullscreenchange', function (e) {
                $vm.$toolbar_right_read_change_status()
            }, false);
            document.addEventListener('mozfullscreenchange', function (e) {
                $vm.$toolbar_right_read_change_status()
            }, false);
            document.addEventListener('webkitfullscreenchange', function (e) {
                $vm.$toolbar_right_read_change_status()
            }, false);
            document.addEventListener('msfullscreenchange', function (e) {
                $vm.$toolbar_right_read_change_status()
            }, false);
        },
        methods: {
            // @event
            // 修改数据触发 （val ， val_render）
            change(val , render) {
                this.$emit('change' , val , render)
            },
            // 切换全屏触发 （status , val）
            fullscreen(status , val) {
                this.$emit('fullscreen' , status , val)
            },
            // 打开阅读模式触发（status , val）
            readmodel(status , val) {
                this.$emit('readmodel' , status , val)
            },
            // 切换分栏触发 （status , val）
            subfieldtoggle(status , val) {
                this.$emit('subfieldtoggle' , status , val)
            },
            // 切换htmlcode触发 （status , val）
            htmlcode(status , val) {
                this.$emit('htmlcode' , status , val)
            },
            // 打开 , 关闭 help触发 （status , val）
            helptoggle(status , val) {
                this.$emit('helptoggle' , status , val)
            },
            // 监听ctrl + s
            save(val , render) {
                this.$emit('save' , val , render)
            },
            // ------------------------------------------------------------
            $v_markdown_key_listen(e) {
                // 注册监听键盘事件
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    // one key
                    switch (e.keyCode) {
                        case 9: {
                            // tab 单栏模式
                            if (!this.s_subField) {
                                e.preventDefault()
                                if (this.$refs.vNoteDivEdit ) {
                                    let value = markdown.render(this.d_value)
                                    if (value !== null && value !== '') {
                                        this.$refs.vNoteDivEdit.innerHTML = value
                                        let sel = window.getSelection();
                                        let range = sel.getRangeAt(0);
                                        range = range.cloneRange();
                                        range.setStartAfter(this.$refs.vNoteDivEdit.lastChild)
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
                            this.$toolbar_right_subfield_click()
                            break;
                        }
                        case 121: {
                            // F10 全屏
                            e.preventDefault()
                            this.$toolbar_right_fullscreen_click()
                            break;
                        }
                        case 122: {
                            // F11 阅读
                            e.preventDefault()
                            this.$toolbar_right_read_click()
                            break;
                        }
                    }
                } else if (e.ctrlKey && !e.altKey && !e.shiftKey) {
                    // ctrl +
                    switch (e.keyCode) {
                        case 66: {
                            // B
                            e.preventDefault()
                            this.$toolbar_left_bold_click()
                            break;
                        }
                        case 73: {
                            // I
                            e.preventDefault()
                            this.$toolbar_left_italic_click()
                            break;
                        }
                        case 72: {
                            // H
                            e.preventDefault()
                            this.$toolbar_left_header_click()
                            break;
                        }
                        case 85: {
                            // U
                            e.preventDefault()
                            this.$toolbar_left_underline_click()
                            break;
                        }
                        case 68: {
                            // D
                            e.preventDefault()
                            this.$toolbar_left_strikethrough_click()
                            break;
                        }
                        case 77: {
                            // M
                            e.preventDefault()
                            this.$toolbar_left_mark_click()
                            break;
                        }
                        case 81: {
                            // Q
                            e.preventDefault()
                            this.$toolbar_left_quote_click()
                            break;
                        }
                        case 79: {
                            // O
                            e.preventDefault()
                            this.$toolbar_left_ol_click()
                            break;
                        }
                        case 76: {
                            // L
                            e.preventDefault()
                            this.$toolbar_left_link_click()
                            break;
                        }
                        case 83: {
                            // S
                            if (this.save) {
                                e.preventDefault()
                                this.save(this.d_value, this.d_render)
                            }
                            break;
                        }
                    }
                } else if (e.ctrlKey && e.altKey && !e.shiftKey) {
                    // ctrl + alt +
                    switch (e.keyCode) {
                        case 83: {
                            // S
                            e.preventDefault()
                            this.$toolbar_left_superscript_click()
                            break;
                        }
                        case 85: {
                            // U
                            e.preventDefault()
                            this.$toolbar_left_ul_click()
                            break;
                        }
                        case 76: {
                            // C
                            e.preventDefault()
                            this.$toolbar_left_imagelink_click()
                            break;
                        }
                        case 67: {
                            // L
                            e.preventDefault()
                            this.$toolbar_left_code_click()
                            break;
                        }
                        case 84: {
                            // T
                            e.preventDefault()
                            this.$toolbar_left_table_click()
                            break;
                        }
                    }
                } else if (e.ctrlKey && e.shiftKey && !e.altKey) {
                    // ctrl + shift
                    switch (e.keyCode) {
                        case 83: {
                            // S
                            e.preventDefault()
                            this.$toolbar_left_subscript_click()
                            break;
                        }
                    }
                }
            },
            // 滚动条联动
            $v_edit_scroll($event) {
                let element = $event.srcElement ? $event.srcElement : $event.target
                let ratio = element.scrollTop / (element.scrollHeight - element.offsetHeight)
                if (this.edit_scroll_height >= 0 && element.scrollHeight !== this.edit_scroll_height && (element.scrollHeight - element.offsetHeight - element.scrollTop <= 30)) {
                    // star 内容变化 导致 高度增加  且滚动条距离底部小于25px  自动滚动到底部
                    this.$refs.vNoteEdit.scrollTop = element.scrollHeight - element.offsetHeight
                    ratio = 1
                }
                this.edit_scroll_height = element.scrollHeight
                // end ----
                if (this.$refs.vShowContent.scrollHeight > this.$refs.vShowContent.offsetHeight) {
                    this.$refs.vShowContent.scrollTop = (this.$refs.vShowContent.scrollHeight - this.$refs.vShowContent.offsetHeight) * ratio
                }
            },
            $toolbar_right_html_click() {
                this.s_html_code = !this.s_html_code
                if (this.htmlcode) {
                    this.htmlcode(this.s_html_code, this.d_value)
                }
            },
            $toolbar_right_help_click() {
                this.s_help = !this.s_help
                if (this.helptoggle) {
                    this.helptoggle(this.s_help, this.d_value)
                }
            },
            // todo 导航
            $toolbar_right_read_click() {
                let element = this.$refs.vReadModel
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
            },
            $toolbar_right_read_change_status() {
                this.s_readmodel = !this.s_readmodel
                if (this.readmodel) {
                    this.readmodel(this.s_readmodel, this.d_value)
                }
            },
            $toolbar_right_subfield_click() {
                this.s_subField = !this.s_subField
                this.$refs.vNoteDivEdit.innerHTML = markdown.render(this.d_value)
                if (this.subfieldtoggle) {
                    this.subfieldtoggle(this.s_subField, this.d_value)
                }
            },
            $toolbar_right_phone_click() {
                this.s_screen_phone_toggle = !this.s_screen_phone_toggle
            },
            $toolbar_right_fullscreen_click() {
                this.s_fullScreen = !this.s_fullScreen
                if (this.fullscreen) {
                    this.fullscreen(this.s_fullScreen, this.d_value)
                }
            },
            // 工具栏功能图标click-----------------
            // 粗体
            $toolbar_left_bold_click() {
                this.insertText(this.getTextareaDom(), {prefix: '**', subfix: '**', str: '粗体'})
            },
            // 斜体
            $toolbar_left_italic_click() {
                this.insertText(this.getTextareaDom(), {prefix: '*', subfix: '*', str: '斜体'})
            },
            // 标题
            $toolbar_left_header_click() {
                this.insertText(this.getTextareaDom(), {prefix: '# ', subfix: ' #', str: '标题'})
            },
            // 下划线
            $toolbar_left_underline_click() {
                this.insertText(this.getTextareaDom(), {prefix: '++', subfix: '++', str: '下划线'})
            },
            // 中画线
            $toolbar_left_strikethrough_click() {
                this.insertText(this.getTextareaDom(), {prefix: '~~', subfix: '~~', str: '中划线'})
            },
            // mark
            $toolbar_left_mark_click() {
                this.insertText(this.getTextareaDom(), {prefix: '==', subfix: '==', str: '标记'})
            },
            // 上角标
            $toolbar_left_superscript_click() {
                this.insertText(this.getTextareaDom(), {prefix: '^', subfix: '^', str: '上角标'})
            },
            // 下角标
            $toolbar_left_subscript_click() {
                this.insertText(this.getTextareaDom(), {prefix: '~', subfix: '~', str: '下角标'})
            },
            // 引用
            $toolbar_left_quote_click() {
                this.insertText(this.getTextareaDom(), {prefix: '> ', subfix: '', str: '引用'})
            },
            // 有序列表
            $toolbar_left_ol_click() {
                this.insertText(this.getTextareaDom(), {prefix: '1. ', subfix: '', str: '有序列表'})
            },
            // 无序列表
            $toolbar_left_ul_click() {
                this.insertText(this.getTextareaDom(), {prefix: '- ', subfix: '', str: '无序列表'})
            },
            // link
            $toolbar_left_link_click() {
                this.insertText(this.getTextareaDom(), {prefix: '[](', subfix: ')', str: '链接地址'})
            },
            // image link
            $toolbar_left_imagelink_click() {
                this.insertText(this.getTextareaDom(), {prefix: '![](', subfix: ')', str: '图片链接'})
            },
            // code
            $toolbar_left_code_click() {
                this.insertText(this.getTextareaDom(), {prefix: '```', subfix: '\n\n```\n', str: 'language'})
            },
            // table
            $toolbar_left_table_click() {
                this.insertText(this.getTextareaDom(), {
                    prefix: '',
                    subfix: '',
                    str: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
                })
            },
            // ---------------------------------------
            // 监听单栏输入框------------------------
            $auto_textarea_div_change($event) {
                let element = $event.srcElement ? $event.srcElement : $event.target
                this.d_value = tomarkdown(element.innerHTML)
            },
            // 单栏目 输入框enter
            $auto_textarea_div_enter($event) {
                let element = $event.srcElement ? $event.srcElement : $event.target
                let sel = window.getSelection();
                let range = sel.getRangeAt(0);
                // code中回车处理
                if (range.startContainer.tagName === 'CODE' || range.startContainer.tagName === 'PRE') {
                    $event.preventDefault()
                    this.insertHtmlAtCaret(range.startContainer , '\n')
                } else if (range.startContainer.parentElement.tagName === 'CODE' || range.startContainer.parentElement.tagName === 'PRE') {
                    $event.preventDefault()
                    this.insertHtmlAtCaret(range.startContainer.parentElement , '\n')
                } else if (!this.blockQuoteDoubleEnter(range.startContainer , $event , range.startContainer)) {
                    this.s_table_enter = false
                    this.judgeRender(range.startContainer , $event , range.startContainer , range.startContainer)
                  /* if (result) {
                   range = range.cloneRange();
                   // code的渲染
                   if (result.children !== null && result.children.length > 0 && result.children[0].tagName === 'PRE') {
                   result.children[0].children[0].innerHTML = '\n'
                   result.innerHTML += '<div><br/></div>'
                   range.setStartAfter(result.children[0].children[0]);
                   } else if (result.lastChild) {
                   range.setStartAfter(result.lastChild);
                   } else {
                   range.setStartAfter(result);
                   }
                   range.collapse(true);
                   sel.removeAllRanges();
                   sel.addRange(range);
                   } */
                }
                this.d_value = tomarkdown(element.innerHTML)
            },
            // 是否连续两次在段落中换行
            blockQuoteDoubleEnter(dom , $event , self) {
                if (dom.tagName) {
                    if (dom.getAttribute('class') === 'content-div content-div-edit') {
                        return false
                    } else if (dom.tagName === 'BLOCKQUOTE') {
                        if (!self.innerText || self.innerText === '\n' || self.innerText === '') {
                            $event.preventDefault()
                            let sel = window.getSelection();
                            let range = sel.getRangeAt(0);
                            let next = dom.nextSibling
                            self.outerHTML = ''
                            dom.outerHTML += '<div><br/></div>'
                            range = range.cloneRange()
                            range.setStartAfter(next.previousSibling.lastChild);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                        return true
                    }
                    return this.blockQuoteDoubleEnter(dom.parentElement, $event , dom)
                } else {
                    return this.blockQuoteDoubleEnter(dom.parentElement, $event , dom)
                }
            },
            // 判断回车是否需要render
            judgeRender(dom , $event , self , pre) {
                if (dom.tagName) {
                    if (dom.tagName === 'TABLE') {
                        this.s_table_enter = true
                        self = dom
                    }
                    if (dom.getAttribute('class') === 'content-div content-div-edit') {
                        // 在表格中回车 在表格后换行
                        if (this.s_table_enter) {
                            let sel = window.getSelection();
                            let range = sel.getRangeAt(0);
                            range = range.cloneRange()
                            $event.preventDefault()
                            let next = self.nextSibling
                            self.outerHTML += '<div><br/></div>'
                            range.setStartAfter(next.previousSibling.lastChild);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                        return ;
                    }
                    this.judgeRender(dom.parentElement , $event , self , dom)
                  /* let obj = document.createElement('div')
                   obj.innerHTML = markdown.render(dom.innerHTML.replace('&gt;' , '>'))
                   var objText = obj.innerText
                   var domText = dom.innerText
                   var objTextNoSpaceEnter = objText.replace(/\s+/g, '').replace(/[\r\n]/g, '')
                   var domTextNoSpaceEnter = domText.replace(/\s+/g, '').replace(/[\r\n]/g, '')
                   if (obj.children.length > 0) {
                   if (obj.children[0].innerText.replace(/\s+/g, '').replace(/[\r\n]/g, '') === domTextNoSpaceEnter || obj.children[0].innerText === domText || objText === domText || domTextNoSpaceEnter === objTextNoSpaceEnter) {
                   return this.judgeRender(dom.parentElement , $event , self ,dom)
                   } else {
                   // 有变化
                   $event.preventDefault()
                   dom.innerHTML = markdown.render(tomarkdown(dom.innerHTML))
                   return dom
                   }
                   } else {
                   if (objText === domText || objTextNoSpaceEnter === domTextNoSpaceEnter) {
                   return this.judgeRender(dom.parentElement , $event , self , dom)
                   } else {
                   // 有变化
                   dom.innerHTML = markdown.render(tomarkdown(obj.innerHTML))
                   return dom
                   }
                   } */
                } else {
                    this.judgeRender(dom.parentElement , $event , self , dom)
                }
            },
            // 获取textarea dom节点
            getTextareaDom() {
                return this.$refs.vNoteTextarea.$el.children[1]
            },
            // 触发工具栏插入内容
            insertText(obj, {prefix, subfix, str}) {
                if (this.s_subField) {
                    this.insertTextAtCaret(obj, {prefix, subfix, str});
                } else {
                    // 单栏模式点击
                    let div = this.$refs.vNoteDivEdit
                    let obj = document.createElement('div');
                    obj.innerHTML = markdown.render(prefix + str + subfix)
                    if (obj.children.length === 1 && obj.children[0].tagName === 'P') {
                        if (prefix === '[](' || prefix === '![](') {
                            this.insertHtmlAtCaret(div ,'<p>' + prefix + str + subfix + '</p>')
                        } else {
                            this.insertHtmlAtCaret(div , obj.children[0].innerHTML)
                        }
                    } else {
                        this.insertHtmlAtCaret(div , obj.innerHTML)
                    }
                    // 同步数据
                    this.d_value = tomarkdown(div.innerHTML)
                }
            },
            // 文本输入框工具栏点击插入内容
            insertTextAtCaret(obj, {prefix, subfix, str}) {
                obj.focus()
                if (document.selection) {
                    alert('document.selection')
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
                this.d_value = obj.value
                obj.focus()
            },
            // 单栏输入框工具栏点击插入内容
            insertHtmlAtCaret(dom , html) {
                dom.focus()
                var sel
                var range
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();
                        // Range.createContextualFragment() would be useful here but is
                        // non-standard and not supported in all browsers (IE9, for one)
                        var el = document.createElement('div');
                        el.innerHTML = html;
                        var frag = document.createDocumentFragment()
                        var node
                        var lastNode
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);
                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if (document.selection && document.selection.type !== 'Control') {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            },
            watch_screen_size() {
                if (window.matchMedia('(min-width:768px)').matches) {
                    // > 768
                    this.s_screen_phone = false;
                } else {
                    // <  768
                    this.s_screen_phone = true;
                }
            }
        },
        watch: {
            d_value: function (val, oldVal) {
                // render
                this.d_render = markdown.render(this.d_value);
                // change 回调
                if (this.change) {
                    this.change(this.d_value, this.d_render)
                }
                // v-model 语法糖
                this.$emit('input', val)
            },
            value: function (val, oldVal) {
                this.d_value = val
                this.d_render = markdown.render(this.value);
            },
            subfield: function (val, oldVal) {
                this.s_subField = this.subfield
            }
        },
        components: {
            'v-autoTextarea': autoTextarea
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./lib/font-awesome-4.7.0/css/font-awesome.css"
  @import "./lib/markdown.css"
  scrollbar()
  &.scroll-style::-webkit-scrollbar
    width 6px
    background-color #e5e5e5

  &.scroll-style::-webkit-scrollbar-thumb
    background-color #b7b7b7
    border-radius 3px

  &.scroll-style::-webkit-scrollbar-thumb:hover
    background-color #a1a1a1

  &.scroll-style::-webkit-scrollbar-thumb:active
    background-color #a1a1a1

  &.scroll-style::-webkit-scrollbar-track
    -webkit-box-shadow 0 0 0px gray inset

  op-height = 40px

  /* 路由内容 */
  .v-note-wrapper
    position relative
    min-width 300px
    min-height 300px
    display flex
    flex-direction column
    transition all 0.3s linear 0s
    background #fff
    z-index 1500
    &.fullscreen
      position fixed
      left 0
      right 0
      bottom 0
      top 0
      height auto
      z-index 1501
    .v-note-op
      width 100%
      display flex
      flex none
      min-height op-height
      box-shadow: 0 0px 4px rgba(0, 0, 0, .156863), 0 0px 4px rgba(0, 0, 0, .227451)
      background #fff
      z-index 1
      .left, .right
        flex 1
        min-height op-height
        box-sizing border-box
        .op-icon-divider
          height op-height
          border-left 1px solid #e5e5e5
          margin 0 6px 0 4px
        .op-icon
          display inline-block
          cursor pointer
          height 28px
          width 28px
          margin 6px 0 5px 0px
          font-size 15px
          padding 7px 7px 7px 7px
          color #757575
          border-radius 5px
          text-align center
          background none
          border none
          outline none
          &.selected
            color rgba(0, 0, 0, 0.8)
            background #eaeaea
          &:hover
            color rgba(0, 0, 0, 0.8)
            background #e5e5e5
      .right
        text-align right
        padding-right 6px
        max-width 30%
      .left
        text-align left
        padding-left 6px
    .v-note-panel
      box-shadow: 0 0px 3px rgba(0, 0, 0, .156863), 0 0px 3px rgba(0, 0, 0, .227451)
      display flex
      flex 1
      width 100%
      box-sizing border-box
      overflow hidden
      .v-note-edit.divarea-wrapper
        flex 0 0 50%
        width 50%
        padding 0
        overflow-y scroll
        overflow-x hidden
        box-sizing border-box
        transition all 0.2s linear 0s
        scrollbar()
        &.no-subField
          width 100%
          flex 0 0 100%
          overflow-y auto
        &.phone-edit
          width 100%
          flex 0 0 100%
          overflow-y auto
        &.phone-show
          width 0
          flex 0 0 0
        .content-div
          width 100%
          padding 20px 25px
          box-sizing border-box
          outline 0 none
          border none !important
          color #2c3e50
          font-size 16px
        .content-input-wrapper
          width 100%
          padding 8px 25px 15px 25px
      .v-note-show
        flex 0 0 50%
        width 50%
        overflow-y auto
        padding 0 0
        transition all 0.2s linear 0s
        &.phone-show
          flex 0 0 100%
          width 100%
        .v-show-content, .v-show-content-html
          width 100%
          height 100%
          padding 8px 25px 15px 25px
          overflow-y auto
          box-sizing border-box
          overflow-x hidden
          background #fbfbfb
          scrollbar()

    .v-note-read-model
      position relative
      display none
      width 100%
      height 100%
      background #fbfbfb
      padding 30px 8% 50px 8%
      overflow-y auto
      scrollbar()
      box-sizing border-box
      &.show
        display block

    .v-note-help-wrapper
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      background rgba(0, 0, 0, 0.7)
      z-index 2
      transition all 0.1s linear 0s
      &.fade-enter-active, &.fade-leave-active
        opacity 1
      &.fade-enter, &.fade-leave-active
        opacity 0
      .v-note-help-content
        position relative
        width 60%
        max-width 800px
        margin 30px auto
        height 90%
        min-width 320px
        transition all 0.1s linear 0s
        z-index 3
        box-shadow: 0 0px 5px rgba(0, 0, 0, .156863), 0 0px 5px rgba(0, 0, 0, .227451)
        i
          font-size 28px
          position absolute
          right 15px
          top 8px
          color rgba(0, 0, 0, 0.7)
          cursor pointer
          &:hover
            color rgba(0, 0, 0, 1)
        .v-note-help-show
          width 100%
          height 100%
          font-size 18px
          background #fbfbfb
          overflow-y auto
          padding 2% 6%
          scrollbar()
</style>
