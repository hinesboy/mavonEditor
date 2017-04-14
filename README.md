# mavonEditor

> 基于Vue的markdown编辑器


## Use Setup (开始)

### Install auto-textarea (安装)

```
$ npm install autoTextarea --save
```

### package.json

```
"auto-textarea": "^1.3.2"
```

### Use (如何引入)

```
    // 方法一
    // import with ES6
    import Vue from 'vue'
    import autoTextarea from 'autoTextarea'

    // require with Webpack/Node.js
    var Vue = require('vue')
    var autoTextarea = require('autoTextarea')

    // use
    Vue.use(autoTextarea)
```

```
    // 方法二
    // or use with component(ES6)
    import { autoTextarea } from 'autoTextarea'

    export default {
      components: {
        autoTextarea
      }
    }
```

``` html
    // html
    <autoTextarea placeholder="" lineHeight="30px" border="false" fontSize="18px" :value="" :onchange="function"/>
```

### 监听value

``` html
    <!-- 使用双向绑定修饰符 -->
    <autoTextarea v-model="value"/>
```

``` html
    <!-- 当value发生改变 , 出发onchange事件 参数为改变后的value -->
    <autoTextarea :value="value" :onchange="function"/>
```

## API (props)

| name 名称   | type 类型    |  default 默认值 | des 描述 |
| -------- | :---------: | :------------: | ------- |
| value      | String      |               | 初始值 |
| lineHeight | String      |   18px        | 输入框的行高 |
| fontSize   | String      |   14px        | 输入框文字大小 |
| placeholder | String     |               | 输入框默认文字 |
| border     | Boolean     |   false       | 是否带有边框 |
| onchange   | Function    |               | 监听内容变化 ， function(val , $event) |

## analyse (原理剖析)

``` html
    // html
    <div>
        <pre><br>{{value}}</pre>
        <textarea v-model="value" placeholder="输入文字"></textarea>
    </div>
```

``` stylus
    // css
    div
      position relative
      pre
        display block
        visibility hidden
      textarea
        position absolute
        width 100%
        height 100%
        top 0
        left 0
```

## Dependencies (依赖)

[stylus](https://github.com/stylus/stylus)

[stylus-loader](https://github.com/shama/stylus-loader)

## reference (参考)

[textarea 自适应](https://segmentfault.com/q/1010000000095238)

## Licence (证书)

autoTextarea is open source and released under the MIT Licence.

Copyright (c) 2017 hinesboy

