<template>
      <div class="right">
        <button v-if="toolbars.navigation" @click="$clicks('navigation')" v-show="!s_navigation"
                class="op-icon fa fa-bars"
                aria-hidden="true" title="开启标题导航 (F8)"></button>
        <button v-if="toolbars.navigation" @click="$clicks('navigation')" v-show="s_navigation"
                class="op-icon fa fa-bars selected"
                aria-hidden="true" title="关闭标题导航 (F8)"></button>
        <button @click="$clicks('phone')" v-show="s_screen_phone && s_screen_phone_toggle"
                class="op-icon fa fa-eye"
                aria-hidden="true" title="预览 (F9)"></button>
        <button @click="$clicks('phone')" v-show="s_screen_phone && !s_screen_phone_toggle"
                class="op-icon fa fa-eye-slash selected"
                aria-hidden="true" title="编辑 (F9)"></button>
        <button v-if="toolbars.subfield" @click="$clicks('subfield')" v-show="s_subField && !s_screen_phone"
                class="op-icon fa fa-window-maximize"
                aria-hidden="true" title="单栏模式 (F9)"></button>
        <button v-if="toolbars.subfield" @click="$clicks('subfield')" v-show="!s_subField && !s_screen_phone"
                class="op-icon fa fa-columns selected"
                aria-hidden="true" title="双栏模式 (F9)"></button>
        <button v-if="toolbars.fullscreen" @click="$clicks('fullscreen')" v-show="!s_fullScreen"
                class="op-icon fa fa-arrows-alt"
                title="全屏编辑 (F10)" aria-hidden="true"></button>
        <button v-if="toolbars.fullscreen" @click="$clicks('fullscreen')" v-show="s_fullScreen"
                class="op-icon fa fa-compress selected"
                title="退出全屏 (F10)" aria-hidden="true"></button>
        <button v-if="toolbars.readmodel && !s_screen_phone" @click="$clicks('read')" class="op-icon fa fa-eye" aria-hidden="true"
                title="沉浸式阅读 (F11)"></button>
        <span
                v-if="!s_screen_phone && toolbars.help && toolbars.htmlcode && toolbars.readmodel && toolbars.fullscreen && toolbars.subfield && toolbars.navigation"
                class="op-icon-divider"></span>
        <button v-if="toolbars.htmlcode" @click="$clicks('html')" v-show="!s_html_code" class="op-icon fa fa-code"
                title="查看html文本"
                aria-hidden="true"></button>
        <button v-if="toolbars.htmlcode" @click="$clicks('html')" v-show="s_html_code"
                class="op-icon fa fa-code selected"
                title="返回markdown文本" aria-hidden="true"></button>
        <button  v-if="toolbars.help" @click="$clicks('help')" class="op-icon fa fa-question-circle"
                 style="font-size: 17px;padding: 5px 6px 5px 3px"
                 title="markdown语法帮助" aria-hidden="true"></button>
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
