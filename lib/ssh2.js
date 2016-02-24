var SSH = require('ssh2').Client;
var fs = require('fs');
var oGitCommand = {
    cd:"cd /opt/htdocs/ttpaicdn/\n",
    root:"sudo -s\n",
    checkoutMaster: "git checkout master\n",
    fetch:"git fetch\n",
    pullBranch: function(name) {
        return "git checkout " + name + "\ngit pull origin "+name+"\n";
    },
    exit:"exit\nexit\n",
    deployCdn:"su master\n/etc/inotify.sh\n",
    output:function (branchname) {
        return  this.cd +
                this.root +
                this.checkoutMaster +
                this.fetch +
                this.pullBranch( branchname ) +
                this.exit;
    }
}
module.exports = {
    shellFEServer: function( server , branch ) {
        console.log(process.env.PWD);
        fs.readFile(process.env.PWD + '/key.json', function(err,data){
                if(err) {
                    console.log( err );
                }
                else {
                    var key_config =JSON.parse(data);

                    var key ;
                    if(server == '91') {
                      key = key_config.test;
                    }
                    else if(server == '82') {
                      key = key_config.production;
                    }


                    var conn = new SSH();
                        conn.on('ready', function() {
                          console.log('Client :: ready');
                          conn.shell(function(err, stream) {
                            if (err) throw err;

                            stream.on('close', function() {
                              console.log('Stream :: close');
                              conn.end();
                            })
                            .on('data', function(data) {
                              console.log('STDOUT: ' + data);
                            }).stderr.on('data', function(data) {
                              console.log('STDERR: ' + data);
                            });
                            stream.end(oGitCommand.output(branch));
                          });
                        })
                        .connect(key);

                }
          })
    }
}