const path = require('path');
const { baseConfig } = require('./wdio.base.conf');

exports.config = {
  ...baseConfig,
  runner: 'local',
  port: 4723,
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '13.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.join(
        __dirname,
        '..',
        '..',
        'android',
        'app',
        'build',
        'outputs',
        'apk',
        'release',
        'app-release.apk'
      ),
      'appium:appWaitActivity': '*',
      'appium:noReset': false,
    },
  ],
  services: ['appium'],
};
