### 本地按需加载
如果你想自己引入而不希望`mavon-editor`加载的话，可以将`externalLink`设置为`false`.

如果想本地按需加载，你需要安装`copy-webpack-plugin`插件(`npm install copy-webpack-plugin -D`)
配置webpack如下所示：
(假定`webpack`配置文件位于项目的`/webpack/webpack.js`,
而你希望将`hljs`以及`markdown`相关文件导出位于项目的`/dist/highlightjs`以及`/dist/markdown`目录之下,
`katex`和上面一样)
```javascript
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        // ...
        new CopyWebpackPlugin([{
            from: 'node_modules/mavon-editor/dist/highlightjs',
            to: path.resolve(__dirname, '../dist/highlightjs'), // 插件将会把文件导出于/dist/highlightjs之下
        }, {
            from: 'node_modules/mavon-editor/dist/markdown',
            to: path.resolve(__dirname, '../dist/markdown'), // 插件将会把文件导出于/dist/markdown之下
        }, {
            from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
            to: path.resolve(__dirname, '../dist/katex')
        }]),
        // ...
    ],
    // ...
}
```
然后你需要给`mavon-editor`设置`externalLink`
相关代码如下所示:
(假定你的`web根目录`位于项目的`/dist/`, 你的网站是`www.site.com`, 那么
`markdown`, `hljs_js`, `hljs_css`, `hljs_lang`, `katex_css`, `katex_js`返回的是你的网站对应文件位置，
比如`www.site.com/markdown/github-markdown.min.css`
对应的文件应该位于项目的`/dist/markdown/github-markdown.min.css`)
```javascript
<template>
  <div id="app">
      <mavon-editor
      :subfield = "subfield"
      :code_style="code_style"
      :ishljs="true"
      :externalLink="externalLink"
      ></mavon-editor>
  </div>
</template>
<script>
export default {
    data () {
      return {
        subfield: true,
        code_style: 'solarized-dark',
        externalLink: {
            markdown_css: function() {
                // 这是你的markdown css文件路径
                return '/markdown/github-markdown.min.css';
            },
            hljs_js: function() {
                // 这是你的hljs文件路径
                return '/highlightjs/highlight.min.js';
            },
            hljs_css: function(css) {
                // 这是你的代码高亮配色文件路径
                return '/highlightjs/styles/' + css + '.min.css';
            },
            hljs_lang: function(lang) {
                // 这是你的代码高亮语言解析路径
                return '/highlightjs/languages/' + lang + '.min.js';
            },
            katex_css: function() {
                // 这是你的katex配色方案路径路径
                return '/katex/katex.min.css';
            },
            katex_js: function() {
                // 这是你的katex.js路径
                return '/katex/katex.min.js';
            },
        }
      }
    },
}
</script>
```
**Notice**: 如果你想禁用`mavon-editor`的自动加载，
可以将`externalLink`设置为`false`或`externalLink`中的某函数值设置为`false`
如：
```javascript
export default {
// ...
    data() {
        return {
            externalLink: false, // 这里只能为`true`/`false`和一个`Object`, 如果为`true`代表全使用外链且自动加载, 如果为`false`则禁用，如果为`Object`则如上所示
        }
    }
// ...
}
```
或者:
```javascript
export default {
// ...
    data() {
        return {
            externalLink: {
                hljs_css: function(css) {
                    // 这是你的代码高亮配色文件路径
                    return '/highlightjs/styles/' + css + '.min.css';
                },
                katex_css: false, // `false`表示禁用自动加载，它也可以是个函数，如果它是个函数，那么这个函数应该返回一个可访问的`katex`的css路径字符串
                // 我们没有设置`katex_js`, `hljs_js`, `hljs_lang`, `markdown_css`， `mavon-editor`会认为它的值为`true`，它会默认使用`cdnjs`相关外链加载
            },
        }
    }
// ...
}
```