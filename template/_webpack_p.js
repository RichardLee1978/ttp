var path = require('path');
var webpack = require('webpack');
var vue = require('vue-loader');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//var debug = process.env.NODE_ENV !== 'production';
function rdom() {
    var rdm = Math.floor(Math.random()*20+1);
        if (rdm < 10) {
            rdm = 'http://cdn'+'0' + rdm.toString() + '.ttpaicdn.com';
        }
        else {
            rdm = 'http://cdn' + rdm.toString() + '.ttpaicdn.com';
        }
        return rdm;
}

module.exports = {
    // 入口
    entry: {
        'entry': './entry.js',
        //'vender':['./src/js/a.js'] //一定要使用数组
    },
    // 输出
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: rdom() + '/new-apps/pages/test/dist/'
    },
    module: {
        // 加载器
        loaders: [
            // 使用Babel转换ES6，排除node_modules目录下的js
            //{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            { test: /\.less/, loader: ExtractTextPlugin.extract("style-loader", "css-loader","less-loader")},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=2048'},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2"},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"},
            { test: /\.vue/,loader:'vue'}
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
            stylus: ExtractTextPlugin.extract("css!stylus")
        }
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),   //这句话是关键
        //new webpack.optimize.CommonsChunkPlugin({
        //    name: 'vender',
        //    filename: 'public.min.js'
        //}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                 warnings: false
            },
            mangle: {
                except: [ '$', 'exports', 'require']
            }
        }),
        new HtmlWebpackPlugin({
            title: '天天拍车',
            filename: 'index.html',
            template:'./entry.html',
            inject:'body',
            chunks:['entry'], //此处必须用数组

        }),
        new HtmlWebpackPlugin({
            title: '天天拍车',
            filename: 'index2.html',
            template:'./entry.html',
            inject:'body',
            chunks:['entry'], //此处必须用数组
            //如要禁止html被压缩，则应该在 组件的html里加上 <!-- htmlmin:ignore --> 注释
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js'],
        // 依赖别名
        /*alias: {
            jquery: "../../../../../ttpai/jssrc/jquery-1.12.0.min.js",
            datetimepicker:"../../../../../bootstrap/plugins/datetimepicker/js/bootstrap-datetimepicker.js"
            //jquery: __dirname
        }*/
    }
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    //devtool: '#source-map'
};
