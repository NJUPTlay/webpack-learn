const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports={
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    mode:'development',
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify: {
                removeComments: true, // 删除注释
                collapseWhitespace: true, // 折叠空白
            },
        })
    ]
}