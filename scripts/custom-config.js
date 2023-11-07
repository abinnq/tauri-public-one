// 构建 tauri.conf.json 配置文件
const fs = require('fs');
const path = require('path');

function movedTauriConfig() {
    const manifestPath = '../src-tauri/tauri.conf.json';
    const manifestConfig = require('../src-tauri/tauri.conf.js');
    // 写入配置文件
    fs.writeFile(path.resolve(__dirname, manifestPath), JSON.stringify(manifestConfig), err => {
        if (err) {
            return console.log(err);
        }

        console.log(`写入${manifestPath}文件成功！`);
    });

}

movedTauriConfig();

