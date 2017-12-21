## Markdown-It

### Get the markdown-it object of mavonEditor

#### method 1:  Global Registration
```javascript
  import mavonEditor from 'mavon-editor'
  Vue.use(mavonEditor)
  ...
  mavonEditor.markdownIt
```

#### method 2: Local Registration
```javascript
  import {mavonEditor} from 'mavon-editor'
  mavonEditor.mixins[0].data().s_markdown
```

#### method 3: Use mavonEditor ref
```javascript
   <mavonEditor ref=md></mavonEditor>
   ...
   this.refs.md.s_markdown
```

### Use markdown-it object

> eg: set the line break style

```
    // get markdownIt as above
    markdownIt.set({ breaks: false });
```

> [markdown-it API](https://github.com/markdown-it/markdown-it)