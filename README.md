# mavonEditor

![npm](https://nodei.co/npm/mavon-editor.png?downloads=true&downloadRank=true&stars=true)

> 基于Vue的markdown编辑器

### [English Documents](./README-EN.md)
[Demo for jsfiddle](https://jsfiddle.net/CHENXCHEN/qf7gLw3a/3/)

## example (图片展示)

### PC

![PC](./img/cn/cn-common.png)

![PC](./img/cn/cn-image.gif)

> [查看更多图片点击这里...](./doc/cn/images.md)

### Install mavon-editor (安装)

```
$ npm install mavon-editor --save
```

### Use (如何引入)

`index.js`:
```javascript
    // 全局注册
    // import with ES6
    import Vue from 'vue'
    import mavonEditor from 'mavon-editor'
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
<div id="main">
    <mavon-editor v-model="value"/>
</div>
```

> [更多引入方式点击这里...](./doc/cn/use.md)

> [如何获取并设置markdown-it对象...](./doc/cn/markdown.md)

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

> [不使用cdn，本地按需加载点击这里...](./doc/cn/no-cnd.md)

#### 图片上传

```javascript
<template>
    <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
</template>
exports default {
    methods: {
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
               $vm.$img2Url(pos, url);
           })
        }
    }
}
```
> [图片上传详情点击这里...](./doc/cn/upload-images.md)

### 注

- **默认大小样式为 min-height: 300px , min-width: 300px 可自行覆盖**
- **基础z-index: 1500**
- **仅用作展示可以设置props: toolbarsFlag: false , subfield: false, defaultOpen: "preview"**

## API 文档

### props

| name 名称      | type 类型 | default 默认值 | describe 描述                          |
| ------------ | :-----: | :---------: | ---------------------------------------- |
| value        | String  |             | 初始值                                     |
| language     | String  |     zh-CN      | 语言选择，暂支持 zh-CN: 中文简体 ， en: 英文 ， fr: 法语, pt-BR: 葡萄牙语 |
| fontSize     | String  |     15px      | 编辑区域文字大小 |
| scrollStyle  | Boolean |    true     | 开启滚动条样式(暂时仅支持chrome)              |
| subfield     | Boolean |    true     | true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)    |
| defaultOpen | String |         | edit： 默认展示编辑区域 ， preview： 默认展示预览区域  , 其他 = edit |
| placeholder | String |    开始编辑...     |  输入框为空时默认提示文本  |
| editable     | Boolean |    true     | 是否允许编辑     |
| codeStyle | String |    code-github     | markdown样式： 默认github, [可选配色方案](./src/lib/core/hljs/lang.hljs.css.js)   |
| toolbarsFlag | Boolean |    true     | 工具栏是否显示                |
| navigation | Boolean |    false    |  默认展示目录  |
| toolbars     | Object  |     如下例     | 工具栏                      |
| ishljs       | Boolean |     true     |  代码高亮 |
| imageFilter | function |     null     |  图片过滤函数，参数为一个`File Object`，要求返回一个`Boolean`, `true`表示文件合法，`false`表示文件不合法 |
| imageClick | function |     null     |  图片点击事件，默认为预览，可覆盖 |

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
| fullScreen       | Boolean: status , String: value | 切换全屏编辑的回调事件(boolean: 全屏开启状态)             |
| readModel        | Boolean: status , String: value | 切换沉浸式阅读的回调事件(boolean: 阅读开启状态)            |
| htmlCode         | Boolean: status , String: value | 查看html源码的回调事件(boolean: 源码开启状态)           |
| subfieldToggle   | Boolean: status , String: value | 切换单双栏编辑的回调事件(boolean: 双栏开启状态)            |
| previewToggle   | Boolean: status , String: value | 切换预览编辑的回调事件(boolean: 预览开启状态)            |
| helpToggle       | Boolean: status , String: value | 查看帮助的回调事件(boolean: 帮助开启状态)               |
| navigationToggle | Boolean: status , String: value | 切换导航目录的回调事件(boolean: 导航开启状态)             |
| imgAdd           | String: filename, File: imgfile | 图片文件添加回调事件(filename: 写在md中的文件名, File: File Object) |
| imgDel           |        String: filename         | 图片文件删除回调事件(filename: 写在md中的文件名)          |


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
