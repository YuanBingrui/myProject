# 通润铸造平板App项目

### Getting Started
- Clone this repository.
- Install node LTS version (<https://nodejs.org/>).
- Install the ionic CLI (`npm install -g ionic`).
- Run `npm install` in a terminal from the project root.
- Run `ionic serve` in a terminal from the project root.

### Deploying Ionic/Cordova App
- Run `ionic cordova`, it will prompt you to install the Cordova plugin.
- Refer <http://ionicframework.com/docs/intro/deploying/>.

### Dev Environment
`> ionic info`  
global packages:

    @ionic/cli-utils : 1.19.0
    Cordova CLI      : 8.0.0
    Ionic CLI        : 3.19.1

local packages:

    @ionic/app-scripts              : 3.1.8
    Cordova Platforms               : android 6.2.3 ios 4.1.1
    Ionic Framework                 : ionic-angular 3.9.2

System:

    Node       : v8.9.4
    OS         : macOS Sierra / Windows 10
    Xcode      : Xcode 8.3.3 Build version 8E3004b
    ios-deploy : 1.8.6
    ios-sim    : 5.0.8
    npm        : 5.6.0 

### Access-Control-Allow-Origin Issue Solution
- For Windows: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security --user-data-dir=C:\Temp
- For MacOS: open -a "Google Chrome" --args --disable-web-security --user-data-dir=$HOME/Temp
