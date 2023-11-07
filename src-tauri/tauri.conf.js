const isWindow = process.platform !== 'darwin'; // 是否windows 系统
const isProd = process.argv[2] !== 'dev';

// const version = '2.0.6';
const version = '1.0.1';

console.log('isProd:', process.argv[2]);

const customConfig = {
    dev: {
        productName: '语矩dev',
        identifier: 'com.shuinfo.yuju-chat-dev',
        baseUrl: 'https://llm-dev.yuju.chat',
    },
    prod: {
        productName: '语矩',
        identifier: 'com.shuinfo.yuju-chat',
        baseUrl: 'https://api.yuju.chat',
    },
    win: {
        decorations: true,
    },
    mac: {
        decorations: true,
    },
};

const envConfig = isProd ? customConfig.prod : customConfig.dev;

const platformConfig = isWindow ? customConfig.win : customConfig.mac;

const updateUrl = `${envConfig.baseUrl}/v1/app/${process.platform}-${process.arch}/version/update`;
console.log('updateUrl:', updateUrl);

module.exports = {
    build: {
        beforeDevCommand: 'yarn dev',
        beforeBuildCommand: 'yarn build',
        devPath: 'http://localhost:1420',
        distDir: '../dist',
        withGlobalTauri: false,
    },
    package: {
        productName: envConfig.productName,
        version: version,
    },
    tauri: {
        allowlist: {
            all: true,
            shell: {
                all: false,
                open: true,
            },
            window: {
                show: true,
                hide: true,
                close: true,
                setSize: true,
            },
            http: {
                all: true,
                request: true,
                scope: ['http://**', 'https://**'],
            },
        },
        bundle: {
            active: true,
            targets: 'all',
            identifier: envConfig.identifier,
            icon: [
                'icons/32x32.png',
                'icons/128x128.png',
                'icons/128x128@2x.png',
                'icons/icon.icns',
                'icons/icon.ico',
            ],
            windows: {
                wix: {
                    language: 'zh-CN',
                },
                nsis: {
                    languages: ['SimpChinese'],
                    displayLanguageSelector: true,
                },
            },
        },
        security: {
            csp: null,
        },
        updater: {
            active: true,
            endpoints: [updateUrl],
            dialog: true, //
            pubkey: 'dW50cnVzdGVkIGNvbW1lbnQ6IG1pbmlzaWduIHB1YmxpYyBrZXk6IEJEMjlCRTlGM0QyMUNEOApSV1RZSE5MejZadlNDN1hBODlET0o2Q3NubmVoRDBLNEZyNVFjZHJQakt1VVRpd3VlK2FCdHM2Ywo=',
        },
        windows: [
            {
                theme: 'Light',
                fullscreen: false,
                center: true,
                resizable: true,
                visible: true,
                title: '',
                width: 375,
                height: 500,
                label: 'home',
                url: '/login',
                titleBarStyle: 'Overlay',
                decorations: platformConfig.decorations,
                minWidth: 375,
                minHeight: 500,
            },
        ],
    },
};
