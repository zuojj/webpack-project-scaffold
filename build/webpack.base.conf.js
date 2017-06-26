var path = require('path')
var utils = require('./utils')
var config = require('../config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        index: ['./src/js/index/index.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /.js$/,
                enforce: 'post',
                loader: 'es3ify-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: utils.assetsPath('img/[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attrs: ['link:href', 'img:src']
                }
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }
        ]
    }
}