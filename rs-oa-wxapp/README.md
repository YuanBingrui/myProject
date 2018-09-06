# 罗想oa微信小程序

### 环境
[安装微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html?t=1477656485006)

### 导入项目目录
启动微信开发者工具，导入此项目目录，直接在开发者工具中运行项目

### 注意
因为我开发的时候，是微信刚正式发布不久，很多方面还不完善，我在登陆的时候遇到的问题，微信小程序默认发送请求不带cookie，所以以session实现登录验证功能的，需要手动设置cookie，并对api做了promise封装。