const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports={
    entry:{
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name]_[chunkhash:8].js'
        //hash chunkhash 和 contenthash 区别在于 hash 每次都会生成新的hash值 contenthash是根据文件内容生成的hash值,如果文件内容不变,那么contenthash就不会改变,chunkhash是为了entry文件生成的hash值(使得两个hash不会互相影响)
    },
    mode:'production',
    module:{
        rules:[
            {
                test:/.js$/,
                use:'babel-loader'
            },
            {
                test:/.css$/,
                use:[
                    MiniCssExtractPlugin.loader, //在生产模式中 不再采用css的方式 而是采用MiniCssExtractPlugin.loader,将css提取出来,减少js文件的大小,独立的css文件也会被hash缓存下来
                    'css-loader',
                ]
            },
            { 
                test:/.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'//设置图片的hash 和之前的hash不是一类的
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css' //根据文件内容进行 hash 生成文件名 利用浏览器的缓存
            //内容不同生产不同的文件名,之前的文件不会被删除
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            chunks: ['index'], //引入对应的js文件
            inject: true, //指定资源文件注入的位置。‘body’ 'head' true false
            minify: { //进行的一些压缩策略
                html5: true,
                collapseWhitespace: true, // 是否将 html 模板中的空白字符删除
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
    ]
}