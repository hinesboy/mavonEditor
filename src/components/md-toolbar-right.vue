<template>
  <div class="v-right-item">
    <slot name="right-toolbar-before" />
    <button
      v-if="toolbars.navigation"
      v-show="!s_navigation"
      type="button"
      class="op-icon fa fa-mavon-bars"
      aria-hidden="true"
      :title="`${d_words.tl_navigation_on} (F8)`"
      @click="$clicks('navigation')"
    />
    <button
      v-if="toolbars.navigation"
      v-show="s_navigation"
      type="button"
      class="op-icon fa fa-mavon-bars selected"
      aria-hidden="true"
      :title="`${d_words.tl_navigation_off} (F8)`"
      @click="$clicks('navigation')"
    />
    <button
      v-if="toolbars.preview"
      v-show="s_preview_switch"
      type="button"
      class="op-icon fa fa-mavon-eye-slash selected"
      aria-hidden="true"
      :title="`${d_words.tl_edit} (F9)`"
      @click="$clicks('preview')"
    />
    <button
      v-if="toolbars.preview"
      v-show="!s_preview_switch"
      type="button"
      class="op-icon fa fa-mavon-eye"
      aria-hidden="true"
      :title="`${d_words.tl_preview} (F9)`"
      @click="$clicks('preview')"
    />
    <button
      v-if="toolbars.fullscreen"
      v-show="!s_fullScreen"
      type="button"
      class="op-icon fa fa-mavon-arrows-alt"
      :title="`${d_words.tl_fullscreen_on} (F10)`"
      aria-hidden="true"
      @click="$clicks('fullscreen')"
    />
    <button
      v-if="toolbars.fullscreen"
      v-show="s_fullScreen"
      type="button"
      class="op-icon fa fa-mavon-compress selected"
      :title="`${d_words.tl_fullscreen_off} (F10)`"
      aria-hidden="true"
      @click="$clicks('fullscreen')"
    />
    <button
      v-if="toolbars.readmodel"
      type="button"
      class="op-icon fa fa-mavon-window-maximize"
      aria-hidden="true"
      :title="`${d_words.tl_read} (F11)`"
      @click="$clicks('read')"
    />
    <button
      v-if="toolbars.subfield"
      type="button"
      class="op-icon fa fa-mavon-columns"
      aria-hidden="true"
      :class="{'selected': s_subfield}"
      :title="`${s_subfield ? d_words.tl_single_column : d_words.tl_double_column} (F12)`"
      @click="$clicks('subfield')"
    />
    <span
      v-if=" toolbars.help && toolbars.htmlcode && toolbars.readmodel && toolbars.fullscreen && toolbars.subfield && toolbars.navigation"
      class="op-icon-divider"
    />
    <button
      v-if="toolbars.htmlcode"
      v-show="!s_html_code"
      type="button"
      class="op-icon fa fa-mavon-code"
      :title="d_words.tl_html_on"
      aria-hidden="true"
      @click="$clicks('html')"
    />
    <button
      v-if="toolbars.htmlcode"
      v-show="s_html_code"
      type="button"
      class="op-icon fa fa-mavon-code selected"
      :title="d_words.tl_html_off"
      aria-hidden="true"
      @click="$clicks('html')"
    />
    <button
      v-if="toolbars.help"
      type="button"
      class="op-icon fa fa-mavon-question-circle"
      style="font-size: 17px;padding: 5px 6px 5px 3px"
      :title="d_words.tl_help"
      aria-hidden="true"
      @click="$clicks('help')"
    />
    <slot name="right-toolbar-after" />
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'SMdToolbarRight',

  props: {
    // 工具栏
    s_subfield: {
      type: Boolean,
      required: true,
    },
    toolbars: { type: Object, required: true },
    s_preview_switch: { type: Boolean, required: true },
    s_fullScreen: { type: Boolean, required: true },
    s_html_code: { type: Boolean, required: true },
    s_navigation: { type: Boolean, required: true },
    d_words: {
      type: Object,
      required: true,
    },
  },
  emits: ['toolbar_right_click'],

  methods: {
    // 工具栏功能图标click-----------------
    $clicks(_type) {
      // 让父节点来绑定事件并
      this.$emit('toolbar_right_click', _type)
    },
  },
}
</script>
