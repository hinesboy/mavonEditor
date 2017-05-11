<template>
      <div class="left">
        <button v-if="toolbars.bold" @click="$clicks('bold')" class="op-icon fa fa-bold" aria-hidden="true"
                :title="`${d_words.tl_bold} (ctrl+b)`"></button>
        <button v-if="toolbars.italic" @click="$clicks('italic')" class="op-icon fa fa-italic" aria-hidden="true"
                :title="`${d_words.tl_italic} (ctrl+i)`"></button>
        <button v-if="toolbars.header" @click="$clicks('header')" class="op-icon fa fa-header" aria-hidden="true"
                :title="`${d_words.tl_header} (ctrl+h)`"></button>
        <span v-if="toolbars.header || toolbars.italic || toolbars.bold" class="op-icon-divider"></span>
        <button v-if="toolbars.underline" @click="$clicks('underline')" class="op-icon fa fa-underline"
                :title="`${d_words.tl_underline} (ctrl+u)`" aria-hidden="true"></button>
        <button v-if="toolbars.strikethrough" @click="$clicks('strikethrough')" class="op-icon fa fa-strikethrough"
                :title="`${d_words.tl_strikethrough} (ctrl+d)`" aria-hidden="true"></button>
        <button v-if="toolbars.mark" @click="$clicks('mark')" class="op-icon fa fa-thumb-tack" :title="`${d_words.tl_mark} (ctrl+m)`"
                aria-hidden="true"></button>
        <button v-if="toolbars.superscript" @click="$clicks('superscript')" class="op-icon fa fa-superscript"
                aria-hidden="true" :title="`${d_words.tl_superscript} (ctrl+alt+s)`"></button>
        <button v-if="toolbars.subscript" @click="$clicks('subscript')" class="op-icon fa fa-subscript"
                aria-hidden="true" :title="`${d_words.tl_subscript} (ctrl+shift+s)`"></button>
        <span
                v-if="toolbars.superscript || toolbars.subscript || toolbars.underline || toolbars.strikethrough || toolbars.mark"
                class="op-icon-divider"></span>
        <button v-if="toolbars.quote" @click="$clicks('quote')" class="op-icon fa fa-quote-left" aria-hidden="true"
                :title="`${d_words.tl_quote} (ctrl+q)`"></button>
        <button v-if="toolbars.ol" @click="$clicks('ol')" class="op-icon fa fa-list-ol" aria-hidden="true"
                :title="`${d_words.tl_ol} (ctrl+o)`"></button>
        <button v-if="toolbars.ul" @click="$clicks('ul')" class="op-icon fa fa-list-ul" aria-hidden="true"
                :title="`${d_words.tl_ul} (ctrl+alt+u)`"></button>
        <span v-if="toolbars.ul || toolbars.ol || toolbars.quote" class="op-icon-divider"></span>
        <button v-if="toolbars.link" @click="$clicks('link')" class="op-icon fa fa-link" aria-hidden="true"
                :title="`${d_words.tl_link} (ctrl+l)`"></button>
        <button v-if="toolbars.imagelink" @click="$clicks('imagelink')" class="op-icon fa fa-picture-o"
                aria-hidden="true" :title="`${d_words.tl_image} (ctrl+alt+l)`"></button>
        <button v-if="toolbars.code" @click="$clicks('code')" class="op-icon fa fa-code" aria-hidden="true"
                :title="`${d_words.tl_code} (ctrl+alt+c)`"></button>
        <button v-if="toolbars.table" @click="$clicks('table')" class="op-icon fa fa-table" aria-hidden="true"
                :title="`${d_words.tl_table} (ctrl+alt+t)`"></button>
        <span v-if="toolbars.link || toolbars.imagelink || toolbars.code || toolbars.table" class="op-icon-divider"></span>
        <button v-if="toolbars.undo" @click="$clicks('undo')" class="op-icon fa fa-undo"
                aria-hidden="true" :title="`${d_words.tl_undo} (ctrl+z)`"></button>
        <button v-if="toolbars.redo" @click="$clicks('redo')" class="op-icon fa fa-repeat" aria-hidden="true"
                :title="`${d_words.tl_redo} (ctrl+y)`"></button>
        <button v-if="toolbars.trash" @click="$clicks('trash')" class="op-icon fa fa-trash-o" aria-hidden="true"
                :title="`${d_words.tl_trash} (ctrl+breakspace)`"></button>
        <button v-if="toolbars.save" @click="$clicks('save')" class="op-icon fa fa-floppy-o" aria-hidden="true"
                :title="`${d_words.tl_save} (ctrl+s)`"></button>
      </div>
</template>
<script type="text/ecmascript-6">
export default {
    name: 's-md-toolbar-left',
    props: {
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
    methods: {
        // 工具栏功能图标click-----------------
        $clicks(_type) {
            // 让父节点来绑定事件并
            this.$emit('toolbar_left_click', _type);
        }
    }
}
</script>
