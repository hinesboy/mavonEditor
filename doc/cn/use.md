### Use (如何引入)

#### 方法1
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