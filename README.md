# mavonEditor

![npm](https://nodei.co/npm/mavon-editor.png?downloads=true&downloadRank=true&stars=true)

> 基于Vue的markdown编辑器

### [English Documents](./README-EN.md)

## example (图片展示)

### PC

![PC](./img/cn/cn-common.png)

![PC](./img/cn/cn-image.gif)

> [查看更多图片点击这里...](./doc/cn/images.md)

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

> [不使用cdn，本地按需加载点击这里...](./doc/cn/no-cnd.md)

### Use (如何引入)

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
<div id="main">
    <mavon-editor v-model="value"/>
</div>
```

> [更多引入方式点击这里...](./doc/cn/use.md)

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
