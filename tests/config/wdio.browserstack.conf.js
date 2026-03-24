const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_APP_ID } =
  process.env;

if (!BROWSERSTACK_USERNAME || !BROWSERSTACK_ACCESS_KEY || !BROWSERSTACK_APP_ID) {
  throw new Error(
    'Missing BrowserStack credentials. Set BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, and BROWSERSTACK_APP_ID in tests/.env'
  );
}

exports.config = {
  user: BROWSERSTACK_USERNAME,
  key: BROWSERSTACK_ACCESS_KEY,
  hostname: 'hub.browserstack.com',
  specs: [path.join(__dirname, '..', 'test', 'specs', '**', '*.spec.js')],
  maxInstances: 1,
  capabilities: [
    {
      'bstack:options': {
        deviceName: 'Samsung Galaxy S23',
        osVersion: '13.0',
        projectName: 'ShopNest',
        buildName: 'ShopNest Build 1',
        sessionName: 'ShopNest Tests',
        debug: true,
        networkLogs: true,
      },
      platformName: 'Android',
      'appium:app': BROWSERSTACK_APP_ID,
      'appium:automationName': 'UiAutomator2',
      'appium:noReset': false,
    },
  ],
  services: ['browserstack'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },
  waitforTimeout: 15000,
  connectionRetryTimeout: 60000,
  connectionRetryCount: 3,
};
