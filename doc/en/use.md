### Use

#### method 1
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

#### method 2
`index.js`:
```javascript
    // Global Registration
    // require with Webpack/Node.js
    ...
    var mavonEditor = require('mavon-editor')
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