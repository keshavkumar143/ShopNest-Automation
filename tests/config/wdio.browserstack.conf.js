const path = require('path');
const { baseConfig } = require('./wdio.base.conf');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_APP_ID } =
  process.env;

const BROWSERSTACK_IOS_APP_ID =
  process.env.BROWSERSTACK_IOS_APP_ID || BROWSERSTACK_APP_ID;

if (!BROWSERSTACK_USERNAME || !BROWSERSTACK_ACCESS_KEY || !BROWSERSTACK_APP_ID) {
  throw new Error(
    'Missing BrowserStack credentials. Set BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, and BROWSERSTACK_APP_ID in tests/.env'
  );
}

const sharedBstackOptions = {
  projectName: 'ShopNest',
  buildName: `ShopNest-${new Date().toISOString().slice(0, 10)}`,
  debug: true,
  networkLogs: true,
  consoleLogs: 'errors',
  appiumVersion: '2.6.0',
};

exports.config = {
  ...baseConfig,
  user: BROWSERSTACK_USERNAME,
  key: BROWSERSTACK_ACCESS_KEY,
  hostname: 'hub.browserstack.com',

  capabilities: [
    {
      'bstack:options': {
        ...sharedBstackOptions,
        deviceName: 'Samsung Galaxy S23',
        osVersion: '13.0',
        sessionName: 'Android Phone',
      },
      platformName: 'Android',
      'appium:app': BROWSERSTACK_APP_ID,
      'appium:automationName': 'UiAutomator2',
      'appium:noReset': false,
    },
    {
      'bstack:options': {
        ...sharedBstackOptions,
        deviceName: 'Samsung Galaxy Tab S8',
        osVersion: '12.0',
        sessionName: 'Android Tablet',
      },
      platformName: 'Android',
      'appium:app': BROWSERSTACK_APP_ID,
      'appium:automationName': 'UiAutomator2',
      'appium:noReset': false,
    },
    {
      'bstack:options': {
        ...sharedBstackOptions,
        deviceName: 'iPhone 15',
        osVersion: '17',
        sessionName: 'iOS Phone',
      },
      platformName: 'iOS',
      'appium:app': BROWSERSTACK_IOS_APP_ID,
      'appium:automationName': 'XCUITest',
      'appium:noReset': false,
    },
    {
      'bstack:options': {
        ...sharedBstackOptions,
        deviceName: 'iPad Pro 12.9 2022',
        osVersion: '16',
        sessionName: 'iOS Tablet',
      },
      platformName: 'iOS',
      'appium:app': BROWSERSTACK_IOS_APP_ID,
      'appium:automationName': 'XCUITest',
      'appium:noReset': false,
    },
  ],

  services: [
    [
      'browserstack',
      {
        browserstackLocal: true,
      },
    ],
  ],
  mochaOpts: {
    ...baseConfig.mochaOpts,
    timeout: 120000,
  },
  waitforTimeout: 15000,
  connectionRetryTimeout: 60000,
};
