<template>
      <div class="right">
        <button type="button" v-if="toolbars.navigation" @click="$clicks('navigation')" v-show="!s_navigation"
                class="op-icon fa fa-bars"
                aria-hidden="true" :title="`${d_words.tl_navigation_on} (F8)`"></button>
        <button type="button" v-if="toolbars.navigation" @click="$clicks('navigation')" v-show="s_navigation"
                class="op-icon fa fa-bars selected"
                aria-hidden="true" :title="`${d_words.tl_navigation_off} (F8)`"></button>
        <button type="button" @click="$clicks('phone')" v-show="s_screen_phone && s_screen_phone_toggle"
                class="op-icon fa fa-eye"
                aria-hidden="true" :title="`${d_words.tl_preview} (F9)`"></button>
        <button type="button" @click="$clicks('phone')" v-show="s_screen_phone && !s_screen_phone_toggle"
                class="op-icon fa fa-eye-slash selected"
                aria-hidden="true" :title="`${d_words.tl_edit} (F9)`"></button>
        <button type="button" v-if="toolbars.subfield" @click="$clicks('subfield')" v-show="s_subField && !s_screen_phone"
                class="op-icon fa fa-eye-slash selected"
                aria-hidden="true" :title="`${d_words.tl_single_column} (F9)`"></button>
        <button type="button" v-if="toolbars.subfield" @click="$clicks('subfield')" v-show="!s_subField && !s_screen_phone"
                class="op-icon fa fa-eye"
                aria-hidden="true" :title="`${d_words.tl_double_column} (F9)`"></button>
        <button type="button" v-if="toolbars.fullscreen" @click="$clicks('fullscreen')" v-show="!s_fullScreen"
                class="op-icon fa fa-arrows-alt"
                :title="`${d_words.tl_fullscreen_on} (F10)`" aria-hidden="true"></button>
        <button type="button" v-if="toolbars.fullscreen" @click="$clicks('fullscreen')" v-show="s_fullScreen"
                class="op-icon fa fa-compress selected"
                :title="`${d_words.tl_fullscreen_off} (F10)`" aria-hidden="true"></button>
        <button type="button" v-if="toolbars.readmodel && !s_screen_phone" @click="$clicks('read')" class="op-icon fa fa-window-maximize" aria-hidden="true"
                :title="`${d_words.tl_read} (F11)`"></button>
        <span
                v-if="!s_screen_phone && toolbars.help && toolbars.htmlcode && toolbars.readmodel && toolbars.fullscreen && toolbars.subfield && toolbars.navigation"
                class="op-icon-divider"></span>
        <button type="button" v-if="toolbars.htmlcode" @click="$clicks('html')" v-show="!s_html_code" class="op-icon fa fa-code"
                :title="d_words.tl_html_on"
                aria-hidden="true"></button>
        <button type="button" v-if="toolbars.htmlcode" @click="$clicks('html')" v-show="s_html_code"
                class="op-icon fa fa-code selected"
                :title="d_words.tl_html_off" aria-hidden="true"></button>
        <button type="button"  v-if="toolbars.help" @click="$clicks('help')" class="op-icon fa fa-question-circle"
                 style="font-size: 17px;padding: 5px 6px 5px 3px"
                 :title="d_words.tl_help" aria-hidden="true"></button>
      </div>
</template>
<script type="text/ecmascript-6">
export default {
    name: 's-md-toolbar-right',
    props: {
        // 工具栏
        toolbars: { type: Object, required: true },
        s_screen_phone: { type: Boolean, required: true },
        s_screen_phone_toggle: { type: Boolean, required: true },
        s_subField: { type: Boolean, required: true },
        s_fullScreen: { type: Boolean, required: true },
        s_html_code: { type: Boolean, required: true },
        s_navigation: { type: Boolean, required: true },
        d_words: {
            type: Object,
            required: true
        }
    },
    methods: {
        // 工具栏功能图标click-----------------
        $clicks(_type) {
            // 让父节点来绑定事件并
            this.$emit('toolbar_right_click', _type);
        }
    }
}
</script>
