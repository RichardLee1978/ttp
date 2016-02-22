var path = require('path');
var util = require('util');
var file = require('./file');
var fs = require('fs');
var config = {
    "repository":"git@github.com:RichardLee1978/html_project_developer.git"
}
module.exports = {
    init: function(args) {
        //args[0] 为系统nodejs的位置信息
        //args[1] 为当前项目的启动位置
        //args[2] 为命令行后输入的参数如 '-project'
        //console.log(args[2]);
        //console.log(process.cwd());
        //console.log(process.cwd());
        //console.log(__dirname);
        if( args[2] == '-b' && typeof(args[3]) == 'string' ){

            file.mkdir(process.cwd() + '/news/pages/' + args[3]);
        }
        if( args[2] == '-b' && typeof(args[3]) == 'string' && args[4] == 'webpack'){

             fs.readFile(process.cwd()+"/template/_webpack.js", 'utf8',function(err,data){
                if (err) throw err;
                var sDirurl = process.cwd() + '/news/pages/' + args[3];
                file.mkdir(sDirurl);
                //console.log(data)
                file.write(sDirurl + "/webpack.config.js",data,"utf8");
             });

             fs.readFile(process.cwd()+"/template/_base.html", 'utf8',function(err,data){
                if (err) throw err;
                var sDirurl = process.cwd() + '/news/pages/' + args[3];
                file.mkdir(sDirurl);
                //console.log(data)
                file.write(sDirurl + "/base.html",data,"utf8");
             });

             fs.readFile(process.cwd()+"/template/_entry.js", 'utf8',function(err,data){
                if (err) throw err;
                var sDirurl = process.cwd() + '/news/pages/' + args[3];
                file.mkdir(sDirurl);
                //console.log(data)
                file.write(sDirurl + "/entry.js",data,"utf8");
             });

        }
        if( args[2] == '-b' && typeof(args[3]) == 'string' && args[4] == 'gulp'){

            var sDirurl = process.cwd() + '/news/pages/' + args[3];
            file.mkdir(sDirurl);
            file.write(sDirurl + "/gulpfile.js","","utf8");
        }

    }
}