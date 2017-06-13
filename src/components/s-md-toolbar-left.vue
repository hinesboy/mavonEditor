<template>
      <div class="left">
        <button :disabled="!editable" type="button" v-if="toolbars.bold" @click="$clicks('bold')" class="op-icon fa fa-bold" aria-hidden="true"
                :title="`${d_words.tl_bold} (ctrl+b)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.italic" @click="$clicks('italic')" class="op-icon fa fa-italic" aria-hidden="true"
                :title="`${d_words.tl_italic} (ctrl+i)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.header" @click="$clicks('header')" class="op-icon fa fa-header" aria-hidden="true"
                :title="`${d_words.tl_header} (ctrl+h)`"></button>
        <span v-if="toolbars.header || toolbars.italic || toolbars.bold" class="op-icon-divider"></span>
        <button :disabled="!editable" type="button" v-if="toolbars.underline" @click="$clicks('underline')" class="op-icon fa fa-underline"
                :title="`${d_words.tl_underline} (ctrl+u)`" aria-hidden="true"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.strikethrough" @click="$clicks('strikethrough')" class="op-icon fa fa-strikethrough"
                :title="`${d_words.tl_strikethrough} (ctrl+d)`" aria-hidden="true"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.mark" @click="$clicks('mark')" class="op-icon fa fa-thumb-tack" :title="`${d_words.tl_mark} (ctrl+m)`"
                aria-hidden="true"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.superscript" @click="$clicks('superscript')" class="op-icon fa fa-superscript"
                aria-hidden="true" :title="`${d_words.tl_superscript} (ctrl+alt+s)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.subscript" @click="$clicks('subscript')" class="op-icon fa fa-subscript"
                aria-hidden="true" :title="`${d_words.tl_subscript} (ctrl+shift+s)`"></button>
        <span
                v-if="toolbars.superscript || toolbars.subscript || toolbars.underline || toolbars.strikethrough || toolbars.mark"
                class="op-icon-divider"></span>
        <button :disabled="!editable" type="button" v-if="toolbars.quote" @click="$clicks('quote')" class="op-icon fa fa-quote-left" aria-hidden="true"
                :title="`${d_words.tl_quote} (ctrl+q)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.ol" @click="$clicks('ol')" class="op-icon fa fa-list-ol" aria-hidden="true"
                :title="`${d_words.tl_ol} (ctrl+o)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.ul" @click="$clicks('ul')" class="op-icon fa fa-list-ul" aria-hidden="true"
                :title="`${d_words.tl_ul} (ctrl+alt+u)`"></button>
        <span v-if="toolbars.ul || toolbars.ol || toolbars.quote" class="op-icon-divider"></span>
        <button :disabled="!editable" type="button" v-if="toolbars.link" @click="$clicks('link')" class="op-icon fa fa-link" aria-hidden="true"
                :title="`${d_words.tl_link} (ctrl+l)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.imagelink" ref="img" @click="$clicks('imagelink')" class="op-icon fa fa-picture-o dropdown"
                aria-hidden="true" :title="`${d_words.tl_image} (ctrl+alt+l)`">
        </button>
        <mu-popover :trigger="trigger" :open="open" @close="handleClose">
            <mu-list style="max-height: 300px">
                <template v-for="(item, index) in img_file">
                    <mu-list-item v-if="index == 0" title="add img" @click.stop="$imgFileListClick(index)">
                        <input ref="imgfile" type="file" style="display:none" @change="$imgAdd($event)" :key="item[0]"/>
                    </mu-list-item>
                    <mu-list-item v-else :title="item[0]" @click.stop="$imgFileListClick(index)">
                        <button  slot="right" type="button" @click.stop="$imgDel(index)" class="op-icon fa fa-trash-o" aria-hidden="true" title="remove"></button>
                        <input ref="imgfile" type="file" style="display:none" @change="$imgAdd($event)" :key="item[0]"/>
                    </mu-list-item>
                </template>
            </mu-list>
        </mu-popover>
        <button :disabled="!editable" type="button" v-if="toolbars.code" @click="$clicks('code')" class="op-icon fa fa-code" aria-hidden="true"
                :title="`${d_words.tl_code} (ctrl+alt+c)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.table" @click="$clicks('table')" class="op-icon fa fa-table" aria-hidden="true"
                :title="`${d_words.tl_table} (ctrl+alt+t)`"></button>
        <span v-if="toolbars.link || toolbars.imagelink || toolbars.code || toolbars.table" class="op-icon-divider"></span>
        <button type="button" v-if="toolbars.undo" @click="$clicks('undo')" class="op-icon fa fa-undo"
                aria-hidden="true" :title="`${d_words.tl_undo} (ctrl+z)`"></button>
        <button type="button" v-if="toolbars.redo" @click="$clicks('redo')" class="op-icon fa fa-repeat" aria-hidden="true"
                :title="`${d_words.tl_redo} (ctrl+y)`"></button>
        <button type="button" v-if="toolbars.trash" @click="$clicks('trash')" class="op-icon fa fa-trash-o" aria-hidden="true"
                :title="`${d_words.tl_trash} (ctrl+breakspace)`"></button>
        <button type="button" v-if="toolbars.save" @click="$clicks('save')" class="op-icon fa fa-floppy-o" aria-hidden="true"
                :title="`${d_words.tl_save} (ctrl+s)`"></button>
      </div>
</template>
<script type="text/ecmascript-6">
// import popover from 'muse-components/popover'
// import {list, listItem} from 'muse-components/list'
import popover from '../vender/muse-ui/popover'
import {list, listItem} from '../vender/muse-ui/list'
export default {
    name: 's-md-toolbar-left',
    mounted(){
        this.trigger = this.$refs.img;
    },
    components: {
        'mu-popover': popover,
        'mu-list': list,
        'mu-list-item': listItem,
    },
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
        }
    },
    data(){
        return {
            img_file: [['./0', null]],
            open: false,
            trigger: null,
            num: 0
        }
    },
    methods: {
        $imgFileListClick(pos){
            if(pos == 0)
                this.$refs.imgfile[pos].click();
            else
                this.$emit('imgTouch', this.img_file[pos][0]);
            this.open = false;
        },
        $imgFileAdd($file){
            this.img_file[0][0] = './' + this.num;
            this.img_file[0][1] = $file;
            this.img_file.unshift(['./' + (this.num + 1), null]);
            this.num = this.num + 1;
            this.$emit('imgAdd', this.img_file[1][0], $file);
        },
        $imgAdd($e){
            // 新增加
            this.$imgFileAdd($e.target.files[0]);
        },
        $imgDel(pos){
            this.$emit('imgDel', this.img_file[pos][0]);
            this.img_file.splice(pos, 1);
        },
        // 工具栏功能图标click-----------------
        $clicks(_type) {
            if(_type == "imagelink"){
                this.open = true;
            }
            else {
                // 让父节点来绑定事件并
                this.$emit('toolbar_left_click', _type);
            }
        },
        handleClose(e){
            this.open = false;
        }
    }
}
</script>
<style>
.mu-item-wrapper .mu-item {
    padding: 0px 16px;
}
.mu-item-right button {
    border: 0;
    background-color: #fff;
}
</style>
