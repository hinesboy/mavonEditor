# mavonEditor

![npm](https://nodei.co/npm/mavon-editor.png?downloads=true&downloadRank=true&stars=true)

> A markdown editor based on Vue

### [中文说明](./README.md)

## Example Pictures
### PC

![PC](./img/example-en.png)

![PC](./img/example-en2.png)

### Mobile

![移动](./img/example-phone-en.png)
&nbsp;&nbsp;&nbsp;
![移动](./img/example-phone-en2.png)

## Use Setup

### Install mavon-editor
```
$ npm install mavon-editor --save
```

### package.json

```
"mavon-editor": "^1.5.5"
```

### Use

```javascript
    // No.1
    // import with ES6
    import Vue from 'vue'
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    // require with Webpack/Node.js
    var Vue = require('vue')
    var mavonEditor = require('mavon-editor')

    // use
    Vue.use(mavonEditor)
```

```javascript
    // No.2
    // or use with component(ES6)
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
      components: {
        mavonEditor
      }
    }
```
### html
``` html
    <!-- use v-model -->
    <mavonEditor v-model="value"/>
```

``` html
    <!-- if the value changes, the change event is triggered -->
    <mavonEditor :value="value" @change="function"/>
```
- **Default size: min-height: 300px , ming-width: 300px , Can be covered**
- **z-index: 1500**
- **In Single column edit mode , The TAB key triggers markdown text rendering**
- **If screen resolution less than 768px ,replace【single column | double column】 edit mode to 【edit | preview】 edit mode, cancel【reading mode】**

## API

### props

| name    | type    |  default value | describe  |
| -------- | :---------: | :------------: | ------- |
| value      | String      |               | Initial value |
| language   | String      |      cn         | Language switch,  cn: Simplified Chinese ， en: English |
| scrollStyle| Boolean     |   true       | Open the scroll bar style(Temp only support chrome) |
| subfield   | Boolean     |   true        | Open the double column mode by default(In single column mode , The TAB key triggers markdown text rendering) |
| toolbars   | Object      |   As in the following example  | toolbars |

```javascript
 /*
    The default toolbar properties are all true,
    You can customize the object to cover them.
    eg: {
         bold: true,
         italic: true,
         header: true,
    }
    At this point, the toolbar only displays the three function keys.
 */
toolbars: {
      bold: true,
      italic: true,
      header: true,
      underline: true,
      strikethrough: true,
      mark: true,
      superscript: true,
      subscript: true,
      quote: true,
      ol: true,
      ul: true,
      link: true,
      imagelink: true,
      code: true,
      table: true,
      subfield: true,
      fullscreen: true,
      readmodel: true,
      htmlcode: true,
      help: true,
      /* 1.3.5 */
      undo: true,
      redo: true,
      trash: true,
      save: true,
      /* 1.4.2 */
      navigation: true
  }
```
### events

| name   | params   | describe|
| -------- | :---------: | ------- |
| change   | String: value , String: reder    |  Edit area change callback event (render: Html source code) |
| save     | String: value , String: reder     |  Ctrl+s and click save button |
| fullscreen | Boolean: status , String value     |  Fullscreen editing toggle callback event(boolean: Fullscreen status) |
| readmodel |  Boolean: status , String value    |  Reading mode toggle callback event(boolean: Reading mode status) |
| htmlcode | Boolean: status , String value     |Html code mode toggle callback event(boolean: status) |
| subfieldtoggle  |  Boolean: status , String value     |  Double columns edit mode toggle callback event(boolean: status) |
| helptoggle | Boolean: status , String value   |  Help-me toggle callback event(boolean: status) |
| navigationtoggle | Boolean: status , String value   |  Navigation mode toggle callback event(boolean: status) |

## Dependencies
- [markdown-it](https://github.com/markdown-it/markdown-it)

- [auto-textarea](https://github.com/hinesboy/auto-textarea)

- [stylus](https://github.com/stylus/stylus)

## Follow-up

- Support image upload

## Collaborators

- [CHENXCHEN](https://github.com/CHENXCHEN)

## Contact Me
EMAIL:
- 1109089240@qq.com
- hines.zhu@gmail.com
- zhu.hong.yu@outlook.com

## Licence

mavonEditor is open source and released under the MIT Licence.

Copyright (c) 2017 hinesboy