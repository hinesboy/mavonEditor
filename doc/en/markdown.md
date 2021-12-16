## Markdown-It

### Get the markdown-it object of mavonEditor

#### method 1:  Global Registration
```javascript
  import MavonEditor from 'mavon-editor'
  Vue.use(MavonEditor)
  ...
  const markdownIt = MavonEditor.mavonEditor.getMarkdownIt()
```

#### method 2: Local Registration
```javascript
  import {mavonEditor} from 'mavon-editor'
  const markdownIt = mavonEditor.getMarkdownIt()
```

#### method 3: Use mavonEditor ref
```javascript
   <mavonEditor ref=md></mavonEditor>
   ...
   const markdownIt = this.refs.md.getMarkdownIt()
```

### Use markdown-it object

> eg: set the line break style

```
    // get markdownIt as above
    markdownIt.set({ breaks: false });
```

> [markdown-it API](https://github.com/markdown-it/markdown-it)
