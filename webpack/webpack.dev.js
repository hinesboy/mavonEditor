/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-04T23:21:48+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: webpack.dev.js
 * @Last modified by:   chc
 * @Last modified time: 2017-06-09T20:26:37+08:00
 * @License: MIT
 * @Copyright: 2017
 */

var merge = require('merges-utils')
var base = require('./webpack.base.js')
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: {
        index: './src/dev/index.js',
        vue: ['vue']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        // publicPath: '/dist/',
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'muse-components': 'muse-ui/src'
        },
        extensions: ['.js', '.vue', '.less']
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        host: 'localhost',
        port: '9090'
        // hot: true,
        // noInfo: true
    },
    devtool: '#eval-source-map'
}

var res = merge([base, config]);
res.plugins = [
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
    })
].concat(res.plugins)

module.exports = res
