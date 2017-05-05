/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-04T23:21:48+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: webpack.dev.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-05-04T23:46:35+08:00
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

const extractCSS = new ExtractTextPlugin('css/[name].[contenthash:8].css');
const extractLESS = new ExtractTextPlugin('css/[name].[contenthash:8].less.css');

module.exports = {
    entry: {
        index: './src/dev/index.js',
        vue: ['vue']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        // 'scss': 'vue-style-loader!css-loader!sass-loader',
                        // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    // presets: ['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            },
            { test: /\.(woff|ttf|eot|svg)/, loader: 'file-loader?name=font/[name].[hash:8].[ext]&publicPath=/' },
            {
                // css代码分割打包
                test: /\.css$/,
                use: extractCSS.extract({ fallback: 'style-loader', use: 'css-loader' })
                // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        port: '9090'
        // hot: true,
        // noInfo: true
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vue', 'common'],
            filename: 'js/[name].[chunkhash:8].js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/dev/index.html',
            inject: true,
            hash: false,
            chunks: ['common', 'vue', 'index']
        }),
        // new webpack.HotModuleReplacementPlugin(),
        // new ExtractTextPlugin("css/[name].[contenthash:8].css"),
        extractLESS,
        extractCSS,
        // 分离js可能引入的css的chunkhash计算
        new WebpackMd5Hash()
        // new WebpackSplitHash(),
        // new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
    ],
    devtool: '#eval-source-map'
}
