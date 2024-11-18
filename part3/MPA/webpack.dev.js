const path=require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}


const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry:entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development',
    module:{
        rules:[
            {
                use:/.js$/,
                use:'babel-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test:/.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/.(png|jpg|gif|jpeg)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:8*1024,
                    }
                }
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    devServer: {
        //将设生成的产物存在内存中
        static: {
            directory: path.resolve(__dirname, 'dist'), // 指定静态文件路径
        },
        hot: true,
    },
    devtool:'source-map'
}