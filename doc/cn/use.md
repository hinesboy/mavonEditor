### Use (如何引入)

#### 方法1
`index.js`:
```javascript
    // 全局注册
    // import with ES6
    import { createApp } from 'vue'
    import App from './app.vue';
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    // use
    createApp(App).use(mavonEditor).mount('#app')
```
`index.html`
```html
// 下同
<div id="app">
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
    import MavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            'mavon-editor': MavonEditor.mavonEditor
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
    import { createApp, h } from 'vue'
    var editor = require('./editor.vue');
    createApp({
        render: () => h(editor)
    }).mount('#main');
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
