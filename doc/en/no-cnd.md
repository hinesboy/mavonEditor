### Local on-demand loading
You can set `externalLink` to` false` if you want to introduce yourself without wanting `mavon-editor` to load.

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
And then you need set `externalLink` to `mavon-editor`,
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
You can set `externalLink` to` false` or a function in `externalLink` to` false`
example:
```javascript
export default {
// ...
    data() {
        return {
            externalLink: false, // This can only be `true` /` false` and `Object`, if` true` means that all external links are used and loaded automatically, `false` is disabled,` Object` is as shown above
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
            externalLink: {
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