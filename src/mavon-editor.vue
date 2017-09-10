<template>
    <div :class="[{'fullscreen': s_fullScreen},code_style]" class="v-note-wrapper markdown-body">
        <!--工具栏-->
        <div class="v-note-op" v-show="toolbarsFlag">
            <s-md-toolbar-left ref="toolbar_left" :editable="editable" :d_words="d_words" @toolbar_left_click="toolbar_left_click" :toolbars="toolbars"
                               @imgAdd="$imgAdd" @imgDel="$imgDel" @imgTouch="$imgTouch"/>
            <s-md-toolbar-right ref="toolbar_right" :d_words="d_words" @toolbar_right_click="toolbar_right_click" :toolbars="toolbars"
                                :s_subfield="s_subfield"
                                :s_preview_switch="s_preview_switch" :s_fullScreen="s_fullScreen" :s_html_code="s_html_code"
                                :s_navigation="s_navigation"/>
        </div>
        <!--编辑展示区域-->
        <div class="v-note-panel">
            <!--编辑区-->
            <div ref="vNoteEdit" @scroll="$v_edit_scroll" class="v-note-edit divarea-wrapper"
                 :class="{'scroll-style': s_scrollStyle  , 'single-edit': !s_preview_switch && !s_html_code , 'single-show': (!s_subfield && s_preview_switch) || (!s_subfield && s_html_code)}" @click="textAreaFocus">
                <!-- 单栏模式 html展示 -->
                <!-- <div v-show="!s_preview_switch&&s_html_code&&!s_screen_phone" class="content-div">
                    {{d_render}}
                </div> -->
                <!-- 单栏模式 渲染区域-->
                <!-- <div ref="vNoteDivEdit" @keydown.enter="$auto_textarea_div_enter" @keyup="$auto_textarea_div_change"
                     spellcheck="false" v-show="!s_preview_switch&&!s_html_code&&!s_screen_phone"
                     class="content-div content-div-edit" :contenteditable="editable">
                </div> -->
                <div  class="content-input-wrapper">
                    <!-- 双栏 -->
                    <v-autoTextarea ref="vNoteTextarea" :placeholder="placeholder ? placeholder : d_words.start_editor" class="content-input" fontSize="15px"
                                    lineHeight="1.5" v-model="d_value"></v-autoTextarea>
                </div>
            </div>
            <!--展示区-->
            <div :class="{'single-show': (!s_subfield && s_preview_switch) || (!s_subfield && s_html_code)}"
                 v-show="s_preview_switch || s_html_code" class="v-note-show">
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
                        {{d_words.navigation_title}}<i @click="toolbar_right_click('navigation')"
                                                       class="fa fa-mavon-times v-note-navigation-close"
                                                       aria-hidden="true"></i>
                    </div>
                    <div ref="navigationContent" class="v-note-navigation-content scroll-style">
                    </div>
                </div>
            </transition>

        </div>
        <!--帮助文档-->
        <transition name="fade">
            <div ref="help">
                <div @click="toolbar_right_click('help')" class="v-note-help-wrapper" v-if="s_help">
                    <div @click.stop.prevent="" class="v-note-help-content markdown-body code-hybrid">
                        <i @click.stop.prevent="toolbar_right_click('help')" class="fa fa-mavon-times" aria-hidden="true"></i>
                        <div class="scroll-style v-note-help-show" v-html="d_help"></div>
                    </div>
                </div>
            </div>
        </transition>
        <!--阅读模式-->
        <div :class="{'show': s_readmodel}" class="v-note-read-model scroll-style" ref="vReadModel">
            <div class="v-note-read-content" v-html="d_render">
            </div>
            <!--标题导航-->
            <!-- <div v-if="toolbars.navigation" v-show="s_navigation_full" class="v-note-navigation-wrapper">
                 <div class="v-note-navigation-title">
                     {{d_words.navigation_title}}<i @click="toolbar_right_click('navigationfull')"
                                                    class="fa fa-mavon-times v-note-navigation-close" aria-hidden="true"></i>
                 </div>
                 <div ref="navigationContentFull" class="v-note-navigation-content scroll-style">
                 </div>
             </div>-->
        </div>
    </div>
</template>

<script>
    import markdown from './lib/core/markdown.js'
    // import tomarkdown from './lib/core/to-markdown.js'
    import {autoTextarea} from 'auto-textarea'
    import {keydownListen} from './lib/core/keydown-listen.js'
    import {
        fullscreenchange,
        windowResize,
        scrollLink,
        insertTextAtCaret,
        getNavigation
    } from './lib/core/extra-function.js'
    // import {onecolumnKeyDownEnter, onecolumnInsert} from './lib/core/onecolumn-event.js'
    import {p_ObjectCopy_DEEP} from './lib/util.js'
    import {toolbar_left_click} from './lib/toolbar_left_click.js'
    import {toolbar_right_click} from './lib/toolbar_right_click.js'
    import {CONFIG} from './lib/config.js'
    var s_md_toolbar_left = require('./components/s-md-toolbar-left.vue')
    var s_md_toolbar_right = require('./components/s-md-toolbar-right.vue')
    import hljs from './lib/core/highlight.js'
    markdown.renderAsync = function (src, env, fuc, _env) {
        env = env || {};
        _env = _env || {};
        var _res = markdown.renderer.render(this.parse(src, env), this.options, env);
        if(_env['ishljs'] === false) fuc(_res)
        else hljs(_res, fuc);
    }
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
            // 初始value
            language: {
                type: String,
                default: 'cn'
            },
            subfield: {
                type: Boolean,
                default: true
            },
            // 默认展示 edit & 其他 为编辑区域 preview  为预览区域
            default_open: {
                type:  String,
                default: null
            },
            // 是否开启编辑
            editable: {
                type: Boolean,
                default: true
            },
            // 是否开启工具栏
            toolbarsFlag: {
                type: Boolean,
                default: true
            },
            // 工具栏
            toolbars: {
                type: Object,
                default() {
                    return CONFIG.toolbars
                }
            },
            code_style:{
                type:String,
                default:'code-github'
            },
            placeholder: {
                type: String,
                default: null
            },
            ishljs: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                s_subfield: (() => {
                    return this.subfield;
                })(),
                s_autofocus: true,
                // 标题导航
                s_navigation: false,
                s_scrollStyle: (() => {
                    return this.scrollStyle
                })(),// props 是否渲染滚动条样式
                d_value: '',// props 文本内容
                d_render: '',// props 文本内容render
               /* d_value: (() => {
                    return this.value
                })(),// props 文本内容
                d_render: (() => {
                    return markdown.render(this.value);
                })(),// props 文本内容render*/
                s_preview_switch: (() => {
                    let default_open_ = this.default_open;
                    if (this.subfield && !default_open_) {
                        default_open_ = 'preview';
                    }
                    return default_open_ === 'preview' ? true : false;
                })(), // props true 展示编辑 false展示预览
                s_fullScreen: false,// 全屏编辑标志
                s_help: false,// markdown帮助
                s_html_code: false,// 分栏情况下查看html
                d_help: null,
                d_words: null,
                edit_scroll_height: -1,
                s_readmodel: false,
                s_table_enter: false, // 回车事件是否在表格中执行
               /* s_screen_phone_toggle: true,
                s_screen_phone: false,*/
                d_history: (() => {
                    let temp_array = []
                    temp_array.push(this.value)
                    return temp_array;
                })(), // 编辑记录
                d_history_index: 0, // 编辑记录索引
                currentTimeout: '',
                s_markdown: markdown,
                // s_tomarkdown: tomarkdown,
                d_image_file: []
            };
        },
        created() {
            // 初始化语言
            this.initLanguage();
            this.$nextTick(() => {
                // 初始化单栏数据
                this.loadDivData();
                // 初始化Textarea编辑开关
                this.editableTextarea();
            })
        },
        mounted(){
            var $vm = this;
            this.$el.addEventListener('paste', function(e){
                $vm.$paste(e);
            })
            this.$el.addEventListener('drop', function(e){
                $vm.$drag(e);
            })
            // 浏览器siz大小
            windowResize(this);
            keydownListen(this, markdown);
            // fullscreen事件
            fullscreenchange(this);
            this.d_value = this.value;
            // 将help添加到末尾
            document.body.appendChild(this.$refs.help);
        },
        beforeDestroy() {
            document.body.removeChild(this.$refs.help);
        },
        methods: {
            textAreaFocus() {
                this.$refs.vNoteTextarea.$el.children[1].focus();
            },
            $drag($e){
                var dataTransfer = $e.dataTransfer;
                if(dataTransfer){
                    var files = dataTransfer.files;
                    if(files.length > 0){
                        $e.preventDefault();
                        /*
                         function deepCopy(source) {
                         var result={};
                         for (var key in source) {
                         result[key] = typeof(source[key])==='object'? deepCopy(source[key]): source[key];
                         }
                         return result;
                         }
                         var tmp = deepCopy(files);
                         console.log(tmp);
                         */
                        for(var i = 0;i < files.length;i++){
                            this.$refs.toolbar_left.$imgFileAdd(files[i]);
                        }
                    }
                }
            },
            $paste($e){
                var clipboardData = $e.clipboardData;
                if(clipboardData){
                    var items = clipboardData.items;
                    if(!items) return ;
                    var types = clipboardData.types || [];
                    var item = null;
                    for(var i = 0; i < types.length; i++ ){
                        if( types[i] === 'Files' ){
                            item = items[i];
                            break;
                        }
                    }
                    if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
                        var oFile = item.getAsFile();
                        this.$refs.toolbar_left.$imgFileAdd(oFile);
                    }
                }
            },
            $imgTouch(pos){
                var $vm = this;
                this.insertText(this.getTextareaDom(),
                    {
                        prefix: '\n![' + $vm.d_words.tl_image + '](' + pos + ')',
                        subfix: '',
                        str: ''
                    });
            },
            $imgDel(pos){
                this.s_markdown.image_del(pos);
                this.d_render = this.s_markdown.render(this.d_value);
                this.$emit('imgDel', pos);
            },
            $imgAdd(pos, $file, isinsert){
                if(isinsert === undefined) isinsert = true;
                var $vm = this;
                if(this.__rFilter == null)
                // this.__rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                    this.__rFilter = /^image\//i;
                this.__oFReader = new FileReader();
                this.__oFReader.onload = function (oFREvent){
                    $vm.s_markdown.image_add(pos, oFREvent.target.result);
                    if(isinsert == true) {
                        $vm.insertText($vm.getTextareaDom(),
                        {
                            prefix: '\n![' + $vm.d_words.tl_image + '](' + pos + ')',
                            subfix: '',
                            str: ''
                        });
                        $vm.$nextTick(function() {
                            $vm.$emit('imgAdd', pos, $file);
                        })
                    }
                }
                if($file){
                    var oFile = $file;
                    if(this.__rFilter.test(oFile.type)){
                        this.__oFReader.readAsDataURL(oFile);
                    }
                }
            },
            $imgUpdateByUrl(pos, url) {
                var $vm = this;
                this.s_markdown.image_add(pos, url);
                this.$nextTick(function() {
                    $vm.d_render = this.s_markdown.render(this.d_value);
                })
            },
            $imgAddByUrl(pos, url) {
                if(this.$refs.toolbar_left.$imgAddByUrl(pos, url)) {
                    console.log('i am here')
                    this.$imgUpdateByUrl(pos, url);
                    return true;
                }
                return false;
            },
            $img2Url(filename, url) {
                // x.replace(/(\[[^\[]*?\](?=\())\(\s*(\.\/2)\s*\)/g, "$1(http://path/to/png.png)")
                filename = filename.replace(/(\.|\\|\+|\*|\?|\^|\$|\[|\]|\{|\}|\(|\)|\||\/)/g, "\\$1")
                var reg_str = "/(!\\[\[^\\[\]*?\\]\(?=\\(\)\)\\(\\s*\(" + filename + "\)\\s*\\)/g"
                var reg = eval(reg_str);
                this.d_value = this.d_value.replace(reg, "$1(" + url + ")")
            },
            $imglst2Url(imglst) {
                if(imglst instanceof Array) {
                    for(var i = 0;i < imglst.length;i++) {
                        this.$img2Url(imglst[i][0], imglst[i][1]);
                    }
                }
            },
            toolbar_left_click(_type) {
                toolbar_left_click(_type, this);
            },
            toolbar_right_click(_type) {
                toolbar_right_click(_type, this);
            },
            getNavigation($vm, full) {
                return getNavigation($vm, full);
            },
            // @event
            // 修改数据触发 （val ， val_render）
            change(val, render) {
                this.$emit('change', val, render)
            },
            // 切换全屏触发 （status , val）
            fullscreen(status, val) {
                this.$emit('fullscreen', status, val)
            },
            // 打开阅读模式触发（status , val）
            readmodel(status, val) {
                this.$emit('readmodel', status, val)
            },
            // 切换阅读编辑触发 （status , val）
            previewtoggle(status, val) {
                this.$emit('previewtoggle', status, val)
            },
            // 切换分栏触发 （status , val）
            subfieldtoggle (status, val) {
                this.$emit('subfieldtoggle', status, val)
            },
            // 切换htmlcode触发 （status , val）
            htmlcode(status, val) {
                this.$emit('htmlcode', status, val)
            },
            // 打开 , 关闭 help触发 （status , val）
            helptoggle(status, val) {
                this.$emit('helptoggle', status, val)
            },
            // 监听ctrl + s
            save(val, render) {
                this.$emit('save', val, render)
            },
            // 导航栏切换
            navigationtoggle(status, val) {
                this.$emit('navigationtoggle', status, val)
            },
            $toolbar_right_read_change_status() {
                this.s_readmodel = !this.s_readmodel
                if (this.readmodel) {
                    this.readmodel(this.s_readmodel, this.d_value)
                }
                if (this.s_readmodel && this.toolbars.navigation) {
                    this.getNavigation(this, true)
                }
            },
            // ---------------------------------------
            // 滚动条联动
            $v_edit_scroll($event) {
                scrollLink($event, this);
            },
            /*
             // 监听单栏输入框内容的变化------------------------
             $auto_textarea_div_change($event) {
             let element = $event.srcElement ? $event.srcElement : $event.target
             // this.d_value = tomarkdown(element.innerHTML)
             },
             // 单栏目 输入框enter
             $auto_textarea_div_enter($event) {
             // onecolumnKeyDownEnter($event, this, tomarkdown)
             },
             */
            // 获取textarea dom节点
            getTextareaDom() {
                return this.$refs.vNoteTextarea.$el.children[1]
            },
            // 工具栏插入内容
            insertText(obj, {prefix, subfix, str}) {
                // if (this.s_preview_switch) {
                insertTextAtCaret(obj, {prefix, subfix, str}, this);
                /*
                 } else {
                 // 单栏模式点击
                 let div = this.$refs.vNoteDivEdit;
                 let obj = document.createElement('div');
                 obj.innerHTML = markdown.render(prefix + str + subfix)
                 if (obj.children.length === 1 && obj.children[0].tagName === 'P') {
                 if (prefix === '[](' || prefix === '![](') {
                 onecolumnInsert(div, '<p>' + prefix + str + subfix + '</p>')
                 } else {
                 onecolumnInsert(div, obj.children[0].innerHTML)
                 }
                 } else {
                 onecolumnInsert(div, obj.innerHTML)
                 }
                 // 同步数据
                 // this.d_value = tomarkdown(div.innerHTML)
                 }
                 */
            },
            saveHistory () {
                this.d_history.splice(this.d_history_index + 1, this.d_history.length)
                this.d_history.push(this.d_value)
                this.d_history_index = this.d_history.length - 1
            },
            initLanguage () {
                let lang = CONFIG.langList.indexOf(this.language) >= 0 ? this.language : this.language.default;
                var $vm = this;
                markdown.renderAsync(CONFIG[`help_${lang}`], {}, function(res) {
                    $vm.d_help = res;
                }, {'ishljs': $vm.ishljs})
                this.d_words = CONFIG[`words_${lang}`];
            },
            // 编辑开关
            editableTextarea() {
                let text_dom = this.$refs.vNoteTextarea.$el.children[1];
                if (this.editable) {
                    text_dom.removeAttribute('disabled');
                } else {
                    text_dom.setAttribute('disabled' , 'disabled');
                }
            },
            loadDivData() {
                // if (this.$refs.vNoteDivEdit) {
                //     this.$refs.vNoteDivEdit.innerHTML = markdown.render(this.d_value)
                // }
            },
        },
        watch: {
            d_value: function (val, oldVal) {
                var $vm = this;
                markdown.renderAsync($vm.d_value, {}, function(res) {
                    // render
                    $vm.d_render = res;
                    // change回调
                    if ($vm.change) $vm.change($vm.d_value, $vm.d_render);
                    // 改变标题导航
                    if ($vm.s_navigation) getNavigation($vm, false);
                    // v-model 语法糖
                    $vm.$emit('input', val)
                    // 塞入编辑记录数组
                    if ($vm.d_value === $vm.d_history[$vm.d_history_index]) return
                    window.clearTimeout($vm.currentTimeout)
                    $vm.currentTimeout = setTimeout(() => {
                        $vm.saveHistory()
                    }, 500);
                }, {'ishljs': $vm.ishljs})
            },
            value: function (val, oldVal) {
                if (val !== this.d_value) {
                    this.d_value = val
                    this.loadDivData();
                }
            },
            subfield: function (val, oldVal) {
                this.s_subfield = val
            },
            d_history_index () {
                if (this.d_history_index > 20) {
                    this.d_history.shift()
                    this.d_history_index = this.d_history_index - 1
                }
                this.d_value = this.d_history[this.d_history_index]
            },
            language: function (val) {
                this.initLanguage();
            },
            editable: function () {
                this.editableTextarea();
            },
            default_open: function (val) {
                let default_open_ = val;
                if (this.subfield && !default_open_) {
                    default_open_ = 'preview';
                }
                return this.s_preview_switch = default_open_ === 'preview' ? true : false;
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
<style lang="css" scoped>
.auto-textarea-wrapper {
    height: 100%;
}
</style>
