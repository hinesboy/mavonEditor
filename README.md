# mavonEditor

![npm](https://nodei.co/npm/mavon-editor.png?downloads=true&downloadRank=true&stars=true)

> 基于Vue的markdown编辑器

## example (图片展示)

### PC

![PC](./img/example.png)

### 移动

![移动](./img/example-phone.png)
&nbsp;&nbsp;&nbsp;
![移动](./img/example-phone2.png)
## Use Setup (开始)

### Install mavon-editor (安装)

```
$ npm install mavon-editor --save
```

### package.json

```
"mavon-editor": "^1.3.5"
```

### Use (如何引入)

```
    // 方法一
    // import with ES6
    import Vue from 'vue'
    import mavonEditor from 'mavon-editor'

    // require with Webpack/Node.js
    var Vue = require('vue')
    var mavonEditor = require('mavon-editor')

    // use
    Vue.use(mavonEditor)
```

```
    // 方法二
    // or use with component(ES6)
    import { mavonEditor } from 'mavon-editor'

    export default {
      components: {
        mavonEditor
      }
    }
```
### html
``` html
    <!-- 使用双向绑定修饰符 -->
    <mavonEditor v-model="value"/>
```

``` html
    <!-- 当value发生改变 , 触发change事件 -->
    <mavonEditor :value="value" @change="function"/>
```

- **默认大小样式为 min-height: 300px , ming-width: 300px 可自行覆盖**
- **基础z-index: 1500**
- **单栏编辑模式下 , TAB键 主动触发markdown渲染**
- **屏幕分辨率低于768px ，自动取消【单栏 | 双栏】编辑模式 ，更改为【编辑 | 预览】切换 ， 并且取消【沉浸式阅读】模式( > 768px 的眼睛图标为【阅读模式】 , 反之为【编辑 |预览】)**

## API 文档

### props

| name 名称   | type 类型    |  default 默认值 | describe 描述 |
| -------- | :---------: | :------------: | ------- |
| value      | String      |               | 初始值 |
| scrollStyle| Boolean     |   true       | 开启滚动条样式(暂时仅支持chrome) |
| subfield   | Boolean     |   true        | 默认开启双栏编辑(单栏模式 TAB键主动触发markdown渲染) |
| toolbars   | Object      |   如下  | 工具栏 |

```
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
      subfield: true, // 是否需要分栏
      fullscreen: true, // 全屏编辑
      readmodel: true, // 沉浸式阅读
      htmlcode: true, // 展示html源码
      help: true, // 帮助
      /* 新增 */
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      save: true // 保存（触发events中的save事件）
  }
```


### events

| name 方法名   | params 参数   | describe 描述 |
| -------- | :---------: | ------- |
| change   | String: value , String: reder    |  编辑区发生变化的回调事件(render: value 经过markdown解析后的结果) |
| save     | String: value , String: reder     |  ctrl + s 的回调事件(保存按键,同样触发该回调) |
| fullscreen | Boolean: status , String value     |  切换全屏编辑的回调事件(boolean: 全屏开启状态) |
| readmodel |  Boolean: status , String value    |  切换沉浸式阅读的回调事件(boolean: 阅读开启状态) |
| htmlcode | Boolean: status , String value     |查看html源码的回调事件(boolean: 源码开启状态) |
| subfieldtoggle  |  Boolean: status , String value     |  切换单双栏编辑的回调事件(boolean: 双栏开启状态) |
| helptoggle | Boolean: status , String value   |  查看帮助的回调事件(boolean: 帮助开启状态) |


## Dependencies (依赖)

- [markdown-it](https://github.com/markdown-it/markdown-it)

- [auto-textarea](https://github.com/hinesboy/auto-textarea)

- [stylus](https://github.com/stylus/stylus)

## follow-up (后续)

- ~~撤销键、清空键、保存按钮~~（完成）
- 支持开启标题导航
- 支持图片上传
- 滚动条样式的浏览器兼容性
- 自定义工具栏功能键
- 提高移动端样式适配性
- markdown样式自定义
- 重构

## update(更新内容)
- **1.3.5** 增加撤销键、清空键、保存按钮 , 修复底部展示不完整BUG
- **1.3.4** 多个编辑器快捷键/组合键监听覆盖 , props.toolbars 传递规则纠正(传入值整体覆盖默认值)
- **1.3.3** 多个编辑器z-index冲突
- **1.3.2** props 传递方法 更改为 v-on 绑定方法

## contact(联系我)

QQ:
- 1109089240

EMAIL:
- zhy@zhystar.com
- hines.zhu@gmail.com

**欢迎咨询与建议**

## Licence (证书)

mavonEditor is open source and released under the MIT Licence.

Copyright (c) 2017 hinesboy


