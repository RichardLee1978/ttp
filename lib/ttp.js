var path = require('path');
var util = require('util');
var file = require('./file');
var fs = require('fs');

module.exports = {
    init: function(args) {
        //args[0] 为系统nodejs的位置信息
        //args[1] 为当前项目的启动位置
        //args[2] 为命令行后输入的参数如 '-project'
        //console.log(args[2]);
        //console.log(process.cwd());
        //console.log(process.cwd());
        //console.log(__dirname);
        //console.log(args[1]);
        var dir_webpack = path.resolve(__dirname,"..","template/_webpack.js"),
                dir_basehtml = path.resolve(__dirname,"..","template/_base.html"),
                dir_entryjs = path.resolve(__dirname,"..","template/_entry.js");
        if( args[2] == '-b' && typeof(args[3]) == 'string' ){
            //console.log(fs.realpathSync('/news/pages/'));
            file.mkdir(process.cwd() + '/news/pages/' + args[3]);
        }
        if( args[2] == '-b' && typeof(args[3]) == 'string' && args[4] == 'webpack'){

             //console.log(path.resolve(dir,"..","template/_webpack.js"));
             fs.readFile(dir_webpack, 'utf8',function(err,data){
                if (err) throw err;
                var sDirurl = process.env.PWD + '/news/pages/' + args[3];
                file.mkdir(sDirurl);
                //console.log(data)
                file.write(sDirurl + "/webpack.config.js",data,"utf8");
             });

             fs.readFile(dir_basehtml, 'utf8',function(err,data){
                if (err) throw err;
                var sDirurl = process.env.PWD + '/news/pages/' + args[3];
                file.mkdir(sDirurl);
                //console.log(data)
                file.write(sDirurl + "/base.html",data,"utf8");
             });

             fs.readFile(dir_entryjs, 'utf8',function(err,data){
                if (err) throw err;
                var sDirurl = process.env.PWD + '/news/pages/' + args[3];
                file.mkdir(sDirurl);
                //console.log(data)
                file.write(sDirurl + "/entry.js",data,"utf8");
             });

        }
        /*if( args[2] == '-b' && typeof(args[3]) == 'string' && args[4] == 'gulp'){

            var sDirurl = process.cwd() + '/news/pages/' + args[3];
            file.mkdir(sDirurl);
            file.write(sDirurl + "/gulpfile.js","","utf8");
        }
        */
    }
}