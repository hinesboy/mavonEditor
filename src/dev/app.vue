<template>
    <div id="app">
        <select @change="opchange" class="page-lang">
            <option value="cn">中文</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
        </select>
        <section class="page-header">
            <h1 class="project-name">mavonEditor</h1>
            <h3 class="project-tagline">{{d_words.sub_title}}</h3>
            <a href="https://github.com/hinesboy/mavonEditor" class="btn">View on GitHub</a>
            <a href="https://github.com/hinesboy/mavonEditor/zipball/master" class="btn">Download .zip</a>
            <a href="https://github.com/hinesboy/mavonEditor/master" class="btn">Download .tar.gz</a>
        </section>
        <div v-if="!screen_phone" class="item">
            <h2 class="item-header">
                {{d_words.default_setting}}
            </h2>
            <button @click="uploadimg">upload</button>
            <mavon-editor :subfield="true" :code_style="code_style" :toolbarsFlag="toolbarsFlag" :editable="editable"
                          :language="d_language" @change="change" @save="saveone" :ishljs="true" class="item-editor" v-model="help1"
                          @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
        </div>
        <!--自定义-->
        <div v-if="screen_phone" class="item">
            <h2 class="item-header">
                {{d_words.customize_setting}}
            </h2>
            <mavon-editor :language="d_language" @save="savetwo" :toolbars="toolbars" class="item-editor"
                          v-model="help2"></mavon-editor>
        </div>
        <div class="item">
      <span style="display: block;margin: 30px 0 15px 0;color: #1e6bb8" class="">
        {{d_words.mark}}
      </span>
            <img width="100px" height="auto" src="./assets/img/1.png"/>
            <img width="100px" height="auto" src="./assets/img/2.png"/>
        </div>
        <div class="item">
            <h2 class="item-header">
                {{d_words.detail}}<a href="https://github.com/hinesboy/mavonEditor">GitHub</a>
            </h2>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {CONFIG} from './assets/config.js'
    import axios from 'axios'
    export default {
        name: 'app',
        data () {
            return {
                d_language: 'fr',
                help1: '',
                help2: '',
                d_words: {},
                screen_phone: false,
                toolbars: {
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    undo: true,
                    save: true,
                    fullscreen: true, // 全屏编辑
                    navigation: true
                },
                subfield: true,
                editable: true,
                toolbarsFlag: true,
                img_file: {},
                code_style: 'code-hybrid'
            }
        },
        created () {
            var $vm = this;
            this.initLanguage();
            this.sizeToStatus()
            window.addEventListener('resize', function() {
                // 媒介查询
                $vm.sizeToStatus()
            })
        },
        methods: {
            uploadimg($e){
                // upload files in one request.
                console.log(this.img_file);
                // var _imglst = [];
                var formdata = new FormData();
                for (var _img in this.img_file) {
                    formdata.append(_img, this.img_file[_img]);
                    // _imglst.push([_img, this.img_file[_img]]);
                }
                axios({
                    url: 'http://127.0.0.1/index.php',
                    method: 'post',
                    data: formdata,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then((res) => {
                    console.log(res);
                })
                // console.log(_imglst);
                // console.log(formdata);
            },
            $imgAdd(pos, $file){
                this.img_file[pos] = $file;
            },
            $imgDel(pos){
                delete this.img_file[pos];
            },
            sizeToStatus () {
                if (window.matchMedia('(min-width:768px)').matches) {
                    // > 768
                    this.screen_phone = false
                } else {
                    // <  768
                    this.screen_phone = true
                }
            },
            saveone (val, render) {
                alert('save one')
            },
            savetwo (val, render) {
                alert('save two')
            },
            change (val, render) {
                console.log('change')
            },
            opchange (event) {
                this.d_language = event.target.value;
            },
            initLanguage() {
                this.d_words = CONFIG[`words_${this.d_language}`]
                this.help1 = CONFIG[`help_${this.d_language}`]
                this.help2 = CONFIG[`help_${this.d_language}`]
            }
        },
        watch: {
            d_language: function () {
                this.initLanguage();
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    body
        margin 0
        padding 0
        padding-bottom 50px
    .page-lang
        position absolute
        top 15px
        right 2%
    .page-header
        box-sizing border-box
        padding 90px 15px
        width 100%
        height 380px
        color #fff
        text-align center
        background-color #159957
        background-image linear-gradient(120deg, #155799, #159957)
        @media only screen and (max-width 958px)
            height 300px
            padding 60px 15px
        @media only screen and (max-width 768px)
            height 370px
            padding 50px 15px
        .project-name
            margin-top 0
            margin-bottom 0.1rem
            font-size 2.25rem
            @media only screen and (max-width 768px)
                font-size 25px
        .project-tagline
            margin-bottom 2rem
            font-weight normal
            opacity 0.7
            @media only screen and (max-width 768px)
                font-size 16px
        .btn
            padding: 0.6rem 0.9rem
            font-size: 0.9rem
            display: inline-block
            margin-bottom: 1rem
            color: rgba(255, 255, 255, 0.7)
            background-color: rgba(255, 255, 255, 0.08)
            border-color: rgba(255, 255, 255, 0.2)
            border-style: solid
            border-width: 1px
            border-radius: 0.3rem
            transition: color 0.2s, background-color 0.2s, border-color 0.2s
            text-decoration: none
            margin-left 20px
            box-sizing border-box
            &:hover
                color: rgba(255, 255, 255, 0.8)
                text-decoration: none
                background-color: rgba(255, 255, 255, 0.2)
                border-color: rgba(255, 255, 255, 0.3)
            @media only screen and (max-width 768px)
                display: block
                width: 90%
                padding: 0.75rem
                font-size: 0.9rem
                margin-left 5%
    .item
        width 75%
        margin-left 12.5%
        @media only screen and (max-width 1100px)
            width 85%
            margin-left 7.5%
        @media only screen and (max-width 768px)
            width 92%
            margin-left 4%
        .item-header
            margin-top: 3.5rem
            margin-bottom: 2rem
            font-weight: normal
            color: #159957
            @media only screen and (max-width 768px)
                margin-top: 2rem
                margin-bottom: 1rem
        .item-editor
            width 100%
            height 500px
</style>
