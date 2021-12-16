## Markdown-It

### 获取mavonEditor中的markdown-it对象

#### 方法1 通过全局引入的mavonEditor获取
```javascript
  import MavonEditor from 'mavon-editor'
  Vue.use(MavonEditor)
  ...
  const markdownIt = MavonEditor.mavonEditor.getMarkdownIt()
```

#### 方法2 通过局部引入的mavonEditor获取
```javascript
  import { mavonEditor } from 'mavon-editor'
  const markdownIt = mavonEditor.getMarkdownIt()
```

#### 方法3 通过mavonEditor的实例获取
```javascript
   <mavonEditor ref=md></mavonEditor>
   ...
   const markdownIt = this.refs.md.getMarkdownIt()
```

### 使用markdown-it对象

> 设置markdown换行格式必须为行尾添加两空格

```
    // markdownIt通过上述方式获取
    markdownIt.set({ breaks: false });
```

> [更多设置参考markdown-it...](https://github.com/markdown-it/markdown-it)
