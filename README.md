#ttp
## 天天拍车前端集成工具
- 1.安装
```
npm install -g ttp
```
- 2.在项目根目录建立key.js文件（主要用于远程主机ssh登录的密码端口等）
```
module.exports = {
    "test": {
        "host": "192.198.0.1",
        "port": 22,
        "username": "name",
        "password": "test"
    },
    "production": {
        "host": "192.198.0.11",
        "port": 22,
        "username": "name",
        "password": "test"
    }

}
```
- 3.创建一个项目
```
ttp -b 2015.ttpai.cn webpack
```
```
  |--news
  |----pages
  |------2015.ttpai.cn
  |--------_wpd.js
  |--------_wpp.js
  |--------entry.js
  |--------base.html
```
- 4.登录远程82主机并切换git仓库(dev branch)
```
ttp -r 82 dev
```
