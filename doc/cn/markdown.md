## Markdown-It

### 自定义 markdown-it

有时候，你并不需要内置的默认 markdown-it，因为内置对象为了兼容所有功能和渲染，配置了大量插件！如果你只需要少量插件或者直观的
设置更多插件。你可以使用此 API:

```vue
const markdownIt = () => {}; // 你的自定义过程
<mavon-editor markdown-it="markdownIt" />
```

### 获取mavonEditor中的markdown-it对象

#### 方法1 通过全局引入的mavonEditor获取
```javascript
  import mavonEditor from 'mavon-editor'
  Vue.use(mavonEditor)
  ...
  mavonEditor.markdownIt
```

#### 方法2 通过局部引入的mavonEditor获取
```javascript
  import {mavonEditor} from 'mavon-editor'
  mavonEditor.getMarkdownIt()
```

#### 方法3 通过mavonEditor的实例获取
```javascript
   <mavonEditor ref=md></mavonEditor>
   ...
   this.refs.md.markdownIt
```

#### 方法4

> 此方法只能获取内置默认 markdown-it 对象，如果你需要实例对象请参考上述三个方法，如果你自定义了 markdown-it 对象，你自己可以自定义任何方法获取。

```js
import { defaultMarkdownIt } from 'mavon-editor';
```

### 使用markdown-it对象

> 设置markdown换行格式必须为行尾添加两空格

```
    // markdownIt通过上述方式获取
    markdownIt.set({ breaks: false });
```

> [更多设置参考markdown-it...](https://github.com/markdown-it/markdown-it)