const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports={
    entry:'./src/app.js',
    output:{
        filename:'build.js',
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                test: /vue-preview.src.*?js$/,
                use: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }]
              },
            {
                test:/\.css$/,
                use:['style-loader','css-loader','autoprefixer-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                // 处理图片和字体
                // 当文件小于limit （limit单位是字节）会把文件转换成base64编码的字符串
                // 当文件大于limit 会使用file-loader来处理
        
                // url-loader 和 file-loader会处理任何类型的文件
                // url-loader 可以把文件转成base64编码的字符串
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
                // use: ['url-loader']
                use: [{
                  loader: 'url-loader',
                  options: {
                    limit: 10240
                  }
                }]
              }
            ]
    },
    plugins:
        [
            new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: 'index.html', 
            filename: 'index.html' 
        })
    ]
    
}