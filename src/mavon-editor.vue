<template>
  <div :class="{'fullscreen': s_fullScreen}" class="v-note-wrapper markdown-body">
    <!--工具栏-->
    <div class="v-note-op">
        <s-md-toolbar-left @toolbar_left_click="toolbar_left_click" :toolbars="toolbars" />
        <s-md-toolbar-right @toolbar_right_click="toolbar_right_click" :toolbars="toolbars" :s_screen_phone="s_screen_phone" :s_screen_phone_toggle="s_screen_phone_toggle" :s_subField="s_subField" :s_fullScreen="s_fullScreen" :s_html_code="s_html_code" :s_navigation="s_navigation" />
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
            导航目录<i @click="toolbar_right_click('navigation')" class="fa fa-times v-note-navigation-close" aria-hidden="true"></i>
          </div>
          <div ref="navigationContent" class="v-note-navigation-content scroll-style">
          </div>
        </div>
      </transition>

    </div>
    <!--帮助文档-->
    <transition name="fade">
      <div @click="toolbar_right_click('help')" class="v-note-help-wrapper" v-if="s_help">
        <div @click.stop.prevent="" class="v-note-help-content">
          <i @click.stop.prevent="toolbar_right_click('help')" class="fa fa-times" aria-hidden="true"></i>
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
          导航目录<i @click="toolbar_right_click('navigationfull')" class="fa fa-times v-note-navigation-close" aria-hidden="true"></i>
        </div>
        <div ref="navigationContentFull" class="v-note-navigation-content scroll-style">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import markdown from './lib/core/markdown.js'
    import tomarkdown from './lib/core/to-markdown.js'
    import {autoTextarea} from 'auto-textarea'
    import {keydownListen} from './lib/core/keydown-listen.js'
    import {fullscreenchange, windowResize, scrollLink , insertTextAtCaret, getNavigation} from './lib/core/extra-function.js'
    import {onecolumnKeyDownEnter , onecolumnInsert} from './lib/core/onecolumn-event.js'
    import {p_ObjectCopy_DEEP} from './lib/util.js'
    import {toolbar_left_click} from './lib/toolbar_left_click.js'
    import {toolbar_right_click} from './lib/toolbar_right_click.js'
    import {CONFIG} from './lib/config.js'
    var s_md_toolbar_left = require('./components/s-md-toolbar-left.vue')
    var s_md_toolbar_right = require('./components/s-md-toolbar-right.vue')
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
                currentTimeout: '',
                s_markdown: markdown,
                s_tomarkdown: tomarkdown
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
            toolbar_left_click(_type) { toolbar_left_click(_type, this); },
            toolbar_right_click(_type) { toolbar_right_click(_type, this); },
            getNavigation($vm, full) {
                return getNavigation($vm, full);
            },
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
            $toolbar_right_read_change_status() {
                this.s_readmodel = !this.s_readmodel
                if (this.readmodel) {
                    this.readmodel(this.s_readmodel, this.d_value)
                }
                if (this.s_readmodel && this.toolbars.navigation) {
                    this.s_navigation_full = true
                    this.getNavigation(this , true)
                }
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
            'v-autoTextarea': autoTextarea,
            's-md-toolbar-left': s_md_toolbar_left,
            's-md-toolbar-right': s_md_toolbar_right
        }
    };
    import "./lib/font/css/fontello.css"
    import './lib/css/md.css'
    import 'katex/dist/katex.min.css'
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "lib/css/scroll.styl"
  @import "lib/css/mavon-editor.styl"
</style>
