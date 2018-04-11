<template>
    <div class="v-left-item">
        <button :disabled="!editable" type="button" v-if="toolbars.bold" @click="$clicks('bold')"
                class="op-icon fa fa-mavon-bold" aria-hidden="true"
                :title="`${d_words.tl_bold} (ctrl+b)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.italic" @click="$clicks('italic')"
                class="op-icon fa fa-mavon-italic" aria-hidden="true"
                :title="`${d_words.tl_italic} (ctrl+i)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.header" @click="$clicks('header')"
                class="op-icon fa fa-mavon-header" aria-hidden="true"
                :title="`${d_words.tl_header} (ctrl+h)`"></button>
        <span v-if="toolbars.header || toolbars.italic || toolbars.bold" class="op-icon-divider"></span>
        <button :disabled="!editable" type="button" v-if="toolbars.underline" @click="$clicks('underline')"
                class="op-icon fa fa-mavon-underline"
                :title="`${d_words.tl_underline} (ctrl+u)`" aria-hidden="true"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.strikethrough" @click="$clicks('strikethrough')"
                class="op-icon fa fa-mavon-strikethrough"
                :title="`${d_words.tl_strikethrough} (ctrl+d)`" aria-hidden="true"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.mark" @click="$clicks('mark')"
                class="op-icon fa fa-mavon-thumb-tack" :title="`${d_words.tl_mark} (ctrl+m)`"
                aria-hidden="true"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.superscript" @click="$clicks('superscript')"
                class="op-icon fa fa-mavon-superscript"
                aria-hidden="true" :title="`${d_words.tl_superscript} (ctrl+alt+s)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.subscript" @click="$clicks('subscript')"
                class="op-icon fa fa-mavon-subscript"
                aria-hidden="true" :title="`${d_words.tl_subscript} (ctrl+shift+s)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.alignleft" @click="$clicks('alignleft')"
                class="op-icon fa fa-mavon-align-left"
                aria-hidden="true" :title="`${d_words.tl_alignleft} (ctrl+l)`">
        </button>
        <button :disabled="!editable" type="button" v-if="toolbars.aligncenter" @click="$clicks('aligncenter')"
                class="op-icon fa fa-mavon-align-center"
                aria-hidden="true" :title="`${d_words.tl_aligncenter} (ctrl+e)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.alignright" @click="$clicks('alignright')"
                class="op-icon fa fa-mavon-align-right"
                aria-hidden="true" :title="`${d_words.tl_alignright} (ctrl+r)`"></button>
        <span
                v-if="toolbars.superscript || toolbars.subscript || toolbars.underline || toolbars.strikethrough || toolbars.mark"
                class="op-icon-divider"></span>
        <button :disabled="!editable" type="button" v-if="toolbars.quote" @click="$clicks('quote')"
                class="op-icon fa fa-mavon-quote-left" aria-hidden="true"
                :title="`${d_words.tl_quote} (ctrl+q)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.ol" @click="$clicks('ol')"
                class="op-icon fa fa-mavon-list-ol" aria-hidden="true"
                :title="`${d_words.tl_ol} (ctrl+o)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.ul" @click="$clicks('ul')"
                class="op-icon fa fa-mavon-list-ul" aria-hidden="true"
                :title="`${d_words.tl_ul} (ctrl+alt+u)`"></button>
        <span v-if="toolbars.ul || toolbars.ol || toolbars.quote" class="op-icon-divider"></span>
        <button :disabled="!editable" type="button" v-if="toolbars.link" @click.stop="$toggle_imgLinkAdd('link')"
                class="op-icon fa fa-mavon-link" aria-hidden="true"
                :title="`${d_words.tl_link} (ctrl+l)`"></button>
        <div :disabled="!editable" :class="{'selected': s_img_dropdown_open}" type="button" v-if="toolbars.imagelink" @click.stop="$click_toggle_image_dropdown()"
                class="op-icon fa fa-mavon-picture-o dropdown"
                aria-hidden="true">
            <div  class="op-image popup-dropdown" v-show="s_img_dropdown_open">
                <div  class="dropdown-item" @click.stop="$toggle_imgLinkAdd('imagelink')" title="ctrl+alt+l"><span>{{d_words.tl_image}}</span></div>
                <div class="dropdown-item" style="overflow: hidden">
                    <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="$imgAdd($event)" :key="img_file[0][0]" multiple="multiple"/>{{d_words.tl_upload}}
                </div>

                <div class="dropdown-item dropdown-images" v-if="index > 0" v-for="(item, index) in img_file" @click.stop="$imgFileListClick(index)">
                    <span>{{item[0]}}</span>
                    <button slot="right" type="button" @click.stop="$imgDel(index)"
                            class="op-icon fa fa-mavon-trash-o" aria-hidden="true"
                            :title="d_words.tl_upload_remove"></button>
                    <!-- 缩略图展示 -->
                    <img class = "image-show" :src="item[1].miniurl" alt="none">
                </div>

            </div>
        </div>
        <button :disabled="!editable" type="button" v-if="toolbars.code" @click="$clicks('code')"
                class="op-icon fa fa-mavon-code" aria-hidden="true"
                :title="`${d_words.tl_code} (ctrl+alt+c)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.table" @click="$clicks('table')"
                class="op-icon fa fa-mavon-table" aria-hidden="true"
                :title="`${d_words.tl_table} (ctrl+alt+t)`"></button>
        <span v-if="toolbars.link || toolbars.imagelink || toolbars.code || toolbars.table"
              class="op-icon-divider"></span>
        <button type="button" v-if="toolbars.undo" @click="$clicks('undo')" class="op-icon fa fa-mavon-undo"
                aria-hidden="true" :title="`${d_words.tl_undo} (ctrl+z)`"></button>
        <button type="button" v-if="toolbars.redo" @click="$clicks('redo')" class="op-icon fa fa-mavon-repeat"
                aria-hidden="true"
                :title="`${d_words.tl_redo} (ctrl+y)`"></button>
        <button type="button" v-if="toolbars.trash" @click="$clicks('trash')" class="op-icon fa fa-mavon-trash-o"
                aria-hidden="true"
                :title="`${d_words.tl_trash} (ctrl+breakspace)`"></button>
        <button type="button" v-if="toolbars.save" @click="$clicks('save')" class="op-icon fa fa-mavon-floppy-o"
                aria-hidden="true"
                :title="`${d_words.tl_save} (ctrl+s)`"></button>

        <!-- 添加image链接 -->
        <transition name="fade">
            <div class="add-image-link-wrapper"  v-if="s_img_link_open">
                <div class="add-image-link">
                    <i @click.stop.prevent="s_img_link_open = false" class="fa fa-mavon-times"
                       aria-hidden="true"></i>
                    <h3 class="title">{{d_words.tl_popup_link_title}}</h3>
                    <div class="link-text input-wrapper">
                        <input ref="linkTextInput" type="text" v-model="link_text" :placeholder="d_words.tl_popup_link_text">
                    </div>
                    <div class="link-addr input-wrapper">
                        <input type="text" v-model="link_addr" :placeholder="d_words.tl_popup_link_addr">
                    </div>
                    <div class="op-btn cancel" @click.stop="s_img_link_open = false">{{d_words.tl_popup_link_cancel}}</div>
                    <div class="op-btn sure" @click.stop="$imgLinkAdd()">{{d_words.tl_popup_link_sure}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 's-md-toolbar-left',
        props: {
            // 是否开启编辑
            editable: {
                type: Boolean,
                default: true
            },
            // 工具栏
            toolbars: {
                type: Object,
                required: true
            },
            d_words: {
                type: Object,
                required: true
            },
            image_filter: {
                type: Function,
                default: null,
            }
        },
        data() {
            return {
                img_file: [['./0', null]],
                s_img_dropdown_open: false,
                s_img_link_open: false,
                trigger: null,
                num: 0,
                link_text: '',
                link_addr: '',
                link_type: 'link'
            }
        },
        methods: {
            $imgLinkAdd() {
                this.$emit('toolbar_left_addlink', this.link_type, this.link_text, this.link_addr);
                this.s_img_link_open = false;
            },
            $toggle_imgLinkAdd(type) {
                this.link_type = type;
                this.link_text = this.link_addr = '';
                this.s_img_link_open = true;
                this.$nextTick(() => {
                    this.$refs.linkTextInput.focus()
                })
                this.s_img_dropdown_open = false;
            },
            $imgFileListClick(pos) {
                this.$emit('imgTouch', this.img_file[pos]);
            },
            $imgFileAdd($file) {
                this.img_file[0][0] = './' + this.num;
                this.img_file[0][1] = $file;
                this.img_file.unshift(['./' + (this.num + 1), null]);
                this.num = this.num + 1;
                this.$emit('imgAdd', this.img_file[1][0], $file);
            },
            $imgFilesAdd($files) {
                // valid means if the image_filter exist.
                let valid = (typeof this.image_filter == 'function');
                for(let i = 0;i < $files.length;i++) {
                    if(valid && this.image_filter($files[i]) === true) {
                        this.$imgFileAdd($files[i]);
                    } else if(!valid && $files[i].type.match(/^image\//i)) {
                        this.$imgFileAdd($files[i]);
                    }
                }
            },
            $imgAdd($e) {
                this.$imgFilesAdd($e.target.files);
            },
            $imgDel(pos) {
                this.$emit('imgDel', this.img_file[pos]);
                this.img_file.splice(pos, 1);
                this.s_img_dropdown_open = false;
            },
            $imgDelByFilename(filename) {
                var pos = 0;
                while (this.img_file.length > pos) {
                    if (this.img_file[pos][0] == filename) {
                        this.$imgDel(pos);
                        return true;
                    }
                    pos += 1;
                }
                return false;
            },
            $imgAddByFilename(filename, $file) {
                for (var i = 0; i < this.img_file.length; i++)
                    if (this.img_file[i][0] == filename) return false;
                this.img_file[0][0] = filename;
                this.img_file[0][1] = $file;
                this.img_file.unshift(['./' + (this.num), null])
                this.$emit('imgAdd', this.img_file[1][0], $file, false);
                return true;
            },
            $imgAddByUrl(filename, $url) {
                for (var i = 0; i < this.img_file.length; i++)
                    if (this.img_file[i][0] == filename) return false;
                this.img_file[0][0] = filename;
                this.img_file[0][1] = $url;
                this.img_file.unshift(['./' + (this.num), null])
                return true;
            },
            $imgUpdateByFilename(filename, $file) {
                for (var i = 0; i < this.img_file.length; i++) {
                    if (this.img_file[i][0] == filename) {
                        this.img_file[i][1] = $file;
                        this.$emit('imgAdd', filename, $file, false);
                        return true;
                    }
                }
                return false;
            },
            // 工具栏功能图标click-----------------
            $click_toggle_image_dropdown() {
                this.s_img_dropdown_open = !this.s_img_dropdown_open;
            },
            $clicks(_type) {
                // 让父节点来绑定事件并
                this.$emit('toolbar_left_click', _type);
            },
            handleClose(e) {
                this.s_img_dropdown_open = false;
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .op-icon.fa.fa-mavon-picture-o.dropdown
        position relative
        .popup-dropdown
            position absolute
            display block
            background #fff
            top 34px
            left -20px
            width 120px
            z-index 1600
            box-shadow: 0 0px 4px rgba(0, 0, 0, .156863), 0 0px 4px rgba(0, 0, 0, .227451)
        .dropdown-item
            height 40px
            line-height @height
            transition all 0.2s linear 0s
            position relative
            &:hover
                background #eaeaea
            input
                position absolute
                font-size 100px
                right 0
                top 0
                opacity 0
                cursor pointer
        .dropdown-images
            box-sizing border-box
            button
                position absolute
                right 5px
                &:hover
                    color #db2828
            span
                display inline-block
                width 90px
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
            &:hover
                .image-show
                    display block !important
            .image-show
                display none
                position absolute
                left -122px
                top 0
                transition all 0.3s linear 0s
                width 120px
                height 90px
                border 1px solid #eeece8
.add-image-link-wrapper
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background rgba(0, 0, 0, 0.7)
    z-index 1600
    transition all 0.1s linear 0s
    &.fade-enter-active, &.fade-leave-active
        opacity 1
    &.fade-enter, &.fade-leave-active
        opacity 0
    .add-image-link
        position fixed
        box-sizing border-box
        text-align center
        width 24%
        left 38%
        @media only screen and (max-width 1500px)
            width 34%
            left 33%
        @media only screen and (max-width 1000px)
            width 50%
            left 25%
        @media only screen and (max-width 600px)
            width 80%
            left 10%
        height auto
        padding 40px
        top 25%
        transition all 0.1s linear 0s
        z-index 3
        background #fff
        border-radius 2px
        box-shadow: 0 0px 5px rgba(255,255,255, .156863), 0 0px 5px rgba(255,255,255, .227451)
        i
            font-size 24px
            position absolute
            right 8px
            top 6px
            color rgba(0, 0, 0, 0.7)
            cursor pointer
        .title
            font-size 20px
            margin-bottom 30px
            margin-top 10px
            font-weight 500 !important
        .input-wrapper
            margin-top 10px
            width 80%
            border  1px solid #eeece8
            text-align left
            margin-left 10%
            height 35px
            input
                height 32px
                line-height 32px
                font-size 15px
                width 90%
                margin-left 8px
                border none
                outline none
        .op-btn
            width 100px
            height 35px
            display inline-block
            margin-top 30px
            cursor pointer
            text-align center
            line-height @height
            opacity 0.9
            border-radius 2px
            letter-spacing 1px
            font-size 15px
        .op-btn.sure
            background #2185d0
            color #fff
            margin-left 5%
            &:hover
                opacity 1
        .op-btn.cancel
            border 1px solid #bcbcbc
            color #bcbcbc
            &:hover
                color #000

</style>
