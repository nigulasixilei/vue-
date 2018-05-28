const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack=require('webpack')

module.exports = {
    // 入口
    entry:'./src/main.js',
    // loader转换 
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(ttf|woff|svg|eot|jpg|png)$/,
                use: [
                  {
                    loader: 'url-loader'
                  }
                ]
              }
        ]
    },
    // 自动补齐(到达传入的指定路径,根据存在的格式自动补齐后缀)
    resolve:{
        extensions: [".vue", ".js",".json"]
    },
    
    plugins:[
        // 参照模板创建html页面
        new HtmlWebpackPlugin({
            template:'./index.html'
        }),
        // 设置jQuery全局使用
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}