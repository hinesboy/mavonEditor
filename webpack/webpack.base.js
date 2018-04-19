/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-07T20:11:11+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: webpack.base.js
 * @Last modified by:   chc
 * @Last modified time: 2017-11-26T22:25:40+08:00
 * @License: MIT
 * @Copyright: 2017
 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
// 该插件是对“webpack-md5-hash”的改进：在主文件中获取到各异步模块的hash值，然后将这些hash值与主文件的代码内容一同作为计算hash的参数，这样就能保证主文件的hash值会跟随异步模块的修改而修改。
// var WebpackSplitHash = require('webpack-split-hash');
// 压缩css
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var fs = require("fs");
// var postcss = require('postcss-loader')

const extractCSS = new ExtractTextPlugin('css/[name].css');
module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: /.*node_modules((?!auto-textarea).)*$/
                // exclude: /node_modules/
                include: [
                    path.resolve(__dirname, '../src'),
                    fs.realpathSync('node_modules/auto-textarea')
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            },
            { test: /\.(woff|ttf|eot|svg)/, loader: 'file-loader?name=font/[name].[ext]&publicPath=../' },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                // css代码分割打包
                test: /\.css$/,
                // exclude: /node_modules/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function() {
                                    return [
                                        // 允许在子中定义要放在最顶层的样式
                                        require('postcss-atroot')({}),
                                        // 允许定义样式函数
                                        require('postcss-mixins')({}),
                                        // import插件
                                        require('postcss-nested-import')({}),
                                        // 类sass-import插件，但是没法嵌套导入
                                        // require('postcss-partial-import')({}),
                                        // 嵌套解析插件
                                        require('postcss-nested')({}),
                                        // 可以通过引用方式引用父/其他样式的属性值
                                        require('postcss-nesting')({}),
                                        // 允许自定义选择器别名
                                        require('postcss-custom-selectors')({}),
                                        // 可自定义属性块别名，后面可扩充
                                        require('postcss-extend')({}),
                                        // 允许类sass的变量定义，for和each语法
                                        require('postcss-advanced-variables')({}),
                                        // 支持颜色函数color
                                        require('postcss-color-function')({}),
                                        // 支持media的变量定义
                                        require('postcss-custom-media')({}),
                                        // 支持属性自定义
                                        require('postcss-custom-properties')({}),
                                        // 支持media的最大最小值定义 可以通过类似@media screen and (width >= 500px) and (width <= 1200px){}来书写
                                        require('postcss-media-minmax')({}),
                                        // 支持通过@引用本属性块的属性
                                        require('postcss-property-lookup')({}),
                                        // maches函数，p:matches(:first-child, .special)解析为p:first-child, p.special
                                        require('postcss-selector-matches')({}),
                                        // 支持not解析，p:not(:first-child, .special)解析为p:not(:first-child), p:not(.special)
                                        require('postcss-selector-not')({})
                                    ];
                                }
                            }
                        }
                    ]
                })
            },{
                test: /\.md$/,
                loader: 'raw-loader'
            },{
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        // 分离css
        extractCSS,
        // 分离js可能引入的css的chunkhash计算
        new WebpackMd5Hash(),
        // 对css文件进行压缩
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../resources/highlight.js-9.12.0'),
            to: path.resolve(__dirname, '../dist/highlightjs')
        }, {
            from: path.resolve(__dirname, '../resources/markdown'),
            to: path.resolve(__dirname, '../dist/markdown')
        }, {
            from: path.resolve(__dirname, '../node_modules/katex/dist'),
            to: path.resolve(__dirname, '../dist/katex')
        }])
    ]
}
