const pkg = require('./package.json');
const config = {
  "expo": {
    "name": "Pictoroma",
    "slug": "olli",
    "version": pkg.version,
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "pictoroma",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "pro.mortenolsen.olli",
      "buildNumber": pkg.version,
      "config": {
        "usesNonExemptEncryption": false
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "pro.mortenolsen.olli"
    },
    "web": {
      "favicon": "./assets/icon.png"
    },
  }
}

module.exports = config;
