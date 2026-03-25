const path = require('path');
const { baseConfig } = require('./wdio.base.conf');

const platform = process.env.PLATFORM || 'android';

const androidCapability = {
  platformName: 'Android',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
  'appium:platformVersion': process.env.ANDROID_VERSION || '13.0',
  'appium:automationName': 'UiAutomator2',
  'appium:app':
    process.env.ANDROID_APP_PATH ||
    path.join(
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
};

const iosCapability = {
  platformName: 'iOS',
  'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15',
  'appium:platformVersion': process.env.IOS_VERSION || '17.4',
  'appium:automationName': 'XCUITest',
  'appium:app':
    process.env.IOS_APP_PATH ||
    path.join(__dirname, '..', '..', 'ios', 'build', 'ShopNest.app'),
  'appium:noReset': false,
};

const capabilities =
  platform === 'ios' ? [iosCapability] : [androidCapability];

exports.config = {
  ...baseConfig,
  runner: 'local',
  port: 4723,
  capabilities,
  services: ['appium'],
};
