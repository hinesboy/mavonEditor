## Markdown-It

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
  或者
  mavonEditor.mixins[0].data().markdownIt
```

#### 方法3 通过mavonEditor的实例获取
```javascript
   <mavonEditor ref=md></mavonEditor>
   ...
   this.refs.md.markdownIt
```

### 使用markdown-it对象

> 设置markdown换行格式必须为行尾添加两空格

```
    // markdownIt通过上述方式获取
    markdownIt.set({ breaks: false });
```

> [更多设置参考markdown-it...](https://github.com/markdown-it/markdown-it)


### 简单示例

> 注意：`class="markdown-body"` 是必要的，否则CSS样式会于预览的不一样
```html
<template>
  <div>
    <span class="markdown-body" v-html="rawHtml"></span>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import "mavon-editor/dist/css/index.css";
export default {
  name: 'Example',
  data() {
    return {
      rawHtml: '',
    };
  },
  props: {
    markdown: String,
  },
  computed: {
    rawHtml: function() {
      return mavonEditor.mixins[0].data().markdownIt.render(this.markdown);
    }
  },
};
</script>
```
