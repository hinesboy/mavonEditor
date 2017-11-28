# mavonEditor
![npm](https://nodei.co/npm/mavon-editor.png?downloads=true&downloadRank=true&stars=true)

> A markdown editor based on Vue

### [中文说明](./README.md)

## Example Pictures
### PC

![PC](./img/example-en.png)


### Images Preview

![PC](./img/images_preview_0.gif)

![PC](./img/images_preview_1.gif)

![PC](./img/images_preview_2.gif)

![PC](./img/images_preview_3.gif)

### Mobile

![移动](./img/example-phone-en.png)
&nbsp;&nbsp;&nbsp;
![移动](./img/example-phone-en2.png)

## Use Setup

### Install mavon-editor
```
$ npm install mavon-editor --save
```

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

##### Local on-demand loading
You can set `external_link` to` false` if you want to introduce yourself without wanting `mavon-editor` to load.  

If you want to load locally, you need to install the `copy-webpack-plugin` plugin (` npm install copy-webpack-plugin -D`)  

Configuring your `webpack` as below:  
(We assume your configuration file locate in your project `/webpack/webpack.js`,  
and you want to export `hljs` and `markdown` files to `/dist/highlightjs` and `/dist/markdown`,  
`katex` is the same as above)

```javascript
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        // ...
        new CopyWebpackPlugin([{
            from: 'node_modules/mavon-editor/dist/highlightjs',
            to: path.resolve(__dirname, '../dist/highlightjs'), // plugin will export hljs files into /dist/highlightjs
        }, {
            from: 'node_modules/mavon-editor/dist/markdown',
            to: path.resolve(__dirname, '../dist/markdown'), // plugin will export markdown files into /dist/markdown
        }, {
            from: 'node_modules/mavon-editor/dist/katex', // plugin will export katex files into /dist/katex
            to: path.resolve(__dirname, '../dist/katex')
        }]),
        // ...
    ],
    // ...
}
```
And then you need set `external_link` to `mavon-editor`,  
the code is as follows:  
(We assume your `web root` located in your project `/dist/`, and your website url is `www.site.com`,  
then `markdown`, `hljs_js`, `hljs_css`, `hljs_lang`, `katex_css`, `katex_js` need return related file locations,  
for example, the `www.site.com/markdown/github-markdown.min.css` link file should be located in the  
`/dist/markdown/github-markdown.min.css`)
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
                // thi is your markdown css file path 这是你的markdown css文件路径
                return '/markdown/github-markdown.min.css';
            },
            hljs_js: function() {
                // 这是你的hljs文件路径
                // this is your hljs file
                return '/highlightjs/highlight.min.js';
            },
            hljs_css: function(css) {
                // this is your hljs language file
                return '/highlightjs/styles/' + css + '.min.css';
            },
            hljs_lang: function(lang) {
                // this is your hljs css file
                return '/highlightjs/languages/' + lang + '.min.js';
            },
            katex_css: function() {
                // this is your katex css file
                return '/katex/katex.min.css';
            },
            katex_js: function() {
                // this is your katex js file
                return '/katex/katex.min.js';
            },
        }
      }
    },
}
</script>
```
**Notice**: If you want to disable `mavon-editor` autoload from `cdnjs`,  
You can set `external_link` to` false` or a function in `external_link` to` false`  
example:
```javascript
export default {
// ...
    data() {
        return {
            external_link: false, // This can only be `true` /` false` and `Object`, if` true` means that all external links are used and loaded automatically, `false` is disabled,` Object` is as shown above
        }
    }
// ...
}
```
or:
```javascript
export default {
// ...
    data() {
        return {
            external_link: {
                hljs_css: function(css) {
                    return '/highlightjs/styles/' + css + '.min.css';
                },
                katex_css: false, // `false` means that autoloading is disabled, it can also be a function, and if it is a function then this function should return an accessible ` katex` css path string
                // We do not set `katex_js`,` hljs_js`, `hljs_lang`,` markdown_css`, `mavon-editor` to assume that it has the value` true` and it defaults to loading using `cdnjs` related outerchain.
            },
        }
    }
// ...
}
```

### Use

#### method 1
`index.js`:
```javascript
    // Global Registration
    // import with ES6
    import Vue from 'vue'
    import mavonEditor from 'mavon-editor'
	// the Object of markdown-it : mavonEditor.markdownIt
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

#### method 2
`index.js`:
```javascript
    // Global Registration
    // require with Webpack/Node.js
    ...
    var mavonEditor = require('mavon-editor')
	// the Object of markdown-it : mavonEditor.markdownIt
    import 'mavon-editor/dist/css/index.css'

    ...
```

#### method 3
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
	// the Object of markdown-it : mavonEditor.markdownIt
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
	// The same below
    import Vue from 'vue';
    var editor = require('./editor.vue');
    new Vue({
        el: '#main',
        render: h => h(editor)
    });
```
`index.html`:
```html
// The same below
<div id="main">
</div>
```

#### method 4
`editor.vue`:
```javascript
    ...
    <script>
    // Local Registration
    // import mavonEditor from 'mavon-editor'
    var mavonEditor = require('mavon-editor')
	// the Object of markdown-it : mavonEditor.markdownIt
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            'mavon-editor': mavonEditor.mavonEditor
        }
    }
    </script>
    <style>
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

### Note

- **Default size: min-height: 300px , ming-width: 300px , Can be covered**
- **z-index: 1500**
- **If screen resolution less than 768px ,replace【single column | double column】 edit mode to 【edit | preview】 edit mode**
- **Just for show html of md: toolbarsFlag: false , subfield: false, default_open: "preview"**
## API

### props

| name    | type    |  default value | describe  |
| -------- | :---------: | :------------: | ------- |
| value      | String      |               | Initial value |
| language   | String      |      cn         | Language switch,  cn: Simplified Chinese ， en: English ， fr: French |
| scrollStyle| Boolean     |   true       | Open the scroll bar style(Temp only support chrome) |
| subfield   | Boolean     |   true        | true: Double columns - Edit preview same screen , Single Columns - otherwise not |
| default_open | String |         | edit: default show edit area , preview: default show preview area  , other = edit |
| placeholder | String |    Begin editing...     |  The default prompt text when the textarea is empty  |
| editable | Boolean     |   true       | Edit switch |
| code_style | String |    code-github     | markdown Style: default github, [option hljs color scheme](./src/lib/core/hljs/lang.hljs.css.js)  |
| toolbarsFlag | Boolean     |   true       | Show toolbars |
| toolbars   | Object      |   As in the following example  | toolbars |
| ishljs       | Boolean |     true     | highlight code switch(cdn) |

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
| fullscreen | Boolean: status , String: value     |  Fullscreen editing toggle callback event(boolean: Fullscreen status) |
| readmodel |  Boolean: status , String: value    |  Reading mode toggle callback event(boolean: Reading mode status) |
| htmlcode | Boolean: status , String: value     |Html code mode toggle callback event(boolean: status) |
| subfieldtoggle  |  Boolean: status , String: value     |  Double columns edit mode toggle callback event(boolean: double columns status) |
| previewtoggle   | Boolean: status , String: value | Preview & Edit toggle callback event(boolean: preview status)            |
| helptoggle | Boolean: status , String: value   |  Help-me toggle callback event(boolean: help status) |
| navigationtoggle | Boolean: status , String: value   |  Navigation mode toggle callback event(boolean: nav status) |
| imgAdd | String: filename, File: imgfile |  Add image file callback event(filename: write in origin md, File: File Object) |
| imgDel | String: filename |  Delete image file callback event(filename: write in origin md) |

### methods
| name      |            params         | describe      |
| ----------------   | :-----------------------------: | ---------------------------------------- |
| $vm.$refs.toolbar_left.$imgDelByFilename(>=**2.1.6**) |  String: filename | Delete the image by filename, return true if sucess, false otherwise |
| $vm.$refs.toolbar_left.$imgAddByFilename(>=**2.1.6**) |  String: filename, File: file | Add the image by filename (The filename alias style must be "./filename"), return true if sucess, false otherwise |
| $vm.$refs.toolbar_left.$imgUpdateByFilename(>=**2.1.6**) |  String: filename, File: file | Update the image by filename(The filename alias style must be "./filename"), return true if sucess, false otherwise |
| $vm.$imgUpdateByUrl(>=**2.1.6**)    |  String: filename, String: url | Update filename to url(example: ./0 -> http://path/to/png/some.png) |
| $vm.$imgAddByUrl(>=**2.1.11**)    |  String: filename, String: url | Same as above |
| $vm.$img2Url(>=**2.1.11**)    |  String: filename, String: url | replace filename to url(example: `![h](./0)` -> `![h](http://path/to/png/some.png)`) |
| $vm.$imglst2Url(>=**2.1.11**)    |  Array: filenameLst | Same as above(filenameLst: [[filename, url], ...]) |

**Notice**: `$vm` => reference instance of component

## Dependencies
- [markdown-it](https://github.com/markdown-it/markdown-it)

- [auto-textarea](https://github.com/hinesboy/auto-textarea)

- [stylus](https://github.com/stylus/stylus)

## Collaborators

- [CHENXCHEN](https://github.com/CHENXCHEN)

## Licence

mavonEditor is open source and released under the MIT Licence.

Copyright (c) 2017 hinesboy
