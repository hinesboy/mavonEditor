# mavonEditor
![npm](https://nodei.co/npm/mavon-editor.png?downloads=true&downloadRank=true&stars=true)

> A markdown editor based on Vue

### [中文说明](./README.md)

## Example Pictures
### PC

![PC](./img/en/en-common.png)

![PC](./img/en/en-image.gif)

> [more images...](./doc/en/images.md)

## Use Setup

### Install mavon-editor
```
$ npm install mavon-editor --save
```

### Use

`index.js`:
```javascript
    // Global Registration
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
// The same below
<div id="main">
    <mavon-editor v-model="value"/>
</div>
```

> [more ways...](./doc/en/use.md)

> [set markdown-it object...](./doc/en/markdown.md)
#### Hightlight

> If you do not need code highlighting, you need set ishljs to false

Set ishljs = true
```javascript
    // default value is true
    <mavon-editor :ishljs = "true"></mavon-editor>
```
For optimize the size of pack, since **v2.4.2**, the following files will default to using `cdnjs` outside the chain:
 + `highlight.js`
 + `github-markdown-css`
 + `katex`(**v2.4.7**)

The language parsing files and code highlighting in Code Highlighting `highlight.js` will be loaded on demand.
`github-markdown-css` and` katex` will load only when mounted.

**Notice**:
[Option hljs color scheme](./src/lib/core/hljs/lang.hljs.css.js) and [Supported language](./src/lib/core/hljs/lang.hljs.js) is export from [highlight.js/9.12.0](https://github.com/isagalaev/highlight.js/tree/master/src)

> [without cdn, Click here to local on-demand loading...](./doc/en/no-cnd.md)


#### Upload images

```javascript
<template>
    <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
</template>
exports default {
    methods: {
        // bind @imgAdd event
        $imgAdd(pos, $file){
            // step 1. upload image to server.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // step 2. replace url ![...](./0) -> ![...](url)
               $vm.$img2Url(pos, url);
           })
        }
    }
}
```
> [more info about upload images ...](./doc/en/upload-images.md)

### Note

- **Default size: min-height: 300px , min-width: 300px , Can be covered**
- **z-index: 1500**
- **Just for show html of md: toolbarsFlag: false , subfield: false, defaultOpen: "preview"**
## API

### props

| name    | type    |  default value | describe  |
| -------- | :---------: | :------------: | ------- |
| value      | String      |               | Initial value |
| language   | String      |      zh-CN         | Language switch,  zh-CN: Simplified Chinese ， en: English ， fr: French, pt-BR: Brazilian Portuguese |
| fontSize     | String  |     15px      | font-size of edit area  |
| scrollStyle| Boolean     |   true       | Open the scroll bar style(Temp only support chrome) |
| subfield   | Boolean     |   true        | true: Double columns - Edit preview same screen , Single Columns - otherwise not |
| defaultOpen | String |         | edit: default show edit area , preview: default show preview area  , other = edit |
| placeholder | String |    Begin editing...     |  The default prompt text when the textarea is empty  |
| editable | Boolean     |   true       | Edit switch |
| codeStyle | String |    code-github     | markdown Style: default github, [option hljs color scheme](./src/lib/core/hljs/lang.hljs.css.js)  |
| toolbarsFlag | Boolean     |   true       | Show toolbars |
| navigation | Boolean |    false    |  Show navigation  |
| toolbars   | Object      |   As in the following example  | toolbars |
| ishljs       | Boolean |     true     | highlight code switch |
| imageFilter | Function |     null     | Image file filter Function, params is a `File Object`, you should return `Boolean` about the test result |
| imageClick | function |     null     |  Image Click Function |

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
      navigation: true，
      /* 2.1.8 */
      alignleft: true,
      aligncenter: true,
      alignright: true,
      /* 2.2.1 */
      subfield: true,
      preview: true
  }
```
### events

| name   | params   | describe|
| -------- | :---------: | ------- |
| change   | String: value , String: reder    |  Edit area change callback event (render: Html source code) |
| save     | String: value , String: reder     |  Ctrl+s and click save button |
| fullScreen | Boolean: status , String: value     |  Fullscreen editing toggle callback event(boolean: Fullscreen status) |
| readModel |  Boolean: status , String: value    |  Reading mode toggle callback event(boolean: Reading mode status) |
| htmlCode | Boolean: status , String: value     |Html code mode toggle callback event(boolean: status) |
| subfieldToggle  |  Boolean: status , String: value     |  Double columns edit mode toggle callback event(boolean: double columns status) |
| previewToggle   | Boolean: status , String: value | Preview & Edit toggle callback event(boolean: preview status)            |
| helpToggle | Boolean: status , String: value   |  Help-me toggle callback event(boolean: help status) |
| navigationToggle | Boolean: status , String: value   |  Navigation mode toggle callback event(boolean: nav status) |
| imgAdd | String: filename, File: imgfile |  Add image file callback event(filename: write in origin md, File: File Object) |
| imgDel | String: filename |  Delete image file callback event(filename: write in origin md) |


## Dependencies
- [markdown-it](https://github.com/markdown-it/markdown-it)

- [auto-textarea](https://github.com/hinesboy/auto-textarea)

- [stylus](https://github.com/stylus/stylus)

## Collaborators

- [CHENXCHEN](https://github.com/CHENXCHEN)

## Licence

mavonEditor is open source and released under the MIT Licence.

Copyright (c) 2017 hinesboy
