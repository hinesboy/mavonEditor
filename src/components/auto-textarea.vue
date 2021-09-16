<template>
  <div :style="{fontSize: fontSize , lineHeight: lineHeight, height: fullHeight ? '100%': 'auto'}" class="auto-textarea-wrapper">
    <pre :style="{fontSize: fontSize , lineHeight: lineHeight, minHeight: fullHeight ? '100%': 'auto'}" class="auto-textarea-block"><br/>{{temp_value}} </pre>
    <textarea ref="vTextarea" :autofocus="s_autofocus" @keyup="change" spellcheck="false"  :placeholder="placeholder" v-model="temp_value"  :style="{fontSize: fontSize , lineHeight: lineHeight}" :class="{'no-border': !border , 'no-resize': !resize}" class="auto-textarea-input">
      </textarea>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        emits: ["update:modelValue"],

        data() {
            return {
                temp_value: (() => {
                    return this.modelValue;
                })(),
                s_autofocus: (() => {
                    if (this.autofocus) {
                        return 'autofocus'
                    }
                })()
            };
        },

        created() {
        },

        props: {
            fullHeight: {
                type: Boolean,
                default: false
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            modelValue: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            border: {
                type: Boolean,
                default: false
            },
            resize: {
                type: Boolean,
                default: false
            },
            onchange: {
                type: Function,
                default: null
            },
            fontSize: {
                type: String,
                default: '14px'
            },
            lineHeight: {
                type: String,
                default: '18px'
            }
        },

        methods: {
            change($event) {
                if (this.onchange) {
                    this.onchange(this.temp_value , $event)
                }
            }
        },

        watch: {
            modelValue: function (val, oldVal) {
                this.temp_value = val
            },
            temp_value: function (val, oldVal) {
                this.$emit('update:modelValue' , val)
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .auto-textarea-wrapper
    position relative
    width 100%
    margin 0
    padding 0
    line-height normal
    .auto-textarea-block
      display block
      white-space pre-wrap
      word-wrap break-word !important
      visibility hidden
      overflow hidden
      margin 0
      padding 0
      box-sizing border-box
      font-size 100%
    .auto-textarea-input
      font-family Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      margin 0
      padding 0
      overflow-y hidden
      color #2C3E50
      &.no-border
        outline 0 none
        border none !important
      &.no-resize
        resize none
</style>
