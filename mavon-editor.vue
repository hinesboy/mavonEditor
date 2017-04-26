<template>
  <div :class="{'fullscreen': s_fullScreen}" class="v-note-wrapper markdown-body">
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
        <span v-if="toolbars.link || toolbars.imagelink || toolbars.code || toolbars.table" class="op-icon-divider"></span>
        <button v-if="toolbars.undo" @click="$toolbar_left_undo_click" class="op-icon fa fa-undo"
                aria-hidden="true" title="上一步 (ctrl+z)"></button>
        <button v-if="toolbars.redo" @click="$toolbar_left_redo_click" class="op-icon fa fa-repeat" aria-hidden="true"
                title="下一步 (ctrl+y)"></button>
        <button v-if="toolbars.trash" @click="$toolbar_left_trash_click" class="op-icon fa fa-trash-o" aria-hidden="true"
                title="清空 (ctrl+breakspace)"></button>
        <button v-if="toolbars.save" @click="$toolbar_left_save_click" class="op-icon fa fa-floppy-o" aria-hidden="true"
                title="保存 (ctrl+s)"></button>
      </div>
      <div class="right">
        <button v-if="toolbars.navigation" @click="$toolbar_right_navigation_click" v-show="!s_navigation"
                class="op-icon fa fa-bars"
                aria-hidden="true" title="开启标题导航 (F8)"></button>
        <button v-if="toolbars.navigation" @click="$toolbar_right_navigation_click" v-show="s_navigation"
                class="op-icon fa fa-bars selected"
                aria-hidden="true" title="关闭标题导航 (F8)"></button>
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
                v-if="!s_screen_phone && toolbars.help && toolbars.htmlcode && toolbars.readmodel && toolbars.fullscreen && toolbars.subfield && toolbars.navigation"
                class="op-icon-divider"></span>
        <button v-if="toolbars.htmlcode" @click="$toolbar_right_html_click" v-show="!s_html_code" class="op-icon fa fa-code"
                title="查看html文本"
                aria-hidden="true"></button>
        <button v-if="toolbars.htmlcode" @click="$toolbar_right_html_click" v-show="s_html_code"
                class="op-icon fa fa-code selected"
                title="返回markdown文本" aria-hidden="true"></button>
        <button  v-if="toolbars.help" @click="$toolbar_right_help_click" class="op-icon fa fa-question-circle"
                 style="font-size: 17px;padding: 5px 6px 5px 3px"
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

      <!--标题导航-->
      <transition name="slideTop">
        <div v-show="s_navigation" class="v-note-navigation-wrapper">
          <div class="v-note-navigation-title">
            导航目录<i @click="$toolbar_right_navigation_click" class="fa fa-times v-note-navigation-close" aria-hidden="true"></i>
          </div>
          <div ref="navigationContent" class="v-note-navigation-content scroll-style">
          </div>
        </div>
      </transition>

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
    <div :class="{'show': s_readmodel}" class="v-note-read-model scroll-style" ref="vReadModel" >
      <div class="v-note-read-content" v-html="d_render">
      </div>
      <!--标题导航-->
      <div v-if="toolbars.navigation" v-show="s_navigation_full" class="v-note-navigation-wrapper">
        <div class="v-note-navigation-title">
          导航目录<i @click="$toolbar_right_navigationfull_click" class="fa fa-times v-note-navigation-close" aria-hidden="true"></i>
        </div>
        <div ref="navigationContentFull" class="v-note-navigation-content scroll-style">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import markdown from './lib/core/markdown.js'
    import tomarkdown from './lib/core/to-markdown.js'
    import {autoTextarea} from 'auto-textarea'
    import {keydownListen} from './lib/core/keydown-listen.js'
    import {fullscreenchange, windowResize, scrollLink , insertTextAtCaret, getNavigation} from './lib/core/extra-function.js'
    import {onecolumnKeyDownEnter , onecolumnInsert} from './lib/core/onecolumn-event.js'
    import {p_ObjectCopy_DEEP} from './lib/util.js'
    const CONFIG = require('./lib/config.json')
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
                    return CONFIG.toolbars
                }
            }
        },
        data() {
            return {
                s_autofocus: true,
                // 标题导航
                s_navigation: false,
                s_navigation_full: true,
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
                        return markdown.render(CONFIG.help)
                    } else {
                        return this.help
                    }
                })(),
                edit_scroll_height: -1,
                s_readmodel: false,
                s_table_enter: false, // 回车事件是否在表格中执行
                s_screen_phone_toggle: true,
                s_screen_phone: false,
                d_history: (() => {
                    let temp_array = []
                    temp_array.push(this.value)
                    return temp_array;
                })(), // 编辑记录
                d_history_index: 0, // 编辑记录索引
                currentTimeout: ''
            };
        },
        created() {
            // 初始化单栏数据
            if (this.$refs.vNoteDivEdit) {
                this.$refs.vNoteDivEdit.innerHTML = markdown.render(this.d_value)
            }
            // 浏览器siz大小
            windowResize(this);
            // fullscreen事件
            fullscreenchange(this);
            let $vm = this
            keydownListen($vm , markdown);
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
            // 导航栏切换
            navigationtoggle(status , val) {
                this.$emit('navigationtoggle' , status , val)
            },
            // 功能性按钮事件------------------------------------------------------------
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
                if (this.s_readmodel && this.toolbars.navigation) {
                    this.s_navigation_full = true
                    getNavigation(this , true)
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
            $toolbar_right_navigation_click() {
                this.s_navigation= !this.s_navigation
                if (this.navigationtoggle) {
                    this.navigationtoggle(this.s_navigation, this.d_value)
                }
                if (this.s_navigation) {
                    // 绘制标题导航
                    getNavigation(this , false)
                }
            },
            $toolbar_right_navigationfull_click() {
                this.s_navigation_full= false
            },
            // 工具性按钮事件-----------------
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
            // undo
            $toolbar_left_undo_click() {
                if (this.d_history_index > 0) {
                    this.d_history_index --
                }
                this.$refs.vNoteDivEdit.innerHTML = markdown.render(this.d_value)
                if (this.s_subField) {
                    let start = this.getTextareaDom().selectionStart
                    let currentLength = this.d_value.length
                    this.$nextTick(() => {
                        // 光标操作
                        start -= currentLength - this.d_value.length
                        this.getTextareaDom().selectionStart = start
                        this.getTextareaDom().selectionEnd = start
                    })
                }
            },
            // redo
            $toolbar_left_redo_click() {
                if (this.d_history_index < this.d_history.length - 1) {
                    this.d_history_index ++
                }
                this.$refs.vNoteDivEdit.innerHTML = markdown.render(this.d_value)
            },
            $toolbar_left_trash_click() {
                this.d_value = ''
                this.$refs.vNoteDivEdit.innerHTML = markdown.render(this.d_value)
            },
            $toolbar_left_save_click() {
                this.save(this.d_value, this.d_render)
            },
            // ---------------------------------------
            // 滚动条联动
            $v_edit_scroll($event) {
                scrollLink($event , this);
            },
            // 监听单栏输入框内容的变化------------------------
            $auto_textarea_div_change($event) {
                let element = $event.srcElement ? $event.srcElement : $event.target
                this.d_value = tomarkdown(element.innerHTML)
            },
            // 单栏目 输入框enter
            $auto_textarea_div_enter($event) {
                onecolumnKeyDownEnter($event , this , tomarkdown)
            },
            // 获取textarea dom节点
            getTextareaDom() {
                return this.$refs.vNoteTextarea.$el.children[1]
            },
            // 工具栏插入内容
            insertText(obj, {prefix, subfix, str}) {
                if (this.s_subField) {
                    insertTextAtCaret(obj, {prefix, subfix, str} , this);
                } else {
                    // 单栏模式点击
                    let div = this.$refs.vNoteDivEdit
                    let obj = document.createElement('div');
                    obj.innerHTML = markdown.render(prefix + str + subfix)
                    if (obj.children.length === 1 && obj.children[0].tagName === 'P') {
                        if (prefix === '[](' || prefix === '![](') {
                            onecolumnInsert(div ,'<p>' + prefix + str + subfix + '</p>')
                        } else {
                            onecolumnInsert(div , obj.children[0].innerHTML)
                        }
                    } else {
                        onecolumnInsert(div , obj.innerHTML)
                    }
                    // 同步数据
                    this.d_value = tomarkdown(div.innerHTML)
                }
            },
            saveHistory () {
                this.d_history.splice(this.d_history_index + 1, this.d_history.length)
                this.d_history.push(this.d_value)
                this.d_history_index = this.d_history.length - 1
            },
        },
        watch: {
            d_value: function (val, oldVal) {
                // render
                this.d_render = markdown.render(this.d_value);
                // change 回调
                if (this.change) {
                    this.change(this.d_value, this.d_render)
                }
                // 改变标题导航
                if (this.s_navigation) {
                    getNavigation(this , false)
                }
                // v-model 语法糖
                this.$emit('input', val)
                // 塞入编辑记录数组
                if (this.d_value === this.d_history[this.d_history_index]) return
                window.clearTimeout(this.currentTimeout)
                this.currentTimeout = setTimeout(() => {
                    this.saveHistory()
                }, 500)
            },
            value: function (val, oldVal) {
                if (val !== this.d_value) {
                    this.d_value = val
                    this.d_render = markdown.render(this.value);
                }
            },
            subfield: function (val, oldVal) {
                this.s_subField = this.subfield
            },
            d_history_index () {
                if (this.d_history_index > 20) {
                    this.d_history.shift()
                    this.d_history_index = this.d_history_index - 1
                }
                this.d_value = this.d_history[this.d_history_index]
            }
        },
        components: {
            'v-autoTextarea': autoTextarea
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./lib/font/css/fontello.css"
  @import "lib/css/markdown.css"
  @import "lib/css/scroll.styl"

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
          padding 4.5px 6px 5px 3.5px
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
      position relative
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
      .v-note-navigation-wrapper
        position absolute
        width 250px
        right 0
        top 0px
        bottom 0
        display flex
        flex-direction column
        background rgba(255,255,255,0.98)
        box-shadow 0 0px 4px rgba(0, 0, 0, .156863), 0 0px 4px rgba(0, 0, 0, .227451)
        transition all 0.1s linear 0s
        @media only screen and (max-width 768px)
          width 50%
        &.slideTop-enter-active, &.slideTop-leave-active
          bottom 0
        &.slideTop-enter, &.slideTop-leave-active
          bottom 100%
        .v-note-navigation-title
          height 50px
          width 100%
          border-bottom 1px solid #eeece8
          flex none
          line-height @height
          font-size 18px
          font-weight 500
          box-sizing border-box
          padding 0 12px
          box-shadow 0 0px 1px rgba(0, 0, 0, .156863), 0 0px 1px rgba(0, 0, 0, .227451)
          .v-note-navigation-close
            float right
            margin-top 8px
            color #757575
            font-size 20px
            cursor pointer
            padding 8px
            &:hover
              color #696969
        .v-note-navigation-content
          overflow-y auto
          flex 1
          scrollbar()
          padding 8px 0
          h1, h2, h3, h4, h5, h6
            margin 2px 0
            font-weight 500
            font-size 17px
            color #2185d0
            cursor pointer
            line-height normal
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            padding 0 12px
            border-bottom none
            &:hover
              color #483D8B
              text-decoration-line underline
          h2
            padding-left  27px
            font-size 17px
          h3
            padding-left  42px
            font-size 17px
          h4
            padding-left  58px
            font-size 15px
          h5
            padding-left  72px
            font-size 15px
          h6
            padding-left  87px
            font-size 15px
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
      .v-note-navigation-wrapper
        position fixed
        width 250px
        right 0
        top 0px
        bottom 0
        display flex
        flex-direction column
        background rgba(255,255,255,0.98)
        box-shadow 0 0px 4px rgba(0, 0, 0, .156863), 0 0px 4px rgba(0, 0, 0, .227451)
        transition all 0.1s linear 0s
        @media only screen and (max-width 768px)
          width 50%
        &.slideTop-enter-active, &.slideTop-leave-active
          bottom 0
        &.slideTop-enter, &.slideTop-leave-active
          bottom 100%
        .v-note-navigation-title
          height 50px
          width 100%
          border-bottom 1px solid #eeece8
          flex none
          line-height @height
          font-size 18px
          font-weight 500
          box-sizing border-box
          padding 0 12px
          box-shadow 0 0px 1px rgba(0, 0, 0, .156863), 0 0px 1px rgba(0, 0, 0, .227451)
          .v-note-navigation-close
            float right
            margin-top 8px
            color #757575
            font-size 20px
            cursor pointer
            padding 8px
            &:hover
              color #696969
        .v-note-navigation-content
          overflow-y auto
          flex 1
          scrollbar()
          padding 8px 0
          h1, h2, h3, h4, h5, h6
            margin 2px 0
            font-weight 500
            font-size 17px
            color #2185d0
            cursor pointer
            line-height normal
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            padding 0 12px
            border-bottom none
            &:hover
              color #483D8B
              text-decoration-line underline
          h2
            padding-left  27px
            font-size 17px
          h3
            padding-left  42px
            font-size 17px
          h4
            padding-left  58px
            font-size 15px
          h5
            padding-left  72px
            font-size 15px
          h6
            padding-left  87px
            font-size 15px

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
