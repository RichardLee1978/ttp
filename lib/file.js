var path = require('path');
var fs = require('fs');
var util = require('util');
var Url = require('url');
var iconv = require('iconv-lite');
module.exports = {
    exists:fs.existsSync || path.existsSync,
    mkdir: function(p, mode, made) {
        var _this = this;
        if (mode === undefined) {
            mode = 0777 & (~process.umask());
        }
        if (!made) {
            made = null;
        }
        if (typeof mode === 'string') {
            mode = parseInt(mode, 8);
        }
        p = path.resolve(p);

        if ( !_this.exists(p) ) {
            try {
                fs.mkdirSync(p, mode);
                made = made || p;
            }
            catch (err0) {
                switch (err0.code) {
                    case 'ENOENT' :
                        made = _this.mkdir(path.dirname(p), mode, made);
                        _this.mkdir(p, mode, made);
                        break;
                    default:
                        var stat;
                        try {
                            stat = fs.statSync(p);
                        }
                        catch (err1) {
                            throw err0;
                        }
                        if (!stat.isDirectory()) throw err0;
                        break;
                }
            }
            return made;
        }
    },
    write: function(path,source,encodeing){
        //console.log(path);
        try {
            var encodeing = encodeing || 'utf8';

            if(encodeing == 'gbk'){
                var s = iconv.decode(source, 'gbk');
                source = iconv.encode(s, 'gbk');
            }

            fs.writeFileSync(path , source, encodeing);
        } catch (e) {
            console.log("ttp error [f.write] " + path);
            console.log(e);
        }
    }
}
