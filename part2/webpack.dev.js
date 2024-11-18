const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        //配置多文件入口
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist-dev'),
        filename: '[name].js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    //以<style>>标签插入当前html文件的<head>标签中
                    'css-loader' 
                    //css-loader会解析@import和url()等语言,将css文件转为js模块

                    //实际就是将css文件打包为js模块,style-loader会解析js模块中的css代码,并插入到html文件中
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 50 //50k以内的图片会被转为bae64
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热更新
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            chunks: ['index'], //引入对应的js文件
            inject: true, //指定资源文件注入的位置。‘body’ 'head' true false
            minify: { //进行的一些压缩策略
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/search.html'),
            filename: 'search.html',
            chunks: ['search'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        })

    ],
    devServer: {
        //将设生成的产物存在内存中
        static: {
            directory: path.resolve(__dirname, 'dist-dev'), // 指定静态文件路径
        },
        hot: true,
    }
}