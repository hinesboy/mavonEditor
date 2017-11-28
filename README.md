# mavonEditor

![npm](https://nodei.co/npm/mavon-editor.png?downloads=true&downloadRank=true&stars=true)

> 基于Vue的markdown编辑器

### [English Documents](./README-EN.md)

## example (图片展示)

### PC

![PC](./img/example1.png)

### 图片上传&预览

![PC](./img/images_preview_0.gif)

![PC](./img/images_preview_1.gif)

![PC](./img/images_preview_2.gif)

![PC](./img/images_preview_3.gif)

### 移动

![移动](./img/example-phone.png)
&nbsp;&nbsp;&nbsp;
![移动](./img/example-phone2.png)
## Use Setup (开始)

### Install mavon-editor (安装)

```
$ npm install mavon-editor --save
```

#### 代码高亮

> 如不需要hightlight代码高亮显示，你应该设置ishljs为false

开启代码高亮props
```javascript
    // ishljs默认为true
    <mavon-editor :ishljs = "true"></mavon-editor>
```

为优化插件体积，从**v2.4.2**起以下文件将默认使用`cdnjs`外链:
 + `highlight.js`  
 + `github-markdown-css`  
 + `katex`(**v2.4.7**)  
代码高亮`highlight.js`中的语言解析文件和代码高亮样式将在使用时按需加载.  
`github-markdown-css`和`katex`仅会在`mounted`时加载

**Notice**:  
[可选配色方案](./src/lib/core/hljs/lang.hljs.css.js) 和 [支持的语言](./src/lib/core/hljs/lang.hljs.js) 是从 [highlight.js/9.12.0](https://github.com/isagalaev/highlight.js/tree/master/src) 导出的

##### 本地按需加载
如果你想自己引入而不希望`mavon-editor`加载的话，可以将`external_link`设置为`false`.  

如果想本地按需加载，你需要安装`copy-webpack-plugin`插件(`npm install copy-webpack-plugin -D`)  
配置webpack如下所示：  
(假定`webpack`配置文件位于项目的`/webpack/webpack.js`,  
而你希望将`hljs`以及`markdown`相关文件导出位于项目的`/dist/highlightjs`以及`/dist/markdown`目录之下,  
`katex`和上面一样)  
```javascript
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        // ...
        new CopyWebpackPlugin([{
            from: 'node_modules/mavon-editor/dist/highlightjs',
            to: path.resolve(__dirname, '../dist/highlightjs'), // 插件将会把文件导出于/dist/highlightjs之下
        }, {
            from: 'node_modules/mavon-editor/dist/markdown',
            to: path.resolve(__dirname, '../dist/markdown'), // 插件将会把文件导出于/dist/markdown之下
        }, {
            from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
            to: path.resolve(__dirname, '../dist/katex')
        }]),
        // ...
    ],
    // ...
}
```
然后你需要给`mavon-editor`设置`external_link`  
相关代码如下所示:   
(假定你的`web根目录`位于项目的`/dist/`, 你的网站是`www.site.com`, 那么  
`markdown`, `hljs_js`, `hljs_css`, `hljs_lang`, `katex_css`, `katex_js`返回的是你的网站对应文件位置，  
比如`www.site.com/markdown/github-markdown.min.css`  
对应的文件应该位于项目的`/dist/markdown/github-markdown.min.css`)  
```javascript
<template>
  <div id="app">
      <mavon-editor
      :subfield = "subfield"
      :code_style="code_style"
      :ishljs="true"
      :external_link="external_link"
      ></mavon-editor>
  </div>
</template>
<script>
export default {
    data () {
      return {
        subfield: true,
        code_style: 'solarized-dark',
        external_link: {
            markdown_css: function() {
                // 这是你的markdown css文件路径
                return '/markdown/github-markdown.min.css';
            },
            hljs_js: function() {
                // 这是你的hljs文件路径
                return '/highlightjs/highlight.min.js';
            },
            hljs_css: function(css) {
                // 这是你的代码高亮配色文件路径
                return '/highlightjs/styles/' + css + '.min.css';
            },
            hljs_lang: function(lang) {
                // 这是你的代码高亮语言解析路径
                return '/highlightjs/languages/' + lang + '.min.js';
            },
            katex_css: function() {
                // 这是你的katex配色方案路径路径
                return '/katex/katex.min.css';
            },
            katex_js: function() {
                // 这是你的katex.js路径
                return '/katex/katex.min.js';
            },
        }
      }
    },
}
</script>
```
**Notice**: 如果你想禁用`mavon-editor`的自动加载，
可以将`external_link`设置为`false`或`external_link`中的某函数值设置为`false`
如：
```javascript
export default {
// ...
    data() {
        return {
            external_link: false, // 这里只能为`true`/`false`和一个`Object`, 如果为`true`代表全使用外链且自动加载, 如果为`false`则禁用，如果为`Object`则如上所示
        }
    }
// ...
}
```
或者:
```javascript
export default {
// ...
    data() {
        return {
            external_link: {
                hljs_css: function(css) {
                    // 这是你的代码高亮配色文件路径
                    return '/highlightjs/styles/' + css + '.min.css';
                },
                katex_css: false, // `false`表示禁用自动加载，它也可以是个函数，如果它是个函数，那么这个函数应该返回一个可访问的`katex`的css路径字符串
                // 我们没有设置`katex_js`, `hljs_js`, `hljs_lang`, `markdown_css`， `mavon-editor`会认为它的值为`true`，它会默认使用`cdnjs`相关外链加载
            },
        }
    }
// ...
}
```

### Use (如何引入)

#### 方法1
`index.js`:
```javascript
    // 全局注册
    // import with ES6
    import Vue from 'vue'
    import mavonEditor from 'mavon-editor'
	// 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
    import 'mavon-editor/dist/css/index.css'
    // use
    Vue.use(mavonEditor)
    new Vue({
        'el': '#main',
        data() {
            return { value: '' }
        }
    })
```
`index.html`
```html
// 下同
<div id="main">
    <mavon-editor v-model="value"/>
</div>
```

#### 方法2
`index.js`:
```javascript
    // 全局注册
    // require with Webpack/Node.js
    ...
    var mavonEditor = require('mavon-editor')
	// 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
    import 'mavon-editor/dist/css/index.css'
    ...
```

#### 方法3
`editor.vue`:
```javascript
    <template>
        <div id="editor">
            <mavon-editor style="height: 100%"></mavon-editor>
        </div>
    </template>
    <script>
    // Local Registration
    import { mavonEditor } from 'mavon-editor'
	// 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            mavonEditor
            // or 'mavon-editor': mavonEditor
        }
    }
    </script>
    <style>
    #editor {
        margin: auto;
        width: 80%;
        height: 580px;
    }
    </style>
```
`index.js`:
```javascript
	// 下同
    import Vue from 'vue';
    var editor = require('./editor.vue');
	// 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
    new Vue({
        el: '#main',
        render: h => h(editor)
    });
```
`index.html`:
```html
// 下同
<div id="main">
</div>
```

#### 方法4
`editor.vue`:
```javascript
    ...
    <script>
    // Local Registration
    // import mavonEditor from 'mavon-editor'
    var mavonEditor = require('mavon-editor')
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            'mavon-editor': mavonEditor.mavonEditor
        }
    }
    </script>
    <style>
    #editor {
    ...
    </style>
```


#### Images Upload & Preview

```javascript
<template>
    <button @click="uploadimg">upload</button>
    <mavon-editor @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
</template>
exports default {
    data(){
        return {
            img_file: {}
        }
    },
    methods: {
        $imgAdd(pos, $file){
            this.img_file[pos] = $file;
        },
        $imgDel(pos){
            delete this.img_file[pos];
        },
        uploadimg($e){
            // upload files in one request.
            console.log(this.img_file);
            var formdata = new FormData();
            for(var _img in this.img_file){
                formdata.append(_img, this.img_file[_img]);
            }
            axios({
                url: 'http://127.0.0.1/index.php',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                console.log(res);
            })
        },
    }
}
```
### 注

- **默认大小样式为 min-height: 300px , ming-width: 300px 可自行覆盖**
- **基础z-index: 1500**
- **屏幕分辨率低于768px ，自动取消【单栏 | 双栏】编辑模式 ，更改为【编辑 | 预览】切换 )**
- **仅用作展示可以设置props: toolbarsFlag: false , subfield: false, default_open: "preview"**
## API 文档

### props

| name 名称      | type 类型 | default 默认值 | describe 描述                          |
| ------------ | :-----: | :---------: | ---------------------------------------- |
| value        | String  |             | 初始值                                     |
| language     | String  |     cn      | 语言选择，暂支持 cn: 中文简体 ， en: 英文 ， fr: 法语 |
| scrollStyle  | Boolean |    true     | 开启滚动条样式(暂时仅支持chrome)              |
| subfield     | Boolean |    true     | true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)    |
| default_open | String |         | edit： 默认展示编辑区域 ， preview： 默认展示预览区域  , 其他 = edit |
| placeholder | String |    开始编辑...     |  输入框为空时默认提示文本  |
| editable     | Boolean |    true     | 是否允许编辑     |
| code_style | String |    code-github     | markdown样式： 默认github, [可选配色方案](./src/lib/core/hljs/lang.hljs.css.js)   |
| toolbarsFlag | Boolean |    true     | 工具栏是否显示                |
| toolbars     | Object  |     如下例     | 工具栏                      |
| ishljs       | Boolean |     true     |  代码高亮(cdn外链) |

```javascript
 /*
    默认工具栏按钮全部开启, 传入自定义对象
    例如: {
         bold: true, // 粗体
         italic: true,// 斜体
         header: true,// 标题
    }
    此时, 仅仅显示此三个功能键
 */
toolbars: {
      bold: true, // 粗体
      italic: true, // 斜体
      header: true, // 标题
      underline: true, // 下划线
      strikethrough: true, // 中划线
      mark: true, // 标记
      superscript: true, // 上角标
      subscript: true, // 下角标
      quote: true, // 引用
      ol: true, // 有序列表
      ul: true, // 无序列表
      link: true, // 链接
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      fullscreen: true, // 全屏编辑
      readmodel: true, // 沉浸式阅读
      htmlcode: true, // 展示html源码
      help: true, // 帮助
      /* 1.3.5 */
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      save: true, // 保存（触发events中的save事件）
      /* 1.4.2 */
      navigation: true, // 导航目录
      /* 2.1.8 */
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      /* 2.2.1 */
      subfield: true, // 单双栏模式
      preview: true, // 预览
  }
```


### events

| name 方法名         |            params 参数            | describe 描述                              |
| ---------------- | :-----------------------------: | ---------------------------------------- |
| change           |  String: value , String: render  | 编辑区发生变化的回调事件(render: value 经过markdown解析后的结果) |
| save             |  String: value , String: render  | ctrl + s 的回调事件(保存按键,同样触发该回调)             |
| fullscreen       | Boolean: status , String: value | 切换全屏编辑的回调事件(boolean: 全屏开启状态)             |
| readmodel        | Boolean: status , String: value | 切换沉浸式阅读的回调事件(boolean: 阅读开启状态)            |
| htmlcode         | Boolean: status , String: value | 查看html源码的回调事件(boolean: 源码开启状态)           |
| subfieldtoggle   | Boolean: status , String: value | 切换单双栏编辑的回调事件(boolean: 双栏开启状态)            |
| previewtoggle   | Boolean: status , String: value | 切换预览编辑的回调事件(boolean: 预览开启状态)            |
| helptoggle       | Boolean: status , String: value | 查看帮助的回调事件(boolean: 帮助开启状态)               |
| navigationtoggle | Boolean: status , String: value | 切换导航目录的回调事件(boolean: 导航开启状态)             |
| imgAdd           | String: filename, File: imgfile | 图片文件添加回调事件(filename: 写在md中的文件名, File: File Object) |
| imgDel           |        String: filename         | 图片文件删除回调事件(filename: 写在md中的文件名)          |

### methods
| name 方法名        |            params 参数            | describe 描述                              |
| ----------------   | :-----------------------------: | ---------------------------------------- |
| $vm.$refs.toolbar_left.$imgDelByFilename(>=**2.1.6**) |  String: filename | 主动删除对应图片文件, 如果成功返回TRUE，否则返回FALSE |
| $vm.$refs.toolbar_left.$imgAddByFilename(>=**2.1.6**) |  String: filename, File: file | 添加对应图片文件，文件别名为filename(filename 必须为 ./filename 样式), 如果成功返回TRUE，否则返回FALSE |
| $vm.$refs.toolbar_left.$imgUpdateByFilename(>=**2.1.6**) |  String: filename, File: file | 更新对应文件名的图片文件(filename 必须为 ./filename 样式), 如果成功返回TRUE，否则返回FALSE |
| $vm.$imgUpdateByUrl(>=**2.1.5**)    |  String: filename, String: url | 将相对路径值替换为url(如./0 -> http://path/to/png/some.png) |
| $vm.$imgAddByUrl(>=**2.1.11**)    |  String: filename, String: url | 同上(如./0 -> http://path/to/png/some.png) |
| $vm.$img2Url(>=**2.1.11**)    |  String: filename, String: url | 将图片文件名替换为url(如`![h](./0)` -> `![h](http://path/to/png/some.png)`) |
| $vm.$imglst2Url(>=**2.1.11**)    |  Array: filenameLst | 同上(filenameLst: [[filename, url], ...]) |

注意:`$vm` => 组件引用实例

## Dependencies (依赖)

- [markdown-it](https://github.com/markdown-it/markdown-it)

- [auto-textarea](https://github.com/hinesboy/auto-textarea)

- [stylus](https://github.com/stylus/stylus)


## update(更新内容)

- [更新日志](./LOG.md)

## Collaborators(合作者)

- [CHENXCHEN](https://github.com/CHENXCHEN)


## Licence (证书)

mavonEditor is open source and released under the MIT Licence.

Copyright (c) 2017 hinesboy
