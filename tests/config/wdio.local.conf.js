const path = require('path');

exports.config = {
  runner: 'local',
  port: 4723,
  specs: [path.join(__dirname, '..', 'test', 'specs', '**', '*.spec.js')],
  maxInstances: 1,
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
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  waitforTimeout: 10000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 3,
};
